let chai = require("chai");
var expect = chai.expect;
let chaiHttp = require("chai-http");
const sinon = require("sinon");
const {
  transports: { Console },
} = require("winston");

chai.use(chaiHttp);

describe("Test for the URL request mapping", function () {
  let app = null;

  before(function () {
    app = require("../../../server")({
      root_dir: "./mocksUrl",
    });
  });

  after(function(){
    delete app;
  });

  it('Check the "url" request mapping', function testSlash(done) {
    chai
      .request(app)
      .post("/app/url")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Check the "urlPattern" request mapping', function testSlash(done) {
    chai
      .request(app)
      .post("/app/urlPattern")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Check the "urlPath" request mapping', function testSlash(done) {
    chai
      .request(app)
      .post("/app/path")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Check the "urlPathPattern" request mapping', function testSlash(done) {
    chai
      .request(app)
      .post("/app/pathPattern")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
