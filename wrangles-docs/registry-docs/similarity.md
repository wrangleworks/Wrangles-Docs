---
title: "Similarity"
description: "Calculate the cosine similarity of two vectors."
sidebar_label: "Similarity"
slug: "/similarity"
---

# Similarity

Calculate the cosine similarity of two vectors.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | Two columns of vectors to compare the similarity of. | — |
| `output` | Yes | string | Name of the output column. | — |
| `method` | No | string; one of: cosine, adjusted cosine, euclidean | The type of similarity to calculate (cosine or euclidean). Adjusted cosine adjusts the default cosine calculation to cover a range of 0-1 for typical comparisons. | `"cosine"` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | No |
| requires subscription | No |
| requires external api key | No |

## Guidance

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

## Provenance

- [WranglesPY similarity implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing similarity Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compare/_sources/similarity.md)

## Registry metadata

- Registry ID: `7c733344-4cce-4938-8013-53742fb46a90`
- Namespace: root-level runtime key
- Recipe key: `similarity`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.similarity`
- Status: `active`
- Registry version: `0.1.0-pilot`
