---
title: "To YAML"
description: "Convert an object to a YAML representation."
sidebar_label: "To YAML"
slug: "/convert/to-yaml"
---

# To YAML

Convert an object to a YAML representation.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `output` | No | string, array, null | Name of the output column. If omitted, the input column will be overwritten. | `null` |
| `sort_keys` | No | boolean | If sort_keys is true (default: False), then the output of dictionaries will be sorted by key. | `false` |
| `allow_unicode` | No | boolean | Allow Unicode value accepted by the runtime. | `true` |
| `indent` | No | integer | Specify the number of spaces for indentation to specify nested elements. | — |
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

Convert an object to a YAML representation.

## Migrated examples
#### Convert a Dictionary to YAML

##### Recipe

```yaml
wrangles:
  - convert.to_yaml:
      input: column 1
      indent: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

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

<div className="ww-sample-panel">

##### Output Sample

```yaml
Product Specs:
  length: 6 inch
  voltage: 24V
  weight: 3lb
```

</div>

</div>

## Provenance

- [WranglesPY convert.to_yaml implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Existing convert.to_yaml Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/convert/_sources/to-yaml.md)

## Registry metadata

- Registry ID: `4cd6252f-ce47-4a9d-8272-3d87e875b72a`
- Namespace: `convert`
- Recipe key: `convert.to_yaml`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.convert.to_yaml`
- Status: `active`
- Registry version: `0.1.0-pilot`
