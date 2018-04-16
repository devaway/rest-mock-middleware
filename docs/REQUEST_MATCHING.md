# Request matching
The current mock middleware supports matching of request to stubs using the following attributes:

* URL
* HTTP Method
* Query parameters
* Headers
* Request body
* Adding delay

The following sections describes each type of matching strategy in detail.

## URL matching

URLs can be matched either by equality or by regular expression. You also have a choice of whether to match just the path part of the URL or the path and query together.

### Equality matching on path and query
```json
{
  "request": {
     "url": "/your/url?and=query"
    "..."
  },
  "..."
}
```
### Regex matching on path and query
```json
{
  "request": {
     "urlPattern": "/your/url/(.)*\\?and=quer(.)*"
    "..."
  },
  "..."
}
```

### Equality matching on path only
```json
{
  "request": {
     "urlPath": "/your/url"
    "..."
  },
  "..."
}
```

### Regex matching on path only
```json
{
  "request": {
     "urlPathPattern": "/your/url/(.)*"
    "..."
  },
  "..."
}
```

## HTTP Method matching

Method can be matched by equality (GET,POST,PUT, DELETE, OPTIONS).

### HTTP Method matching
```json
{
  "request": {
     "method": "GET"
    "..."
  },
  "..."
}
```

### Match with all HTTP Methods
There are two ways to match with any HTTP method, by not adding the method attribute or by adding the attribute with the value "ANY".
```json
{
  "request": {
	"urlPathPattern": "/your/url/(.)*"
    "..."
  },
  "..."
}
```

```json
{
  "request": {
     "method": "ANY"
    "..."
  },
  "..."
}
```
## Headers matching
Headers can be matched by equality.
```json
{
  "request": {
    "..."
    "headers": {
      "Content-Type": "application/json"
      }
    "..."
  },
  "..."
}
```
## Query parameters matching
Query parameters can be matched by equality.
```json
{
  "request": {
    "..."
    "queryParameters": {
      "search_term": "abs"
      }
    "..."
  },
  "..."
}
```
## Request body
### Body equals to
Request body can be matched by equality.
```json
{
  "request": {
    "..."
    "bodyPatterns": {
      "equalToJson": {
        "total_results": 4
      }
    }
    "..."
  }
}
```
Request body equality can ignore order in arrays.
```json
{
  "request": {
    "..."
    "bodyPatterns": {
      "equalToJson": [
        {"total_results": 4},
        {"total_results": 2}
      ],
      "ignoreArrayOrder": true
    }
    "..."
  }
}
```
### Body match json path.
Request body can be matched by [JSONPath expresion](https://github.com/dchester/jsonpath).
```json
{
  "request": {
    "..."
    "bodyPatterns": {
      "matchesJsonPath": "$.name"
    }
    "..."
  },
  "..."
}
```

## Adding delay

All responses can be delayed aggregating *delay* attribute into json request match. Value must be in milliseconds and greater than 0.

Request that respond in 1500 milliseconds or 1,5 seconds.
```json
{
  "request": {
     "..."
  },
  "delay" : 1500
}
```