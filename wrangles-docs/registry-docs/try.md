---
title: "Try"
description: "Try a list of wrangles and catch any errors that occur."
sidebar_label: "Try"
slug: "/try"
---

# Try

Try a list of wrangles and catch any errors that occur.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `wrangles` | Yes | array | List of wrangles to apply. | — |
| `retries` | No | integer | Number of times to retry the wrangles if an error occurs. Default 0. | `0` |
| `except` | No | object | An action to take if the wrangles encounter an error. This can contain a list of wrangles or a dictionary of column names and values. If except is not provided, the error will be logged and the recipe will continue. | — |
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

Run a list of wrangles and catch errors. When `except` is provided, its wrangles or fallback column values run after an error; otherwise, the error is logged and the recipe continues.

## Migrated examples
#### Use Fallback Wrangles After an Error

##### Recipe

```yaml
wrangles:
  - try:
      wrangles:
        - risky_wrangle:
            input: column
      except:
        - backup_wrangle:
            input: column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_The input dataframe is passed to the primary wrangles._

</div>

<div className="ww-sample-panel">

##### Output Sample

_The primary result is returned on success; the `except` result is returned after an error._

</div>

</div>

## Provenance

- [WranglesPY try implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing try Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/try.md)

## Registry metadata

- Registry ID: pending database assignment
- Namespace: root-level runtime key
- Recipe key: `try`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.Try`
- Status: `active`
- Registry version: `0.1.0-pilot`
