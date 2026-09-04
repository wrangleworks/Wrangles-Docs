---
title: "Highest Confidence"
description: "Select the option with the highest confidence from multiple columns. Inputs are expected to be of the form [<<value>>, <<confidence_score>>]."
sidebar_label: "Highest Confidence"
slug: "/select/highest-confidence"
---

# Highest Confidence

Select the option with the highest confidence from multiple columns. Inputs are expected to be of the form [&lt;&lt;value&gt;&gt;, &lt;&lt;confidence_score&gt;&gt;].

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | List of the input columns to select from. | — |
| `output` | Yes | string, array | If two columns; the result and confidence. If one column; [result, confidence]. | — |
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

## Provenance

- [WranglesPY select.highest_confidence implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.highest_confidence Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/highest-confidence.md)

## Registry metadata

- Registry ID: `00aad85d-8cc8-42e5-86f3-e4ff916e8ac2`
- Namespace: `select`
- Recipe key: `select.highest_confidence`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.select.highest_confidence`
- Status: `active`
- Registry version: `0.1.0-pilot`
