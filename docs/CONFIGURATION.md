# Configuration

The middleware have to be configured for a correct usage.

## Options

* `disabled`: Allow disable the server. If configured it makes a pass through to the next middleware. Default value `false`;
* `root_dir`: Directory where the mapping and response files are. It should be absolute.

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
