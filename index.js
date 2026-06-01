var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer();

app.post('/api/fileanalyse', upload.any(), function (req, res) {
  console.log('=== POST recibido ===');
  console.log('headers:', JSON.stringify(req.headers));
  console.log('req.file:', req.file);
  console.log('req.files:', JSON.stringify(req.files ? req.files.map(f => ({
    fieldname: f.fieldname,
    originalname: f.originalname,
    mimetype: f.mimetype,
    size: f.size
  })) : null));

  const file = req.file || (req.files && req.files[0]);
  
  if (!file) {
    console.log('ERROR: sin archivo');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
