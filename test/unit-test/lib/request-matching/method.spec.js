import chai from 'chai';
import chaiHttp from 'chai-http';
import createServer from '../../../createServer';
import { validateStatus } from '../../utils/validators';

chai.use(chaiHttp);

describe('Test for the Method request mapping', () => {
  let app = null;

  before(() => {
    app = createServer({
      root_dir: './mocksMethod',
    });
  });

  it('Check the without method', (done) => {
    chai.request(app).post('/app/url/nomethod').end(validateStatus(done, 200));
  });
  it('Check ANY method', (done) => {
    chai.request(app).get('/app/url/any').end(validateStatus(done, 200));
  });
  it('Check ANY method lowercase', (done) => {
    chai
      .request(app)
      .get('/app/url/any/lowercase')
      .end(validateStatus(done, 200));
  });
  it('Check GET method', (done) => {
    chai.request(app).get('/app/url').end(validateStatus(done, 200));
  });
  it('Check GET method lowercase', (done) => {
    chai.request(app).get('/app/url/lowercase').end(validateStatus(done, 200));
  });
  it('Check POST method', (done) => {
    chai.request(app).post('/app/url').end(validateStatus(done, 200));
  });
  it('Check POST method lowercase', (done) => {
    chai.request(app).post('/app/url/lowercase').end(validateStatus(done, 200));
  });
  it('Check PUT method', (done) => {
    chai.request(app).put('/app/url').end(validateStatus(done, 200));
  });
  it('Check PUT method lowercase', (done) => {
    chai.request(app).put('/app/url/lowercase').end(validateStatus(done, 200));
  });
  it('Check DELETE method', (done) => {
    chai.request(app).delete('/app/url').end(validateStatus(done, 200));
  });
  it('Check DELETE method lowercase', (done) => {
    chai
      .request(app)
      .delete('/app/url/lowercase')
      .end(validateStatus(done, 200));
  });
  it('Check OPTIONS method', (done) => {
    chai.request(app).options('/app/url').end(validateStatus(done, 200));
  });
  it('Check OPTIONS method lowercase', (done) => {
    chai
      .request(app)
      .options('/app/url/lowercase')
      .end(validateStatus(done, 200));
  });
});
