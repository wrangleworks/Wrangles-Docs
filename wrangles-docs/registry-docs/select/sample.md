---
title: "Sample"
description: "Return a random sample of the rows."
sidebar_label: "Sample"
slug: "/select/sample"
---

# Sample

Return a random sample of the rows.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `rows` | Yes | integer, number | If a whole number, will select that number of rows. If a decimal between 0 and 1 will select that fraction of the rows e.g. 0.1 =&gt; 10% of rows will be returned. | — |
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

Return a random sample of the rows

## Migrated examples
#### Selecting 2 Random Rows

##### Recipe

```yaml
wrangles:
  - select.sample:
      rows: 2
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
| Ball Bearing | SKF |
| Needle Bearing | Acme Bearings |

</div>

</div>

#### Selecting a Random 25% of All Rows

##### Recipe

```yaml
wrangles:
  - select.sample:
      rows: .25
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

</div>

</div>

## Provenance

- [WranglesPY select.sample implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.sample Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/sample.md)

## Registry metadata

- Registry ID: `95a84ab6-a66e-450f-8a4a-7a87e3a77932`
- Namespace: `select`
- Recipe key: `select.sample`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.select.sample`
- Status: `active`
- Registry version: `0.1.0-pilot`
