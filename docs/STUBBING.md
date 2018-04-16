
# Stubbing
The current mock middleware supports returning HTTP responses for request matching criteria. The current response attributes supported are:

* Status
* Headers
* Body

## Response status
It is possible to return a status code.
```json
{
  "request": {
    "..."
  },
  "response": {
    "status": 200,
    "..."
  }
}
```
## Headers
It is possible to return a custom headers.
```json
{
  "request": {
    "..."
  },
  "response": {
    "headers":  {
            "Content-Type": "application/json"
        },
    "..."
  }
}
```
## Body
It is possible to return a body.
```json
{
  "request": {
    "..."
  },
  "response": {
    "jsonBody": {
      "result": "ok"
    },
    "..."
  }
}
```
Or it is possible to return a json file path. This path should be relative to `root_dir`.
```json
{
  "request": {
    "..."
  },
  "response": {
    "bodyFileName": "user.json"
    "..."
  }
}
```
