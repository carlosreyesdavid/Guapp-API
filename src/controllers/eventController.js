var mongoose = require('mongoose'),
    Event    = require('../models/events')

    
exports.eventList = function(req, res) {
    Event.find({}, function(error, data) {
        if (error) 
        {   
            return res.status(500).json({"message": error.message});
        }
        res.status(200).json(data);
    })
}

exports.getEvent = function(req, res) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Event.findById(req.params.id, function(error, data) {
            if (error) 
            {   
                return res.status(500).json({"message": error.message});
            }
            if(data == null)
                res.status(200).json({"message": "No existe un Evento con ese identificador"});
            else
                res.status(200).json(data);
        });
    } 
    else
    {
        res.status(200).json({"message": "Identificador no valido"});
    }
};

exports.addEvent = function(req, res) {
    var event = new Event({
        title: req.body.title,
        description: req.body.description,
        place: req.body.place,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        created_at: new Date()
    });
    event.save(function(error) {
        if (error) 
        {   
            return res.status(500).json({"message": error.message});
        }
        res.status(201).json({"message": 'Creado correctamente!'});
    });
};

exports.modifyEvent = function(req, res){
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Event.findById(req.params.id, function(error, event) {
            if (error) 
            {   
                return res.status(500).json({"message": error.message});
            }
            if(event == null)
                res.status(200).json({"message": "No existe un Evento con ese identificador"});
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
                        return res.status(500).json({"message": error.message});
                    }
                    res.status(200).json({"message": 'Modificado correctamente!'});
                });
            }
        });
    }
    else
    {
        res.status(200).json({"message": "Identificador no valido"});
    }
}

exports.deleteEvent = function(req, res) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Event.findById(req.params.id, function(error, event) {
            if (error) 
            {   
                return res.status(500).json({"message": error.message});
            }
            if(event == null)
                res.status(200).json({"message": "No existe un Evento con ese identificador"});
            else 
            {
                event.remove(function(error){
                    if(error) 
                        return res.status(500).json({"message": error.message});
                    res.status(200).json({"message": 'Borrado correctamente!'});
                });
            }
        });
    }
    else
    {
        res.status(200).json({"message": "Identificador no valido"});
    }
}