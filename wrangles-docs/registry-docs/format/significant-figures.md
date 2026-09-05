---
title: "Significant Figures"
description: "Format a value to a specific number of significant figures."
sidebar_label: "Significant Figures"
slug: "/format/significant-figures"
---

# Significant Figures

Format a value to a specific number of significant figures.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `significant_figures` | No | integer | Number of significant figures to format to. Default is 3. | `3` |
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

Format a value to a specific number of significant figures

## Migrated examples
#### Rounding to Significant Figures

##### Recipe

```yaml
wrangles:
  - format.significant_figures:
      input: Data
      significant_figures: 2
      output: Data to 2 Figures
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Data |
| --- |
| 1.25 |
| 12.3 |
| 55.6 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Data | Data to 2 Figures |
| --- | --- |
| 1.25 | 1.2 |
| 12.3 | 12 |
| 55.6 | 55 |

</div>

</div>

## Provenance

- [WranglesPY format.significant_figures implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.significant_figures Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/significant-figures.md)

## Registry metadata

- Registry ID: `a359f72a-5250-4dd8-84f6-8a8173bee0f6`
- Namespace: `format`
- Recipe key: `format.significant_figures`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.format.significant_figures`
- Status: `active`
- Registry version: `0.1.0-pilot`
