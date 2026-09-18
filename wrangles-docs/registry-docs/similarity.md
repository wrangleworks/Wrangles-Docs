---
title: "Similarity"
description: "Calculate the cosine similarity of two vectors."
sidebar_label: "Similarity"
slug: "/similarity"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Similarity

Calculate the cosine similarity of two vectors.

Calculate the similarity of two vectors.

:::info
Similarity only works on vectors. To produce vectors from a column of strings, use `create.embeddings` first.
:::

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Two columns of vectors to compare the similarity of. | array | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | The type of similarity to calculate (cosine or euclidean). Adjusted cosine adjusts the default cosine calculation to cover a range of 0-1 for typical comparisons. | string; one of:<ul className="ww-param-enum-values"><li>cosine</li><li>adjusted cosine</li><li>euclidean</li></ul> | `"cosine"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

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

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| col1 | col2 |
| --- | --- |
| SKF | Timken |
| Ball Bearing | Roller Bearing |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| col1 embeddings | col2 embeddings | similarity |
| --- | --- | --- |
| [1, 2, 3, 4] | [4, 3, 2, 1] | 0.158931 |
| [5, 6, 7, 8] | [5, 6, 7, 9] | 0.942437 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `92` |
| Catalog key | `similarity` |
| Recipe key | `similarity` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `compare` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.similarity` |
| Legacy UUID | `7c733344-4cce-4938-8013-53742fb46a90` |

**Sources**

- [WranglesPY similarity implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived similarity Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compare/_sources/similarity.md)

</details>
