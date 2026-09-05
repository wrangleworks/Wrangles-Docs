---
schema_version: '0.1'
type: wrangle
id: 06669ef8-cdd1-42f7-8078-98e0b7a42c30
wrangle_name: classify
namespace: null
title: Classify
description: Run classify wrangles on the specified columns. Requires WrangleWorks Account and Subscription.
wrangle_key: classify
aliases: []
slug: classify
status: active
visibility: public
tags:
  - ai
  - classify
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.classify
  contract_status: verified
access:
  ai_powered: false
  requires_account: true
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
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name of the output column.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
  - name: model_id
    description: ID of the classification model to be used.
    required: true
    param_group: Details
    schema:
      type: string
  - name: include_confidence
    description: For models that support it, include the confidence level in the output.
    required: false
    param_group: Formatting
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY classify implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/ai/_sources/classify.md
    title: Existing classify Markdown
---

# Classify

Run a custom classification wrangle on the specified column or columns. A classification wrangle must be trained first.

## Migrated examples
#### Food Type Example

##### Recipe

```yaml
wrangles:
  - classify:
      input: Products
      output: Category
      model_id: ${model_id}
      where: Products = Milk
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products |
| --- |
| Rice |
| Milk |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products | Category |
| --- | --- |
| Rice |  |
| Milk | Dairy |

</div>

</div>
