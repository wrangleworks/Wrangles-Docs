---
schema_version: '0.1'
type: wrangle
id: 11e8fc13-00d2-4779-8d87-6288b07de7e7
wrangle_name: hash
namespace: create
title: Hash
description: Create a hash of a column.
wrangle_key: create.hash
aliases: []
slug: create/hash
status: active
visibility: public
tags:
  - create
  - hash
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.create.hash
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
  - name: input
    description: Name of input column.
    required: true
    role: column-selector
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name of new column.
    required: true
    role: column-output
    schema:
      type:
        - string
        - array
  - name: method
    description: 'The method to use to hash the input (Default: md5).'
    required: false
    role: option
    runtime_default: md5
    schema:
      type: string
      enum:
        - md5
        - sha1
        - sha256
        - sha512
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py
    title: WranglesPY create.hash implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/hash.md
    title: Existing create.hash Markdown
---

# Hash

Create a hash of a column.

## Migrated examples
#### Creating a New Hash Column

##### Recipe

```yaml
wrangles:
  - create.hash:
      input: Description
      output: hash
      method: md5
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Description |
| --- |
| The wrench is blue |
| The hammer is yellow |

</div>

<div className="ww-sample-panel">

##### Output Sample

| New Column |
| --- |
| ce114e4501d2f4e2dcea3e17b546f339 |
| a54d88e06612d820bc3be72877c74f257b561b19 |

</div>

</div>
