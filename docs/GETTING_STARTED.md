# Getting started

## Install

By npm:

```console
$ npm install https://github.com/GFI-Informatique/rest-mock-middleware.git
```

By package.json:

```json
"dependencies": {
  "rest-mock-middleware": "https://github.com/GFI-Informatique/rest-mock-middleware.git"
}
```

## Usage

This middleware is made to be used with an [express server](http://expressjs.com/).

Once the server is created, we use the method [app.use](http://expressjs.com/en/4x/api.html#app.use) to configure the middleware inside the server and after we start the server.
This is a sample of it:

```javascript
const restMockMiddleware = require('rest-mock-middleware');
let app = express();
app.use(restMockMiddleware({
  root_dir: resolve(__dirname, "./mocks")
}));
app.listen(3000);
```

### Path filter

We can specify a path to filter the URLs that will be passed to the middleware.

```javascript
const restMockMiddleware = require('rest-mock-middleware');
let app = express();
app.use('/api',restMockMiddleware({
  root_dir: resolve(__dirname, "./mocks")
}));
app.listen(3000);
```

### CORS

To avoid to add the CORS configuration inside the mappings and responses the middleware can be combined with the [CORS middleware](https://github.com/expressjs/cors) to let it manage CORS.

```javascript
const restMockMiddleware = require('rest-mock-middleware');
let app = express();
app.use(
  cors(),
  restMockMiddleware({
    root_dir: resolve(__dirname, "./mocks")
  })
);
app.listen(3000);
```

### Proxy

To redirect any non mocked query to other server we can combine the middleware with the [htttp-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) to let it manage the non mocked URLs.

```javascript
const restMockMiddleware = require('rest-mock-middleware');
let app = express();
app.use(
  restMockMiddleware({
    root_dir: resolve(__dirname, "./mocks")
  }),
  proxy({
    target: 'http://www.example.org',
    changeOrigin: true,
    onProxyReq: function(proxyReq, req) {
      // Fixes issue with POST and PUT requests
      // This is because Res-mock-middleware uses body-parser and it conflicts with proxy body parser.
      // More info in github page: http-proxy-middleware/recipes/modify-post.md
      if ( ( req.method === "POST" || req.method === "PUT" ) && req.body ) {
        let bodyData = JSON.stringify(req.body);
        proxyReq.write(bodyData);
      }
    }
  })
);
app.listen(3000);
```
