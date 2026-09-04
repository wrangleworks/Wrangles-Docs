---
title: "List Element"
description: "Select a numbered element of a list (zero indexed)."
sidebar_label: "List Element"
slug: "/select/list-element"
---

# List Element

Select a numbered element of a list (zero indexed).

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `output` | No | string, array, null | Name of the output column. | `null` |
| `element` | No | integer | The numbered element of the list to select. Starts from zero. This may use python slicing syntax to select a subset of the list. | `0` |
| `default` | No | string, number, array, object, boolean, null | Set the default value to return if the specified element doesn't exist. | `""` |
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

Select a numbered element of a list (zero indexed).

## Migrated examples
#### Selecting the Second Element in a List

##### Recipe

```yaml
wrangles:
  - select.list_element:
      input: Col1
      output: Second Element
      element: 2 # Zero indexed
      default: F
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 |
| --- |
| ['A', 'B', 'C'] |
| ['D', 'E'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Third Element |
| --- |
| C |
| F |

</div>

</div>

## Provenance

- [WranglesPY select.list_element implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.list_element Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/list-element.md)

## Registry metadata

- Registry ID: `ec40495d-d29a-4f62-86dd-eafa43cf388a`
- Namespace: `select`
- Recipe key: `select.list_element`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.select.list_element`
- Status: `active`
- Registry version: `0.1.0-pilot`
