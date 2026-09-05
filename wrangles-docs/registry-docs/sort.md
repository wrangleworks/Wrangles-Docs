---
title: "Sort"
description: "Sort the data."
sidebar_label: "Sort"
slug: "/sort"
---

# Sort

Sort the data.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `ignore_index` | No | boolean | Ignore Index value accepted by the runtime. | `true` |
| `by` | Yes | string, array | Name or list of the column(s) to sort by. | — |
| `ascending` | No | boolean, array | Sort ascending vs. descending. Specify a list to sort multiple columns in different orders. If this is a list of bools then it must match the length of the by. | — |
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

Sort the data

## Migrated examples
#### Replacing Abbreviations

##### Recipe

```yaml
wrangles:
  - sort:
      by: Price
      ascending: true
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Item | Price |
| --- | --- |
| Hammer | 11.99 |
| Chisel | 4.99 |
| Drill | 29.99 |
| Wrench | 6.99 |
| Saw | 13.99 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Item | Price |
| --- | --- |
| Chisel | 4.99 |
| Wrench | 6.99 |
| Hammer | 11.99 |
| Saw | 13.99 |
| Drill | 29.99 |

</div>

</div>

## Provenance

- [WranglesPY sort implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing sort Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/sort.md)

## Registry metadata

- Registry ID: `1dcf06ad-898a-4d83-862c-4774be37a687`
- Namespace: root-level runtime key
- Recipe key: `sort`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.pandas.sort`
- Status: `active`
- Registry version: `0.1.0-pilot`
