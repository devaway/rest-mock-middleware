let chai = require('chai');
var expect = chai.expect;
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

let app = require('../../../server')({
  root_dir: "./mocksUrl"
});
describe('Test for the URL request mapping', function() {
  it('Check the "url" request mapping', function testSlash(done) {
    chai.request(app)
      .post('/app/url')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check the "urlPattern" request mapping', function testSlash(done) {
    chai.request(app)
      .post('/app/urlPattern')
      .end(function(err, res) {
        done();
    expect(res).to.have.status(200);
  });
  });

  it('Check the "urlPath" request mapping', function testSlash(done) {
    chai.request(app)
      .post('/app/path')
      .end(function(err, res) {
        done();
    expect(res).to.have.status(200);
  });
  });
  it('Check the "urlPathPattern" request mapping', function testSlash(done) {
    chai.request(app)
      .post('/app/pathPattern')
      .end(function(err, res) {
        done();
    expect(res).to.have.status(200);
  });
  });
});
