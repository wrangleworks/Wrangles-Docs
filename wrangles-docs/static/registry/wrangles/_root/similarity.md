---
schema_version: '0.1'
type: wrangle
id: 7c733344-4cce-4938-8013-53742fb46a90
wrangle_name: similarity
namespace: null
title: Similarity
description: Calculate the cosine similarity of two vectors.
wrangle_key: similarity
aliases: []
slug: similarity
status: active
visibility: public
tags:
  - compare
  - similarity
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.similarity
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
    description: Two columns of vectors to compare the similarity of.
    required: true
    role: column-selector
    schema:
      type: array
      minItems: 2
      maxItems: 2
  - name: output
    description: Name of the output column.
    required: true
    role: column-output
    schema:
      type: string
  - name: method
    description: >-
      The type of similarity to calculate (cosine or euclidean). Adjusted cosine adjusts the default
      cosine calculation to cover a range of 0-1 for typical comparisons.
    required: false
    role: option
    runtime_default: cosine
    schema:
      type: string
      enum:
        - cosine
        - adjusted cosine
        - euclidean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY similarity implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compare/_sources/similarity.md
    title: Existing similarity Markdown
---

# Similarity

Calculate the similarity of two vectors.

:::info
Similarity only works on vectors. To produce vectors from a column of strings, use `create.embeddings` first.
:::

## Migrated examples
#### Similarity Between Embeddings

##### Recipe

```yaml
wrangles:
  - create.embeddings:
      input: col1
      api_key: ${my_key}
      output: col1 embeddings

  - create.embeddings:
      input: col2
      api_key: ${my_key}
      output: col2 embeddings

  - similarity:
      input:
        - col1 embeddings
        - col2 embeddings
      output: similarity
      method: adjusted cosine
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| col1 | col2 |
| --- | --- |
| SKF | Timken |
| Ball Bearing | Roller Bearing |

</div>

<div className="ww-sample-panel">

##### Output Sample

| col1 | col2 | col1 embeddings | col2 embeddings | similarity |
| --- | --- | --- | --- | --- |
| SKF | Timken | [1, 2, 3, 4] | [4, 3, 2, 1] | 0.158931 |
| Ball Bearing | Roller Bearing | [5, 6, 7, 8] | [5, 6, 7, 9] | 0.942437 |

</div>

</div>
