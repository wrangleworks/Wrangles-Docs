---
title: "True False"
description: "Answers how likely a statement is to be true for the input, with probability_true and the supplied true_criteria. Accepts multiple named questions in one provider request per row. Question labels determine default output names."
sidebar_label: "True False"
slug: "/ai/true-false"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# True False <CopyableCode value="ai.true_false" />

Answers how likely a statement is to be true for the input, with probability_true and the supplied true_criteria. Accepts multiple named questions in one provider request per row. Question labels determine default output names.

Define named questions with `instructions` describing the statement to evaluate. Optional criteria use the quoted keys `"true"` and `"false"`. Each ordinary question returns `probability_true` and `true_criteria`.

Guidance adapted from the [original AI Wrangles documentation](https://wrangles.io/en/python/recipes/wrangles/ai). Parameter tables and nested validation rules are generated from the pinned WranglesPY schema, not maintained separately here.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Input column(s) sent as the shared provider state; omit to supply all columns. Question templates and for_each sources can reference other columns in the row. | string, integer, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `questions` | Questions to answer for each input row, keyed by their distinct labels. | object | — | Yes |
| `api_key` | Typesafe API key; defaults to TYPESAFE_API_KEY. | string | `null` | No |
| `model` | Model ID; defaults to this wrangle's AI catalog selection. | string | `null` | No |
| `provider` | Provider resolved through the AI catalog; currently typesafe. | string; one of:<ul className="ww-param-enum-values"><li>typesafe</li></ul> | `null` | No |
| `protocol` | Provider protocol selected through the AI catalog. | string; one of:<ul className="ww-param-enum-values"><li>systemone</li></ul> | `null` | No |
| `threads` | Maximum row requests in parallel; defaults to the AI catalog. | integer | `null` | No |
| `timeout` | Per-attempt request timeout in seconds; defaults to the AI catalog. | number | `null` | No |
| `retries` | Additional attempts for retryable failures; defaults to the AI catalog. | integer | `null` | No |
| `cache` | Reuse identical successful requests through the shared AI cache. Off by default for Typesafe; set true to enable. | boolean | `null` | No |
| `cache_ttl` | Override the cache result lifetime in seconds. | number | `null` | No |
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
  "additionalProperties": false,
  "required": [
    "questions"
  ],
  "description": "Answers how likely a statement is to be true for the input, with probability_true and the supplied true_criteria. Accepts multiple named questions in one provider request per row. Question labels determine default output names.",
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
      "description": "Input column(s) sent as the shared provider state; omit to supply all columns. Question templates and for_each sources can reference other columns in the row."
    },
    "questions": {
      "type": "object",
      "minProperties": 1,
      "propertyNames": {
        "pattern": "\\S"
      },
      "additionalProperties": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "instructions"
        ],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "true_false"
            ],
            "description": "Question type to answer; optional for a wrangle dedicated to one type."
          },
          "instructions": {
            "anyOf": [
              {
                "type": "string",
                "pattern": "\\S"
              },
              {
                "type": "object",
                "minProperties": 1
              },
              {
                "type": "array",
                "minItems": 1
              }
            ],
            "description": "Question to answer about this row's input, as text or structured instructions. String values support {{ column_name }} references to the current row, with non-alphanumeric characters replaced by underscores. Templates work with or without for_each; missing or ambiguous references fail."
          },
          "for_each": {
            "type": "object",
            "additionalProperties": false,
            "required": [
              "values",
              "variable"
            ],
            "description": "Construct one question per item in this row's source collection, except blank strings. All constructed and ordinary questions share one provider request per row. The output is one column matching the source collection: a list of answers for a list, or a dictionary of answers retaining the original keys for a dictionary. Empty or whitespace-only strings produce {} at the original key or list position, without generating a provider question. Missing keys or positions are not added. Other JSON values are not skipped. An empty list produces [], and an empty dictionary produces {}.",
            "properties": {
              "values": {
                "type": "string",
                "pattern": "\\S",
                "description": "Exact source column name, never a literal collection. Each cell must contain a list or a dictionary with string keys. Use empty-string entries to reserve slots that return {} without scoring. The source column can be outside the selected input columns."
              },
              "variable": {
                "type": "string",
                "pattern": "^[A-Za-z_][A-Za-z0-9_]*$",
                "description": "Local template variable for the current list item or dictionary value. Use {{ variable_name }} in instructions or criterion descriptions. This binding takes precedence over column shorthand within this question."
              }
            }
          },
          "output": {
            "description": "Destination columns in order: probability_true, true_criteria. Omit, use null, or use a blank string for defaults. Defaults are the question label followed by _confidence and _probabilities for `ai.choose`/`ai.score`, or the question label and _true_criteria for `ai.true_false`. An explicit list must name every output column. With for_each, use one column name or a single-entry list; blank defaults to the question label. Each answer retains value and its answer fields; blank-string candidate placeholders return {}.",
            "type": [
              "null",
              "string",
              "array"
            ]
          },
          "criteria": {
            "type": "object",
            "propertyNames": {
              "enum": [
                "true",
                "false"
              ]
            },
            "additionalProperties": {
              "anyOf": [
                {
                  "type": "string",
                  "pattern": "\\S"
                },
                {
                  "type": "object",
                  "minProperties": 1
                },
                {
                  "type": "array",
                  "minItems": 1
                }
              ]
            },
            "description": "Optional criteria keyed by the strings true and false; quote these YAML keys. Description string values support row and for_each template references. The rendered true criterion is retained in the true_criteria output."
          }
        },
        "allOf": [
          {
            "if": {
              "required": [
                "for_each"
              ]
            },
            "then": {
              "properties": {
                "output": {
                  "oneOf": [
                    {
                      "type": "null"
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "array",
                      "minItems": 1,
                      "maxItems": 1,
                      "items": {
                        "type": "string",
                        "pattern": "\\S"
                      }
                    }
                  ]
                }
              }
            },
            "else": {
              "properties": {
                "output": {
                  "oneOf": [
                    {
                      "type": "null"
                    },
                    {
                      "type": "string",
                      "pattern": "^\\s*$"
                    },
                    {
                      "type": "array",
                      "minItems": 2,
                      "maxItems": 2,
                      "uniqueItems": true,
                      "items": {
                        "type": "string",
                        "pattern": "\\S"
                      }
                    }
                  ]
                }
              }
            }
          }
        ]
      },
      "description": "Questions to answer for each input row, keyed by their distinct labels."
    },
    "api_key": {
      "type": "string",
      "description": "Typesafe API key; defaults to TYPESAFE_API_KEY."
    },
    "model": {
      "type": "string",
      "description": "Model ID; defaults to this wrangle's AI catalog selection."
    },
    "provider": {
      "type": "string",
      "enum": [
        "typesafe"
      ],
      "description": "Provider resolved through the AI catalog; currently typesafe."
    },
    "protocol": {
      "type": "string",
      "enum": [
        "systemone"
      ],
      "description": "Provider protocol selected through the AI catalog."
    },
    "threads": {
      "type": "integer",
      "minimum": 1,
      "description": "Maximum row requests in parallel; defaults to the AI catalog."
    },
    "timeout": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "Per-attempt request timeout in seconds; defaults to the AI catalog."
    },
    "retries": {
      "type": "integer",
      "minimum": 0,
      "description": "Additional attempts for retryable failures; defaults to the AI catalog."
    },
    "cache": {
      "type": "boolean",
      "description": "Reuse identical successful requests through the shared AI cache. Off by default for Typesafe; set true to enable."
    },
    "cache_ttl": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "Override the cache result lifetime in seconds."
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
| Catalog ID | `152` |
| Catalog key | `ai.true_false` |
| Recipe key | `ai.true_false` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `ai` |
| Documentation group | `ai` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.ai.true_false` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [AI Wrangles — original documentation](https://wrangles.io/en/python/recipes/wrangles/ai)
- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bd5f88fba479ec406b409cb2880689c54e72b298/wrangles/recipe_wrangles/ai.py)

</details>
