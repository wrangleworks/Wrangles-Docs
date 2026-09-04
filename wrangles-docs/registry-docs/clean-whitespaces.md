---
title: "Clean Whitespaces"
description: "Condense multiple spaces to a single space and convert special space characters to a standard space."
sidebar_label: "Clean Whitespaces"
slug: "/clean-whitespaces"
---

# Clean Whitespaces

Condense multiple spaces to a single space and convert special space characters to a standard space.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name or list of input columns. | — |
| `output` | No | string, array, null | Name or list of output columns. | `null` |
| `trim` | No | boolean | Whether to trim leading and trailing spaces. Default True. | `true` |
| `remove_literals` | No | boolean | Whether to remove special space characters such as new lines etc. Default True. | `true` |
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

Condense multiple spaces to a single space and convert special space characters to a standard space.

## Migrated examples
#### Food Type Example

##### Recipe

```yaml
wrangles:
  - clean_whitespaces:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products |
| --- |
| `Hello     world!` |
| `Hello     universe!` |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products |
| --- |
| Hello world! |
| Hello universe! |

</div>

</div>

## Provenance

- [WranglesPY clean_whitespaces implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing clean_whitespaces Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/clean-whitespaces.md)

## Registry metadata

- Registry ID: `e36e15c4-f0ad-43f8-8555-ef683a8ab892`
- Namespace: root-level runtime key
- Recipe key: `clean_whitespaces`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.clean_whitespaces`
- Status: `active`
- Registry version: `0.1.0-pilot`
