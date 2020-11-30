# Configuration

The middleware have to be configured for a correct usage.

## Options

* `disabled`: Allow disable the server. If configured it makes a pass through to the next middleware. Default value `false`;
* `root_dir`: Directory where the mapping and response files are. It should be absolute.
* `logger`: Winston createLogger configuration to override default configuration. More information [here](https://github.com/winstonjs/winston#creating-your-own-logger).
* `loggerDebugFilters`: When `level: "debug"` is active, the debug messages can be filterted to focus debug messages in a specific type. This option should contain an array with strings containing the types of messages that will appear in debug messages. If the option is empty all debug messages will be shown. The current types are:
  * match-body
  * match-headers
  * match-method
  * match-query
  * match-url
* `appLabel`: Label of the app used to differentiate logger messages from other applications.

## Folder structure

The directory `root_dir` with the mock files have to have a fixed structure, that is, it should have two directories `mappings` and `responses`.

* `mappings`: Should contain all mapping files. The files inside can be organized in folders. The mapping files should be `json` files.
```console
mappings/POST-login.json
```
* `responses`: Should contain all response files. The files inside can be organized in folders.  The mapping files should be `json` files.
```console
responses/POST-login.json
```

* `schemas`: Should contain all schema files. The files inside can be organized in folders.  The schema files should be `json` files.
```console
schemas/user-schema.json
```
