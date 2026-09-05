---
schema_version: '0.2'
type: wrangle
id: 25c1a60d-fa48-4b9a-8c03-0921d5b31049
wrangle_name: coalesce
namespace: merge
title: Coalesce
description: Take the first non-empty value from a series of columns or lists.
wrangle_key: merge.coalesce
aliases: []
slug: merge/coalesce
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - merge
  - coalesce
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.merge.coalesce
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
    description: List of input columns or a single column containing lists.
    required: true
    param_group: I/O
    schema:
      type: array
  - name: output
    description: Name of the output columns. This is required if multiple input columns are provided.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py
    title: WranglesPY merge.coalesce implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/coalesce.md
    title: Existing merge.coalesce Markdown
---

# Coalesce

Take the first non-empty value from a series of columns.

## Migrated examples
#### Coalescing 3 Columns

##### Recipe

```yaml
wrangles:
  - merge.coalesce:
      input:
        - Col1
        - Col2
        - Col3
      output: Output Col
      where: Col2 = E
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |
| D | E | F |
| G | H | I |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col1 | Col2 | Col3 | Output Col |
| --- | --- | --- | --- |
| A | B | C |  |
| D | E | F | D |
| G | H | I |  |

</div>

</div>
