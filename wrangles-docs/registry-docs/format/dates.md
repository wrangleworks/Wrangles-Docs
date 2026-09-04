---
title: "Dates"
description: "Format a date."
sidebar_label: "Dates"
slug: "/format/dates"
---

# Dates

Format a date.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `format` | Yes | string | String pattern to format date. | — |
| `output` | No | string, array, null | Name of the output column. | `null` |
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

Format a date into the desired pattern.

## Migrated examples
#### Changing The Format of a Date

##### Recipe

```yaml
wrangles:
  - format.dates:
      input: Date
      output: Output Format
      format: '%Y-%m-%d'  # must be wrapped by quotes " or '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Date |
| --- |
| 6/23/1912 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Date | Output Format |
| --- | --- |
| 6/23/1912 | 1912-06-23 |

</div>

</div>

## Provenance

- [WranglesPY format.dates implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.dates Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/dates.md)

## Registry metadata

- Registry ID: `a3c15135-4f7a-4659-83fd-f657afa603c9`
- Namespace: `format`
- Recipe key: `format.dates`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.format.dates`
- Status: `active`
- Registry version: `0.1.0-pilot`
