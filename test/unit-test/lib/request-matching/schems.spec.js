import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import createServer from '../../../createServer';

chai.use(chaiHttp);

describe('Test for the Schema matching request mapping', () => {
  let app = null;

  before(() => {
    app = createServer({
      root_dir: './mocksSchema',
    });
  });

  it('Check body json match request schema', (done) => {
    chai
      .request(app)
      .post('/app/results')
      .type('application/json')
      .send({
        total_results: 4,
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Check body json not match request schema because too mach attributes', (done) => {
    chai
      .request(app)
      .post('/app/results')
      .type('application/json')
      .send({
        total_results: 4,
        error: true,
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(404);
        done();
      });
  });
  it('Check body json match request schema file', (done) => {
    chai
      .request(app)
      .post('/app/login')
      .type('application/json')
      .send({
        user: {
          first_name: 'Peter',
          last_name: 'Smith',
          password: '12345',
          email: 'peter.smith@ps.com',
          address: {
            street: 'Morningside Road',
            number: 24,
          },
        },
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Check body json not match request schema file because too mach attributes', (done) => {
    chai
      .request(app)
      .post('/app/login')
      .type('application/json')
      .send({
        user: {
          first_name: 'Peter',
          last_name: 'Smith',
          password: '12345',
          email: 'peter.smith@ps.com',
          address: {
            street: 'Morningside Road',
            number: 24,
          },
        },
        error: true,
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(404);
        done();
      });
  });
  it('Check body json match request schema that refs a file', (done) => {
    chai
      .request(app)
      .post('/app/user-results')
      .type('application/json')
      .send({
        user: {
          first_name: 'Peter',
          last_name: 'Smith',
          password: '12345',
          email: 'peter.smith@ps.com',
          address: {
            street: 'Morningside Road',
            number: 24,
          },
        },
        total_results: 4,
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Check body json equals request schema with too mach attributes', (done) => {
    chai
      .request(app)
      .post('/app/user-results')
      .type('application/json')
      .send({
        user: {
          first_name: 'Peter',
          last_name: 'Smith',
          password: '12345',
          email: 'peter.smith@ps.com',
          address: {
            street: 'Morningside Road',
            number: 24,
          },
        },
        error: true,
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(404);
        done();
      });
  });
});
