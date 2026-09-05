---
title: "Index"
description: "Create column(s) with an incremental index. e.g. 1,2,3..."
sidebar_label: "Index"
slug: "/create/index"
---

# Index

Create column(s) with an incremental index. e.g. 1,2,3...

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `output` | Yes | string, array | Name or list of names of new columns. | — |
| `start` | No | integer | (Optional; default 1) Starting number for the index. | `1` |
| `step` | No | integer | (Optional; default 1) Step between successive rows. | `1` |
| `by` | No | string, array, null | Optional. Cluster the created indexes by one or more columns. | `null` |
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

Create a new incremental index.

## Migrated examples
#### Creating a New Index Column

##### Recipe

```yaml
wrangles:
  - create.index:
      output: New Index
      start: 1    # optional
      step: 1     # optional
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| New Index |
| --- |
| 1 |
| 2 |

</div>

</div>

## Provenance

- [WranglesPY create.index implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.index Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/index.md)

## Registry metadata

- Registry ID: `0a4909ca-6e14-4da7-8a70-a7fd106d6944`
- Namespace: `create`
- Recipe key: `create.index`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.create.index`
- Status: `active`
- Registry version: `0.1.0-pilot`
