// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Users", () => {
    describe("GET /", () => {
        // Test to get all users record
        it("should get all users record", (done) => {
             chai.request(app)
                 .get('/api/test')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
        // Test to get single user record
        it("should get a single user record", (done) => {
             const id = '5c8da0daac802414c5a08b38';
             chai.request(app)
                 .get(`/api/test/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test to get single user record
        it("should not get a single user record", (done) => {
             const id = '5c8da0daac802334c5a08b38';
             chai.request(app)
                 .get(`/api/test/${id}`)
                 .end((err, res) => {
                     res.should.have.status(404);
                     done();
                  });
         });
    });
});