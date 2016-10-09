var express = require('express'),
    router  = express.Router(),
    localController = require('../controllers/localController');

router.get('/', localController.localList);

module.exports = router;