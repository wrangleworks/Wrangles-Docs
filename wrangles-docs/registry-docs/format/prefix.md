---
title: "Prefix"
description: "Add a prefix to a column."
sidebar_label: "Prefix"
slug: "/format/prefix"
---

# Prefix

Add a prefix to a column.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `value` | Yes | string, integer, number | Prefix value to add. | — |
| `output` | No | string, array, null | (Optional) Name of the output column. | `null` |
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

Add a prefix to a column.

## Migrated examples
#### Adding a Prefix to a String

##### Recipe

```yaml
wrangles:
  - format.prefix:
      input: Data
      output: Prefix
      value: anti
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Data |
| --- |
| freeze |
| dote |
| hero |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Data | Prefix |
| --- | --- |
| freeze | antifreeze |
| dote | antidote |
| hero | antihero |

</div>

</div>

## Provenance

- [WranglesPY format.prefix implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.prefix Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/prefix.md)

## Registry metadata

- Registry ID: `c12f99b9-2363-4da7-8405-7c73b87906e5`
- Namespace: `format`
- Recipe key: `format.prefix`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.format.prefix`
- Status: `active`
- Registry version: `0.1.0-pilot`
