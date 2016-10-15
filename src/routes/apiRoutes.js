var express = require('express'),
    router  = express.Router(),
    localRoutes = require('./localRoutes');

router.get('/', function (req, res) {
  res.status(200).send('API Root')
})

router.use('/locals/', localRoutes);

module.exports = router;