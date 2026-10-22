---
schema_version: '0.2'
type: connector
catalog_id: '134'
catalog_key: connector.sftp
catalog_kind: connector
runtime_key: sftp
status: active
title: SFTP
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Import a file from an SFTP server
    required:
      - host
      - user
      - password
      - file
    properties:
      host:
        type: string
        description: The domain or IP of the SFTP server
      user:
        type: string
        description: The user to connect as
      password:
        type: string
        description: The password for the user
      file:
        type: string
        description: The filename including path on the remote server
      columns:
        type: array
        description: Choose only a subset of the columns
      nrows:
        type: integer
        description: Number of rows to read
        minimum: 1
      header:
        type: integer
        description: Set the header row number.
        minimum: 0
      sheet_name:
        type: string
        description: Used for Excel files. Specify the sheet to read.
      orient:
        type: string
        description: Used for JSON files. Specifies the input arrangement
        enum:
          - split
          - records
          - index
          - columns
          - values
  write:
    type: object
    description: Export a file to an SFTP server
    required:
      - host
      - user
      - password
      - file
    properties:
      host:
        type: string
        description: The domain or IP of the SFTP server
      user:
        type: string
        description: The user to connect as
      password:
        type: string
        description: The password for the user
      file:
        type: string
        description: The filename including path on the remote server
      columns:
        type: array
        description: Choose only a subset of the columns to export
      sheet_name:
        type: string
        description: Used for Excel files. Specify the sheet to create.
      orient:
        type: string
        description: Used for JSON files. Specifies the output arrangement
        enum:
          - split
          - records
          - index
          - columns
          - values
description: Import a file from an SFTP server
slug: connectors/sftp
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/sftp.md
    title: Existing connector documentation
---

# SFTP

The sftp connector supports reading and writing CSV, Excel and JSON files to & from an SFTP server.

### Read
### Recipe
```yaml
read:
  - sftp:
      host: sftp.domain
      user: user
      password: password
      file: file.csv

      # Optional
      columns:             # Only import select columns
        - column1
        - column2
      sheet_name: Sheet1   # Used for Excel files
      nrows: 10            # Limit the number of rows
      orient: records      # Used for JSON files - defines the structure
```

### Function
```python
from wrangles.connectors import sftp
df = sftp.read(
    host='sftp.domain',
    user='user',
    password='password',
    file='myfile.csv'
)
```

> The SFTP connector also supports the same optional parameters as the file connector. See the [file connector](/py/connectors/file) for more details.

### Write
### Recipe
```yaml
# Write specific fields
write:
  - sftp:
      host: sftp.domain
      user: user
      password: password
      file: file.csv

      # Optional
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import sftp
sftp.write(
    df,
    host='sftp.domain',
    user='user',
    password='password',
    file='myfile.csv'
)
```

> The SFTP connector also supports the same optional parameters as the file connector. See the [file connector](/py/connectors/file) for more details.
