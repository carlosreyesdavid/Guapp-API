var express = require('express'),
    router  = express.Router(),
    localController = require('../controllers/localController');

router.get('/', localController.localList);
router.get('/:id', localController.getLocal);
router.post('/', localController.addLocal);

module.exports = router;