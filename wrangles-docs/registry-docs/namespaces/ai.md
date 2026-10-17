---
title: "AI Wrangles"
description: "AI wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "AI"
slug: "/namespaces/ai"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# AI Wrangles

AI wrangles, with recipe examples, parameters, and behavior.

## Answers <CopyableCode value="ai.answers" /> {#answers}

Answers any combination of `choose`, `score`, and `true_false` questions about the input with structured results. Accepts multiple named questions in one provider request per row. Question labels determine default output names.

Combine `choose`, `score`, and `true_false` questions in one wrangle. Each question must declare its `type`; its other rules follow that question type. Named questions for the same row share one provider request.

Guidance adapted from the [original AI Wrangles documentation](https://wrangles.io/en/python/recipes/wrangles/ai). Parameter tables and nested validation rules are generated from the pinned WranglesPY schema, not maintained separately here.

### Parameters

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
  "description": "Answers any combination of `choose`, `score`, and `true_false` questions about the input with structured results. Accepts multiple named questions in one provider request per row. Question labels determine default output names.",
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
        "oneOf": [
          {
            "type": "object",
            "additionalProperties": false,
            "required": [
              "instructions",
              "criteria",
              "type"
            ],
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "choose"
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
                "description": "Destination columns in order: choice, confidence, probabilities. Omit, use null, or use a blank string for defaults. Defaults are the question label followed by _confidence and _probabilities for `ai.choose`/`ai.score`, or the question label and _true_criteria for `ai.true_false`. An explicit list must name every output column. With for_each, use one column name or a single-entry list; blank defaults to the question label. Each answer retains value and its answer fields; blank-string candidate placeholders return {}.",
                "type": [
                  "null",
                  "string",
                  "array"
                ]
              },
              "criteria": {
                "type": "object",
                "minProperties": 1,
                "maxProperties": 255,
                "propertyNames": {
                  "pattern": "\\S"
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
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "description": "Choice labels mapped to their descriptions or structured criteria. Description string values support row and for_each template references; labels stay literal."
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
                          "minItems": 3,
                          "maxItems": 3,
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
          {
            "type": "object",
            "additionalProperties": false,
            "required": [
              "instructions",
              "criteria",
              "type"
            ],
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "score"
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
                "description": "Destination columns in order: score, confidence, probabilities. Omit, use null, or use a blank string for defaults. Defaults are the question label followed by _confidence and _probabilities for `ai.choose`/`ai.score`, or the question label and _true_criteria for `ai.true_false`. An explicit list must name every output column. With for_each, use one column name or a single-entry list; blank defaults to the question label. Each answer retains value and its answer fields; blank-string candidate placeholders return {}.",
                "type": [
                  "null",
                  "string",
                  "array"
                ]
              },
              "criteria": {
                "type": "array",
                "minItems": 2,
                "maxItems": 10,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "pattern": "\\S"
                },
                "description": "Distinct criterion descriptions used as probability keys. For `ai.score`, order defines the native zero-based score positions; no custom scale. Descriptions support {{ column_name }} and local for_each variable references. Rendered descriptions must remain distinct and become the probability keys."
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
                          "minItems": 3,
                          "maxItems": 3,
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
          {
            "type": "object",
            "additionalProperties": false,
            "required": [
              "instructions",
              "type"
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
| Catalog ID | Pending API-Core registration |
| Catalog key | `ai.answers` |
| Recipe key | `ai.answers` |
| Catalog status | pending-registration |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `ai` |
| Documentation group | `ai` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.ai.answers` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [AI Wrangles — original documentation](https://wrangles.io/en/python/recipes/wrangles/ai)
- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bd5f88fba479ec406b409cb2880689c54e72b298/wrangles/recipe_wrangles/ai.py)

</details>


---

## Choose <CopyableCode value="ai.choose" /> {#choose}

Answers which option best fits the input, with the choice, confidence, and complete probabilities. Accepts multiple named questions in one provider request per row. Question labels determine default output names.

Define named questions with `instructions` and a `criteria` object whose keys are the available choices. Each ordinary question returns the selected choice, confidence, and probabilities.

Use `api_key: ${TYPESAFE_API_KEY}` to supply your Typesafe credential. The key can also be read from the `TYPESAFE_API_KEY` environment variable.

Guidance adapted from the [original AI Wrangles documentation](https://wrangles.io/en/python/recipes/wrangles/ai). Parameter tables and nested validation rules are generated from the pinned WranglesPY schema, not maintained separately here.

### Parameters

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
  "description": "Answers which option best fits the input, with the choice, confidence, and complete probabilities. Accepts multiple named questions in one provider request per row. Question labels determine default output names.",
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
          "instructions",
          "criteria"
        ],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "choose"
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
            "description": "Destination columns in order: choice, confidence, probabilities. Omit, use null, or use a blank string for defaults. Defaults are the question label followed by _confidence and _probabilities for `ai.choose`/`ai.score`, or the question label and _true_criteria for `ai.true_false`. An explicit list must name every output column. With for_each, use one column name or a single-entry list; blank defaults to the question label. Each answer retains value and its answer fields; blank-string candidate placeholders return {}.",
            "type": [
              "null",
              "string",
              "array"
            ]
          },
          "criteria": {
            "type": "object",
            "minProperties": 1,
            "maxProperties": 255,
            "propertyNames": {
              "pattern": "\\S"
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
                },
                {
                  "type": "null"
                }
              ]
            },
            "description": "Choice labels mapped to their descriptions or structured criteria. Description string values support row and for_each template references; labels stay literal."
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
                      "minItems": 3,
                      "maxItems": 3,
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
| Catalog ID | Pending API-Core registration |
| Catalog key | `ai.choose` |
| Recipe key | `ai.choose` |
| Catalog status | pending-registration |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `ai` |
| Documentation group | `ai` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.ai.choose` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [AI Wrangles — original documentation](https://wrangles.io/en/python/recipes/wrangles/ai)
- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bd5f88fba479ec406b409cb2880689c54e72b298/wrangles/recipe_wrangles/ai.py)

</details>


---

## Score <CopyableCode value="ai.score" /> {#score}

Answers where the input falls along ordered criteria, with the native score, confidence, and complete probabilities. Accepts multiple named questions in one provider request per row. Question labels determine default output names.

Define named questions with `instructions` and an ordered list of `criteria`. The order determines the zero-based score positions. Each ordinary question returns the score, confidence, and probabilities.

Column references in instructions can use `{{ column_name }}`. Use `for_each` when a question should evaluate candidates stored in a list or dictionary column.

Guidance adapted from the [original AI Wrangles documentation](https://wrangles.io/en/python/recipes/wrangles/ai). Parameter tables and nested validation rules are generated from the pinned WranglesPY schema, not maintained separately here.

### Parameters

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
  "description": "Answers where the input falls along ordered criteria, with the native score, confidence, and complete probabilities. Accepts multiple named questions in one provider request per row. Question labels determine default output names.",
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
          "instructions",
          "criteria"
        ],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "score"
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
            "description": "Destination columns in order: score, confidence, probabilities. Omit, use null, or use a blank string for defaults. Defaults are the question label followed by _confidence and _probabilities for `ai.choose`/`ai.score`, or the question label and _true_criteria for `ai.true_false`. An explicit list must name every output column. With for_each, use one column name or a single-entry list; blank defaults to the question label. Each answer retains value and its answer fields; blank-string candidate placeholders return {}.",
            "type": [
              "null",
              "string",
              "array"
            ]
          },
          "criteria": {
            "type": "array",
            "minItems": 2,
            "maxItems": 10,
            "uniqueItems": true,
            "items": {
              "type": "string",
              "pattern": "\\S"
            },
            "description": "Distinct criterion descriptions used as probability keys. For `ai.score`, order defines the native zero-based score positions; no custom scale. Descriptions support {{ column_name }} and local for_each variable references. Rendered descriptions must remain distinct and become the probability keys."
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
                      "minItems": 3,
                      "maxItems": 3,
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
| Catalog ID | Pending API-Core registration |
| Catalog key | `ai.score` |
| Recipe key | `ai.score` |
| Catalog status | pending-registration |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `ai` |
| Documentation group | `ai` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.ai.score` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [AI Wrangles — original documentation](https://wrangles.io/en/python/recipes/wrangles/ai)
- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bd5f88fba479ec406b409cb2880689c54e72b298/wrangles/recipe_wrangles/ai.py)

</details>


---

## True False <CopyableCode value="ai.true_false" /> {#true-false}

Answers how likely a statement is to be true for the input, with probability_true and the supplied true_criteria. Accepts multiple named questions in one provider request per row. Question labels determine default output names.

Define named questions with `instructions` describing the statement to evaluate. Optional criteria use the quoted keys `"true"` and `"false"`. Each ordinary question returns `probability_true` and `true_criteria`.

Guidance adapted from the [original AI Wrangles documentation](https://wrangles.io/en/python/recipes/wrangles/ai). Parameter tables and nested validation rules are generated from the pinned WranglesPY schema, not maintained separately here.

### Parameters

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
| Catalog ID | Pending API-Core registration |
| Catalog key | `ai.true_false` |
| Recipe key | `ai.true_false` |
| Catalog status | pending-registration |
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


---

## Classify <CopyableCode value="classify" /> {#classify}

Run classify wrangles on the specified columns. Requires WrangleWorks Account and Subscription.

Run a custom classification wrangle on the specified column or columns. A classification wrangle must be trained first.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array | — | Yes |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `include_confidence` | For models that support it, include the confidence level in the output | boolean | — | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | ID of the classification model to be used | string | — | Yes |
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
  "description": "Run classify wrangles on the specified columns.\nRequires WrangleWorks Account and Subscription.\n",
  "required": [
    "input",
    "output",
    "model_id"
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
      "description": "Name of the output column."
    },
    "model_id": {
      "type": "string",
      "description": "ID of the classification model to be used"
    },
    "include_confidence": {
      "type": "boolean",
      "description": "For models that support it, include the confidence level in the output"
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
  - classify:
      input: Products
      output: Category
      model_id: ${model_id}
      where: Products = Milk
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Products |
| --- |
| Rice |
| Milk |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Category |
| --- |
|  |
| Dairy |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `71` |
| Catalog key | `classify` |
| Recipe key | `classify` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `ai` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.classify` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `06669ef8-cdd1-42f7-8078-98e0b7a42c30` |

**Sources**

- [WranglesPY classify implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived classify Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/ai/_sources/classify.md)

</details>


---

## Huggingface <CopyableCode value="huggingface" /> {#huggingface}

Use a model from huggingface.

Use a model from huggingface

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. If not provided, will overwrite the input column<br /> | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `parameters` | Optionally, provide additional parameters to define the model behaviour | object | `null` | No |
| `timeout` | Request timeout in seconds; defaults to the AI configuration. | number | `null` | No |
| `retries` | Additional attempts after transient failures; defaults to the AI configuration. | integer | `null` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `api_token` | Huggingface API Token | string | — | Yes |
| `model` | Name of the model to use. e.g. facebook/bart-large-cnn | string | — | Yes |
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
  "description": "Use a model from huggingface",
  "required": [
    "input",
    "api_token",
    "model"
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
      "description": "Name of the output column. If not provided, will overwrite the input column\n"
    },
    "model": {
      "type": "string",
      "description": "Name of the model to use. e.g. facebook/bart-large-cnn"
    },
    "api_token": {
      "type": "string",
      "description": "Huggingface API Token"
    },
    "parameters": {
      "type": "object",
      "description": "Optionally, provide additional parameters to define the model behaviour"
    },
    "timeout": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "Request timeout in seconds; defaults to the AI configuration."
    },
    "retries": {
      "type": "integer",
      "minimum": 0,
      "description": "Additional attempts after transient failures; defaults to the AI configuration."
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

This template uses a Hugging Face summarization model. The exact response shape and text depend on the selected model.



```yaml
wrangles:
  - huggingface:
      input:
        - Product Description
      output:
        - Summary
      api_token: Your Hugging Face API token
      model: facebook/bart-large-cnn
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Description |
| --- |
| A cordless drill with two batteries, a charger, and a compact carrying case. |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Summary |
| --- |
| Cordless drill kit with batteries, charger, and case. |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

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
| Catalog ID | `79` |
| Catalog key | `huggingface` |
| Recipe key | `huggingface` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `ai` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.huggingface` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `ae12cf20-4934-428f-84a9-a6898cb7ffe0` |

**Sources**

- [WranglesPY huggingface implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived huggingface Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/ai/_sources/huggingface.md)

</details>
