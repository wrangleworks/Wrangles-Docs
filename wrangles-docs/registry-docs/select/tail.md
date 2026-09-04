---
title: "Tail"
description: "Return the last n rows."
sidebar_label: "Tail"
slug: "/select/tail"
---

# Tail

Return the last n rows.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `n` | Yes | integer | Number of rows to return. | — |
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

Return the last n rows

## Migrated examples
#### Selecting The Last n Rows

##### Recipe

```yaml
wrangles:
  - select.tail:
      n: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Race | Timken |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product | Manufacturer |
| --- | --- |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

</div>

## Provenance

- [WranglesPY select.tail implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.tail Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/tail.md)

## Registry metadata

- Registry ID: `60853759-c160-49a4-87eb-036516a9d823`
- Namespace: `select`
- Recipe key: `select.tail`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.select.tail`
- Status: `active`
- Registry version: `0.1.0-pilot`
