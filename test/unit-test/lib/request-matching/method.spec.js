let chai = require('chai');
var expect = chai.expect;
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

let app = require('../../../server')({
  root_dir: "./mocksMethod"
});
describe('Test for the Method request mapping', function() {

  it('Check the without method', function testSlash(done) {
    chai.request(app)
      .post('/app/url/nomethod')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check ANY method', function testSlash(done) {
    chai.request(app)
      .get('/app/url/any')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check ANY method lowercase', function testSlash(done) {
    chai.request(app)
      .get('/app/url/any/lowercase')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check GET method', function testSlash(done) {
    chai.request(app)
      .get('/app/url')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check GET method lowercase', function testSlash(done) {
    chai.request(app)
      .get('/app/url/lowercase')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check POST method', function testSlash(done) {
    chai.request(app)
      .post('/app/url')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check POST method lowercase', function testSlash(done) {
    chai.request(app)
      .post('/app/url/lowercase')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check PUT method', function testSlash(done) {
    chai.request(app)
      .put('/app/url')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check PUT method lowercase', function testSlash(done) {
    chai.request(app)
      .put('/app/url/lowercase')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check DELETE method', function testSlash(done) {
    chai.request(app)
      .delete('/app/url')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check DELETE method lowercase', function testSlash(done) {
    chai.request(app)
      .delete('/app/url/lowercase')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check OPTIONS method', function testSlash(done) {
    chai.request(app)
      .options('/app/url')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check OPTIONS method lowercase', function testSlash(done) {
    chai.request(app)
      .options('/app/url/lowercase')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
});
