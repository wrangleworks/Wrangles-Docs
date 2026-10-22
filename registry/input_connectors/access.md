---
schema_version: '0.2'
type: connector
catalog_id: '103'
catalog_key: connector.access
catalog_kind: connector
runtime_key: access
status: active
title: Access
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Import data from a Microsoft Access Database
    required:
      - command
    properties:
      database:
        type: string
        description: Access database file path. Not required if connection_string is supplied.
      connection_string:
        type: string
        description: Full ODBC connection string. If provided, database, driver, and password are ignored.
      driver:
        type: string
        description: ODBC driver name. Defaults to Microsoft Access Driver (*.mdb, *.accdb).
      password:
        type: string
        description: Optional database password.
      command:
        type: string
        description: |-
          SQL command to select data.
          Note - using variables here can make your recipe vulnerable
          to sql injection. Use params if using variables from
          untrusted sources.
      columns:
        type:
          - string
          - array
        description: >-
          A list with a subset of the columns to import. This is less efficient than specifying in
          the command.
      params:
        type: array
        description: Variables to pass to a parameterized query.
  run:
    type: object
    description: Run a command against a Microsoft Access Database
    required:
      - command
    properties:
      database:
        type: string
        description: Access database file path. Not required if connection_string is supplied.
      connection_string:
        type: string
        description: Full ODBC connection string. If provided, database, driver, and password are ignored.
      driver:
        type: string
        description: ODBC driver name. Defaults to Microsoft Access Driver (*.mdb, *.accdb).
      password:
        type: string
        description: Optional database password.
      command:
        type:
          - string
          - array
        description: SQL command or a list of SQL commands to execute
      params:
        type: array
        description: Variables to pass to a parameterized query.
  write:
    type: object
    description: Export data to a Microsoft Access Database
    required:
      - table
    properties:
      database:
        type: string
        description: Access database file path. Not required if connection_string is supplied.
      connection_string:
        type: string
        description: Full ODBC connection string. If provided, database, driver, and password are ignored.
      driver:
        type: string
        description: ODBC driver name. Defaults to Microsoft Access Driver (*.mdb, *.accdb).
      password:
        type: string
        description: Optional database password.
      table:
        type: string
        description: The table to write to
      action:
        type: string
        description: >-
          INSERT appends, REPLACE recreates the table, FAIL errors if the table exists. Defaults to
          INSERT.
        enum:
          - INSERT
          - REPLACE
          - FAIL
      columns:
        type:
          - string
          - array
        description: A list of the columns to write to the table. If omitted, all columns will be written.
description: Import data from a Microsoft Access Database
slug: connectors/access
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: documentation-search
    resource: https://wrangles.io/python/connectors/access
    title: >-
      Checked for matching guide; no matching material retrieved. Description derived from pinned
      schema.
---

# Access

Import data from a Microsoft Access Database
