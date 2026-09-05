---
title: "Date Calculator"
description: "Add or Subtract time from a date."
sidebar_label: "Date Calculator"
slug: "/date-calculator"
---

# Date Calculator

Add or Subtract time from a date.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string | Name of the dates column. | — |
| `operation` | No | string; one of: add, subtract | Date operation. | `"add"` |
| `output` | No | string, null | Name of the output column of dates. | `null` |
| `time_unit` | No | string, null; one of: years, months, weeks, days, hours, minutes, seconds, milliseconds | Time unit for operation. | `null` |
| `time_value` | No | number, null | Time unit value for operation. | `null` |
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

Add or subtract time from a date.

## Migrated examples
#### Calculating a Future Date

##### Recipe

```yaml
wrangles:
   - date_calculator:
      input: Date
      output: New Date
      operation: subtract  # Optional default is addition
      time_unit: days
      time_value: 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Date |
| --- |
| 2022-12-26 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| New Date |
| --- |
| 2022-12-25 |

</div>

</div>

## Provenance

- [WranglesPY date_calculator implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing date_calculator Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/date/_sources/date-calculator.md)

## Registry metadata

- Registry ID: `19cfeb4f-02af-4ab2-895c-0ff2bb5cce19`
- Namespace: root-level runtime key
- Recipe key: `date_calculator`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.date_calculator`
- Status: `active`
- Registry version: `0.1.0-pilot`
