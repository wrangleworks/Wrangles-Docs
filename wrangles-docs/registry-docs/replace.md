---
title: "Replace"
description: "Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field."
sidebar_label: "Replace"
slug: "/replace"
---

# Replace

Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name or list of input column. | — |
| `find` | Yes | string | Pattern to find using regex. | — |
| `replace` | Yes | string | Value to replace the pattern found. | — |
| `output` | No | string, array, null | Name or list of output column. | `null` |
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

Quick find and replace for simple values. Can use regex in the `find` field.

:::note
Values that are not a number or a string pass through unaltered.
:::

## Migrated examples
#### Replacing an Abbreviation

##### Recipe

```yaml
wrangles:
  - replace:
      input: Product Data
      find: brg
      replace: bearing
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Data |
| --- |
| SKF ball bearing |
| bearing seal |

</div>

</div>

## Provenance

- [WranglesPY replace implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing replace Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/replace.md)

## Registry metadata

- Registry ID: `f0ab715e-9e0e-4614-83e4-5cd8ea08a09f`
- Namespace: root-level runtime key
- Recipe key: `replace`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.replace`
- Status: `active`
- Registry version: `0.1.0-pilot`
