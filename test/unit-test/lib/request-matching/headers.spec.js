let chai = require('chai');
var expect = chai.expect;
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

let app = require('../../../server')({
  root_dir: "./mocksHeaders"
});
describe('Test for the Headers request mapping', function() {
  it('Check the one header request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/one')
      .set("Content-type", "application/json")
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check the two headers request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/two')
      .set("Content-type", "application/json")
      .set("Accept-Language", "en-US")
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });

  it('Check the one header name incorrect request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/one')
      .set("no-type", "application/json")
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
  it('Check the one header value incorrect request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/one')
      .set("Content-type", "application")
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
  it('Check the two headers with one incorrect request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/two')
      .set("no-type", "application/json")
      .set("Accept-Language", "en-US")
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
  it('Check the two headers incorrect request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/two')
      .set("no-type", "application/json")
      .set("no-Language", "en-US")
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
});
