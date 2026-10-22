---
title: "Pad"
description: "Pad a string to a fixed length."
sidebar_label: "Pad"
slug: "/format/pad"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Pad <CopyableCode value="format.pad" />

Pad a string to a fixed length

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Pad a string to a fixed length",
  "additionalProperties": false,
  "required": [
    "input",
    "pad_length",
    "side",
    "char"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the input column"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column"
    },
    "pad_length": {
      "type": [
        "number"
      ],
      "description": "Length for the output"
    },
    "side": {
      "type": [
        "string"
      ],
      "description": "Side from which to fill resulting string"
    },
    "char": {
      "type": [
        "string"
      ],
      "description": "The character to pad the input with"
    },
    "skip_empty": {
      "type": "boolean",
      "description": "If true, skip padding for empty or whitespace-only values",
      "default": false
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
  - format.pad:
      input: Part Number
      pad_length: 5
      side: left
      char: "-"
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Part Number |
| --- |
| 0458 |
| 396 |
| 84 |
| 98516 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Part Number |
| --- |
| -0458 |
| --396 |
| ---84 |
| 98516 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column | string, integer, array | — | Yes |
| `output` | Name of the output column | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `side` | Side from which to fill resulting string | string | — | Yes |
| `skip_empty` | If true, skip padding for empty or whitespace-only values | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `pad_length` | Length for the output | number | — | Yes |
| `char` | The character to pad the input with | string | — | Yes |
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
| Catalog ID | `32` |
| Catalog key | `format.pad` |
| Recipe key | `format.pad` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.pad` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `76c19378-38f4-45aa-85d1-3cdf8f8aae29` |

**Sources**

- [WranglesPY format.pad implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Archived format.pad Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/pad.md)

</details>
