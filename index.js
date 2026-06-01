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

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/api/fileanalyse', (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      console.log('Error multer:', err);
      return res.status(400).json({ error: err.message });
    }

    console.log('=== POST /api/fileanalyse recibido ===');
    console.log('content-type:', req.headers['content-type']);
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
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
