---
title: "Suffix"
description: "Add a suffix to a column."
sidebar_label: "Suffix"
slug: "/format/suffix"
---

# Suffix

Add a suffix to a column.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `value` | Yes | string, integer, number, array | Suffix value to add. | — |
| `output` | No | string, null | (Optional) Name of the output column. | `null` |
| `skip_empty` | No | boolean | Whether to skip empty values. | `false` |
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

Add a suffix to a column

## Migrated examples
#### Adding a Suffix to a String

##### Recipe

```yaml
wrangles:
  - format.suffix:
      input: Data
      output: Suffix
      value: ic
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Data |
| --- |
| sto |
| hero |
| icon |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Data | Suffix |
| --- | --- |
| sto | stoic |
| hero | heroic |
| icon | iconic |

</div>

</div>

## Provenance

- [WranglesPY format.suffix implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.suffix Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/suffix.md)

## Registry metadata

- Registry ID: `8d127060-ba2d-4934-897f-07662e01e40b`
- Namespace: `format`
- Recipe key: `format.suffix`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.format.suffix`
- Status: `active`
- Registry version: `0.1.0-pilot`
