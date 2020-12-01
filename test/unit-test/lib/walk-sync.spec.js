import { expect } from 'chai';
import path from 'path';

import walk_sync from '../../../lib/walk-sync-json';

describe('Test for the walk sync json sort', () => {
    it('Read json file,, read old file, and read directory', (done) => {
        let directories = walk_sync('test/mocksWalkSync/');
        let expectedResult = [
            `test${path.sep}mocksWalkSync${path.sep}folder${path.sep}jsonResponse.json`,
            `test${path.sep}mocksWalkSync${path.sep}jsonResponse.json`,
        ];
        expect(directories[0]).to.equal(expectedResult[0]);
        expect(directories[1]).to.equal(expectedResult[1]);
        done();
    });
});
