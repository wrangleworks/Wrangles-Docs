---
title: "To Dict"
description: "Take multiple columns and merge them to a dictionary (aka object) using the column headers as keys."
sidebar_label: "To Dict"
slug: "/merge/to-dict"
---

# To Dict

Take multiple columns and merge them to a dictionary (aka object) using the column headers as keys.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | List of input columns. | — |
| `output` | Yes | string | Name of the output column. | — |
| `include_empty` | No | boolean | Whether to include empty columns in the created dictionary. | `false` |
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

Take multiple columns and merge them to a dictionary (aka object) using the column headers as keys.

## Migrated examples
#### Merging Two Columns Into a Dictionary

##### Recipe

```yaml
wrangles:
  - merge.to_dict:
      input:
        - Col1
        - Col2
      output: Dict Col
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| A | B |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Dict Col |
| --- |
| \{'Col1': 'A', 'Col2': 'B'\} |

</div>

</div>

## Provenance

- [WranglesPY merge.to_dict implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.to_dict Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/to-dict.md)

## Registry metadata

- Registry ID: `9b869210-0d89-403b-8409-7cecdb5f9c7c`
- Namespace: `merge`
- Recipe key: `merge.to_dict`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.merge.to_dict`
- Status: `active`
- Registry version: `0.1.0-pilot`
