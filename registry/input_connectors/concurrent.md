---
schema_version: '0.2'
type: connector
catalog_id: '108'
catalog_key: connector.concurrent
catalog_kind: connector
runtime_key: concurrent
status: active
title: Concurrent
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: >-
      The concurrent connector lets you read multiple sources simultaneously rather than
      sequentially. If the outputs of the reads are not otherwise aggregated, they will be merged
      together via a union.
    required:
      - read
    properties:
      read:
        type: array
        description: Reads to be run concurrently
        minItems: 1
        items:
          - $ref: '#/$defs/read/items'
      max_concurrency:
        type: integer
        description: >-
          The maximum number to execute in parallel. If there are more than this, the rest will be
          queued.
        minimum: 1
  run:
    type: object
    description: The concurrent connector lets you run multiple actions simultaneously rather than sequentially
    required:
      - run
    properties:
      run:
        type: array
        description: Actions to run concurrently
        minItems: 1
        items:
          - $ref: '#/$defs/run/items'
      max_concurrency:
        type: integer
        description: >-
          The maximum number to execute in parallel. If there are more than this, the rest will be
          queued.
        minimum: 1
  write:
    type: object
    description: >-
      The concurrent connector lets you run multiple write connectors in parallel rather than
      sequentially
    required:
      - write
    properties:
      write:
        type: array
        description: Writes to run concurrently
        minItems: 1
        items:
          - $ref: '#/$defs/write/items'
      max_concurrency:
        type: integer
        description: >-
          The maximum number to execute in parallel. If there are more than this, the rest will be
          queued.
        minimum: 1
description: >-
  The concurrent connector lets you read multiple sources simultaneously rather than sequentially.
  If the outputs of the reads are not otherwise aggregated, they will be merged together via a
  union.
slug: connectors/concurrent
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/concurrent.md
    title: Existing connector documentation
---

# Concurrent

By default, all functions executed by a recipe happen sequentially. The concurrent connector allows functions to be executed in parallel.

Click [here](/py/concurrent) to learn about the concurrent wrangle.

### Read
### Recipe
```yaml
read:
  - union:
      sources:
        - concurrent:
            read:
              - file:
                  name: file1.xlsx
              - file:
                  name: file2.xlsx
              - file:
                  name: file3.csv
```

### Write
### Recipe
```yaml
write:
  - concurrent:
      write:
        - file:
            name: file1.xlsx
            columns:
              - col1
              - col2
        - file:
            name: file2.xlsx
            columns:
              - col3
              - col4
```

### Run

Run multiple actions concurrently.

### Recipe
```yaml
run:
  on_start:
    - concurrent:
        run:
          - custom.my_function:
              category: Hand Tools
          - custom.my_function:
              category: Power Tools
          - custom.my_function:
              category: Hardware
```
