import { validateReturnsKO, validateReturnsOk } from '../utils/request';
import chai from 'chai';
import chaiHttp from 'chai-http';

import createServer from '../../../createServer';

chai.use(chaiHttp);

describe('Test for the Query Parameters request mapping', () => {
  let app = null;

  before(() => {
    app = createServer({
      root_dir: './mocksQuery',
    });
  });

  it('Check the no query parametes request mapping', (done) => {
    chai.request(app).get('/app/url/one').end(validateReturnsKO(done));
  });
  it('Check the one query parametes request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/one')
      .query({
        search: 'hello',
      })
      .end(validateReturnsOk(done));
  });
  it('Check the two query parametes request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/two')
      .query({
        search: 'hello',
      })
      .query({
        name: 'Peter',
      })
      .end(validateReturnsOk(done));
  });

  it('Check the one query parameter name incorrect request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/one')
      .query({
        no: 'hello',
      })
      .end(validateReturnsKO(done));
  });
  it('Check the one query parameter value incorrect request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/one')
      .query({
        search: 'json',
      })
      .end(validateReturnsKO(done));
  });
  it('Check the two query parameter with one incorrect request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/two')
      .query({
        search: 'hello',
      })
      .query({
        dest: '/login',
      })
      .end(validateReturnsKO(done));
  });
  it('Check the two query parameter incorrect request mapping', (done) => {
    chai
      .request(app)
      .get('/app/url/two')
      .query({
        format: 'json',
      })
      .query({
        dest: '/login',
      })
      .end(validateReturnsKO(done));
  });
});
