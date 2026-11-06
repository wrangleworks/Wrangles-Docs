---
title: "Split Text"
description: "Split a string to multiple columns or a list."
sidebar_label: "Split Text"
slug: "/structure/split-text"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Split Text <CopyableCode value="structure.split_text" />

Split a string to multiple columns or a list.

Usage guidance and examples have not yet been reviewed.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "65",
  "status": "active",
  "description": "Split a string to multiple columns or a list.",
  "additionalProperties": false,
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": "string",
      "description": "Name of the column to be split"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column(s)\nIf a single column is provided,\nthe results will be returned as a list\nIf multiple columns are listed,\nthe results will be separated into the columns.\nIf omitted, will overwrite the input."
    },
    "char": {
      "type": "string",
      "description": "Set the character(s) to split on.\nDefault comma (,)\nCan also prefix with \"regex:\" to split on a pattern."
    },
    "pad": {
      "type": "boolean",
      "description": "Choose whether to pad to ensure a consistent length. Default true if outputting to columns, false for lists."
    },
    "element": {
      "type": [
        "integer",
        "string"
      ],
      "description": "Select a specific element or range after splitting using slicing syntax. e.g. 0, \":5\", \"5:\", \"2:8:2\""
    },
    "inclusive": {
      "type": "boolean",
      "description": "If true, include the split character in the output. Default False"
    },
    "skip_empty": {
      "type": "boolean",
      "description": "Whether to skip empty values",
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



<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to be split | string | — | Yes |
| `output` | Name of the output column(s)<br />If a single column is provided,<br />the results will be returned as a list<br />If multiple columns are listed,<br />the results will be separated into the columns.<br />If omitted, will overwrite the input. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `char` | Set the character(s) to split on.<br />Default comma (,)<br />Can also prefix with "regex:" to split on a pattern. | string | `","` | No |
| `pad` | Choose whether to pad to ensure a consistent length. Default true if outputting to columns, false for lists. | boolean | `null` | No |
| `element` | Select a specific element or range after splitting using slicing syntax. e.g. 0, ":5", "5:", "2:8:2" | integer, string | `null` | No |
| `inclusive` | If true, include the split character in the output. Default False | boolean | `false` | No |
| `skip_empty` | Whether to skip empty values | boolean | `false` | No |
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
| Catalog ID | `65` |
| Catalog key | `structure.split_text` |
| Recipe key | `structure.split_text` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `structure` |
| Documentation group | `structure` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.structure.split_text` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/structure.py)

</details>
