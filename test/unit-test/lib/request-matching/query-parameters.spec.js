let chai = require('chai');
var expect = chai.expect;
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

let app = require('../../../server')({
  root_dir: "./mocksQuery"
});
describe('Test for the Query Parameters request mapping', function() {
  it('Check the no query parametes request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/one')
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
  it('Check the one query parametes request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/one')
      .query({
        search: 'hello'
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it('Check the two query parametes request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/two')
      .query({
        search: 'hello'
      })
      .query({
        name: 'Peter'
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });

  it('Check the one query parameter name incorrect request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/one')
      .query({
        no: 'hello'
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
  it('Check the one query parameter value incorrect request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/one')
      .query({
        search: 'json'
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
  it('Check the two query parameter with one incorrect request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/two')
      .query({
        search: 'hello'
      })
      .query({
        dest: '/login'
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
  it('Check the two query parameter incorrect request mapping', function testSlash(done) {
    chai.request(app)
      .get('/app/url/two')
      .query({
        format: 'json'
      })
      .query({
        dest: '/login'
      })
      .end(function(err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
});
