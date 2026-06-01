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

app.post('/api/fileanalyse', (req, res, next) => {
  console.log('=== POST /api/fileanalyse recibido ===');
  console.log('content-type:', req.headers['content-type']);
  console.log('headers completos:', JSON.stringify(req.headers));
  next();
}, upload.single('upfile'), function (req, res) {
  console.log('req.file:', req.file);
  console.log('req.files:', req.files);
  
  const file = req.file;
  if (!file) {
    console.log('ERROR: No se encontro archivo');
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