---
schema_version: '0.1'
type: wrangle
id: 7c55752e-70ab-4809-8298-c59436127457
wrangle_name: fraction_to_decimal
namespace: convert
title: Fraction to Decimal
description: Convert fractions to decimals.
wrangle_key: convert.fraction_to_decimal
aliases: []
slug: convert/fraction-to-decimal
status: active
visibility: public
tags:
  - convert
  - fraction-to-decimal
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.convert.fraction_to_decimal
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
    description: Name of the input column.
    required: true
    role: column-selector
    schema:
      type:
        - string
        - integer
        - array
  - name: decimals
    description: Number of decimals to round fraction.
    required: false
    role: option
    runtime_default: 4
    schema:
      type: integer
  - name: output
    description: Name of the output colum.
    required: false
    role: column-output
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
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py
    title: WranglesPY convert.fraction_to_decimal implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/convert/_sources/fraction-to-decimal.md
    title: Existing convert.fraction_to_decimal Markdown
---

# Fraction to Decimal

Convert fractions to decimals.

## Migrated examples
#### Converting a Column of Fractions to Decimals

##### Recipe

```yaml
wrangles:
  - convert.fraction_to_decimal:
      input: fractions
      output: decimals
      decimals: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| fractions |
| --- |
| 3/32 |
| 25/64 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| decimals |
| --- |
| 0.094 |
| 0.391 |

</div>

</div>
