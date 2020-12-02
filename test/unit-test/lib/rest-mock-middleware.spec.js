import { expect } from 'chai';
import restMockMiddleware from '../../../lib/rest-mock-middleware';
import sinon from 'sinon';

describe('Test for the rest-mock-middleware sort', () => {
  it('No config', (done) => {
    let directories = restMockMiddleware();
    var next = sinon.stub();
    directories(null, null, next);
    expect(next.calledOnce).to.be.ok; // eslint-disable-line no-unused-expressions
    done();
  });
  it('Disabled', (done) => {
    let directories = restMockMiddleware({ disabled: true });
    var next = sinon.stub();
    directories(null, null, next);
    expect(next.calledOnce).to.be.ok; // eslint-disable-line no-unused-expressions
    done();
  });
  it('wrong configuration', (done) => {
    expect(restMockMiddleware.bind({}, { disabled: false })).to.throw(
      '[Mock] Mock middleware directory is not configured.',
    );
    done();
  });
});
