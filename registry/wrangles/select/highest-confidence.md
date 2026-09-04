---
schema_version: '0.1'
type: wrangle
id: 00aad85d-8cc8-42e5-86f3-e4ff916e8ac2
wrangle_name: highest_confidence
namespace: select
title: Highest Confidence
description: >-
  Select the option with the highest confidence from multiple columns. Inputs are expected to be of
  the form [<<value>>, <<confidence_score>>].
wrangle_key: select.highest_confidence
aliases: []
slug: select/highest-confidence
status: active
visibility: public
tags:
  - select
  - highest-confidence
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.highest_confidence
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
    description: List of the input columns to select from.
    required: true
    role: column-selector
    schema:
      type: array
  - name: output
    description: If two columns; the result and confidence. If one column; [result, confidence].
    required: true
    role: column-output
    schema:
      type:
        - string
        - array
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.highest_confidence implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/highest-confidence.md
    title: Existing select.highest_confidence Markdown
---

# Highest Confidence

Select the option with the highest confidence from multiple columns. Inputs are expected to be of the form `[value, confidence_score]`.

## Migrated examples
#### Selecting Highest Confidence Single Output

##### Recipe

```yaml
wrangles:
  - select.highest_confidence:
      input:
        - Col1
        - Col2
        - Col3
      output: Highest Confidence
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| ['A', 0.79] | ['B', 0.77] | ['C', 0.99] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Highest Confidence |
| --- |
| ['C', 0.99] |

</div>

</div>

#### Selecting Highest Confidence Two Outputs

##### Recipe

```yaml
wrangles:
  - select.highest_confidence:
      input:
        - Col1
        - Col2
        - Col3
      output:
        - Item
        - Confidence
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| ['A', 0.79] | ['B', 0.77] | ['C', 0.99] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Item | Confidence |
| --- | --- |
| C | 0.99 |

</div>

</div>
