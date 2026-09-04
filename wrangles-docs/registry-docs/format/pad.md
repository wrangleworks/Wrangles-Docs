---
title: "Pad"
description: "Pad a string to a fixed length."
sidebar_label: "Pad"
slug: "/format/pad"
---

# Pad

Pad a string to a fixed length.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `pad_length` | Yes | integer | Length for the output. | — |
| `side` | Yes | string | Side from which to fill resulting string. | — |
| `char` | Yes | string | The character to pad the input with. | — |
| `output` | No | string, array, null | Name of the output column. | `null` |
| `skip_empty` | No | boolean | If true, skip padding for empty or whitespace-only values. | `false` |
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

Pad a string to a fixed length

## Migrated examples
#### Adding Dashes to Part Numbers

##### Recipe

```yaml
wrangles:
  - format.pad:
      input: Part Number
      pad_length: 5
      side: left
      char: "-"
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Part Number |
| --- |
| 0458 |
| 396 |
| 84 |
| 98516 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Part Number |
| --- |
| -0458 |
| --396 |
| ---84 |
| 98516 |

</div>

</div>

## Provenance

- [WranglesPY format.pad implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.pad Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/pad.md)

## Registry metadata

- Registry ID: `76c19378-38f4-45aa-85d1-3cdf8f8aae29`
- Namespace: `format`
- Recipe key: `format.pad`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.format.pad`
- Status: `active`
- Registry version: `0.1.0-pilot`
