var chai     = require('chai'),
    chaiHttp = require('chai-http'),
    mongoose = require("mongoose"),
    server   = require('../server'),
    Local    = require("../src/models/local"),
    route    = '/api/v1/locals',
    should   = chai.should();
    
process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe('Test Locals Routes Server Errors', function() {

    Local.collection.drop();
    
    beforeEach(function(done){
        var newLocal = new Local({name: "Guachinche El Error",local_type: "Guachinche", created_at: new Date(), updated_at: new Date()});
        newLocal.save(function(err) {
            if (err) 
                throw err
            done();
        });
    });
    
    afterEach(function(done){
        Local.collection.drop();
        done();
    });
    
    it('POST Error 500 when post local without name', function(done) {
        chai.request(server)
            .post(route)
            .send({local_type: "Restaurante", created_at: new Date(), updated_at: new Date()})
            .end(function(err, res){
                if (err) 
                    console.log('')
                res.should.have.status(500);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.equal('Local validation failed');
                done();
        });
    });
    
    it('PUT Error 500 when post local without name', function(done) {
        chai.request(server)
            .get(route)
            .end(function(err, res){
                if (err) 
                    throw err
                chai.request(server)
                    .put(route+'/'+res.body[0]._id)
                    .send({'phone': '999888777'})
                    .end(function(err,res){
                        if(err)
                            console.log('')
                        res.should.have.status(500);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.message.should.be.a('string');
                        res.body.message.should.equal('Local validation failed');
                        done();
                    });
            });
    });

});
