---
title: "Date Range"
description: "Extract date range frequency from two dates."
sidebar_label: "Date Range"
slug: "/extract/date-range"
---

# Date Range

Extract date range frequency from two dates.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `start_time` | Yes | string | Name of the start date column. | — |
| `end_time` | Yes | string | Name of the end date column. | — |
| `output` | Yes | string | Name of the output column. | — |
| `range` | No | string; one of: business days, days, weeks, months, semi months, business month ends, month starts, semi month starts, business month starts, quarters, quarter starts, years, business hours, hours, minutes, seconds, milliseconds | Type of frequency to count. | `"day"` |
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

Extract date range frequency from two dates.

## Migrated examples
#### Extracting Number of Months From Range

##### Recipe

```yaml
wrangles:
  - extract.date_range:
      start_time: Start
      end_time: End
      output: Output
      range: months
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| End | Start | Output |
| --- | --- | --- |
| 2023-08-13 00:00:00 | 1992-08-13 00:00:00 | 371 |

</div>

</div>

## Provenance

- [WranglesPY extract.date_range implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.date_range Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/date-range.md)

## Registry metadata

- Registry ID: `9cebfa6f-a524-4aec-84a7-02d77b792843`
- Namespace: `extract`
- Recipe key: `extract.date_range`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.extract.date_range`
- Status: `active`
- Registry version: `0.1.0-pilot`
