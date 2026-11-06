---
title: "Tokenize"
description: "Split text into tokens. A variety of methods are available. The default method is to split on spaces."
sidebar_label: "Tokenize"
slug: "/structure/tokenize"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Tokenize <CopyableCode value="structure.tokenize" />

Split text into tokens. A variety of methods are available. The default method is to split on spaces.

Usage guidance and examples have not yet been reviewed.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "66",
  "status": "active",
  "description": "Split text into tokens. A variety of methods are available. The default method is to split on spaces.",
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
      "description": "Column(s) to be split into tokens"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column"
    },
    "method": {
      "anyOf": [
        {
          "type": "string",
          "enum": [
            "space",
            "boundary",
            "boundary_ignore_space"
          ],
          "description": "Method to split the list. Options: space, boundary, boundary_ignore_space or use a custom function with custom.<function> or use a regex pattern with regex:<pattern>"
        },
        {
          "type": "string",
          "description": "Method to split the list. Options: space, boundary, boundary_ignore_space or use a custom function with custom.<function> or use a regex pattern with regex:<pattern>"
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

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Column(s) to be split into tokens | string, integer, array | — | Yes |
| `output` | Name of the output column | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | The method parameter. | string; one of:<ul className="ww-param-enum-values"><li>space</li><li>boundary</li><li>boundary_ignore_space</li></ul> or string | `"space"` | No |
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
| Catalog ID | `66` |
| Catalog key | `structure.tokenize` |
| Recipe key | `structure.tokenize` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `structure` |
| Documentation group | `structure` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.structure.tokenize` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/structure.py)

</details>
