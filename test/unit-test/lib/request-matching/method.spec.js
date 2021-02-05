import chai from 'chai';
import chaiHttp from 'chai-http';

import createServer from '../../../createServer';
import { validateReturnsOk } from '../utils/request';

chai.use(chaiHttp);

describe('Test for the Method request mapping', () => {
  let app = null;

  before(() => {
    app = createServer({
      root_dir: './mocksMethod',
    });
  });

  it('Check the without method', (done) => {
    chai.request(app).post('/app/url/nomethod').end(validateReturnsOk(done));
  });
  it('Check ANY method', (done) => {
    chai.request(app).get('/app/url/any').end(validateReturnsOk(done));
  });
  it('Check ANY method lowercase', (done) => {
    chai
      .request(app)
      .get('/app/url/any/lowercase')
      .end(validateReturnsOk(done));
  });
  it('Check GET method', (done) => {
    chai.request(app).get('/app/url').end(validateReturnsOk(done));
  });
  it('Check GET method lowercase', (done) => {
    chai.request(app).get('/app/url/lowercase').end(validateReturnsOk(done));
  });
  it('Check POST method', (done) => {
    chai.request(app).post('/app/url').end(validateReturnsOk(done));
  });
  it('Check POST method lowercase', (done) => {
    chai.request(app).post('/app/url/lowercase').end(validateReturnsOk(done));
  });
  it('Check PUT method', (done) => {
    chai.request(app).put('/app/url').end(validateReturnsOk(done));
  });
  it('Check PUT method lowercase', (done) => {
    chai.request(app).put('/app/url/lowercase').end(validateReturnsOk(done));
  });
  it('Check DELETE method', (done) => {
    chai.request(app).delete('/app/url').end(validateReturnsOk(done));
  });
  it('Check DELETE method lowercase', (done) => {
    chai.request(app).delete('/app/url/lowercase').end(validateReturnsOk(done));
  });
  it('Check OPTIONS method', (done) => {
    chai.request(app).options('/app/url').end(validateReturnsOk(done));
  });
  it('Check OPTIONS method lowercase', (done) => {
    chai
      .request(app)
      .options('/app/url/lowercase')
      .end(validateReturnsOk(done));
  });
});
