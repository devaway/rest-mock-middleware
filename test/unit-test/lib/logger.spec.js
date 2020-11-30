const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const {
  resolve
} = require('path');

let rest_mock_middleware = require("../../../lib/rest-mock-middleware");

const {
  transports: { Console },
} = require("winston");

describe("Test logger", function () {
  it("Check logs on starting", function testSlash(done) {
    const consoleLogger = new Console({handleExceptions: true});

    const spy = sinon.spy(consoleLogger, "log");
   
    rest_mock_middleware({
      root_dir: resolve(__dirname, "../../mocksSchema"),
      logger: {
        transports: [ consoleLogger ]
      }
    });
    
    expect(spy.calledOnce).to.be.ok;
    done();
  });
});
