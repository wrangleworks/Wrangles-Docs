---
schema_version: '0.2'
type: connector
catalog_id: '109'
catalog_key: connector.duckdb
catalog_kind: connector
runtime_key: duckdb
status: active
title: DuckDB
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Import data from a DuckDB Database
    required:
      - database
      - command
    properties:
      database:
        type: string
        description: >-
          The database to connect to including the file path. Use ':memory:' for an in-memory
          database.
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
        type:
          - array
          - object
        description: Variables to pass to a parameterized query.
  run:
    type: object
    description: Run a command against a DuckDB Database
    required:
      - database
      - command
    properties:
      database:
        type: string
        description: >-
          The database to connect to including the file path. Use ':memory:' for an in-memory
          database.
      command:
        type:
          - string
          - array
        description: SQL command or a list of SQL commands to execute
      params:
        type:
          - array
          - object
        description: Variables to pass to a parameterized query.
  write:
    type: object
    description: Export data to a DuckDB Database
    required:
      - database
      - table
    properties:
      database:
        type: string
        description: >-
          The database to connect to including the file path. Use ':memory:' for an in-memory
          database.
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
description: Import data from a DuckDB Database
slug: connectors/duckdb
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: documentation-search
    resource: https://wrangles.io/python/connectors/duckdb
    title: >-
      Checked for matching guide; no matching material retrieved. Description derived from pinned
      schema.
---

# DuckDB

Import data from a DuckDB Database
