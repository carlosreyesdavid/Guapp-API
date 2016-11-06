var mongoose = require('mongoose'),
    Event    = require('../models/events'),
    log      = require('../logger/log'),
    messages = require('../strings/eventStrings.json')

exports.eventList = function(req, res) {
    Event.find({})
        .populate('locals','name')
        .exec(function(error, data) {
            if (error) 
            {   
                log.error(error.message)
                return res.status(500).json({"message": error.message});
            }
            res.status(200).json(data);
        })
}

exports.getEvent = function(req, res) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Event.findById(req.params.id)
            .populate('locals','name')
            .exec(function(error, data) {
                if (error) 
                {   
                    log.error(error.message)
                    return res.status(500).json({"message": error.message});
                }
                if(data == null)
                    res.status(200).json(messages.NOT_EXIST_ID);
                else
                    res.status(200).json(data);
                })
    } 
    else
        res.status(200).json(messages.ID_NO_VALID);
};

exports.addEvent = function(req, res) {
    var event = new Event({
        title: req.body.title,
        description: req.body.description,
        place: req.body.place,
        startDate: req.body.startDate,
        endDate:  req.body.endDate,
        locals : req.body.locals
    });
    event.save(function(error) {
        if (error) 
        {   
            log.error(error.message)
            return res.status(500).json({"message": error.message});
        }
        res.status(201).json(messages.CREATED);
    });
};

exports.modifyEvent = function(req, res){
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Event.findById(req.params.id, function(error, event) {
            if (error) 
            {   
                log.error(error.message)
                return res.status(500).json({"message": error.message});
            }
            if(event == null)
                res.status(200).json(messages.NOT_EXIST_ID);
            else
            {
                event.title = req.body.title
                event.description = req.body.description
                event.place = req.body.place
                event.startDate = req.body.startDate
                event.endDate = req.body.endDate
                event.updated_at = new Date()
                event.save(function(error) {
                    if (error) 
                    {   
                        log.error(error.message)
                        return res.status(500).json({"message": error.message});
                    }
                    res.status(200).json(messages.MODIFIED);
                });
            }
        });
    }
    else
        res.status(200).json(messages.ID_NO_VALID);
}

exports.deleteEvent = function(req, res) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Event.findById(req.params.id, function(error, event) {
            if (error) 
            {   
                log.error(error.message)
                return res.status(500).json({"message": error.message});
            }
            if(event == null)
                res.status(200).json(messages.NOT_EXIST_ID);
            else 
            {
                event.remove(function(error){
                    if(error) {
                        log.error(error.message)
                         return res.status(500).json(error.message);
                    }
                    res.status(200).json(messages.DELETED);
                });
            }
        });
    }
    else
        res.status(200).json(messages.ID_NO_VALID);
}