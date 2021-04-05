var {generateRandomMembers, getOrgTree} =  require('./utils');
var express = require('express');

var app = express();

app.get('/api/org', (req, res) => {
  var data = getOrgTree();
  res.json(data);
});

app.get('/api/department/:id', (req, res) => {
  var department = req.params.id;
  var members = generateRandomMembers(department);
  res.json(members);
})

app.listen('9090', ()=> {console.log('API server started.')});

const path = require('path');
const fs = require('fs');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const compiler = Webpack(webpackConfig);
const options = {
  contentBase: path.join(__dirname, 'public'),
  publicPath: '/assets/',
  historyApiFallback: {
    rewrites: [
      {from: /^\/$/, to: '/namepicker.html'}
    ]
  },
  proxy: {
    "/api": "http://localhost:9090"
  },
  https: {
    cert: fs.readFileSync("cert/file.crt"),
    key: fs.readFileSync("cert/private.pem"),
    cacert: fs.readFileSync("cert/csr.pem")
  }
};

const server = new WebpackDevServer(compiler, options);
server.listen('8080', '127.0.0.1');
