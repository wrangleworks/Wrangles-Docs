---
title: "Convert Data Type"
description: "Convert values to strings, numbers, booleans, or datetimes."
sidebar_label: "Convert Data Type"
slug: "/convert/data-type"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Convert Data Type <CopyableCode value="convert.data_type" />

Convert values to strings, numbers, booleans, or datetimes.

Use `convert.data_type` when a recipe needs consistent Python-compatible
values rather than display-only formatting.

## Behavior

- Supported target types are `str`, `float`, `int`, `bool`, and `datetime`.
- Omitting `data_type` uses the runtime default `str`.
- Omitting `output` overwrites the input column.
- Failed conversions retain the original value unless `default` is supplied.
- Additional undocumented keyword arguments are implementation details and are
  not part of the public Registry contract.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns | string, integer, array | — | Yes |
| `output` | Name or list of output columns | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `data_type` | The new data type | string; one of:<ul className="ww-param-enum-values"><li>str</li><li>float</li><li>int</li><li>bool</li><li>datetime</li></ul> | `"str"` | Yes |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Set the default value to return if the input data <br />cannot be converted to the specified data_type. | string, number, array, boolean | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).

Compatibility correction: JSON Schema has no datetime primitive; JSON timestamps use string.

```json
{
  "type": "object",
  "description": "Change the data type of the input.",
  "additionalProperties": false,
  "required": [
    "input",
    "data_type"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name or list of input columns"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output columns"
    },
    "data_type": {
      "type": "string",
      "description": "The new data type",
      "enum": [
        "str",
        "float",
        "int",
        "bool",
        "datetime"
      ]
    },
    "default": {
      "type": [
        "string",
        "number",
        "array",
        "boolean"
      ],
      "description": "Set the default value to return if the input data \ncannot be converted to the specified data_type."
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    },
    "where": {
      "$ref": "#/$defs/wrangles/commonProperties/where"
    },
    "where_params": {
      "$ref": "#/$defs/wrangles/commonProperties/where_params"
    }
  }
}
```

</details>

## Examples

```yaml
wrangles:
  - convert.data_type:
      input: quantity
      output: quantity_integer
      data_type: int
      default: 0
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| quantity |
| --- |
| 12 |
| not available |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| quantity_integer |
| --- |
| 12 |
| 0 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `6` |
| Catalog key | `convert.data_type` |
| Recipe key | `convert.data_type` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.data_type` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `52384f01-7164-404f-8615-063e7677a588` |

**Sources**

- [WranglesPY convert.data_type implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Legacy convert.data_type documentation](https://wrangles.io/python/recipes/wrangles/convert#data-type)

</details>
