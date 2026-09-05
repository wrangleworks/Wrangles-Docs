---
title: "Round"
description: "Round column(s) to the specified decimals."
sidebar_label: "Round"
slug: "/round"
---

# Round

Round column(s) to the specified decimals.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column(s). | — |
| `decimals` | No | integer | Number of decimal places to round column. | `0` |
| `output` | No | string, array, null | Name of the output column(s). | `null` |
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

Round numbers in a column to the nearest decimal point of your choosing.

## Migrated examples
#### Rounding a Column

##### Recipe

```yaml
wrangles:
  - round:
      input: Cost Per Unit
      output: Cost Rounded
      decimals: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Cost Per Unit |
| --- |
| 3.14159 |
| 2.71828 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Cost Per Unit | Cost Rounded |
| --- | --- |
| 3.14159 | 3.14 |
| 2.71828 | 2.72 |

</div>

</div>

## Provenance

- [WranglesPY round implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing round Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/round.md)

## Registry metadata

- Registry ID: `12f3111b-8511-4e42-8d3f-b5302dc3b4e4`
- Namespace: root-level runtime key
- Recipe key: `round`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.pandas.round`
- Status: `active`
- Registry version: `0.1.0-pilot`
