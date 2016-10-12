var mongoose = require("mongoose"),
    Local    = require("../api/models/local.js"),
    config   = require('../api/config/config.json')['test'],
    expect   = require('expect')

mongoose.connect(config.MONGODB_URI)

describe("Test Model MongoDB Local", function(){  
  
    var currentLocal = null;  
    beforeEach(function(done){    
        var localData = {name: "Guachinche Test",local_type: "Guachinche", created_at: new Date(), updated_at: new Date()}; 
        Local.create(localData, function(err, data){ 
            if (err) 
                throw err
            currentLocal = data;      
            done();    
        });  
    });    
    afterEach(function(done){    
        Local.remove({}, function() {      
            done();    
        });  
    });  
 
    //tests
     it("Local name should exist", function(done){   
        Local.find({}, function(err, data) {
            if (err) 
                throw err
            expect(data[0].name).toExist();  
            done();    
        });  
    }); 
    
    it("Local name should be Guachinche Test", function(done){   
        Local.find({}, function(err, data) {
            if (err) 
                throw err
            expect(data[0].name).toBe(currentLocal.name);  
            done();    
        });  
    }); 
    
    it("Local type should be Guachinche ", function(done){   
        Local.find({}, function(err, data) {
            if (err) 
                throw err
            expect(data[0].type).toBe(currentLocal.type);  
            done();    
        });  
    }); 
    
    it("Local created date should be today", function(done){   
        Local.find({}, function(err, data) {
            if (err) 
                throw err
            expect(data[0].created_at).toEqual(currentLocal.created_at);  
            done();    
        });  
    }); 
        

});