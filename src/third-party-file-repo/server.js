const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const privateKey  = fs.readFileSync('private.pem', 'utf8');
const certificate = fs.readFileSync('file.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express();
const httpsServer = https.createServer(credentials, app);
const PORT = 3002;
httpsServer.listen(PORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', PORT);
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
