let chai = require("chai");
var expect = chai.expect;
let chaiHttp = require("chai-http");

chai.use(chaiHttp);

let app = require("../../../server")({
  root_dir: "./mocksSchema",
});

describe("Test for the Schema matching request mapping", function () {
  it("Check body json equals request schema", function testSlash(done) {
    chai
      .request(app)
      .post("/app/login")
      .type("application/json")
      .send({
        total_results: 4,
      })
      .end(function (err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it("Check body json equals request mapping with too mach attributes", function testSlash(done) {
    chai
      .request(app)
      .post("/app/login")
      .type("application/json")
      .send({
        total_results: 4,
        error: true,
      })
      .end(function (err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
  it("Check body json equals request schema file", function testSlash(done) {
    chai
      .request(app)
      .post("/app/login")
      .type("application/json")
      .send({
        user_name: "peter",
        total_results: 4,
      })
      .end(function (err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it("Check body json equals request mapping with too mach attributes", function testSlash(done) {
    chai
      .request(app)
      .post("/app/login")
      .type("application/json")
      .send({
        total_results: 4,
        error: true,
      })
      .end(function (err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
});
