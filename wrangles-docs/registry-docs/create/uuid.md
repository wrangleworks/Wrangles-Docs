---
title: "UUID"
description: "Create column(s) with a UUID."
sidebar_label: "UUID"
slug: "/create/uuid"
---

# UUID

Create column(s) with a UUID.

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

Create a column with a UUID (Universally Unique Identifier).

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

- [WranglesPY create.uuid implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.uuid Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/uuid.md)

## Registry metadata

- Registry ID: `c376f3ff-2283-4c4c-8d7f-70db6f53ed19`
- Namespace: `create`
- Recipe key: `create.uuid`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.create.uuid`
- Status: `active`
- Registry version: `0.1.0-pilot`
