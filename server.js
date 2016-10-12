var express    = require('express'),
    app        = express(),
    mongoose   = require('mongoose'),
    config     = require('./api/config/config.json')[process.env.NODE_ENV || 'development'],
    bodyParser = require('body-parser'),
    apiRoutes  = require('./api/routes/apiRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI, function(err) {
    if (process.env.NODE_ENV == 'development')
    {
        if(err) {
            console.log('LOG:> Error de conexión a MongoDB: ', err);
        } else {
            console.log('LOG:> Conectado correctamente a MongoDB');
        }
    }
});

app.use('/api/v1/', apiRoutes);

app.get('/', function (req, res) {
  res.status(200).send('Cliente');
});

app.listen(process.env.PORT || 8081, process.env.IP);

module.exports = app