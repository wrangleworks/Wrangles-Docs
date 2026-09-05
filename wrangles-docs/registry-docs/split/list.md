---
title: "List"
description: "Split a list in a single column to multiple columns."
sidebar_label: "List"
slug: "/split/list"
---

# List

Split a list in a single column to multiple columns.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer | Name of the column to be split. | — |
| `output` | Yes | string, array | Name of column(s) for the results. If providing a single column, use a wildcard (*) to indicate a incrementing integer. | — |
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

Split a list into multiple columns. If only one output is given, `split.list` returns the same list it was given, so output should be a list of columns or a column name with a wildcard (`*`).

## Migrated examples
#### Using a Wildcard

##### Recipe

```yaml
wrangles:
  - split.list:
      input: Column
      output: Column*
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| ['A', 'B', 'C'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column1 | Column2 | Column3 |
| --- | --- | --- |
| A | B | C |

</div>

</div>

#### Named Columns

##### Recipe

```yaml
wrangles:
  - split.list:
      input: Column
      output:
        - Heading A
        - Heading B
        - Heading C
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| ['A', 'B', 'C'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Heading A | Heading B | Heading C |
| --- | --- | --- |
| A | B | C |

</div>

</div>

## Provenance

- [WranglesPY split.list implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Existing split.list Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/list.md)

## Registry metadata

- Registry ID: `3260b9f7-aae2-499f-8004-d211c2cf643e`
- Namespace: `split`
- Recipe key: `split.list`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.split.list`
- Status: `active`
- Registry version: `0.1.0-pilot`
