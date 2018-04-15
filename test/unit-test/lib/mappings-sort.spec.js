let expect = require('chai').expect;
let mapping_sort = require('../../../lib/mappings-sort');

describe('Test for the mapping sort', function() {
  it('Sort correctly', function(done) {
    let mappings = [
      {
        "request": {
          "priority": 2,
          "method": "POST",
          "url": "/app/url"
        },
        "response": {
          "status": 200,
          "jsonBody": {
            "result": "ok"
          }
        }
      },
      {
        "request": {
          "priority": 1,
          "method": "POST",
          "url": "/app/url"
        },
        "response": {
          "status": 200,
          "jsonBody": {
            "result": "ok"
          }
        }
      }
    ];
    let mapping_result = Array.from(mapping_sort(mappings).values());
    expect(mapping_result[0].request.priority).to.equal(1);
    expect(mapping_result[1].request.priority).to.equal(2);
    done();
  });

  it('Sort correctly', function(done) {
    let mappings = [
      {
        "request": {
          "priority": 2,
          "method": "POST",
          "url": "/app/url"
        },
        "response": {
          "status": 200,
          "jsonBody": {
            "result": "ok"
          }
        }
      },
      {
        "request": {
          "method": "POST",
          "url": "/app/url"
        },
        "response": {
          "status": 200,
          "jsonBody": {
            "result": "ok"
          }
        }
      },  {
          "request": {
            "priority": 1,
            "method": "POST",
            "url": "/app/url"
          },
          "response": {
            "status": 200,
            "jsonBody": {
              "result": "ok"
            }
          }
        }
    ];
    let mapping_result = Array.from(mapping_sort(mappings).values());
    expect(mapping_result[0].request.priority).to.equal(1);
    expect(mapping_result[1].request.priority).to.equal(2);
    expect(mapping_result[2].request.priority).to.be.undefined;
    done();
  });
});
