import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import createServer from '../../../createServer';

chai.use(chaiHttp);

const validateRequest = (app, testCase) => {
  it(testCase.name, (done) => {
    chai
      .request(app)
      .post(testCase.url)
      .type('application/json')
      .send(testCase.body)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res).to.have.status(testCase.status);
        done();
      });
  });
};

describe('Test for the Body equalToJson request mapping', () => {
  const app = createServer({
    root_dir: './mocksJson',
  });

  const testCases = [
    {
      name: 'Check body json equals request mapping',
      url: '/app/login',
      body: {
        total_results: 4,
      },
      status: 200,
    },
    {
      name: 'Check body json equals arrayOrder request mapping',
      url: '/app/login',
      body: [
        {
          total_results: 4,
        },
        {
          total_results: 5,
        },
      ],
      status: 200,
    },
    {
      name: 'Check body json equals request mapping with too mach attributes',
      url: '/app/login',
      body: {
        total_results: 4,
        error: true,
      },
      status: 404,
    },
    {
      name: 'Check body json equals request mapping with incorrect attribute',
      url: '/app/login',
      body: {
        total_results_error: 4,
      },
      status: 404,
    },
  ];

  for (const testCase of testCases) {
    validateRequest(app, testCase);
  }

  it('404 everything else', (done) => {
    chai
      .request(app)
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
  let app = createServer({
    root_dir: './mocksJson',
  });

  const testCases = [
    {
      name: 'Check body json match path request mapping',
      url: '/app/path',
      body: {
        name: 4,
      },
      status: 200,
    },
    {
      name:
        'Check body json match path request mapping with select a condition to array',
      url: '/app/path',
      body: [
        {
          times: 4,
        },
      ],
      status: 200,
    },
    {
      name:
        'Check body json match path request mapping with select a condition to nested array',
      url: '/app/path',
      body: {
        book: [
          {
            times: 4,
          },
        ],
      },
      status: 200,
    },
    {
      name: 'Check body json match path mapping with incorrect path',
      url: '/app/path',
      body: {
        total_results: 4,
      },
      status: 404,
    },
  ];

  for (const testCase of testCases) {
    validateRequest(app, testCase);
  }
});
