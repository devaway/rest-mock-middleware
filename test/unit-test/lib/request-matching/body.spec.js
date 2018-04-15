let chai = require('chai');
var expect = chai.expect;
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

let app = require('../../../server')({
  root_dir: "./mocksJson"
});

describe('Test for the Body equalToJson request mapping', function() {
  it('Check body json equals request mapping', function testSlash(done) {
    chai.request(app)
      .post('/app/login')
      .type('application/json')
      .send({
        total_results: 4
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check body json equals arrayOrder request mapping', function testSlash(done) {
    chai.request(app)
      .post('/app/login')
      .type('application/json')
      .send([{
        total_results: 4
      },{
        total_results: 5
      }])
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check body json equals request mapping with too mach attributes', function testSlash(done) {
    chai.request(app)
      .post('/app/login').type('application/json')
      .send({
        total_results: 4,
        error: true
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
  it('Check body json equals request mapping with incorrect attribute', function testSlash(done) {
    chai.request(app)
      .post('/app/login')
      .type('application/json')
      .send({
        total_results_error: 4
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
  it('404 everything else', function testPath(done) {
    chai.request(app)
      .get('/foo/bar')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
});

describe('Test for the Body matchesJsonPath request mapping', function() {
  it('Check body json match path request mapping', function testSlash(done) {
    chai.request(app)
      .post('/app/path')
      .type('application/json')
      .send({
        name: 4
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check body json match path request mapping with select a condition to array', function testSlash(done) {
    chai.request(app)
      .post('/app/path')
      .type('application/json')
      .send([{
        times: 4
      }])
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check body json match path request mapping with select a condition to nested array', function testSlash(done) {
    chai.request(app)
      .post('/app/path')
      .type('application/json')
      .send({
        book: [{
          times: 4
        }]
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check body json match path mapping with incorrect path', function testSlash(done) {
    chai.request(app)
      .post('/app/path')
      .type('application/json')
      .send({
        total_results: 4
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
});
