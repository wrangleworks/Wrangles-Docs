---
title: "Date Properties"
description: "Extract date properties from a date (day, month, year, etc...)."
sidebar_label: "Date Properties"
slug: "/extract/date-properties"
---

# Date Properties

Extract date properties from a date (day, month, year, etc...).

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `property` | Yes | string; one of: day, day_of_year, month, month_name, weekday, week_day_name, week_year, quarter | Property to extract from date. | — |
| `output` | No | string, null | Name of the output columns. | `null` |
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

Extract date properties from a date, such as day, month, year, weekday, or quarter.

## Migrated examples
#### Extracting Month From Date

##### Recipe

```yaml
wrangles:
  - extract.date_properties:
      input: Date
      output: Output
      property: month_name
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Date | Output |
| --- | --- |
| 1992-08-13 00:00:00 | August |

</div>

</div>

## Provenance

- [WranglesPY extract.date_properties implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.date_properties Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/date-properties.md)

## Registry metadata

- Registry ID: `a346de62-93cd-44ba-8d30-a6305629c6d7`
- Namespace: `extract`
- Recipe key: `extract.date_properties`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.extract.date_properties`
- Status: `active`
- Registry version: `0.1.0-pilot`
