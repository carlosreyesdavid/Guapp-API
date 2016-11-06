var express    = require('express'),
    app        = express(),
    mongoose   = require('mongoose'),
    config     = require('./src/config/config.json')[process.env.NODE_ENV || 'development'],
    bodyParser = require('body-parser'),
    apiRoutes  = require('./src/routes/apiRoutes'),
    bodyParser = require('body-parser'),
    log = require('./src/logger/log');
    
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI, function(err) {
    if (process.env.NODE_ENV == 'development')
    {
        if(err) {
            log.error('Error de conexión a MongoDB: ', err);
        } else {
            log.info('Conectado correctamente a MongoDB');
        }
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/', apiRoutes);

app.get('/', function (req, res) {
  res.status(200).send('Cliente');
});

app.listen(process.env.PORT || 8081, process.env.IP);

module.exports = app