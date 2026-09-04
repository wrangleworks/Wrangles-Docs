---
title: "Trim"
description: "Remove excess whitespace at the start and end of text."
sidebar_label: "Trim"
slug: "/format/trim"
---

# Trim

Remove excess whitespace at the start and end of text.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
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

Remove excess whitespace at the start and end of text. Can accept multiple columns.

:::note
Non-string values pass through unaltered.
:::

## Migrated examples
#### Trimming a String

##### Recipe

```yaml
wrangles:
  - format.trim:
      input:
        - col1
      output: col1 trimmed
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| col1 |
| --- |
| `  Hello World  ` |

</div>

<div className="ww-sample-panel">

##### Output Sample

| col1 | col1 trimmed |
| --- | --- |
| Hello World | Hello World |

</div>

</div>

## Provenance

- [WranglesPY format.trim implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.trim Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/trim.md)

## Registry metadata

- Registry ID: `af16b3c1-c230-4868-8ebe-f574904a0c76`
- Namespace: `format`
- Recipe key: `format.trim`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.format.trim`
- Status: `active`
- Registry version: `0.1.0-pilot`
