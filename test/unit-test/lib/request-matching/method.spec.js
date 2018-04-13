var request = require('supertest');
describe('Test for the Method request mapping', function() {
  var server;
  before(function() {
    server = require('../../../server')({
      root_dir: "./mocksMethod"
    });
  });
  after(function() {
    server.close(function() {
      console.log("Closed out remaining connections.");
    });
  });
  it('Check the without method', function testSlash(done) {
    request(server)
      .post('/app/url/nomethod')
      .expect(200, done);
  });
  it('Check ANY method', function testSlash(done) {
    request(server)
      .get('/app/url/any')
      .expect(200, done);
  });
  it('Check ANY method lowercase', function testSlash(done) {
    request(server)
      .get('/app/url/any/lowercase')
      .expect(200, done);
  });
  it('Check GET method', function testSlash(done) {
    request(server)
      .get('/app/url')
      .expect(200, done);
  });
  it('Check GET method lowercase', function testSlash(done) {
    request(server)
      .get('/app/url/lowercase')
      .expect(200, done);
  });
  it('Check POST method', function testSlash(done) {
    request(server)
      .post('/app/url')
      .expect(200, done);
  });
  it('Check POST method lowercase', function testSlash(done) {
    request(server)
      .post('/app/url/lowercase')
      .expect(200, done);
  });
  it('Check PUT method', function testSlash(done) {
    request(server)
      .put('/app/url')
      .expect(200, done);
  });
  it('Check PUT method lowercase', function testSlash(done) {
    request(server)
      .put('/app/url/lowercase')
      .expect(200, done);
  });
  it('Check DELETE method', function testSlash(done) {
    request(server)
      .delete('/app/url')
      .expect(200, done);
  });
  it('Check DELETE method lowercase', function testSlash(done) {
    request(server)
      .delete('/app/url/lowercase')
      .expect(200, done);
  });
  it('Check OPTIONS method', function testSlash(done) {
    request(server)
      .options('/app/url')
      .expect(200, done);
  });
  it('Check OPTIONS method lowercase', function testSlash(done) {
    request(server)
      .options('/app/url/lowercase')
      .expect(200, done);
  });
});