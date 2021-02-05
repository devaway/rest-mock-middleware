import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import createServer from '../../../createServer';

chai.use(chaiHttp);

describe('Test for the Headers request mapping', () => {
  let app = null;

  before(() => {
    app = createServer({
      root_dir: './mocksHeaders',
    });
  });

  it('Check the one header request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/one')
      .set('Content-type', 'application/json')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Check the two headers request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/two')
      .set('Content-type', 'application/json')
      .set('Accept-Language', 'en-US')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Check the one header name incorrect request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/one')
      .set('no-type', 'application/json')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(404);
        done();
      });
  });
  it('Check the one header value incorrect request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/one')
      .set('Content-type', 'application')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(404);
        done();
      });
  });
  it('Check the two headers with one incorrect request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/two')
      .set('no-type', 'application/json')
      .set('Accept-Language', 'en-US')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(404);
        done();
      });
  });
  it('Check the two headers incorrect request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/two')
      .set('no-type', 'application/json')
      .set('no-Language', 'en-US')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(404);
        done();
      });
  });
});
