---
title: "Columns"
description: "Select columns from the dataframe."
sidebar_label: "Columns"
slug: "/select/columns"
---

# Columns

Select columns from the dataframe.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the column(s) to select. | — |
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

Select columns from the dataframe

## Migrated examples
#### Selecting Columns

##### Recipe

```yaml
wrangles:
  - select.columns:
      input: Manufacturer
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Part Number | Manufacturer |
| --- | --- |
| 1234 | SKF |
| 5678 | Timken |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Manufacturer |
| --- |
| SKF |
| Timken |

</div>

</div>

## Provenance

- [WranglesPY select.columns implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.columns Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/columns.md)

## Registry metadata

- Registry ID: `bca12c60-3957-4dc5-83f7-5ee460df2a11`
- Namespace: `select`
- Recipe key: `select.columns`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.select.columns`
- Status: `active`
- Registry version: `0.1.0-pilot`
