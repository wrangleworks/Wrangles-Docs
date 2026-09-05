---
title: "Fraction to Decimal"
description: "Convert fractions to decimals."
sidebar_label: "Fraction to Decimal"
slug: "/convert/fraction-to-decimal"
---

# Fraction to Decimal

Convert fractions to decimals.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `decimals` | No | integer | Number of decimals to round fraction. | `4` |
| `output` | No | string, array, null | Name of the output colum. | `null` |
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

Convert fractions to decimals.

## Migrated examples
#### Converting a Column of Fractions to Decimals

##### Recipe

```yaml
wrangles:
  - convert.fraction_to_decimal:
      input: fractions
      output: decimals
      decimals: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| fractions |
| --- |
| 3/32 |
| 25/64 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| decimals |
| --- |
| 0.094 |
| 0.391 |

</div>

</div>

## Provenance

- [WranglesPY convert.fraction_to_decimal implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Existing convert.fraction_to_decimal Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/convert/_sources/fraction-to-decimal.md)

## Registry metadata

- Registry ID: `7c55752e-70ab-4809-8298-c59436127457`
- Namespace: `convert`
- Recipe key: `convert.fraction_to_decimal`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.convert.fraction_to_decimal`
- Status: `active`
- Registry version: `0.1.0-pilot`
