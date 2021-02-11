# rest-mock-middleware

Node.js mock middleware for REST services. Configure REST mocks ease for [express](http://expressjs.com/).

## TL;DR

Captures `/api` requests and when `/api/users/me` is called with right authorization it returns a mock user.

#### **`server.js`**
```javascript
const express = require("express");
const { resolve } = require("path")
const restMockMiddleware = require('@devaway/rest-mock-middleware');

let app = express();

app.use('/api', restMockMiddleware({
  root_dir: resolve(__dirname, "./mocks")
}));

app.listen(3000);
```
#### **`mocks/mappings/GET-user.json`**
```json
{
  "request": {
    "url": "/api/users/me",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBvbCBKYWNrc29uIiwiaWF0IjoxNTE2MjM5MDIyfQ.EIkH2om-Yqw2pfQVofP-N9xfP0aAQNCS-vnS3dwLBdM"
    }
  },
  "response": {
    "status": 200,
    "bodyFileName": "GET-user.json"
  },
  "delay" : 2000
}
```

#### **`mocks/responses/GET-user.json`**
```json
{
    "firstName": "Pol",
    "lastName": "Jackson",
    "age": 24,
    "address": {
        "streetAddress": "126",
        "city": "San Jone",
        "state": "LA",
        "postalCode": "90009"
    },
    "phoneNumbers": [
        { "type": "home", "number": "7463694628" }
    ]
}
```

```bash
curl --location --request GET 'http://localhost:3000/api/users/me' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBvbCBKYWNrc29uIiwiaWF0IjoxNTE2MjM5MDIyfQ.EIkH2om-Yqw2pfQVofP-N9xfP0aAQNCS-vnS3dwLBdM'
```

## Install

```console
$ npm install --save-dev @devaway/rest-mock-middleware
```

## Documentation

* [Getting started](./docs/GETTING_STARTED.md)
* [Configuration](./docs/CONFIGURATION.md)
* [Use with cors](./docs/GETTING_STARTED.md#cors)
* [Use with proxy](./docs/GETTING_STARTED.md#proxy)
* [Request matching](./docs/REQUEST_MATCHING.md)
* [Stubbing](./docs/STUBBING.md)
* [Response time management](./docs/RESPONSE_TIME.md)


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

## Changelog

- [View changelog](https://github.com/devaway/rest-mock-middleware/blob/master/CHANGELOG.md)

## License

The MIT License (MIT)

Copyright (c) 2020-2021 Devaway
