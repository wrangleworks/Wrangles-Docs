---
schema_version: '0.1'
type: wrangle
id: null
wrangle_name: concurrent
namespace: null
title: Concurrent
description: >-
  Run multiple wrangles concurrently rather than sequentially. Wrangles must specify output columns
  to be used concurrently. When using concurrent, Wrangles may not complete in a predictable order
  and it is not recommended to update overlapping columns with different wrangles.
wrangle_key: concurrent
aliases: []
slug: concurrent
status: active
visibility: public
tags:
  - utility
  - concurrent
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.concurrent
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
  - name: wrangles
    description: The wrangles section of a recipe to execute for each combination of variables.
    required: true
    role: nested-wrangles
    schema:
      type: array
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
  - name: max_concurrency
    description: The maximum number of wrangles to execute in parallel.
    required: false
    role: option
    runtime_default: 10
    schema:
      type: integer
      minimum: 1
  - name: use_multiprocessing
    description: Use process-based workers instead of threads. This is an advanced runtime option.
    required: false
    role: option
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY concurrent implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/concurrent.md
    title: Existing concurrent Markdown
---

# Concurrent

Run multiple wrangles concurrently instead of sequentially. Concurrent wrangles must declare output columns, may finish in any order, and should not update overlapping columns.

See the [Concurrent connector](/python/connectors/concurrent) for the connector equivalent.

## Migrated examples
#### Run Extraction Wrangles Concurrently

##### Recipe

```yaml
wrangles:
  - concurrent:
      wrangles:
        - extract.codes:
            input: Products
            output: Part Codes
        - extract.attributes:
            input: Products
            output: Attributes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products |
| --- |
| SKF ball brg 2" od 6202 |
| brg seal 1" id 5493 |
| 3lb hammer 87102 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products | Part Codes | Attributes |
| --- | --- | --- |
| SKF ball brg 2" od 6202 | 6202 | `{"length":["2in"]}` |
| brg seal 1" id 5493 | 5493 | `{"length":["1in"]}` |
| 3lb hammer 87102 | 87102 | `{"weight":["3lb"]}` |

</div>

</div>
