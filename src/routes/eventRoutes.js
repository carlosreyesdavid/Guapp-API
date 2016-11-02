var express = require('express'),
    router  = express.Router(),
    eventController = require('../controllers/eventController');

router.get('/', eventController.eventList);
router.get('/:id', eventController.getEvent);
router.post('/', eventController.addEvent);
router.put('/:id', eventController.modifyEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;