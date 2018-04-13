var request = require('supertest');
describe('Test for the Body equalToJson request mapping', function() {
  var server;
  before(function() {
    server = require('../../../server')({
      root_dir: "./mocksJson"
    });
  });
  after(function() {
    server.close(function() {
      console.log("Closed out remaining connections.");
    });
  });
  it('Check body json equals request mapping', function testSlash(done) {
    request(server)
      .post('/app/login')
      .type('application/json')
      .send({
        total_results: 4
      })
      .expect(200, done);
  });
  it('Check body json equals request mapping with too mach attributes', function testSlash(done) {
    request(server)
      .post('/app/login').type('application/json')
      .send({
        total_results: 4,
        error: true
      })
      .expect(404, done);
  });
  it('Check body json equals request mapping with incorrect attribute', function testSlash(done) {
    request(server)
      .post('/app/login')
      .type('application/json')
      .send({
        total_results_error: 4
      })
      .expect(404, done);
  });
  it('404 everything else', function testPath(done) {
    console.log('test 404')
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

describe('Test for the Body matchesJsonPath request mapping', function() {
  var server;
  before(function() {
    server = require('../../../server')({
      root_dir: "./mocksJson"
    });
  });
  after(function() {
    server.close(function() {
      console.log("Closed out remaining connections.");
    });
  });
  it('Check body json match path request mapping', function testSlash(done) {
    request(server)
      .post('/app/path')
      .type('application/json')
      .send({
        name: 4
      })
      .expect(200, done);
  });
  it('Check body json match path request mapping with select a condition to array', function testSlash(done) {
    request(server)
      .post('/app/path')
      .type('application/json')
      .send([{
        times: 4
      }])
      .expect(200, done);
  });
  it('Check body json match path request mapping with select a condition to nested array', function testSlash(done) {
    request(server)
      .post('/app/path')
      .type('application/json')
      .send({
        book: [{
          times: 4
        }]
      })
      .expect(200, done);
  });
  it('Check body json match path mapping with incorrect path', function testSlash(done) {
    request(server)
      .post('/app/path')
      .type('application/json')
      .send({
        total_results: 4
      })
      .expect(404, done);
  });
});