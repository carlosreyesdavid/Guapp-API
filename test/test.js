var chai     = require('chai'),
    chaiHttp = require('chai-http'),
    server   = require('../server'),
    route    = '/api/v1/',
    should   = chai.should();
    
process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe("Test App", function() {
    describe("Server Basic Routes", function() {
        it('GET / should be return 200', function(done) {
            chai.request(server)
                .get('/')
                .end(function(err,res) {
                    if (err) 
                        throw err
                    res.should.have.status(200);
                    done();
            });
        });
    
        it('GET /api/v1 should be return 200', function(done) {
            chai.request(server)
                .get(route)
                .end(function(err,res) {
                    if (err) 
                        throw err
                    res.should.have.status(200);
                    done();
            });
        });
    })
});