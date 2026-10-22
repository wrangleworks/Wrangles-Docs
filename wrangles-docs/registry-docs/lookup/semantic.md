---
title: "Semantic"
description: "Look up values using a saved semantic lookup model. Requires a WrangleWorks account and a model with purpose lookup and stored variant embedding. Missing or unknown variants are rejected; use lookup for legacy models."
sidebar_label: "Semantic"
slug: "/lookup/semantic"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Semantic <CopyableCode value="lookup.semantic" />

Look up values using a saved semantic lookup model. Requires a WrangleWorks account and a model with purpose lookup and stored variant embedding. Missing or unknown variants are rejected; use lookup for legacy models.

Usage guidance and examples have not yet been reviewed.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Look up values using a saved semantic lookup model. Requires a WrangleWorks account and a model with purpose lookup and stored variant embedding. Missing or unknown variants are rejected; use lookup for legacy models.",
  "additionalProperties": true,
  "required": [
    "input",
    "model_id"
  ],
  "allOf": [
    {
      "if": {
        "required": [
          "n"
        ],
        "properties": {
          "n": {
            "type": "integer"
          }
        }
      },
      "then": {
        "properties": {
          "lookup_mode": {
            "const": "by_row"
          }
        }
      }
    },
    {
      "if": {
        "required": [
          "lookup_mode"
        ],
        "properties": {
          "lookup_mode": {
            "const": "by_matrix"
          }
        }
      },
      "then": {
        "required": [
          "matrix_variables"
        ]
      }
    }
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "items": {
        "type": [
          "string",
          "integer"
        ]
      },
      "minItems": 1,
      "maxItems": 1,
      "description": "One input column, optionally expressed as a single-item list."
    },
    "model_id": {
      "type": "string",
      "description": "Existing saved semantic lookup model ID, not a catalog ID."
    },
    "output": {
      "type": [
        "string",
        "array",
        "null"
      ],
      "default": null,
      "description": "Output column or columns; defaults to the input column. Named lookup columns return their values; other names receive match dictionaries. With n greater than one, n output columns or a wildcard name such as 'Match *' distribute match dictionaries across columns."
    },
    "lookup_mode": {
      "type": "string",
      "default": "by_row",
      "enum": [
        "by_row",
        "by_dataframe",
        "by_matrix"
      ],
      "description": "Look up each row, each distinct input, or each matrix permutation. by_matrix requires matrix_variables in the forwarded options."
    },
    "matrix_variables": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "string"
      },
      "description": "Columns that define the permutations for by_matrix mode."
    },
    "n": {
      "type": [
        "integer",
        "null"
      ],
      "default": null,
      "description": "Optional number of matches. Supported only with by_row. When greater than one, a single output contains a list of match dictionaries unless expanded with a wildcard. Each of n output columns receives one match."
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
  },
  "examples": [
    {
      "input": "Description",
      "output": "Match *",
      "model_id": "${SEMANTIC_LOOKUP_MODEL_ID}",
      "n": 3
    }
  ]
}
```

</details>



<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | One input column, optionally expressed as a single-item list. | string, integer, array | — | Yes |
| `output` | Output column or columns; defaults to the input column. Named lookup columns return their values; other names receive match dictionaries. With n greater than one, n output columns or a wildcard name such as 'Match *' distribute match dictionaries across columns. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `model_id` | Existing saved semantic lookup model ID, not a catalog ID. | string | — | Yes |
| `lookup_mode` | The lookup_mode parameter. |  | `"by_row"` | No |
| `n` | Optional number of matches. Supported only with by_row. When greater than one, a single output contains a list of match dictionaries unless expanded with a wildcard. Each of n output columns receives one match. | integer, null | `null` | No |
| `matrix_variables` | Columns that define the permutations for by_matrix mode. | array | — | Conditional; see schema |
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
| Catalog ID | `102` |
| Catalog key | `lookup.semantic` |
| Recipe key | `lookup.semantic` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `lookup` |
| Documentation group | `lookup` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.lookup.semantic` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bd5f88fba479ec406b409cb2880689c54e72b298/wrangles/recipe_wrangles/lookup.py)

</details>
