import { expect } from 'chai';
import { resolve } from 'path';
import restMockMiddleware from '../../../lib/rest-mock-middleware';
import sinon from 'sinon';
import { transports } from 'winston';

const { Console } = transports;

describe('Test logger', () => {
    it('Check logs on starting', (done) => {
        const consoleLogger = new Console({ handleExceptions: true });

        const spy = sinon.spy(consoleLogger, 'log');

        restMockMiddleware({
            root_dir: resolve(__dirname, '../../mocksSchema'),
            logger: {
                transports: [consoleLogger],
            },
        });

        expect(spy.calledOnce).to.be.ok; // eslint-disable-line no-unused-expressions
        done();
    });
});
