---
title: "To List"
description: "Take multiple columns and merge them to a list."
sidebar_label: "To List"
slug: "/merge/to-list"
---

# To List

Take multiple columns and merge them to a list.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | List of input columns. | — |
| `output` | Yes | string | Name of the output column. | — |
| `include_empty` | No | boolean | Whether to include empty columns in the created list. | `false` |
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

Take multiple columns and merge them to a list.

## Migrated examples
#### Merging Multiple Columns to a Single List

##### Recipe

```yaml
wrangles:
  - merge.to_list:
      input:
        - Col1
        - Col2
        - Col3
      output: List Col
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |

</div>

<div className="ww-sample-panel">

##### Output Sample

| List Col |
| --- |
| ['A', 'B', 'C'] |

</div>

</div>

## Provenance

- [WranglesPY merge.to_list implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.to_list Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/to-list.md)

## Registry metadata

- Registry ID: `d5300fe7-c8a4-4a41-8f12-f2c1698678cc`
- Namespace: `merge`
- Recipe key: `merge.to_list`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.merge.to_list`
- Status: `active`
- Registry version: `0.1.0-pilot`
