import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import createServer from '../../../createServer';

chai.use(chaiHttp);

describe('Test for the URL request mapping', () => {
  let app = null;

  before(() => {
    app = createServer({
      root_dir: './mocksUrl',
    });
  });

  it('Check the "url" request mapping', (done) => {
    chai
      .request(app)
      .post('/app/url')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Check the "urlPattern" request mapping', (done) => {
    chai
      .request(app)
      .post('/app/urlPattern')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Check the "urlPath" request mapping', (done) => {
    chai
      .request(app)
      .post('/app/path')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Check the "urlPathPattern" request mapping', (done) => {
    chai
      .request(app)
      .post('/app/pathPattern')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        done();
      });
  });
});
