---
schema_version: '0.1'
type: wrangle
id: 0a4909ca-6e14-4da7-8a70-a7fd106d6944
wrangle_name: index
namespace: create
title: Index
description: Create column(s) with an incremental index. e.g. 1,2,3...
wrangle_key: create.index
aliases: []
slug: create/index
status: active
visibility: public
tags:
  - create
  - index
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.create.index
  contract_status: verified
access:
  ai_powered: false
  requires_account: false
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: output
    description: Name or list of names of new columns.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
  - name: start
    description: (Optional; default 1) Starting number for the index.
    required: false
    param_group: Options
    runtime_default: 1
    schema:
      type: integer
  - name: step
    description: (Optional; default 1) Step between successive rows.
    required: false
    param_group: Options
    runtime_default: 1
    schema:
      type: integer
  - name: by
    description: Optional. Cluster the created indexes by one or more columns.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py
    title: WranglesPY create.index implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/index.md
    title: Existing create.index Markdown
---

# Index

Create a new incremental index.

## Migrated examples
#### Creating a New Index Column

##### Recipe

```yaml
wrangles:
  - create.index:
      output: New Index
      start: 1    # optional
      step: 1     # optional
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| New Index |
| --- |
| 1 |
| 2 |

</div>

</div>
