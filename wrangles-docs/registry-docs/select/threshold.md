---
title: "Threshold"
description: "Select the first option if it exceeds a given threshold, else the second option."
sidebar_label: "Threshold"
slug: "/select/threshold"
---

# Threshold

Select the first option if it exceeds a given threshold, else the second option.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | List of the input columns to select from. | — |
| `output` | Yes | string | Name of the output column. | — |
| `threshold` | Yes | number | Threshold above which to choose the first option, otherwise the second. | — |
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

Select the first option if it exceeds a given threshold, else the second option.

## Migrated examples
#### Selecting Results Above a Threshold

##### Recipe

```yaml
wrangles:
  - select.threshold:
      input:
        - Col1
        - Col2
      output: Result
      threshold: .77
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| ['A', 0.6] | ['B', 0.79] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Result |
| --- |
| B |

</div>

</div>

## Provenance

- [WranglesPY select.threshold implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.threshold Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/threshold.md)

## Registry metadata

- Registry ID: `af2a5dcc-0ec0-48d7-8fb4-f58d9c5391d2`
- Namespace: `select`
- Recipe key: `select.threshold`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.select.threshold`
- Status: `active`
- Registry version: `0.1.0-pilot`
