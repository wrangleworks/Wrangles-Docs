---
title: "Length"
description: "Calculate the lengths of data in a column. The length depends on the data type e.g. text will be the length of the text, lists will be the number of elements in the list."
sidebar_label: "Length"
slug: "/select/length"
---

# Length

Calculate the lengths of data in a column. The length depends on the data type e.g. text will be the length of the text, lists will be the number of elements in the list.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column(s). | — |
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

Calculate the lengths of data in a column. The length depends on the data type e.g. text will be the length of the text, lists will be the number of elements in the list.

## Migrated examples
#### Selecting the Length of Data Within a Column

##### Recipe

```yaml
wrangles:
  - select.length:
      input: Part Code
      output: Part Code Length
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Part Code |
| --- |
| 6202 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Part Code Length |
| --- |
| 4 |

</div>

</div>

## Provenance

- [WranglesPY select.length implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.length Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/length.md)

## Registry metadata

- Registry ID: `4d7a5f66-0a4a-40e0-8298-d5c55754423d`
- Namespace: `select`
- Recipe key: `select.length`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.select.length`
- Status: `active`
- Registry version: `0.1.0-pilot`
