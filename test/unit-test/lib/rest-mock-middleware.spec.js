let expect = require('chai').expect;
let sinon = require('sinon');
let rest_mock_middleware = require('../../../lib/rest-mock-middleware');

describe('Test for the rest-mock-middleware sort', function() {
  it('No config', function(done) {

    let directories = rest_mock_middleware();
	var next = sinon.stub();
    directories(null,null,next);
	expect(next.calledOnce).to.be.ok;
    done();
  });
  it('Disabled', function(done) {

    let directories = rest_mock_middleware({disabled:true});
	var next = sinon.stub();
    directories(null,null,next);
	expect(next.calledOnce).to.be.ok;
    done();
  });
  it('wrong configuration', function(done) {

	expect(rest_mock_middleware.bind({},{disabled:false})).to.throw("[Mock] Mock middleware directory is not configured.")
    done();
  });  
  
});
