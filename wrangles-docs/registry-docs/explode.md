---
title: "Explode"
description: "Explode a column of lists into rows."
sidebar_label: "Explode"
slug: "/explode"
---

# Explode

Explode a column of lists into rows.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the column(s) to explode. If multiple columns are included they must contain lists of the same length. | — |
| `reset_index` | No | boolean | Reset the index after exploding. Default True. | `true` |
| `drop_empty` | No | boolean | If true, any rows that contain an empty list will be dropped. If false, rows that contain empty lists will keep 1 row with an empty value. Default False. | `false` |
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

Explode a column of lists into rows

## Migrated examples
#### Exploding a Column

##### Recipe

```yaml
wrangles:
  - explode:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products | Manufacturer |
| --- | --- |
| [Ball Bearing, Bearing Seal] | SKF |
| [Angle Grinder, Drill, Impact Driver] | Milwaukee |
| Solid State Relay | Schneider |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Seal | SKF |
| Angle Grinder | Milwaukee |
| Drill | Milwaukee |
| Impact Driver | Milwaukee |
| Solid State Relay | Schneider |

</div>

</div>

## Provenance

- [WranglesPY explode implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing explode Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/explode.md)

## Registry metadata

- Registry ID: `4e4b13ac-8d50-4b2c-85c8-2c31de1e817d`
- Namespace: root-level runtime key
- Recipe key: `explode`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.pandas.explode`
- Status: `active`
- Registry version: `0.1.0-pilot`
