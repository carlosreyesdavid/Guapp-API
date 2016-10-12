var Local = require('../models/local');

exports.localList = function(req, res) {
    Local.find({}, function(err, data) {
        if (err) 
            return res.status(500).json({"message": err.message});
        res.status(200).json(data);
    })
}

exports.getLocal = function(req, res) {  
    Local.findById(req.params.id, function(err, data) {
        if(err) 
            return res.status(500).json({"message": err.message});
        res.status(200).json(data);
    });
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