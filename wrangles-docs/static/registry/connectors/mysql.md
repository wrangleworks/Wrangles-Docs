---
schema_version: '0.2'
type: connector
catalog_id: '122'
catalog_key: connector.mysql
catalog_kind: connector
runtime_key: mysql
status: active
title: MySQL
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Import data from a MySQL Server
    required:
      - host
      - user
      - password
      - command
    properties:
      host:
        type: string
        description: Hostname or IP address of the server
      user:
        type: string
        description: The user to connect to the database with
      password:
        type: string
        description: Password for the specified user
      command:
        type: string
        description: |-
          Table name or SQL command to select data.
          Note - using variables here can make your recipe vulnerable
          to sql injection. Use params if using variables from
          untrusted sources.
      database:
        type: string
        description: The database to connect to
      port:
        type: integer
        description: The Port to connect to. Defaults to 3306.
      columns:
        type: array
        description: >-
          A list with a subset of the columns to import. This is less efficient than specifying in
          the command.
      params:
        type:
          - array
          - object
        description: |-
          List of parameters to pass to execute method.
          This may use %s or %(name)s syntax
  write:
    type: object
    description: Write data to a MySQL Server
    required:
      - host
      - user
      - password
      - database
      - table
    properties:
      host:
        type: string
        description: Hostname or IP address of the server
      user:
        type: string
        description: The user to connect to the database with
      password:
        type: string
        description: Password for the specified user
      database:
        type: string
        description: The database to connect to
      table:
        type: string
        description: The name of the table to insert the data into
      port:
        type: integer
        description: The Port to connect to. Defaults to 3306.
      columns:
        type: array
        description: A list of the columns to write to the table. If omitted, all columns will be written.
description: Import data from a MySQL Server
slug: connectors/mysql
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/mysql.md
    title: Existing connector documentation
---

# MySQL

The mysql connector supports read and writing to/from a MySQL Server.

### Read
### Recipe
```yaml
read:
  - mysql:
      host: sql.domain
      user: user
      password: password
      command: |
        SELECT *
        FROM table

      # Optional
      port: 3306
      database: database
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import mysql
df = mysql.read(
      host = 'sql.domain',
      user = 'user',
      password = 'password',
      command = 'SELECT * FROM table'
)
```

### Write
### Recipe
```yaml
write:
  - mysql:
      host: sql.domain
      database: database
      table: table
      user: user
      password: password

      # Optional
      port: 3306
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import mysql
mysql.write(
    df,
    host = 'sql.domain',
    database = 'database',
    table = 'table',
    user = 'user',
    password = 'password'
)
```
