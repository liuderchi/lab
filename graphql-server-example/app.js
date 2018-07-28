// simple express server
// http://expressjs.com/zh-tw/starter/hello-world.html

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

module.export = app;
