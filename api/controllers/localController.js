var Local = require('../models/local');

exports.localList = function(req, res) {
    Local.find({}, function(err, data) {
        if (err) 
            throw err
        res.status(200).json(data);
    })
}