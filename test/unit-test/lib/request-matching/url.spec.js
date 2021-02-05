import chai from 'chai';
import chaiHttp from 'chai-http';

import createServer from '../../../createServer';
import { validateReturnsOk } from '../utils/request';

chai.use(chaiHttp);

describe('Test for the URL request mapping', () => {
  let app = null;

  before(() => {
    app = createServer({
      root_dir: './mocksUrl',
    });
  });

  it('Check the "url" request mapping', (done) => {
    chai.request(app).post('/app/url').end(validateReturnsOk(done));
  });
  it('Check the "urlPattern" request mapping', (done) => {
    chai.request(app).post('/app/urlPattern').end(validateReturnsOk(done));
  });

  it('Check the "urlPath" request mapping', (done) => {
    chai.request(app).post('/app/path').end(validateReturnsOk(done));
  });
  it('Check the "urlPathPattern" request mapping', (done) => {
    chai.request(app).post('/app/pathPattern').end(validateReturnsOk(done));
  });
});
