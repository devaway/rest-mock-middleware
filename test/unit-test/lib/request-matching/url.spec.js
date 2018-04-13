var request = require('supertest');
describe('Test for the URL request mapping', function() {
  var server;
  before(function() {
    server = require('../../../server')({
      root_dir: "./mocksUrl"
    });
  });
  after(function() {
    server.close(function() {
      console.log("Closed out remaining connections.");
    });
  });
  it('Check the "url" request mapping', function testSlash(done) {
    request(server)
      .post('/app/url')
      .expect(200, done);
  });
  it('Check the "urlPattern" request mapping', function testSlash(done) {
    request(server)
      .post('/app/urlPattern')
      .expect(200, done);
  });

  it('Check the "urlPath" request mapping', function testSlash(done) {
    request(server)
      .post('/app/path')
      .expect(200, done);
  });
  it('Check the "urlPathPattern" request mapping', function testSlash(done) {
    request(server)
      .post('/app/pathPattern')
      .expect(200, done);
  });
});