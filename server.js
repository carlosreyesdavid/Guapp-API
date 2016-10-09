var express  = require('express'),
    app      = express(),
    mongoose = require('mongoose'),
    config   = require('./api/config/config.json')[process.env.NODE_ENV || 'development'];

mongoose.connect(config.MONGODB_URI, function(err) {
    if(err) {
        console.log('LOG:> Error de conexión a MongoDB: ', err)
    } else {
        console.log('LOG:> Conectado correctamente a MongoDB')
    }
})

app.get('/api/v1', function (req, res) {
  res.status(200).send('API Root');
});

app.get('*', function (req, res) {
  res.status(200).send('Cliente');
});

app.listen(process.env.PORT || 8081, process.env.IP);