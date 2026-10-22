---
title: "Lookup Wrangles"
description: "Lookup wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Lookup"
slug: "/namespaces/lookup"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Lookup Wrangles

Lookup wrangles, with recipe examples, parameters, and behavior.

## Lookup <CopyableCode value="lookup" /> {#lookup}

Look up data from a saved Lookup Wrangle. Data is output as a dictionary if an output is not specified or the output does not match any columns in the lookup. If specific lookup columns are named in the output, they will be output as individual columns.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Deprecated: Use lookup.key for key lookup models or lookup.semantic for semantic lookup models instead. Lookup values from a saved lookup wrangle.",
  "required": [
    "input",
    "model_id"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer"
      ],
      "description": "Name of the column(s) to lookup."
    },
    "model_id": {
      "type": "string",
      "description": "The model_id to use lookup against"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column(s). When n is provided and the output list length equals n, each output column receives the corresponding match. A single output containing a wildcard (*) is expanded into n columns, e.g. \"Top *\" with n: 3 becomes \"Top 1\", \"Top 2\", \"Top 3\"."
    },
    "n": {
      "type": "integer",
      "description": "Number of matches to return per input value. When the output list length equals n, each output column receives the corresponding match. Otherwise all n matches are stored as a list in each output column."
    },
    "lookup_mode": {
      "type": "string",
      "description": "How to perform lookups. 'by_row' (default): lookup each row individually. 'by_dataframe': lookup unique values once, copy results to all rows. 'by_matrix': lookup once per matrix permutation.",
      "enum": [
        "by_row",
        "by_matrix",
        "by_dataframe"
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

### Examples

```yaml
wrangles:
  - lookup:
      input: State
      output:
        - Abbreviation
      model_id: 55555555-5555-5555
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| State |
| --- |
| Texas |
| New York |
| Virginia |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Abbreviation |
| --- |
| TX |
| NY |
| VA |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to lookup. | string, integer | — | Yes |
| `output` | Name of the output column(s). When n is provided and the output list length equals n, each output column receives the corresponding match. A single output containing a wildcard (*) is expanded into n columns, e.g. "Top *" with n: 3 becomes "Top 1", "Top 2", "Top 3". | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `lookup_mode` | How to perform lookups. 'by_row' (default): lookup each row individually. 'by_dataframe': lookup unique values once, copy results to all rows. 'by_matrix': lookup once per matrix permutation. | string; one of:<ul className="ww-param-enum-values"><li>by_row</li><li>by_matrix</li><li>by_dataframe</li></ul> | `"by_row"` | No |
| `n` | Number of matches to return per input value. When the output list length equals n, each output column receives the corresponding match. Otherwise all n matches are stored as a list in each output column. | integer | `null` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | The model_id to use lookup against | string | `null` | Yes |
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
| Catalog ID | `81` |
| Catalog key | `lookup` |
| Recipe key | `lookup` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `lookup` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.lookup` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `b3339193-d1cc-4c89-8ed6-901efa6d81be` |

**Sources**

- [WranglesPY lookup implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived lookup Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/lookup/_sources/lookup.md)

</details>


---

## Key <CopyableCode value="lookup.key" /> {#key}

Look up values using a saved key lookup model. Requires a WrangleWorks account and a model with purpose lookup and stored variant key. Missing or unknown variants are rejected; use lookup for legacy models.

Usage guidance and examples have not yet been reviewed.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Look up values using a saved key lookup model. Requires a WrangleWorks account and a model with purpose lookup and stored variant key. Missing or unknown variants are rejected; use lookup for legacy models.",
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
      "description": "Existing saved key lookup model ID, not a catalog ID."
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
      "description": "Optional number of matches using the existing lookup behavior. Supported only with by_row. When greater than one, a single output contains a list of match dictionaries unless expanded with a wildcard."
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
      "input": "ProductCode",
      "output": "KeyResult",
      "model_id": "${KEY_LOOKUP_MODEL_ID}"
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
| `model_id` | Existing saved key lookup model ID, not a catalog ID. | string | — | Yes |
| `lookup_mode` | The lookup_mode parameter. |  | `"by_row"` | No |
| `n` | Optional number of matches using the existing lookup behavior. Supported only with by_row. When greater than one, a single output contains a list of match dictionaries unless expanded with a wildcard. | integer, null | `null` | No |
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
| Catalog ID | `101` |
| Catalog key | `lookup.key` |
| Recipe key | `lookup.key` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `lookup` |
| Documentation group | `lookup` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.lookup.key` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bd5f88fba479ec406b409cb2880689c54e72b298/wrangles/recipe_wrangles/lookup.py)

</details>


---

## Semantic <CopyableCode value="lookup.semantic" /> {#semantic}

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
