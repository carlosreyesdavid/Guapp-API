var mongoose = require('mongoose'),
    Local    = require('../models/local'),
    log      = require('../logger/log'),
    messages = require('../strings/localStrings.json')

    
exports.localList = function(req, res) {
    Local.find({}, function(error, data) {
        if (error) 
        {   
            log.error('(' + error.code +') '+ error.message)
            return res.status(500).json({"message": error.message});
        }
        res.status(200).json(data);
    })
}

exports.getLocal = function(req, res) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Local.findById(req.params.id, function(error, data) {
            if (error) 
            {   
                log.error('(' + error.code +') '+ error.message)
                return res.status(500).json({"message": error.message});
            }
            if(data == null)
                res.status(200).json(messages.NOT_EXIST_ID);
            else
                res.status(200).json(data);
        });
    } 
    else
        res.status(200).json(messages.ID_NO_VALID);
};

exports.addLocal = function(req, res) {
    var local = new Local({
        name: req.body.name,
        local_type: req.body.local_type,
        address: req.body.address,
        phone: req.body.phone,
        web: req.body.web,
        descripcion: req.body.descripcion,
        schedules: req.body.schedules,
        created_at: new Date()
    });
    local.save(function(error) {
        if (error) 
        {   
            log.error('(' + error.code +') '+ error.message)
            return res.status(500).json({"message": error.message});
        }
        res.status(201).json(messages.CREATED);
    });
};

exports.modifyLocal = function(req, res){
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Local.findById(req.params.id, function(error, local) {
            if (error) 
            {   
                log.error('(' + error.code +') '+ error.message)
                return res.status(500).json({"message": error.message});
            }
            if(local == null)
                res.status(200).json(messages.NOT_EXIST_ID);
            else
            {
                local.name = req.body.name;
                local.local_type = req.body.local_type;
                local.address = req.body.address;
                local.phone = req.body.phone;
                local.web = req.body.web;
                local.descripcion = req.body.descripcion;
                local.schedules =  req.body.schedules,
                local.updated_at = new Date()
                local.save(function(error) {
                    if (error) 
                    {   
                        log.error('(' + error.code +') '+ error.message)
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

exports.deleteLocal = function(req, res) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Local.findById(req.params.id, function(error, local) {
            if (error) 
            {   
                log.error('(' + error.code +') '+ error.message)
                return res.status(500).json({"message": error.message});
            }
            if(local == null)
                res.status(200).json(messages.NOT_EXIST_ID);
            else 
            {
                local.remove(function(error){
                    if(error) 
                    {
                        log.error('(' + error.code +') '+ error.message)
                        return res.status(500).json({"message": error.message});
                    }
                    res.status(200).json(messages.DELETED);
                });
            }
        });
    }
    else
        res.status(200).json(messages.ID_NO_VALID);
}