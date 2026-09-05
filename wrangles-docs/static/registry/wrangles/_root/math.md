---
schema_version: '0.1'
type: wrangle
id: 494b11ad-00c1-4748-8b93-6bec982f4fec
wrangle_name: math
namespace: null
title: Math
description: Apply a mathematical calculation.
wrangle_key: math
aliases: []
slug: math
status: active
visibility: public
tags:
  - compute
  - math
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.math
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
    description: >-
      The mathematical expression using column names. e.g. column1 * column2 + column3. Note: spaces
      within column names are replaced by underscores (_).
    required: true
    param_group: I/O
    schema:
      type: string
  - name: output
    description: The column to output the results to.
    required: true
    param_group: I/O
    schema:
      type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY math implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/math.md
    title: Existing math Markdown
---

# Math

Apply mathematical calculations to columns. Also called as `maths`.

:::info
Spaces within column headers are replaced with underscores automatically. Account for this when writing expressions in `input`.
:::

## Migrated examples
#### Square Root Example

##### Recipe

```yaml
wrangles:
  - math:
      input: sqrt(Values)
      output: Square Root
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Values |
| --- |
| 4 |
| 9 |
| 16 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Values | Square Root |
| --- | --- |
| 4 | 2 |
| 9 | 3 |
| 16 | 4 |

</div>

</div>
