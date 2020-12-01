import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import createServer from '../../../server';

chai.use(chaiHttp);

describe('Test for the Query Parameters request mapping', () => {
    let app = null;

    before(() => {
        app = createServer({
            root_dir: './mocksQuery',
        });
    });

    it('Check the no query parametes request mapping', (done) => {
        chai.request(app)
            .get('/app/url/one')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(404);
                done();
            });
    });
    it('Check the one query parametes request mapping', (done) => {
        chai.request(app)
            .get('/app/url/one')
            .query({
                search: 'hello',
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Check the two query parametes request mapping', (done) => {
        chai.request(app)
            .get('/app/url/two')
            .query({
                search: 'hello',
            })
            .query({
                name: 'Peter',
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Check the one query parameter name incorrect request mapping', (done) => {
        chai.request(app)
            .get('/app/url/one')
            .query({
                no: 'hello',
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(404);
                done();
            });
    });
    it('Check the one query parameter value incorrect request mapping', (done) => {
        chai.request(app)
            .get('/app/url/one')
            .query({
                search: 'json',
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(404);
                done();
            });
    });
    it('Check the two query parameter with one incorrect request mapping', (done) => {
        chai.request(app)
            .get('/app/url/two')
            .query({
                search: 'hello',
            })
            .query({
                dest: '/login',
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(404);
                done();
            });
    });
    it('Check the two query parameter incorrect request mapping', (done) => {
        chai.request(app)
            .get('/app/url/two')
            .query({
                format: 'json',
            })
            .query({
                dest: '/login',
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
