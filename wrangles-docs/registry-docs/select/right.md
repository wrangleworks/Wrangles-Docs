---
title: "Right"
description: "Return characters from the right of text. Strings shorter than the length defined will be unaffected."
sidebar_label: "Right"
slug: "/select/right"
---

# Right

Return characters from the right of text. Strings shorter than the length defined will be unaffected.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the column(s) to edit. | — |
| `length` | Yes | integer | Number of characters to include from the right. If negative, this will remove the specified number of characters from the right. May not equal 0. | — |
| `output` | No | string, array, null | Name of the output column(s). | `null` |
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

Select characters from the right of the input. Using a negative length reverses the side of selection, selecting from the left.

## Migrated examples
#### Selecting the Three Rightmost Elements

##### Recipe

```yaml
wrangles:
  - select.right:
      input: Column
      output: Result
      length: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Result |
| --- |
| ing |

</div>

</div>

## Provenance

- [WranglesPY select.right implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.right Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/right.md)

## Registry metadata

- Registry ID: `89ee82ec-3bc5-4bfa-899b-7a1260ef9bdb`
- Namespace: `select`
- Recipe key: `select.right`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.select.right`
- Status: `active`
- Registry version: `0.1.0-pilot`
