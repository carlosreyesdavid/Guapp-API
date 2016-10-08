var request = require("request");
var expect = require('expect')

var base_url = "https://guapp-api-carlosreyesdavid.c9users.io/"

describe("Hello World Server", function() {
    describe("Test", function() {
        it("GET * should be return 200", function(done) {
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
});