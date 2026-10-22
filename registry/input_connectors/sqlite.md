---
schema_version: '0.2'
type: connector
catalog_id: '137'
catalog_key: connector.sqlite
catalog_kind: connector
runtime_key: sqlite
status: active
title: SQLite
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Import data from a SQLite Database
    required:
      - database
      - command
    properties:
      database:
        type: string
        description: The database to connect to including the file path. e.g. directory/database.db
      command:
        type: string
        description: |-
          Table name or SQL command to select data.
          Note - using variables here can make your recipe vulnerable
          to sql injection. Use params if using variables from
          untrusted sources.
  run:
    type: object
    description: Run a command against a SQLite Database
    required:
      - database
      - command
    properties:
      database:
        type: string
        description: The database to connect to including the file path. e.g. directory/database.db
      command:
        type:
          - string
          - array
        description: SQL command or a list of SQL commands to execute
      params:
        type:
          - array
          - object
        description: |-
          Variables to pass to a parameterized query.
          This may use %s or %(name)s syntax
  write:
    type: object
    description: Export data to a SQLite Database
    required:
      - database
      - table
    properties:
      database:
        type: string
        description: The database to connect to including the file path. e.g. directory/database.db
      table:
        type: string
        description: The table to write to
description: Import data from a SQLite Database
slug: connectors/sqlite
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/sqlite.md
    title: Existing connector documentation
---

# SQLite

The sqlite connector supports read and writing to/from a sqlite database.

### Read
Import data from a SQLite Database

### Recipe
```yaml
read:
  - sqlite:
      database: './tests/test.db'
      command: SELECT * from my_table
```

### Function
```python
from wrangles.connectors import sqlite
df = sqlite.read(
    database = './tests/test.db',
    command = 'SELECT * from my_table'
)
```

### Write
Export data to a SQLite Database

### Recipe
```yaml
write:
  - sqlite:
      database: './sample/fake.db'
      table: my_table
```

### Function
```python
from wrangles.connectors import sqlite
sqlite.write(
    df = df,
    database = './sample/fake.db',
    table = 'my_table'
)
```

### Run
Run a command on a SQLite Database.

### Recipe
```yaml
run:
  on_start:
    - sqlite:
        database: './sample/my_db.db'
        command: CREATE TABLE test_table_copy AS SELECT * FROM test_table
```

### Function
```python
from wrangles.connectors import sqlite
sqlite.run(
    database = './temp/fake.db',
    command = 'CREATE TABLE test_table_copy AS SELECT * FROM test_table'
)
```
