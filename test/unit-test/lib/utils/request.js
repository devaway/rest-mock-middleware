import { expect } from 'chai';

export const validateReturnsOk = (done, status = 200) => {
  return (err, res) => {
    if (err) {
      done(err);
    }
    expect(res).to.have.status(status);
    done();
  };
};

export const validateReturnsKO = (done, status = 404) => {
  return (err, res) => {
    if (err) {
      done(err);
    }
    expect(res).to.have.status(status);
    done();
  };
};
