---
title: "Coalesce"
description: "Take the first non-empty value from a series of columns or lists."
sidebar_label: "Coalesce"
slug: "/merge/coalesce"
---

# Coalesce

Take the first non-empty value from a series of columns or lists.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | List of input columns or a single column containing lists. | — |
| `output` | No | string, null | Name of the output columns. This is required if multiple input columns are provided. | `null` |
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

Take the first non-empty value from a series of columns.

## Migrated examples
#### Coalescing 3 Columns

##### Recipe

```yaml
wrangles:
  - merge.coalesce:
      input:
        - Col1
        - Col2
        - Col3
      output: Output Col
      where: Col2 = E
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |
| D | E | F |
| G | H | I |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col1 | Col2 | Col3 | Output Col |
| --- | --- | --- | --- |
| A | B | C |  |
| D | E | F | D |
| G | H | I |  |

</div>

</div>

## Provenance

- [WranglesPY merge.coalesce implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.coalesce Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/coalesce.md)

## Registry metadata

- Registry ID: `25c1a60d-fa48-4b9a-8c03-0921d5b31049`
- Namespace: `merge`
- Recipe key: `merge.coalesce`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.merge.coalesce`
- Status: `active`
- Registry version: `0.1.0-pilot`
