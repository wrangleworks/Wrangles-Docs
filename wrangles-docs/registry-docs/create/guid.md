---
title: "GUID"
description: "Create column(s) with a GUID."
sidebar_label: "GUID"
slug: "/create/guid"
---

# GUID

Create column(s) with a GUID.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `output` | Yes | string, array | Name or list of names of new columns. | — |
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

Create a column with a GUID (Globally Unique Identifier).

## Migrated examples
#### Creating a New GUID Column

##### Recipe

```yaml
wrangles:
  - create.guid:
      output: GUID Column

  # OR

  - create.uuid:
      output: GUID Column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| GUID Column |
| --- |
| 9a13b4dd-1993-4bd2-8974-3f9a0f006d86 |
| 1528d918-ecd7-457c-b44d-3d30705696d3 |

</div>

</div>

## Provenance

- [WranglesPY create.guid implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.guid Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/guid.md)

## Registry metadata

- Registry ID: `cf3aaab2-3d5b-4c9b-826e-7af7510521c9`
- Namespace: `create`
- Recipe key: `create.guid`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.create.guid`
- Status: `active`
- Registry version: `0.1.0-pilot`
