---
title: "Replace"
description: "Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field."
sidebar_label: "Replace"
slug: "/standardize/replace"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Replace <CopyableCode value="standardize.replace" />

Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field.

Usage guidance and examples have not yet been reviewed.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "90",
  "status": "active",
  "description": "Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field.",
  "additionalProperties": false,
  "required": [
    "input",
    "find",
    "replace"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name or list of input column"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output column"
    },
    "find": {
      "type": "string",
      "description": "Pattern to find using regex"
    },
    "replace": {
      "type": "string",
      "description": "Value to replace the pattern found"
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

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input column | string, integer, array | — | Yes |
| `output` | Name or list of output column | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `find` | Pattern to find using regex | string | — | Yes |
| `replace` | Value to replace the pattern found | string | — | Yes |
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
| AI-powered | Not reviewed |
| Requires WrangleWorks account | Not reviewed |
| Requires subscription | Not reviewed |
| Requires external API key | Not reviewed |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `90` |
| Catalog key | `standardize.replace` |
| Recipe key | `standardize.replace` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `standardize` |
| Documentation group | `standardize` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.standardize.replace` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/standardize.py)

</details>
