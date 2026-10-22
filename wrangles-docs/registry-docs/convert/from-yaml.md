---
title: "From YAML"
description: "Convert a YAML representation into an object."
sidebar_label: "From YAML"
slug: "/convert/from-yaml"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# From YAML <CopyableCode value="convert.from_yaml" />

Convert a YAML representation into an object.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Convert a YAML representation into an object",
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the input column."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column. If omitted, the input column will be overwritten"
    },
    "default": {
      "type": [
        "string",
        "array",
        "object",
        "number",
        "boolean",
        "null"
      ],
      "description": "Value to return if the row is empty or fails to be parsed as YAML. If input is a list, default may also be a list - either a single value to apply to all columns, or one value per input column."
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
  - convert.from_yaml:
      input: column 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column 1 |
| --- |
| `Product Specs: {length: 6 inch, voltage: 24V, weight: 3lb}` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| column 1 |
| --- |
| `{'Product Specs': {'length': '6 inch', 'voltage': '24V', 'weight': '3lb'}}` |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. If omitted, the input column will be overwritten | string, array | `null` | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Value to return if the row is empty or fails to be parsed as YAML. If input is a list, default may also be a list - either a single value to apply to all columns, or one value per input column. | string, array, object, number, boolean, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

</details>

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
| Catalog ID | `9` |
| Catalog key | `convert.from_yaml` |
| Recipe key | `convert.from_yaml` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.from_yaml` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `b1c20004-5f80-41c2-84d2-2d4601a033b5` |

**Sources**

- [WranglesPY convert.from_yaml implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Archived convert.from_yaml Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/convert/_sources/from-yaml.md)

</details>
