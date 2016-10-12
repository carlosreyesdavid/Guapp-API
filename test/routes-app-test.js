var chai     = require('chai'),
    chaiHttp = require('chai-http'),
    mongoose = require("mongoose"),
    server   = require('../server'),
    Local    = require("../api/models/local"),
    route    = '/api/v1/locals',
    should   = chai.should();
    
chai.use(chaiHttp);
process.env.NODE_ENV = 'test';

describe('Locals Routes', function() {

    Local.collection.drop();
    
    beforeEach(function(done){
        var newLocal = new Local({name: "Guachinche La Ruta",local_type: "Guachinche", created_at: new Date(), updated_at: new Date()});
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
    
    it('should list ALL Locals on /locals GET', function(done) {
        chai.request(server)
            .get(route)
            .end(function(err,res) {
            if (err) 
                throw err
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('local_type');
            res.body[0].should.have.property('created_at');
            res.body[0].should.have.property('updated_at');
            res.body[0].name.should.equal('Guachinche La Ruta');
            res.body[0].local_type.should.equal('Guachinche');
            done();
        });
    });
    
    it('should list a local on /locals/:id GET', function(done) {
        var newLocal =new Local({name: "Guachinche El Test",local_type: "Guachinche", created_at: new Date(), updated_at: new Date()});
        newLocal.save(function(err, data) {
            if (err) 
                throw err
            chai.request(server)
                .get(route+'/'+data.id)
                .end(function(err, res){
                if (err) 
                    throw err
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('_id');
                res.body.should.have.property('name');
                res.body.should.have.property('local_type');
                res.body.should.have.property('created_at');
                res.body.should.have.property('updated_at');
                res.body.name.should.equal('Guachinche El Test');
                res.body.local_type.should.equal('Guachinche');
                res.body._id.should.equal(data.id);
                done();
            });
        });
    });
    
    it('should add a local on /locals POST', function(done) {
        chai.request(server)
            .post(route)
            .send({name: "Restaurante El Nuevo",local_type: "Restaurante", created_at: new Date(), updated_at: new Date()})
            .end(function(err, res){
                if (err) 
                    throw err
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.a('string');
                res.body.message.should.equal('Creado correctamente!');
                done();
        });
    });
    
    it('should update a local on /locals/:id PUT', function(done) {
        chai.request(server)
            .get(route)
            .end(function(err, res){
                if (err) 
                    throw err
                chai.request(server)
                    .put(route+'/'+res.body[0]._id)
                    .send({'name': 'Guachinche La Ruta Modificada'})
                    .end(function(err, res){
                        if (err) 
                            throw err
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.message.should.be.a('string');
                        res.body.message.should.equal('Modificado correctamente!');
                        done();
                    });
            });
    });
    
    it('should delete a local on /locals/:id DELETE', function(done) {
        chai.request(server)
            .get(route)
            .end(function(err, res){
                if (err) 
                    throw err
                chai.request(server)
                    .delete(route+res.body[0]._id)
                    .end(function(err, res){
                        if (err) 
                            throw err
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.message.should.be.a('string');
                        res.body.message.should.equal('Borrado correctamente!');
                        done();
                    });
            });
    });

});