var request = require("request");
var expect = require('expect')

var base_url = "https://guapp-api-carlosreyesdavid.c9users.io",
    supertest = require('supertest')(base_url);

describe("Test App", function() {
    describe("Server Basic Routes", function() {
        it("GET / should be return 200", function(done) {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    
        it("GET /api/v1 should be return 200", function(done) {
            request.get(base_url+'/api/v1', function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    
    
    describe("Local Routes /locals", function() {
        it("GET /api/v1/locals should be return 200", function(done) {
            request.get(base_url+'/api/v1/locals', function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        
        it("GET /api/v1/locals should be have Content-Type application/json", function(done) {
            supertest.get('/api/v1/locals')
                .expect('Content-Type', 'application/json; charset=utf-8', done);
        });
    });
});