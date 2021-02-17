import { expect } from 'chai';

export const validateStatus = (done, status) => {
  return (err, res) => {
    if (err) {
      done(err);
    }
    expect(res).to.have.status(status);
    done();
  };
};
