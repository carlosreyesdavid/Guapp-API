var mongoose = require('mongoose'),
    Local = require('../models/local')

exports.localList = function(req, res) {
    Local.find({}, function(err, data) {
        if (err) 
            return res.status(500).json({"message": err.message});
        res.status(200).json(data);
    })
}

exports.getLocal = function(req, res) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Local.findById(req.params.id, function(err, data) {
            if(err) 
                return res.status(500).json({"message": err.message});
            if(data == null)
                res.status(200).json({"message": "No existe un Local con ese identificador"});
            else
                res.status(200).json(data);
        });
    } 
    else
    {
        res.status(200).json({"message": "Identificador no valido"});
    }
};

exports.addLocal = function(req, res) { 
    var local = new Local({
        name: req.body.name,
        local_type: req.body.local_type,
        created_at: new Date()
    });
    local.save(function(err) {
        if(err) 
            return res.status(500).json({"message": err.message});
        res.status(201).json({"message": 'Creado correctamente!'});
    });
};

exports.modifyLocal = function(req, res){
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Local.findById(req.params.id, function(err, local) {
            if(err) 
                return res.status(500).json({"message": err.message});
            if(local == null)
                res.status(200).json({"message": "No existe un Local con ese identificador"});
            else
            {
                local.name = req.body.name;
                local.local_type = req.body.local_type;
                local.updated_at = new Date()
                local.save(function(err) {
                    if(err) 
                        return res.status(500).json({"message": err.message});
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

exports.deleteLocal = function(req, res) {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Local.findById(req.params.id, function(err, local) {
            if(err) 
                return res.status(500).json({"message": err.message});
            if(local == null)
                res.status(200).json({"message": "No existe un Local con ese identificador"});
            else 
            {
                local.remove(function(err){
                    if(err) 
                        return res.status(500).json({"message": err.message});
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