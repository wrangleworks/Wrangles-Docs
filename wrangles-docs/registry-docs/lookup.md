---
title: "Lookup"
description: "Lookup values from a saved lookup wrangle."
sidebar_label: "Lookup"
slug: "/lookup"
---

# Lookup

Lookup values from a saved lookup wrangle.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string | Name of the column(s) to lookup. | — |
| `output` | No | string, array, null | Name of the output column(s). When n is provided and the output list length equals n, each output column receives the corresponding match. A single output containing a wildcard (*) is expanded into n columns, e.g. "Top *" with n: 3 becomes "Top 1", "Top 2", "Top 3". | `null` |
| `model_id` | No | string, null | The model_id to use lookup against. | `null` |
| `lookup_mode` | No | string; one of: by_row, by_matrix, by_dataframe | How to perform lookups. 'by_row' (default): lookup each row individually. 'by_dataframe': lookup unique values once, copy results to all rows. 'by_matrix': lookup once per matrix permutation. | `"by_row"` |
| `n` | No | integer, null | Number of matches to return per input value. When the output list length equals n, each output column receives the corresponding match. Otherwise all n matches are stored as a list in each output column. | `null` |
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

Look up data from a saved Lookup Wrangle. Data is output as a dictionary if an output is not specified or the output does not match any columns in the lookup. If specific lookup columns are named in the output, they will be output as individual columns.

## Migrated examples
#### State Example

##### Recipe

```yaml
wrangles:
  - lookup:
      input: State
      output:
        - Abbreviation
      model_id: 55555555-5555-5555
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| State |
| --- |
| Texas |
| New York |
| Virginia |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Abbreviation |
| --- |
| TX |
| NY |
| VA |

</div>

</div>

## Provenance

- [WranglesPY lookup implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing lookup Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/lookup/_sources/lookup.md)

## Registry metadata

- Registry ID: `b3339193-d1cc-4c89-8ed6-901efa6d81be`
- Namespace: root-level runtime key
- Recipe key: `lookup`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.lookup`
- Status: `active`
- Registry version: `0.1.0-pilot`
