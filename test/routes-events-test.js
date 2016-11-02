var chai     = require('chai'),
    chaiHttp = require('chai-http'),
    mongoose = require("mongoose"),
    server   = require('../server'),
    Events    = require("../src/models/events"),
    route    = '/api/v1/events',
    should   = chai.should();
    
process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe('Test Events Routes', function() {

    Events.collection.drop();
    
    beforeEach(function(done){
        var newEvent = new Events({
            title: "Ruta de la Tapa",
            place:  "Tegueste",
            description:  "Ruta de la tapa por locales del municipio",
            startDate: "01/11/2016",
            endDate: "30/11/2016",
            created_at: new Date(),
            updated_at: new Date()
        });
        newEvent.save(function(err) {
            if (err) 
                throw err
            done();
        });
    });
    
    afterEach(function(done){
        Events.collection.drop();
        done();
    });
    
    it('should list ALL Events on /events GET', function(done) {
        chai.request(server)
            .get(route)
            .end(function(err,res) {
                if (err) 
                    throw err
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('description');
                res.body[0].should.have.property('place');
                res.body[0].should.have.property('startDate');
                res.body[0].should.have.property('endDate');
                res.body[0].should.have.property('created_at');
                res.body[0].should.have.property('updated_at');
                res.body[0].title.should.equal('Ruta de la Tapa');
                done();
            });
    });
    
    
    it('should list a event on /events/:id GET', function(done) {
        var newEvent = new Events({
            title: "Ruta del vino",
            place:  "Tacoronte",
            description:  "Encuentro anual del vino",
            startDate: "01/12/2016",
            endDate: "30/12/2016",
            created_at: new Date(),
            updated_at: new Date()
        });
        newEvent.save(function(err, data) {
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
                res.body.should.have.property('title');
                res.body.should.have.property('description');
                res.body.should.have.property('place');
                res.body.should.have.property('startDate');
                res.body.should.have.property('endDate');
                res.body.should.have.property('created_at');
                res.body.should.have.property('updated_at');
                res.body.title.should.equal('Ruta del vino');
                res.body.place.should.equal('Tacoronte');
                res.body._id.should.equal(data.id);
                done();
            });
        });
    });
    
    it('should add a event on /events POST', function(done) {
        chai.request(server)
            .post(route)
            .send({
                title: "Noviembre del tapeo",
                place:  "Santa Cruz de Tenerife",
                description:  "VI Encuentro gastronomico ciudad de Santa Cruz de Tenerife",
                startDate: "01/12/2016",
                endDate: "30/12/2016",
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
    
    
    it('should update a event on /events/:id PUT', function(done) {
        chai.request(server)
            .get(route)
            .end(function(err, res){
                if (err) 
                    throw err
                chai.request(server)
                    .put(route+'/'+res.body[0]._id)
                    .send({
                        title: 'IV Ruta del Guachinche',
                        place: 'Santa Ursula'
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
    
    it('should delete a event on /events/:id DELETE', function(done) {
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


    describe('Test Event Routes Validations Errors',function() {
        
        describe('Routes Error GET',function() {
            it('/events/12345 GET should show message of invalid id', function(done) {
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
            
            it('/events/:id GET with valid id should show message if not found data for this id', function(done) {
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
                        res.body.message.should.equal('No existe un Evento con ese identificador');
                        done();                               
                    });
            });
        })
        
        describe('Routes Errors PUT',function() {
            it('/events/12345 PUT should show message of invalid id', function(done) {
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
                    .send({'name': 'Ruta de la tapita'})
                    .end(function(err, res) {
                        if (err) 
                            throw err
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.message.should.be.a('string');
                        res.body.message.should.equal('No existe un Evento con ese identificador');
                        done();                               
                    });
            });
            
        })
        
        describe('Routes Errors DELETE',function() {
            it('/events/12345 DELETE should show message of invalid id', function(done) {
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
            
            it('/events/:id DELETE with valid id should show message if not found data for this id', function(done) {
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
                        res.body.message.should.equal('No existe un Evento con ese identificador');
                        done();                               
                    });
            });
            
            
        });
        
    }); 

});