var express = require('express');
var app = express();

app.get('/api/v1', function (req, res) {
  res.status(200).send('API Root');
});

app.get('*', function (req, res) {
  res.status(200).send('Cliente');
});

app.listen(process.env.PORT || 8081, process.env.IP);