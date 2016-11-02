var express = require('express'),
    router  = express.Router(),
    localRoutes = require('./localRoutes'),
    eventRoutes = require('./eventRoutes');

router.get('/', function (req, res) {
  res.status(200).send('API Root')
})

router.use('/locals/', localRoutes);
router.use('/events/', eventRoutes);

module.exports = router;