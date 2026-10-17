---
title: "Parse"
description: "Parse JSON, Python, YAML, or human-readable JSON-like structures into JSON-compatible Python values. YAML-only numeric forms such as 00123 and 12:34 remain strings. YAML anchors, aliases, and explicit tags are not supported. Parsed values retain their Python types, preserving integer precision in mixed columns. Excessively nested inputs use the configured default or raise a contextual ValueError."
sidebar_label: "Parse"
slug: "/convert/parse"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Parse <CopyableCode value="convert.parse" />

Parse JSON, Python, YAML, or human-readable JSON-like structures into JSON-compatible Python values. YAML-only numeric forms such as 00123 and 12:34 remain strings. YAML anchors, aliases, and explicit tags are not supported. Parsed values retain their Python types, preserving integer precision in mixed columns. Excessively nested inputs use the configured default or raise a contextual ValueError.

Usage guidance and examples have not yet been reviewed.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. If omitted, the input columns will be overwritten. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `default` | Value to return for missing, invalid, or type-mismatched rows. If input is a list, default may be a single value applied to every column or a list containing one value per input column. Defaults must be JSON-compatible; NumPy values are normalized and mutable defaults are copied independently for each row. | string, array, object, number, boolean, null | — | No |
| `expected` | Required result category. Use any, dictionary, list, or scalar. A list may provide one category per input column. | string; one of:<ul className="ww-param-enum-values"><li>any</li><li>dictionary</li><li>list</li><li>scalar</li></ul> or array | `"any"` | No |
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



```json
{
  "type": "object",
  "description": "Parse JSON, Python, YAML, or human-readable JSON-like structures into JSON-compatible Python values. YAML-only numeric forms such as 00123 and 12:34 remain strings. YAML anchors, aliases, and explicit tags are not supported. Parsed values retain their Python types, preserving integer precision in mixed columns. Excessively nested inputs use the configured default or raise a contextual ValueError.",
  "additionalProperties": false,
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
      "description": "Name or list of input columns."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output columns. If omitted, the input columns will be overwritten."
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
      "description": "Value to return for missing, invalid, or type-mismatched rows. If input is a list, default may be a single value applied to every column or a list containing one value per input column. Defaults must be JSON-compatible; NumPy values are normalized and mutable defaults are copied independently for each row."
    },
    "expected": {
      "description": "Required result category. Use any, dictionary, list, or scalar. A list may provide one category per input column.",
      "default": "any",
      "oneOf": [
        {
          "type": "string",
          "enum": [
            "any",
            "dictionary",
            "list",
            "scalar"
          ]
        },
        {
          "type": "array",
          "items": {
            "type": "string",
            "enum": [
              "any",
              "dictionary",
              "list",
              "scalar"
            ]
          }
        }
      ]
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



<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | Not reviewed |
| Requires WrangleWorks account | Not reviewed |
| Requires subscription | Not reviewed |
| Requires external API key | Not reviewed |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | Pending API-Core registration |
| Catalog key | `convert.parse` |
| Recipe key | `convert.parse` |
| Catalog status | pending-registration |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.parse` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bd5f88fba479ec406b409cb2880689c54e72b298/wrangles/recipe_wrangles/convert.py)

</details>
