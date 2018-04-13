var request = require('supertest');
describe('Test for the Query Parameters request mapping', function() {
  var server;
  before(function() {
    server = require('../../../server')({
      root_dir: "./mocksQuery"
    });
  });
  after(function() {
    server.close(function() {
      console.log("Closed out remaining connections.");
    });
  });
  it('Check the no query parametes request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/one')
      .expect(404, done);
  });
  it('Check the one query parametes request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/one')
      .query({
        search: 'hello'
      })
      .expect(200, done);
  });
  it('Check the two query parametes request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/two')
      .query({
        search: 'hello'
      })
      .query({
        name: 'Peter'
      })
      .expect(200, done);
  });

  it('Check the one query parameter name incorrect request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/one')
      .query({
        no: 'hello'
      })
      .expect(404, done);
  });
  it('Check the one query parameter value incorrect request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/one')
      .query({
        search: 'json'
      })
      .expect(404, done);
  });
  it('Check the two query parameter with one incorrect request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/two')
      .query({
        search: 'hello'
      })
      .query({
        dest: '/login'
      })
      .expect(404, done);
  });
  it('Check the two query parameter incorrect request mapping', function testSlash(done) {
    request(server)
      .get('/app/url/two')
      .query({
        format: 'json'
      })
      .query({
        dest: '/login'
      })
      .expect(404, done);
  });
});