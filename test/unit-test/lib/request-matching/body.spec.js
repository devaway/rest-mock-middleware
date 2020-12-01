import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import createServer from '../../../server';

chai.use(chaiHttp);

describe('Test for the Body equalToJson request mapping', () => {
    let app = null;

    before(function () {
        app = createServer({
            root_dir: './mocksJson',
        });
    });

    it('Check body json equals request mapping', (done) => {
        chai.request(app)
            .post('/app/login')
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
    it('Check body json equals arrayOrder request mapping', (done) => {
        chai.request(app)
            .post('/app/login')
            .type('application/json')
            .send([
                {
                    total_results: 4,
                },
                {
                    total_results: 5,
                },
            ])
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Check body json equals request mapping with too mach attributes', (done) => {
        chai.request(app)
            .post('/app/login')
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
    it('Check body json equals request mapping with incorrect attribute', (done) => {
        chai.request(app)
            .post('/app/login')
            .type('application/json')
            .send({
                total_results_error: 4,
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(404);
                done();
            });
    });
    it('404 everything else', (done) => {
        chai.request(app)
            .get('/foo/bar')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(404);
                done();
            });
    });
});

describe('Test for the Body matchesJsonPath request mapping', () => {
    let app = null;

    before(function () {
        app = createServer({
            root_dir: './mocksJson',
        });
    });

    it('Check body json match path request mapping', (done) => {
        chai.request(app)
            .post('/app/path')
            .type('application/json')
            .send({
                name: 4,
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Check body json match path request mapping with select a condition to array', (done) => {
        chai.request(app)
            .post('/app/path')
            .type('application/json')
            .send([
                {
                    times: 4,
                },
            ])
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Check body json match path request mapping with select a condition to nested array', (done) => {
        chai.request(app)
            .post('/app/path')
            .type('application/json')
            .send({
                book: [
                    {
                        times: 4,
                    },
                ],
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Check body json match path mapping with incorrect path', (done) => {
        chai.request(app)
            .post('/app/path')
            .type('application/json')
            .send({
                total_results: 4,
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
