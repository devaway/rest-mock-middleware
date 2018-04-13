var request = require('supertest');
describe('Test for the Headers request mapping', function() {
  var server;
  before(function() {
    server = require('../../../server')({
      root_dir: "./mocksHeaders"
    });
  });
  after(function() {
    server.close(function() {
      console.log("Closed out remaining connections.");
    });
  });
  it('Check the one header request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/one')
      .set("Content-type", "application/json")
      .expect(200, done);
  });
  it('Check the two headers request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/two')
      .set("Content-type", "application/json")
      .set("Accept-Language", "en-US")
      .expect(200, done);
  });

  it('Check the one header name incorrect request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/one')
      .set("no-type", "application/json")
      .expect(404, done);
  });
  it('Check the one header value incorrect request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/one')
      .set("Content-type", "application")
      .expect(404, done);
  });
  it('Check the two headers with one incorrect request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/two')
      .set("no-type", "application/json")
      .set("Accept-Language", "en-US")
      .expect(404, done);
  });
  it('Check the two headers incorrect request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/two')
      .set("no-type", "application/json")
      .set("no-Language", "en-US")
      .expect(404, done);
  });
});