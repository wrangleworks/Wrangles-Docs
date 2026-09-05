---
schema_version: '0.2'
type: wrangle
id: b3339193-d1cc-4c89-8ed6-901efa6d81be
wrangle_name: lookup
namespace: null
title: Lookup
description: Lookup values from a saved lookup wrangle.
wrangle_key: lookup
aliases: []
slug: lookup
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - lookup
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.lookup
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
    description: Name of the column(s) to lookup.
    required: true
    param_group: I/O
    schema:
      type: string
  - name: output
    description: >-
      Name of the output column(s). When n is provided and the output list length equals n, each
      output column receives the corresponding match. A single output containing a wildcard (*) is
      expanded into n columns, e.g. "Top *" with n: 3 becomes "Top 1", "Top 2", "Top 3".
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: model_id
    description: The model_id to use lookup against.
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: lookup_mode
    description: >-
      How to perform lookups. 'by_row' (default): lookup each row individually. 'by_dataframe':
      lookup unique values once, copy results to all rows. 'by_matrix': lookup once per matrix
      permutation.
    required: false
    param_group: Options
    runtime_default: by_row
    schema:
      type: string
      enum:
        - by_row
        - by_matrix
        - by_dataframe
  - name: n
    description: >-
      Number of matches to return per input value. When the output list length equals n, each output
      column receives the corresponding match. Otherwise all n matches are stored as a list in each
      output column.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - integer
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY lookup implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/lookup/_sources/lookup.md
    title: Existing lookup Markdown
---

# Lookup

Look up data from a saved Lookup Wrangle. Data is output as a dictionary if an output is not specified or the output does not match any columns in the lookup. If specific lookup columns are named in the output, they will be output as individual columns.

## Migrated examples
#### State Example

##### Recipe

```yaml
wrangles:
  - lookup:
      input: State
      output:
        - Abbreviation
      model_id: 55555555-5555-5555
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| State |
| --- |
| Texas |
| New York |
| Virginia |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Abbreviation |
| --- |
| TX |
| NY |
| VA |

</div>

</div>
