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
### Body match schema.
Request body can be matched by a schema [JSON Schema](https://json-schema.org/)

Inline schema can also reference schemas stored in `schemas` folder. The reference should be done by using the `schema.id` property.

```json
{
  "request": {
    "..."
    "bodyPatterns": {
      "matchesSchema": {
        "type": "object",
        "properties": {
          "street": { "$ref": "/schemas/street-schema.json" },
          "number": { "type": "number" }
        },
        "required": ["street", "number"],
        "additionalProperties": false
      }
    }
    "..."
  },
  "..."
}
```

### Body match scheme file
All the schemas should be stored in the `schemas` folder. They can be organized in folders.
Schemas can be referenced internally using `$ref` property.
```json
{
  "request": {
    "..."
    "bodyPatterns": {
      "matchesSchema": {
        "schemaFile": "user-schema.json"
      }
    }
    "..."
  },
  "..."
}
```

**user-schema.json**
```json
{
  "id": "/schemas/user-schema.json",
  "type": "object",
  "properties": {
    "first_name": { "type": "string" },
    "last_name": { "type": "string" },
    "password": { "type": "string" },
    "email": { "$ref": "/schemas/email-schema.json" }
  },
  "required": ["first_name"],
  "additionalProperties": false
}
```

**email-schema.json**
```json
{
  "id": "/schemas/email-schema.json",
  "type": "string",
  "pattern": "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
}
```