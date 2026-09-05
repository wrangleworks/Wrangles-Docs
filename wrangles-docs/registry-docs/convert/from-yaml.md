---
title: "From YAML"
description: "Convert a YAML representation into an object."
sidebar_label: "From YAML"
slug: "/convert/from-yaml"
---

# From YAML

Convert a YAML representation into an object.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `output` | No | string, array, null | Name of the output column. If omitted, the input column will be overwritten. | `null` |
| `default` | No | string, array, object, number, boolean, null | Value to return if the row is empty or fails to be parsed as YAML. If input is a list, default may also be a list - either a single value to apply to all columns, or one value per input column. | `null` |
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

Convert a YAML representation into an object.

## Migrated examples
#### Convert YAML To An Object

##### Recipe

```yaml
wrangles:
  - convert.from_yaml:
      input: column 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

```yaml
Product Specs:
  length: 6 inch
  voltage: 24V
  weight: 3lb
```

</div>

<div className="ww-sample-panel">

##### Output Sample

```python
{
  'Product Specs': {
    'length': '6 inch',
    'voltage': '24V',
    'weight': '3lb'
  }
}
```

</div>

</div>

## Provenance

- [WranglesPY convert.from_yaml implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Existing convert.from_yaml Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/convert/_sources/from-yaml.md)

## Registry metadata

- Registry ID: `b1c20004-5f80-41c2-84d2-2d4601a033b5`
- Namespace: `convert`
- Recipe key: `convert.from_yaml`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.convert.from_yaml`
- Status: `active`
- Registry version: `0.1.0-pilot`
