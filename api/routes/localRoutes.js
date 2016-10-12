var express = require('express'),
    router  = express.Router(),
    localController = require('../controllers/localController');

router.get('/', localController.localList);
router.get('/:id', localController.getLocal);

module.exports = router;