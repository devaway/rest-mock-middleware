import { expect } from 'chai';

import mapping_sort from '../../../lib/mappings-sort';

describe('Test for the mapping sort', () => {
    it('Sort correctly', (done) => {
        let mappings = [
            {
                request: {
                    priority: 2,
                    method: 'POST',
                    url: '/app/url',
                },
                response: {
                    status: 200,
                    jsonBody: {
                        result: 'ok',
                    },
                },
            },
            {
                request: {
                    priority: 1,
                    method: 'POST',
                    url: '/app/url',
                },
                response: {
                    status: 200,
                    jsonBody: {
                        result: 'ok',
                    },
                },
            },
        ];
        let mapping_result = Array.from(mapping_sort(mappings).values());
        expect(mapping_result[0].request.priority).to.equal(1);
        expect(mapping_result[1].request.priority).to.equal(2);
        done();
    });

    it('Sort correctly', (done) => {
        let mappings = [
            {
                request: {
                    priority: 2,
                    method: 'POST',
                    url: '/app/url',
                },
                response: {
                    status: 200,
                    jsonBody: {
                        result: 'ok',
                    },
                },
            },
            {
                request: {
                    method: 'POST',
                    url: '/app/url',
                },
                response: {
                    status: 200,
                    jsonBody: {
                        result: 'ok',
                    },
                },
            },
            {
                request: {
                    priority: 1,
                    method: 'POST',
                    url: '/app/url',
                },
                response: {
                    status: 200,
                    jsonBody: {
                        result: 'ok',
                    },
                },
            },
        ];
        let mapping_result = Array.from(mapping_sort(mappings).values());
        expect(mapping_result[0].request.priority).to.equal(1);
        expect(mapping_result[1].request.priority).to.equal(2);
        expect(mapping_result[2].request.priority).to.be.undefined; // eslint-disable-line no-unused-expressions
        done();
    });
});
