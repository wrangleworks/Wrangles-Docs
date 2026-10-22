---
schema_version: '0.2'
type: connector
catalog_id: '145'
catalog_key: connector.join
catalog_kind: connector
runtime_key: join
status: active
title: Join
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Join two data sources on key(s). Equivalent to a join in SQL.
    required:
      - how
      - left_on
      - right_on
      - sources
    properties:
      how:
        type: string
        description: Method of join
        enum:
          - left
          - right
          - outer
          - inner
          - cross
      left_on:
        type:
          - string
          - array
        description: Key(s) to join on from first source
      right_on:
        type:
          - string
          - array
        description: Key(s) to join on from second source
      sources:
        type: array
        description: Two data sources to be joined
        minItems: 2
        maxItems: 2
        items:
          $ref: '#/$defs/read/items'
description: Join two data sources on key(s). Equivalent to a join in SQL.
slug: connectors/join
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/recipes/read.md
    title: Existing connector documentation
---

# Join

> Joins can be done using data from any connector, or even custom functions.
> Want to join a csv to data from a database? Go for it!

Import data from two sources and merge the data, equivalent to a join in SQL.

This can be used recursively to join more than two tables.

```yaml
read:
  - join:
      how: inner
      left_on: column
      right_on: column
      sources:
        - file:
            name: file1.xlsx
        - file:
            name: file2.xlsx
```
