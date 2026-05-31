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

// Multer sin storage ni dest
const upload = multer();

app.post('/api/fileanalyse', upload.any(), function (req, res) {

  const file = req.files[0];

  if (!file) {
    return res.status(400).json({
      error: 'No file uploaded'
    });
  }

  console.log(file);

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });

});

const port = process.env.PORT || 3000;

console.log("VERSION MULTER ANY");

app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});