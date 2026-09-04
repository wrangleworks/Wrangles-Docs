---
title: "Convert From JSON"
description: "Parse JSON text into lists, objects, scalars, booleans, or null values."
sidebar_label: "Convert From JSON"
slug: "/convert/from-json"
---

# Convert From JSON

Parse JSON text into lists, objects, scalars, booleans, or null values.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name, index, or list of columns containing valid JSON text. | — |
| `output` | No | string, array | Name or list of output columns. If omitted, each input column is overwritten. | `null` |
| `default` | No | string, number, array, object, boolean, null | Value returned for empty or invalid JSON. A list may supply one fallback per input column. | `null` |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |

## Verified examples

### Parse JSON objects and lists

Verification: `static`

```yaml
wrangles:
  - convert.from_json:
      input: attributes_json
      output: attributes
```

#### Input

```json
[
  {
    "attributes_json": "{\"material\":\"steel\",\"voltage\":18}"
  },
  {
    "attributes_json": "[\"corded\",\"variable speed\"]"
  }
]
```

#### Output

```json
[
  {
    "attributes_json": "{\"material\":\"steel\",\"voltage\":18}",
    "attributes": {
      "material": "steel",
      "voltage": 18
    }
  },
  {
    "attributes_json": "[\"corded\",\"variable speed\"]",
    "attributes": [
      "corded",
      "variable speed"
    ]
  }
]
```

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | No |
| requires subscription | No |
| requires external api key | No |

## Guidance

Use `convert.from_json` when a column contains JSON text that later wrangles
need to treat as structured values.

## Behavior

- Each non-fallback value is parsed with Python's JSON parser.
- Omitting `output` overwrites the input column.
- Multiple input columns may share one fallback or use one fallback per input.
- Invalid JSON raises an error unless a non-null fallback is supplied.
- Permissive Python-literal or YAML-like parsing is outside this wrangle's
  contract.

## Provenance

- [WranglesPY convert.from_json implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Legacy convert.from_json documentation](https://wrangles.io/python/recipes/wrangles/convert#from-json)

## Registry metadata

- Registry ID: `e370dfcf-b0fe-4c48-8a52-6f34c47e7978`
- Namespace: `convert`
- Recipe key: `convert.from_json`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.convert.from_json`
- Status: `active`
- Registry version: `0.1.0-pilot`
