---
title: "To JSON"
description: "Convert an object to a JSON representation."
sidebar_label: "To JSON"
slug: "/convert/to-json"
---

# To JSON

Convert an object to a JSON representation.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `output` | No | string, array, null | Name of the output column. If omitted, the input column will be overwritten. | `null` |
| `ensure_ascii` | No | boolean | If true, non-ASCII characters will be escaped. Default is false. | `false` |
| `indent` | No | string, integer | If indent is a non-negative integer or string, then JSON array elements and object members will be pretty-printed with that indent level. An indent level of 0, negative, or "" will only insert newlines. None (the default) selects the most compact representation. Using a positive integer indent indents that many spaces per level. If indent is a string (such as '\t'), that string is used to indent each level. | — |
| `sort_keys` | No | boolean | If sort_keys is true (defaults to False), then the output of dictionaries will be sorted by key. | — |
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

Convert an object to a JSON representation.

## Migrated examples
#### Convert Text to JSON

##### Recipe

```yaml
wrangles:
  - convert.to_json:
      input: column
      output: new column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| `['a', 'python', 'list']` |
| `{'python': 'dict'}` |

</div>

<div className="ww-sample-panel">

##### Output Sample

| new column |
| --- |
| `["a","python","list"]` |
| `{"python":"dict"}` |

</div>

</div>

## Provenance

- [WranglesPY convert.to_json implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Existing convert.to_json Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/convert/_sources/to-json.md)

## Registry metadata

- Registry ID: `94e54eb7-2b8c-4047-89d0-fb5d16baf396`
- Namespace: `convert`
- Recipe key: `convert.to_json`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.convert.to_json`
- Status: `active`
- Registry version: `0.1.0-pilot`
