const path = require("path");
let expect = require('chai').expect;
let walk_sync = require('../../../lib/walk-sync-json');

describe('Test for the walk sync json sort', function() {
  it('Read json file,, read old file, and read directory', function(done) {

    let directories = walk_sync('test/mocksWalkSync/');
	let expectedResult = [
		`test${path.sep}mocksWalkSync${path.sep}folder${path.sep}jsonResponse.json`,
		`test${path.sep}mocksWalkSync${path.sep}jsonResponse.json`];
	expect(directories[0]).to.equal(expectedResult[0]);
	expect(directories[1]).to.equal(expectedResult[1]);
    done();
  });
});
