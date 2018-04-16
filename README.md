# rest-mock-middleware

Node.js mock middleware for REST services. Configure REST mocks ease for [express](http://expressjs.com/).
## Table of Contets

* [Getting started](./docs/GETTING_STARTED.md)
* [Configuration](./docs/CONFIGURATION.md)
* [Use with cors](./docs/GETTING_STARTED.md#cors)
* [Use with proxy](./docs/GETTING_STARTED.md#proxy)
* [Request matching](./docs/REQUEST_MATCHING.md)
* [Stubbing](./docs/STUBBING.md)

## Sample

Basic configuration for a mock server using "./mock" directory.

```javascript
const restMockMiddleware = require('rest-mock-middleware');
let app = express();
app.use(restMockMiddleware({
  root_dir: resolve(__dirname, "./mocks")
}));
app.listen(3000);
```

## Test

Run the test suite:

```console
# install dependencies
$ npm install

# unit tests
$ npm test

# code coverage
$ npm run cover
```
