---
title: "Concatenate"
description: "Concatenate a list of columns or a list within a single column."
sidebar_label: "Concatenate"
slug: "/merge/concatenate"
---

# Concatenate

Concatenate a list of columns or a list within a single column.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Either a single column name or list of columns. | — |
| `output` | Yes | string | Name of the output column. | — |
| `char` | No | string | (Optional) Character to add between successive values. | `","` |
| `skip_empty` | No | boolean | Whether to skip empty values, defaults to false. | `false` |
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

If the input is a list of columns, concatenate multiple columns into one as a delimited string. If the input is a single column, concatenate a list within that column into a delimited string.

## Migrated examples
#### Concatenating 3 Columns

##### Recipe

```yaml
# Using concatenate to combine multiple columns
wrangles:
  - merge.concatenate:
      input:
        - Col1
        - Col2
        - Col3
      output: Join Col
      char: ', '
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

| Join Col |
| --- |
| A, B, C |

</div>

</div>

#### Concatenating a Single Column

##### Recipe

```yaml
# Using concatenate to join a column that is a list
wrangles:
  - merge.concatenate:
      input: Col1
      output: Join List
      char: ' '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 |
| --- |
| ['A', 'B', 'C'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Join List |
| --- |
| A B C |

</div>

</div>

## Provenance

- [WranglesPY merge.concatenate implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.concatenate Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/concatenate.md)

## Registry metadata

- Registry ID: `6ff76728-e1f6-4d3d-8946-6aa3b7524b3f`
- Namespace: `merge`
- Recipe key: `merge.concatenate`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.merge.concatenate`
- Status: `active`
- Registry version: `0.1.0-pilot`
