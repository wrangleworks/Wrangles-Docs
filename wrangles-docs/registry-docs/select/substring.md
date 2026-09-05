---
title: "Substring"
description: "Return characters from the middle of text."
sidebar_label: "Substring"
slug: "/select/substring"
---

# Substring

Return characters from the middle of text.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the column(s) to edit. | — |
| `start` | No | integer, null | The position of the first character to select. If ommited will start from the beginning and length must be provided. | `null` |
| `length` | No | integer, null | The length of the string to select. If ommited will select to the end of the string and start must be provided. | `null` |
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

Return characters from the middle of text.

## Migrated examples
#### Selecting a Substring With Start and Length

##### Recipe

```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 2
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
| udd |

</div>

</div>

#### Selecting a Substring With Start Only

##### Recipe

```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 2
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
| udding |

</div>

</div>

#### Selecting a Substring With Length Only

##### Recipe

```yaml
wrangles:
  - select.substring:
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
| pud |

</div>

</div>

## Provenance

- [WranglesPY select.substring implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.substring Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/substring.md)

## Registry metadata

- Registry ID: `8befddf8-602e-4fa9-8f16-4c547210ebec`
- Namespace: `select`
- Recipe key: `select.substring`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.select.substring`
- Status: `active`
- Registry version: `0.1.0-pilot`
