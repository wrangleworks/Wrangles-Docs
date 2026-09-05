---
title: "Convert Data Type"
description: "Convert values to strings, numbers, booleans, or datetimes."
sidebar_label: "Convert Data Type"
slug: "/convert/data-type"
---

# Convert Data Type

Convert values to strings, numbers, booleans, or datetimes.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name, index, or list of input columns. | — |
| `output` | No | string, array | Name or list of output columns. If omitted, each input column is overwritten. | `null` |
| `data_type` | No | string; one of: str, float, int, bool, datetime | Data type to produce. | `"str"` |
| `default` | No | string, number, array, object, boolean, null | Value returned when conversion fails. If omitted, the original value is retained. | `null` |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |

## Verified examples

### Convert quantities to integers with a fallback

Verification: `static`

```yaml
wrangles:
  - convert.data_type:
      input: quantity
      output: quantity_integer
      data_type: int
      default: 0
```

#### Input

```json
[
  {
    "quantity": "12"
  },
  {
    "quantity": "not available"
  }
]
```

#### Output

```json
[
  {
    "quantity": "12",
    "quantity_integer": 12
  },
  {
    "quantity": "not available",
    "quantity_integer": 0
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

Use `convert.data_type` when a recipe needs consistent Python-compatible
values rather than display-only formatting.

## Behavior

- Supported target types are `str`, `float`, `int`, `bool`, and `datetime`.
- Omitting `data_type` uses the runtime default `str`.
- Omitting `output` overwrites the input column.
- Failed conversions retain the original value unless `default` is supplied.
- Additional undocumented keyword arguments are implementation details and are
  not part of the public Registry contract.

## Provenance

- [WranglesPY convert.data_type implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Legacy convert.data_type documentation](https://wrangles.io/python/recipes/wrangles/convert#data-type)

## Registry metadata

- Registry ID: `52384f01-7164-404f-8615-063e7677a588`
- Namespace: `convert`
- Recipe key: `convert.data_type`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.convert.data_type`
- Status: `active`
- Registry version: `0.1.0-pilot`
