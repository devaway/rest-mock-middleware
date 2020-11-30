let chai = require("chai");
var expect = chai.expect;
let chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Test for the Schema matching request mapping", function () {
  let app = null;

  before(function(){
    app = require('../../../server')({
      root_dir: "./mocksSchema"
    });
  });

  it("Check body json match request schema", function testSlash(done) {
    chai
      .request(app)
      .post("/app/results")
      .type("application/json")
      .send({
        total_results: 4,
      })
      .end(function (err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it("Check body json not match request schema because too mach attributes", function testSlash(done) {
    chai
      .request(app)
      .post("/app/results")
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
  it("Check body json match request schema file", function testSlash(done) {
    chai
      .request(app)
      .post("/app/login")
      .type("application/json")
      .send({
        user: {
          first_name: "Peter",
          last_name: "Smith",
          password: "12345",
          email: "peter.smith@ps.com",
          address: {
            street: "Morningside Road",
            number: 24
          }
        },
      })
      .end(function (err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it("Check body json not match request schema file because too mach attributes", function testSlash(done) {
    chai
      .request(app)
      .post("/app/login")
      .type("application/json")
      .send({
        user: {
          first_name: "Peter",
          last_name: "Smith",
          password: "12345",
          email: "peter.smith@ps.com",
          address: {
            street: "Morningside Road",
            number: 24
          }
        },
        error: true,
      })
      .end(function (err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
  it("Check body json match request schema that refs a file", function testSlash(done) {
    chai
      .request(app)
      .post("/app/user-results")
      .type("application/json")
      .send({
        user: {
          first_name: "Peter",
          last_name: "Smith",
          password: "12345",
          email: "peter.smith@ps.com",
          address: {
            street: "Morningside Road",
            number: 24
          }
        },
        total_results: 4,
      })
      .end(function (err, res) {
        done();
        expect(res).to.have.status(200);
      });
  });
  it("Check body json equals request schema with too mach attributes", function testSlash(done) {
    chai
      .request(app)
      .post("/app/user-results")
      .type("application/json")
      .send({
        user: {
          first_name: "Peter",
          second_name: "Smith",
          password: "12345",
          email: "peter.smith@ps.com",
          address: {
            street: "Morningside Road",
            number: 24
          }
        },
        error: true,
      })
      .end(function (err, res) {
        done();
        expect(res).to.have.status(404);
      });
  });
});
