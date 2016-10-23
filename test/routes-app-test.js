var chai     = require('chai'),
    chaiHttp = require('chai-http'),
    mongoose = require("mongoose"),
    server   = require('../server'),
    Local    = require("../api/models/local"),
    route    = '/api/v1/locals',
    should   = chai.should();
    
process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe('Test Locals Routes', function() {

    Local.collection.drop();
    
    beforeEach(function(done){
        var newLocal = new Local({
            name: "Guachinche La Ruta",
            local_type: "Guachinche",
            address: "La Recta, 20, 00000, Ciudad, Provincia",
            phone: "999888777",
            web: "www.web.com",
            descripcion: "Descripción del local",
            schedules: [
                {
                    day: "Lunes",
                    hours: {
                        schedule_start : "8:00",
                        schedule_end: "12:00"
                    }
                },
                {
                    day: "Martes",
                    hours: {
                        schedule_start : "8:00",
                        schedule_end: "12:00"
                    }
                }
            ],
            created_at: new Date(), 
            updated_at: new Date()
        });
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
            res.body[0].should.have.property('address');
            res.body[0].should.have.property('phone');
            res.body[0].should.have.property('web');
            res.body[0].should.have.property('descripcion');
            res.body[0].should.have.property('schedules');
            res.body[0].schedules.forEach(function(data) {
                data.should.have.property('day');
                data.should.have.property('hours');
                data.hours.should.have.property('schedule_start');
                data.hours.should.have.property('schedule_end');
            });
            res.body[0].should.have.property('created_at');
            res.body[0].should.have.property('updated_at');
            res.body[0].name.should.equal('Guachinche La Ruta');
            res.body[0].local_type.should.equal('Guachinche');
            done();
        });
    });
    
    it('should list a local on /locals/:id GET', function(done) {
        var newLocal = new Local({
            name: "Guachinche Get",
            local_type: "Guachinche",
            address: "La Recta, 20, 00000, Ciudad, Provincia",
            phone: "999888777",
            web: "www.web.com",
            descripcion: "Descripción del local",
            schedules: [
                {
                    day: "Lunes",
                    hours: {
                        schedule_start : "8:00",
                        schedule_end: "12:00"
                    }
                },
                {
                    day: "Martes",
                    hours: {
                        schedule_start : "8:00",
                        schedule_end: "12:00"
                    }
                }
            ],
            created_at: new Date(), 
            updated_at: new Date()
        });
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
                res.body.should.have.property('address');
                res.body.should.have.property('phone');
                res.body.should.have.property('web');
                res.body.should.have.property('descripcion');
                res.body.should.have.property('schedules');
                res.body.schedules.forEach(function(data) {
                    data.should.have.property('day');
                    data.should.have.property('hours');
                    data.hours.should.have.property('schedule_start');
                    data.hours.should.have.property('schedule_end');
                });
                res.body.should.have.property('created_at');
                res.body.should.have.property('updated_at');
                res.body.name.should.equal('Guachinche Get');
                res.body.local_type.should.equal('Guachinche');
                res.body._id.should.equal(data.id);
                done();
            });
        });
    });
    
    it('should add a local on /locals POST', function(done) {
        chai.request(server)
            .post(route)
            .send({
                name: "Guachinche POST",
                local_type: "Guachinche",
                address: "La Recta, 20, 00000, Ciudad, Provincia",
                phone: "999888777",
                web: "www.web.com",
                descripcion: "Descripción del local",
                schedules: [
                    {
                        day: "Lunes",
                        hours: {
                            schedule_start : "8:00",
                            schedule_end: "12:00"
                        }
                    },
                    {
                        day: "Martes",
                        hours: {
                            schedule_start : "8:00",
                            schedule_end: "12:00"
                        }
                    }
                ],
                created_at: new Date(), 
                updated_at: new Date()
            })
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
                    .send({
                        'name': 'Guachinche La Ruta Modificada',
                        'schedules': [{
                            'day': 'Lunes',
                            'hours': {
                                'schedule_start' : '10:00',
                                'schedule_end': '10:30'
                            }
                        }]
                    })
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
                    .delete(route+'/'+res.body[0]._id)
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

describe('Test Local Routes Errors',function() {
    
    describe('Routes Error GET',function() {
        it('/locals/12345 GET should show message of invalid id', function(done) {
            chai.request(server)
                .get(route+'/12345')
                .end(function(err, res) {
                    if (err) 
                        throw err
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.a('string');
                    res.body.message.should.equal('Identificador no valido');
                    done();                               
                });
        });
        
        it('/locals/:id GET with valid id should show message if not found data for this id', function(done) {
            chai.request(server)
                .get(route+'/507f1f77bcf86cd799439011')
                .end(function(err, res) {
                    if (err) 
                        throw err
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.a('string');
                    res.body.message.should.equal('No existe un Local con ese identificador');
                    done();                               
                });
        });
    })
    
    describe('Routes Errors PUT',function() {
        it('/locals/12345 PUT should show message of invalid id', function(done) {
            chai.request(server)
                .put(route+'/12345')
                .send({'name': 'Guachinche La Ruta Modificada'})
                .end(function(err, res) {
                    if (err) 
                        throw err
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.a('string');
                    res.body.message.should.equal('Identificador no valido');
                    done();                               
                });
        });
        
        it('/locals/:id PUT with valid id should show message if not found data for this id', function(done) {
            chai.request(server)
                .put(route+'/507f1f77bcf86cd799439011')
                .send({'name': 'Guachinche La Ruta Modificada'})
                .end(function(err, res) {
                    if (err) 
                        throw err
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.a('string');
                    res.body.message.should.equal('No existe un Local con ese identificador');
                    done();                               
                });
        });
    })
    
    describe('Routes Errors DELETE',function() {
        it('/locals/12345 DELETE should show message of invalid id', function(done) {
            chai.request(server)
                .delete(route+'/12345')
                .end(function(err, res) {
                    if (err) 
                        throw err
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.a('string');
                    res.body.message.should.equal('Identificador no valido');
                    done();                               
                });
        });
        
        it('/locals/:id DELETE with valid id should show message if not found data for this id', function(done) {
            chai.request(server)
                .delete(route+'/507f1f77bcf86cd799439011')
                .end(function(err, res) {
                    if (err) 
                        throw err
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.a('string');
                    res.body.message.should.equal('No existe un Local con ese identificador');
                    done();                               
                });
        });
    })
    
});
