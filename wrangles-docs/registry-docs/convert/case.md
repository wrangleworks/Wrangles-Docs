---
title: "Convert Case"
description: "Change the letter case of text values."
sidebar_label: "Convert Case"
slug: "/convert/case"
---

# Convert Case

Change the letter case of text values.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name, index, or list of input columns. | — |
| `output` | No | string, array | Name or list of output columns. If omitted, each input column is overwritten. | `null` |
| `case` | No | string; one of: lower, upper, title, sentence | Letter case to apply. Sentence case lowercases the value and capitalizes sentence starts. | `"lower"` |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |

## Verified examples

### Write uppercase text to a new column

Verification: `static`

```yaml
wrangles:
  - convert.case:
      input: product
      output: product_upper
      case: upper
```

#### Input

```json
[
  {
    "product": "Cordless Drill"
  },
  {
    "product": "bearing seal"
  }
]
```

#### Output

```json
[
  {
    "product": "Cordless Drill",
    "product_upper": "CORDLESS DRILL"
  },
  {
    "product": "bearing seal",
    "product_upper": "BEARING SEAL"
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

Use `convert.case` to normalize capitalization while keeping the source column
or writing the result to a new column.

## Behavior

- Supported modes are `lower`, `upper`, `title`, and `sentence`.
- Omitting `output` overwrites the input column.
- Input and output lists must have equal lengths.
- Non-string values are passed through unchanged and produce a warning.

## Provenance

- [WranglesPY convert.case implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Legacy convert.case documentation](https://wrangles.io/python/recipes/wrangles/convert#case)

## Registry metadata

- Registry ID: `12ff4120-3613-4801-8653-99c793477fbc`
- Namespace: `convert`
- Recipe key: `convert.case`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.convert.case`
- Status: `active`
- Registry version: `0.1.0-pilot`
