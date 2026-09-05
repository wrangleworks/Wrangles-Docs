---
title: "Lists"
description: "Take lists in multiple columns and merge them to a single list."
sidebar_label: "Lists"
slug: "/merge/lists"
---

# Lists

Take lists in multiple columns and merge them to a single list.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | List of input columns. | — |
| `output` | Yes | string | Name of the output column. | — |
| `remove_duplicates` | No | boolean | Whether to remove duplicates from the created list. | `false` |
| `ignore_case` | No | boolean | Ignore case when removing duplicates. | `false` |
| `include_empty` | No | boolean | Whether to include empty values in the created list. | `true` |
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

Take lists in multiple columns and merge them to a single list.

## Migrated examples
#### Merging Two Lists

##### Recipe

```yaml
wrangles:
  - merge.lists:
      input:
        - col1
        - col2
      output: Combined Col
      remove_duplicates: false
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| ['A', 'B'] | ['D', 'E'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Combined Col |
| --- |
| ['A', 'B', 'D', 'E'] |

</div>

</div>

## Provenance

- [WranglesPY merge.lists implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.lists Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/lists.md)

## Registry metadata

- Registry ID: `d9978f00-b3d4-4583-884e-a53b98a43e9a`
- Namespace: `merge`
- Recipe key: `merge.lists`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.merge.lists`
- Status: `active`
- Registry version: `0.1.0-pilot`
