---
title: "Extract Wrangles"
description: "Extract wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Extract"
slug: "/namespaces/extract"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Extract Wrangles

Extract wrangles, with recipe examples, parameters, and behavior.

## Address <CopyableCode value="extract.address" /> {#address}

Extract parts of addresses. Requires WrangleWorks Account.

Extract geographical information from unstructured text such as streets, cities, or countries. Requires WrangleWorks Account.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `dataType` | Specific part of the address to extract | string; one of:<ul className="ww-param-enum-values"><li>streets</li><li>cities</li><li>regions</li><li>countries</li></ul> | — | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_format` | Format of the extract output | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate | string | `", "` | No |
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
  "description": "Extract parts of addresses. Requires WrangleWorks Account.",
  "required": [
    "input",
    "output"
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
    "dataType": {
      "type": "string",
      "description": "Specific part of the address to extract",
      "enum": [
        "streets",
        "cities",
        "regions",
        "countries"
      ]
    },
    "output_format": {
      "type": "string",
      "description": "Format of the extract output",
      "enum": [
        "list",
        "columns",
        "concatenate"
      ]
    },
    "char": {
      "type": "string",
      "description": "Character to use when output_format is concatenate"
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
  - extract.address:
      input: Location
      output: Street
      dataType: streets
      where: SUBSTRING(Location, 1, 3) = '221'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Location |
| --- |
| 221 B Baker St., London, England, United Kingdom |
| London SW1A 1AA, London, England, United Kingdom |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Street |
| --- |
| ['221 B Baker St.'] |
|  |

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
| Catalog ID | `20` |
| Catalog key | `extract.address` |
| Recipe key | `extract.address` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.address` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `44153f95-4581-4cee-898e-b3b4714045fd` |

**Sources**

- [WranglesPY extract.address implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.address Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/address.md)

</details>


---

## AI <CopyableCode value="extract.ai" /> {#ai}

Extract structured data from each input row using an AI model. Define the desired fields with output, or reuse a saved definition with model_id.

Use AI to extract meaningful structured data. `extract.ai` can be used recipe-first, where the output schema is defined in the recipe, or model-first, where a saved extract.ai model is called by `model_id`.

:::info
For saved extract.ai models, this is the preferred calling pattern compared with using `extract.custom`.
:::

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Input column name, column index, or list of columns supplied together as DATA for each row. If omitted, all dataframe columns are supplied. | string, integer, array | `null` | No |
| `output` | Desired extraction. Use an object keyed by output column name for structured fields, a string for one prompted value, or an array of field names/definitions. Each field may use the schema options below. | object, string, array | `null` | Conditional; see schema |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `record_examples` | Whole-record examples. Each example has a separate input value or record and the complete expected output record. Optional name and notes provide model-visible context. Use &#123;name: ..., notes: ..., input: ..., output: ...&#125;. Omitted nullable output fields are completed with null. Required non-null nested properties must be supplied. This differs from examples nested under one output field, which teach only that field. | array, object | `null` | No |
| `web_search` | Enable OpenAI Responses web search; the model decides when searching helps. When true, every row also receives web_search_sources: a deduplicated list of &#123;title, url&#125; objects in source order, or an empty list when no source was used. This reserved column is automatic. Requires protocol responses. Defaults to false. | boolean | `false` | No |
| `instructions` | General instructions applied to every input row, in addition to any GeneralInstructions in the saved model. Use this for decision rules, evidence priorities, normalization requirements, or other behavior that applies to the complete extraction. | string, array | `null` | No |
| `metadata` | Labels attached to OpenAI requests, such as recipe_name and wrangles_user. Available recipe name and Wrangles user are added automatically. Explicit labels override those defaults; an empty object disables automatic labels. These appear with stored logs and are separate from model instructions. Up to 16 string pairs; keys may contain up to 64 characters and values up to 512 characters. Does not enable workflow tracing. | object | — | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_format` | How extracted fields are written. columns writes one dataframe column per field (default); dictionary keeps one object; concatenate joins fields into one string using char. | string; one of:<ul className="ww-param-enum-values"><li>dictionary</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Separator used only when output_format is concatenate. Defaults to comma-space. | string | `", "` | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `threads` | Maximum number of row-level requests sent in parallel. The configured default is 32. | integer | — | No |
| `timeout` | Network timeout in seconds for each HTTP attempt. The configured default is 12. Each retry uses the same timeout. | number | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `retries` | Number of additional attempts per row after a retryable failure. The configured default is 1. Retry delays are separate from timeout. | integer | — | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `api_key` | OpenAI API key used for this wrangle, normally supplied through a recipe variable. | string | — | Yes |
| `model_id` | ID of a saved extract.ai definition. Use it instead of defining an output schema. When output is also supplied with model_id in a recipe, output names the destination column or columns for the saved fields. | string | `null` | Conditional; see schema |
| `model` | OpenAI model ID for this call. If omitted, uses the configured extract.ai default; a saved model definition may supply its own model. | string | — | No |
| `url` | Override the endpoint for the selected protocol. A chat/completions URL<br />selects the legacy protocol only when protocol is omitted; new recipes<br />should use the configured Responses endpoint. | string | — | No |
| `provider` | AI service provider. Currently only OpenAI is supported. | string; one of:<ul className="ww-param-enum-values"><li>openai</li></ul> | — | No |
| `protocol` | OpenAI API protocol. Responses is the configured default and is required for web_search; chat_completions remains available for legacy definitions. | string; one of:<ul className="ww-param-enum-values"><li>responses</li><li>chat_completions</li></ul> | — | No |
| `store` | Whether OpenAI may store Responses API results. Defaults to true. | boolean | — | No |
| `cache` | Reuse identical successful results from the bounded warm-instance cache. Defaults to true. Set false when fresh model or web results are required. | boolean | — | No |
| `cache_ttl` | Maximum age in seconds for a cached result used by this call. Applies to extracted values and web_search_sources together. | number | — | No |
| `strict` | Require OpenAI structured-output strict mode. Defaults to true. Definitions with dynamic dictionary keys automatically switch to non-strict provider mode and are still validated locally. | boolean | — | No |
| `reasoning` | Reasoning effort, such as none or low, or an object with effort and other reasoning options. Both forms are equivalent for setting effort. Defaults to none for every model. Explicit settings are always sent to the provider; unsupported settings produce a provider error. | string; one of:<ul className="ww-param-enum-values"><li>none</li><li>minimal</li><li>low</li><li>medium</li><li>high</li><li>xhigh</li><li>max</li></ul> or object | — | No |
| `verbosity` | Responses API text verbosity for compatible models. Defaults to low when supported; ignored with a warning for incompatible models. | string; one of:<ul className="ww-param-enum-values"><li>low</li><li>medium</li><li>high</li></ul> | — | No |
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
  "description": "Extract structured data from each input row using an AI model. Define the desired fields with output, or reuse a saved definition with model_id.",
  "additionalProperties": false,
  "required": [
    "api_key"
  ],
  "anyOf": [
    {
      "required": [
        "output"
      ]
    },
    {
      "required": [
        "model_id"
      ]
    }
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Input column name, column index, or list of columns supplied together as DATA for each row. If omitted, all dataframe columns are supplied.",
      "items": {
        "type": [
          "string",
          "integer"
        ]
      }
    },
    "output": {
      "type": [
        "object",
        "string",
        "array"
      ],
      "description": "Desired extraction. Use an object keyed by output column name for structured fields, a string for one prompted value, or an array of field names/definitions. Each field may use the schema options below.",
      "patternProperties": {
        "^[a-zA-Z0-9 _-]+$": {
          "type": [
            "object",
            "string"
          ],
          "properties": {
            "type": {
              "type": "string",
              "description": "JSON data type required for this field. If omitted, common scalar types are accepted. Fields allow null by default.",
              "enum": [
                "string",
                "number",
                "integer",
                "boolean",
                "null",
                "object",
                "array"
              ]
            },
            "description": {
              "type": "string",
              "description": "Plain-language definition of the value to extract, including any selection, normalization, unit, or evidence rules."
            },
            "enum": {
              "type": "array",
              "description": "Allowed output values. The model must choose one of these values; null is also allowed unless nullable is false."
            },
            "default": {
              "type": [
                "string",
                "number",
                "integer",
                "boolean",
                "null",
                "object",
                "array"
              ],
              "description": "JSON Schema annotation for a preferred default. extract.ai does not substitute this value when evidence is missing; describe fallback behavior explicitly or allow null."
            },
            "examples": {
              "title": "Field examples",
              "type": [
                "array",
                "object",
                "string",
                "number",
                "integer",
                "boolean",
                "null"
              ],
              "description": "Field-specific examples. The backward-compatible form is a scalar or list of typical output values. A paired example may instead use input and output, with optional name and notes. Paired examples apply only to this output field; use record_examples for complete output records. Object outputs must include every required non-null nested property.",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Optional label included with this paired field example."
                },
                "notes": {
                  "type": "string",
                  "description": "Optional explanatory guidance included with this paired field example."
                },
                "input": {
                  "description": "Source value or record for this paired field example. Plain multiline strings remain text; use an explicit object when the runtime input is structured."
                },
                "output": {
                  "description": "Expected value for this output field only."
                }
              },
              "items": {
                "anyOf": [
                  {
                    "type": "object",
                    "required": [
                      "input",
                      "output"
                    ],
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "Optional label included with this paired field example."
                      },
                      "notes": {
                        "type": "string",
                        "description": "Optional explanatory guidance included with this paired field example."
                      },
                      "input": {
                        "description": "Source value or record for this paired field example. Plain multiline strings remain text; use an explicit object when the runtime input is structured."
                      },
                      "output": {
                        "description": "Expected value for this output field only."
                      }
                    }
                  },
                  {
                    "description": "Backward-compatible output-only example value."
                  }
                ]
              }
            },
            "properties": {
              "type": [
                "object",
                "array",
                "string"
              ],
              "description": "Child fields when type is object. Use an object to define a schema for each child. A list or comma-separated string is a shortcut that creates fixed child names. Named child values are non-null by default."
            },
            "required": {
              "type": [
                "array",
                "string"
              ],
              "description": "Named object properties that must be returned. If omitted, every named property is required. Strings may use pipe or comma delimiters."
            },
            "additionalProperties": {
              "type": [
                "boolean",
                "object"
              ],
              "description": "Controls keys beyond properties when type is object. Set false for fixed keys, true for arbitrary values, or provide one schema applied to every dynamic value. Dynamic dictionaries use non-strict provider mode plus local validation. Defaults to false when named properties exist."
            },
            "items": {
              "type": "object",
              "description": "Schema applied to every element when this field's type is array."
            },
            "nullable": {
              "type": "boolean",
              "description": "Whether the field may return null. Defaults to true while a top-level field key remains required. Named nested properties default to false. Set this explicitly to override the applicable default."
            }
          }
        }
      }
    },
    "record_examples": {
      "title": "Record examples",
      "type": [
        "array",
        "object"
      ],
      "description": "Whole-record examples. Each example has a separate input value or record and the complete expected output record. Optional name and notes provide model-visible context. Use {name: ..., notes: ..., input: ..., output: ...}. Omitted nullable output fields are completed with null. Required non-null nested properties must be supplied. This differs from examples nested under one output field, which teach only that field.",
      "required": [
        "input",
        "output"
      ],
      "properties": {
        "name": {
          "type": "string",
          "description": "Optional label used to identify this example in the prompt."
        },
        "notes": {
          "type": "string",
          "description": "Optional explanatory guidance included with this example."
        },
        "input": {
          "description": "Source value or record the example should match."
        },
        "output": {
          "description": "Expected result using the field names defined by output."
        }
      },
      "items": {
        "type": "object",
        "required": [
          "input",
          "output"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Optional label used to identify this example in the prompt."
          },
          "notes": {
            "type": "string",
            "description": "Optional explanatory guidance included with this example."
          },
          "input": {
            "description": "Source value or record the example should match."
          },
          "output": {
            "description": "Expected result using the field names defined by output."
          }
        }
      }
    },
    "api_key": {
      "type": "string",
      "description": "OpenAI API key used for this wrangle, normally supplied through a recipe variable."
    },
    "model": {
      "type": "string",
      "description": "OpenAI model ID for this call. If omitted, uses the configured extract.ai default; a saved model definition may supply its own model."
    },
    "threads": {
      "type": "integer",
      "minimum": 1,
      "description": "Maximum number of row-level requests sent in parallel. The configured default is 32."
    },
    "timeout": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "Network timeout in seconds for each HTTP attempt. The configured default is 12. Each retry uses the same timeout."
    },
    "retries": {
      "type": "integer",
      "minimum": 0,
      "description": "Number of additional attempts per row after a retryable failure. The configured default is 1. Retry delays are separate from timeout."
    },
    "url": {
      "type": "string",
      "description": "Override the endpoint for the selected protocol. A chat/completions URL\nselects the legacy protocol only when protocol is omitted; new recipes\nshould use the configured Responses endpoint."
    },
    "provider": {
      "type": "string",
      "description": "AI service provider. Currently only OpenAI is supported.",
      "enum": [
        "openai"
      ]
    },
    "protocol": {
      "type": "string",
      "description": "OpenAI API protocol. Responses is the configured default and is required for web_search; chat_completions remains available for legacy definitions.",
      "enum": [
        "responses",
        "chat_completions"
      ]
    },
    "store": {
      "type": "boolean",
      "description": "Whether OpenAI may store Responses API results. Defaults to true."
    },
    "metadata": {
      "type": "object",
      "description": "Labels attached to OpenAI requests, such as recipe_name and wrangles_user. Available recipe name and Wrangles user are added automatically. Explicit labels override those defaults; an empty object disables automatic labels. These appear with stored logs and are separate from model instructions. Up to 16 string pairs; keys may contain up to 64 characters and values up to 512 characters. Does not enable workflow tracing.",
      "maxProperties": 16,
      "propertyNames": {
        "maxLength": 64
      },
      "additionalProperties": {
        "type": "string",
        "maxLength": 512
      }
    },
    "cache": {
      "type": "boolean",
      "description": "Reuse identical successful results from the bounded warm-instance cache. Defaults to true. Set false when fresh model or web results are required."
    },
    "cache_ttl": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "Maximum age in seconds for a cached result used by this call. Applies to extracted values and web_search_sources together."
    },
    "instructions": {
      "title": "General Instructions",
      "type": [
        "string",
        "array"
      ],
      "description": "General instructions applied to every input row, in addition to any GeneralInstructions in the saved model. Use this for decision rules, evidence priorities, normalization requirements, or other behavior that applies to the complete extraction.",
      "items": {
        "type": "string"
      }
    },
    "model_id": {
      "type": "string",
      "description": "ID of a saved extract.ai definition. Use it instead of defining an output schema. When output is also supplied with model_id in a recipe, output names the destination column or columns for the saved fields."
    },
    "strict": {
      "type": "boolean",
      "description": "Require OpenAI structured-output strict mode. Defaults to true. Definitions with dynamic dictionary keys automatically switch to non-strict provider mode and are still validated locally."
    },
    "output_format": {
      "type": "string",
      "description": "How extracted fields are written. columns writes one dataframe column per field (default); dictionary keeps one object; concatenate joins fields into one string using char.",
      "enum": [
        "dictionary",
        "columns",
        "concatenate"
      ]
    },
    "char": {
      "type": "string",
      "description": "Separator used only when output_format is concatenate. Defaults to comma-space."
    },
    "reasoning": {
      "description": "Reasoning effort, such as none or low, or an object with effort and other reasoning options. Both forms are equivalent for setting effort. Defaults to none for every model. Explicit settings are always sent to the provider; unsupported settings produce a provider error.",
      "oneOf": [
        {
          "type": "string",
          "enum": [
            "none",
            "minimal",
            "low",
            "medium",
            "high",
            "xhigh",
            "max"
          ]
        },
        {
          "type": "object",
          "properties": {
            "effort": {
              "type": "string",
              "description": "Amount of reasoning work requested from a compatible model.",
              "enum": [
                "none",
                "minimal",
                "low",
                "medium",
                "high",
                "xhigh",
                "max"
              ]
            }
          }
        }
      ]
    },
    "verbosity": {
      "type": "string",
      "description": "Responses API text verbosity for compatible models. Defaults to low when supported; ignored with a warning for incompatible models.",
      "enum": [
        "low",
        "medium",
        "high"
      ]
    },
    "web_search": {
      "type": "boolean",
      "description": "Enable OpenAI Responses web search; the model decides when searching helps. When true, every row also receives web_search_sources: a deduplicated list of {title, url} objects in source order, or an empty list when no source was used. This reserved column is automatic. Requires protocol responses. Defaults to false."
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
  - extract.ai:
      api_key: Your OpenAI api key
      input: Product Specs
      output:
        Blade Diameter:
          type: number
          description: The diameter of the blade used, reported in inches.
          default: N/A
          examples:
            - 4.5"
            - 8 inch
        Max. RPM:
          type: number
          description: The maximum rotations per minute (rpm).
          default: 3600
          examples:
            - 3600 max. rpm
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Specs |
| --- |
| 18V Cordless 4.5in angle grinder |
| 120V 12in chop saw 3600 max. rpm |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Blade Diameter | Max. RPM |
| --- | --- |
| 4.5 inches |  |
| 12 inches | 3600 |

</div>

</div>





```yaml
wrangles:
  - extract.ai:
      api_key: Your OpenAI api key
      input: Product Specs
      output:
        Blade Diameter: The diameter of the blade used, reported in inches.
        Max. RPM: The maximum rotations per minute (rpm).
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Specs |
| --- |
| 18V Cordless 4.5in angle grinder |
| 120V 12in chop saw 3600 max. rpm |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Blade Diameter | Max. RPM |
| --- | --- |
| 4.5 inches |  |
| 12 inches | 3600 |

</div>

</div>





```yaml
wrangles:
  - extract.ai:
      api_key: Your OpenAI api key
      model_id: xxxx-xxxx-xxxxxxxx
      output:
        - Colors
        - Sizes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Items |
| --- |
| Large yellow square |
| Medium orange triangle |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Colors | Sizes |
| --- | --- |
| [yellow] | Large |
| [orange] | Medium |

</div>

</div>

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
| Catalog ID | `21` |
| Catalog key | `extract.ai` |
| Recipe key | `extract.ai` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.ai` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `d9f89b00-fda3-4f4c-826c-6417b9390607` |

**Sources**

- [WranglesPY extract.ai implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.ai Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/ai.md)

</details>


---

## Attributes <CopyableCode value="extract.attributes" /> {#attributes}

Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks Account.

Extract numeric attributes from unstructured text such as lengths, voltages, weights, or temperatures. Requires WrangleWorks Account.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `responseContent` | span - returns the text found. object - returns an object with the value and unit | string; one of:<ul className="ww-param-enum-values"><li>span</li><li>object</li></ul> | `"span"` | No |
| `attribute_type` | Request only a specific type of attribute | string; one of:<ul className="ww-param-enum-values"><li>angle</li><li>area</li><li>capacitance</li><li>charge</li><li>current</li><li>data transfer rate</li><li>electrical conductance</li><li>electrical resistance</li><li>energy</li><li>force</li><li>frequency</li><li>inductance</li><li>instance frequency</li><li>length</li><li>luminous flux</li><li>weight</li><li>power</li><li>pressure</li><li>speed</li><li>velocity</li><li>temperature</li><li>time</li><li>voltage</li><li>volume</li><li>volumetric flow</li></ul> | `null` | No |
| `desired_unit` | Convert the extracted unit to the desired unit | string | `null` | No |
| `bound` | When returning an object, if the input is a range (e.g. 10-20mm) set the value to return. min, mid or max. Default mid. | string; one of:<ul className="ww-param-enum-values"><li>min</li><li>mid</li><li>max</li></ul> | `"mid"` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `first_element` | Get the first element from results | boolean | `false` | No |
| `output_format` | Format of the extract output | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>dictionary</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate | string | `", "` | No |
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
  "description": "Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks Account.",
  "required": [
    "input",
    "output"
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
    "attribute_type": {
      "type": "string",
      "description": "Request only a specific type of attribute",
      "enum": [
        "angle",
        "area",
        "capacitance",
        "charge",
        "current",
        "data transfer rate",
        "electrical conductance",
        "electrical resistance",
        "energy",
        "force",
        "frequency",
        "inductance",
        "instance frequency",
        "length",
        "luminous flux",
        "weight",
        "power",
        "pressure",
        "speed",
        "velocity",
        "temperature",
        "time",
        "voltage",
        "volume",
        "volumetric flow"
      ]
    },
    "responseContent": {
      "type": "string",
      "description": "span - returns the text found. object - returns an object with the value and unit",
      "enum": [
        "span",
        "object"
      ]
    },
    "bound": {
      "type": "string",
      "description": "When returning an object, if the input is a range (e.g. 10-20mm) set the value to return. min, mid or max. Default mid.",
      "enum": [
        "min",
        "mid",
        "max"
      ]
    },
    "desired_unit": {
      "type": "string",
      "description": "Convert the extracted unit to the desired unit"
    },
    "first_element": {
      "type": "boolean",
      "description": "Get the first element from results"
    },
    "output_format": {
      "type": "string",
      "description": "Format of the extract output",
      "enum": [
        "list",
        "dictionary",
        "columns",
        "concatenate"
      ]
    },
    "char": {
      "type": "string",
      "description": "Character to use when output_format is concatenate"
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
  "$ref": "#/$defs/misc/unit_entity_map"
}
```

</details>

### Examples

```yaml
wrangles:
  - extract.attributes:
      input: tools
      output: attributes
      responseContent: span
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Tools (input) |
| --- |
| hammer 5kg, 0.5m |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Attributes (span )(output) |
| --- |
| \{'length': ['0.5m'], 'mass': ['5kg']\} |

</div>

</div>





```yaml
wrangles:
  - extract.attributes:
      input: tools
      output: attributes
      responseContent: object
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Tools (input) |
| --- |
| hammer 5kg, 0.5m |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Attributes (Object) (output) |
| --- |
| \{'length': [\{'unit': 'metre', 'value': 0.5\}], 'mass': [\{'unit': 'kilogram', 'value': 5.0\}]\} |

</div>

</div>





```yaml
wrangles:
  - extract.attributes:
      input: Tools
      output: attributes
      responseContent: span
      attribute_type: weight    # Specific attributes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_No sample available._

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
| Catalog ID | `22` |
| Catalog key | `extract.attributes` |
| Recipe key | `extract.attributes` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.attributes` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `03ccedef-c938-41f1-8980-280f1a91542e` |

**Sources**

- [WranglesPY extract.attributes implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.attributes Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/attributes.md)

</details>


---

## Brackets <CopyableCode value="extract.brackets" /> {#brackets}

Extract text properties in brackets from the input.

Extract text in brackets from the input.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column | string, integer, array | — | Yes |
| `output` | Name of the output columns | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `find` | (Optional) The type of brackets to find (round '()', square '[]', curly '&#123;&#125;', angled '&lt;&gt;'). Default is all brackets. | string, array | `"all"` | No |
| `include_brackets` | (Optional) Include the brackets in the output | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_format` | Format of the extract output | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate | string | `", "` | No |
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
  "description": "Extract text properties in brackets from the input",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
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
      "description": "Name of the output columns"
    },
    "find": {
      "type": [
        "string",
        "array"
      ],
      "description": "(Optional) The type of brackets to find (round '()', square '[]', curly '{}', angled '<>'). Default is all brackets."
    },
    "include_brackets": {
      "type": "boolean",
      "description": "(Optional) Include the brackets in the output"
    },
    "output_format": {
      "type": "string",
      "description": "Format of the extract output",
      "enum": [
        "list",
        "columns",
        "concatenate"
      ]
    },
    "char": {
      "type": "string",
      "description": "Character to use when output_format is concatenate"
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
  - extract.brackets:
      input: Data
      output: Output
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Data |
| --- |
| `{Hello}` |
| `[Wrangles]` |
| `(!)` |
| `<!>` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Output |
| --- |
| Hello |
| Wrangles |
| ! |
| ! |

</div>

</div>

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
| Catalog ID | `23` |
| Catalog key | `extract.brackets` |
| Recipe key | `extract.brackets` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.brackets` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `9b4c15fa-2aaa-40c8-8834-6e835760bee5` |

**Sources**

- [WranglesPY extract.brackets implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.brackets Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/brackets.md)

</details>


---

## Codes <CopyableCode value="extract.codes" /> {#codes}

Extract alphanumeric codes from the input. Requires WrangleWorks Account.

Extract alphanumeric codes from unstructured text. Can be performed on one column or multiple columns. Requires WrangleWorks Account.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `min_length` | Minimum length of allowed results | integer, string | — | No |
| `max_length` | Maximum length of allowed results | integer, string | — | No |
| `strategy` | Controls filtering of likely false positives such as measurements. Lenient skips this filter; balanced and strict currently apply the same filter. Default is balanced. Unless min_length is provided, minimum lengths default to 3 for lenient, 4 for balanced, and 5 for strict. | string; one of:<ul className="ww-param-enum-values"><li>lenient</li><li>balanced</li><li>strict</li></ul> | — | No |
| `disallowed_patterns` | A pattern or JSON array of regex patterns to not include in the found codes | string | — | No |
| `include_multi_part_tokens` | Whether to include multi-part tokens that have a space. Default True. | boolean | — | No |
| `extract_raw` | Whether to return tokens with their adjacent non-whitespace characters included, rather than the cleaned token. Default False. | boolean | — | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `first_element` | Get the first element from results | boolean | `false` | No |
| `output_format` | Format of the extract output | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate | string | `", "` | No |
| `sort_order` | Default is input order. Also allows longest or shortest. | string; one of:<ul className="ww-param-enum-values"><li>input</li><li>longest</li><li>shortest</li></ul> | — | No |
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
  "description": "Extract alphanumeric codes from the input. Requires WrangleWorks Account.",
  "required": [
    "input",
    "output"
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
      "description": "Name or list of output columns"
    },
    "first_element": {
      "type": "boolean",
      "description": "Get the first element from results"
    },
    "output_format": {
      "type": "string",
      "description": "Format of the extract output",
      "enum": [
        "list",
        "columns",
        "concatenate"
      ]
    },
    "char": {
      "type": "string",
      "description": "Character to use when output_format is concatenate"
    },
    "min_length": {
      "type": [
        "integer",
        "string"
      ],
      "description": "Minimum length of allowed results"
    },
    "max_length": {
      "type": [
        "integer",
        "string"
      ],
      "description": "Maximum length of allowed results"
    },
    "strategy": {
      "type": "string",
      "description": "Controls filtering of likely false positives such as measurements. Lenient skips this filter; balanced and strict currently apply the same filter. Default is balanced. Unless min_length is provided, minimum lengths default to 3 for lenient, 4 for balanced, and 5 for strict.",
      "enum": [
        "lenient",
        "balanced",
        "strict"
      ]
    },
    "sort_order": {
      "type": "string",
      "description": "Default is input order. Also allows longest or shortest.",
      "enum": [
        "input",
        "longest",
        "shortest"
      ]
    },
    "disallowed_patterns": {
      "type": "string",
      "description": "A pattern or JSON array of regex patterns to not include in the found codes"
    },
    "include_multi_part_tokens": {
      "type": "boolean",
      "description": "Whether to include multi-part tokens that have a space. Default True."
    },
    "extract_raw": {
      "type": "boolean",
      "description": "Whether to return tokens with their adjacent non-whitespace characters included, rather than the cleaned token. Default False."
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
# One column input
wrangles:
  - extract.codes:
      input: Secret
      output: Code Extract
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Secret |
| --- |
| to gain access use Z1ON0101 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Code Extract |
| --- |
| ['Z1ON0101'] |

</div>

</div>





```yaml
# Multi column input
wrangles:
  - extract.codes:
      input:
        - code1
        - code2
      output: Codes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| code1 | code2 |
| --- | --- |
| code CH465517080-1 | code CH465517080-2 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Codes |
| --- |
| ['CH465517080-1', 'CH465517080-2'] |

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
| Catalog ID | `24` |
| Catalog key | `extract.codes` |
| Recipe key | `extract.codes` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.codes` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `da591387-0fca-4842-8bcb-d19f561f0292` |

**Sources**

- [WranglesPY extract.codes implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.codes Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/codes.md)

</details>


---

## Custom <CopyableCode value="extract.custom" /> {#custom}

Extract data from the input using a DIY or bespoke extraction wrangle. Requires WrangleWorks Account and Subscription.

Extract data from the input using a DIY or bespoke extraction wrangle. Can be performed on one column or multiple columns. Requires WrangleWorks Account and Subscription.

:::info
Non-regex pattern matching extracts whole-word matches separated by word boundaries. Word boundaries include anything that is not a letter, number, or underscore.
:::

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `case_sensitive` | Allows the wrangle to be case sensitive if set to True, default is False. | boolean | `false` | No |
| `extract_raw` | Extract the raw data from the wrangle | boolean | `false` | No |
| `use_spellcheck` | Use spellcheck to also find minor mispellings compared to the reference data | boolean | `false` | No |
| `sort` | Sort the results | string; one of:<ul className="ww-param-enum-values"><li>training_order</li><li>input_order</li><li>longest</li><li>shortest</li><li>alphabetical</li><li>reverse_alphabetical</li><li>ascending</li><li>descending</li></ul> | `"training_order"` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `use_labels` | Use Labels in the extract output &#123;label: value&#125; | boolean | `false` | No |
| `first_element` | Get the first element from results | boolean | `false` | No |
| `include_empty_labels` | Include labels with no found values in the output when using use_labels=True | boolean | `true` | No |
| `output_format` | Format of the extract output | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>dictionary</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate | string | `", "` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | The ID of the wrangle to use | string, array | — | Yes |
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
  "description": "Extract data from the input using a DIY or bespoke extraction wrangle. Requires WrangleWorks Account and Subscription.",
  "required": [
    "input",
    "model_id"
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
      "description": "Name or list of output columns"
    },
    "model_id": {
      "type": [
        "string",
        "array"
      ],
      "description": "The ID of the wrangle to use"
    },
    "use_labels": {
      "type": "boolean",
      "description": "Use Labels in the extract output {label: value}"
    },
    "first_element": {
      "type": "boolean",
      "description": "Get the first element from results"
    },
    "case_sensitive": {
      "type": "boolean",
      "description": "Allows the wrangle to be case sensitive if set to True, default is False."
    },
    "extract_raw": {
      "type": "boolean",
      "description": "Extract the raw data from the wrangle"
    },
    "use_spellcheck": {
      "type": "boolean",
      "description": "Use spellcheck to also find minor mispellings compared to the reference data"
    },
    "sort": {
      "type": "string",
      "description": "Sort the results",
      "enum": [
        "training_order",
        "input_order",
        "longest",
        "shortest",
        "alphabetical",
        "reverse_alphabetical",
        "ascending",
        "descending"
      ]
    },
    "output_format": {
      "type": "string",
      "description": "Format of the extract output",
      "enum": [
        "list",
        "dictionary",
        "columns",
        "concatenate"
      ]
    },
    "char": {
      "type": "string",
      "description": "Character to use when output_format is concatenate"
    },
    "include_empty_labels": {
      "type": "boolean",
      "description": "Include labels with no found values in the output when using use_labels=True"
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
# One column input
wrangles:
  - extract.custom:
      input: Product
      output: Wood Types
      model_id: model_id_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| Dining Oakwood Chair |
| Living Room Teakwood Frame Mirror |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Wood Types |
| --- |
| Oakwood |
| Teakwood |

</div>

</div>





```yaml
# Multi column input
wrangles:
  - extract.custom:
      input:
        - Part 1 of 2
        - Part 2 of 2
      output: Wood Types
      model_id: model_id_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Part 1 of 2 | Part 2 of 2 |
| --- | --- |
| Dining Acacia Wood Table | Imitation Wood Table Chairs |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Wood Types |
| --- |
| ['Acacia Wood', 'Imitation Wood'] |

</div>

</div>





```yaml
# Multiple Models
wrangles:
  - extract.custom:
      input:
        - Product
        - Product
      output:
        - Wood Types
        - Item Type
      model_id:
        - wood_Type_model_id
        - item_type_model_id
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product | Item Type | Wood Types |
| --- | --- | --- |
| Dining Oakwood Chair | Chair | Oakwood |
| Living Room Teakwood Frame Mirror | Mirror | Teakwood |

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
| Catalog ID | `25` |
| Catalog key | `extract.custom` |
| Recipe key | `extract.custom` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.custom` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `e8e96b76-86bf-41dc-8d16-825dcff9688b` |

**Sources**

- [WranglesPY extract.custom implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.custom Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/custom.md)

</details>


---

## Date Properties <CopyableCode value="extract.date_properties" /> {#date-properties}

Extract date properties from a date (day, month, year, etc...).

Extract date properties from a date, such as day, month, year, weekday, or quarter.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column | string, integer, array | — | Yes |
| `output` | Name of the output columns | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `property` | Property to extract from date | string; one of:<ul className="ww-param-enum-values"><li>day</li><li>day_of_year</li><li>month</li><li>month_name</li><li>weekday</li><li>week_day_name</li><li>week_year</li><li>quarter</li></ul> | — | Yes |
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
  "description": "Extract date properties from a date (day, month, year, etc...)",
  "additionalProperties": false,
  "required": [
    "input",
    "property"
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
      "description": "Name of the output columns"
    },
    "property": {
      "type": "string",
      "description": "Property to extract from date",
      "enum": [
        "day",
        "day_of_year",
        "month",
        "month_name",
        "weekday",
        "week_day_name",
        "week_year",
        "quarter"
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
  - extract.date_properties:
      input: Date
      output: Output
      property: month_name
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Date |
| --- |
| 1992-08-13 00:00:00 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Output |
| --- |
| August |

</div>

</div>

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
| Catalog ID | `26` |
| Catalog key | `extract.date_properties` |
| Recipe key | `extract.date_properties` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.date_properties` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `a346de62-93cd-44ba-8d30-a6305629c6d7` |

**Sources**

- [WranglesPY extract.date_properties implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.date_properties Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/date-properties.md)

</details>


---

## Date Range <CopyableCode value="extract.date_range" /> {#date-range}

Extract date range frequency from two dates.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `start_time` | Name of the start date column | string | — | Yes |
| `end_time` | Name of the end date column | string | — | Yes |
| `output` | Name of the output column | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `range` | Type of frequency to count | string; one of:<ul className="ww-param-enum-values"><li>business days</li><li>days</li><li>weeks</li><li>months</li><li>semi months</li><li>business month ends</li><li>month starts</li><li>semi month starts</li><li>business month starts</li><li>quarters</li><li>quarter starts</li><li>years</li><li>business hours</li><li>hours</li><li>minutes</li><li>seconds</li><li>milliseconds</li></ul> | `"day"` | Yes |
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
  "description": "Extract date range frequency from two dates",
  "additionalProperties": false,
  "required": [
    "start_time",
    "end_time",
    "output",
    "range"
  ],
  "properties": {
    "start_time": {
      "type": "string",
      "description": "Name of the start date column"
    },
    "end_time": {
      "type": "string",
      "description": "Name of the end date column"
    },
    "output": {
      "type": "string",
      "description": "Name of the output column"
    },
    "range": {
      "type": "string",
      "description": "Type of frequency to count",
      "enum": [
        "business days",
        "days",
        "weeks",
        "months",
        "semi months",
        "business month ends",
        "month starts",
        "semi month starts",
        "business month starts",
        "quarters",
        "quarter starts",
        "years",
        "business hours",
        "hours",
        "minutes",
        "seconds",
        "milliseconds"
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
  - extract.date_range:
      start_time: Start
      end_time: End
      output: Output
      range: months
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| End | Start | Output |
| --- | --- | --- |
| 2023-08-13 00:00:00 | 1992-08-13 00:00:00 | 371 |

</div>

</div>

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
| Catalog ID | `27` |
| Catalog key | `extract.date_range` |
| Recipe key | `extract.date_range` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.date_range` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `9cebfa6f-a524-4aec-84a7-02d77b792843` |

**Sources**

- [WranglesPY extract.date_range implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.date_range Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/date-range.md)

</details>


---

## HTML <CopyableCode value="extract.html" /> {#html}

Extract elements from strings containing html. Requires WrangleWorks Account.

Extract text and links from HTML elements. Requires WrangleWorks Account.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns | string, array | `null` | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `data_type` | The type of data to extract | string; one of:<ul className="ww-param-enum-values"><li>text</li><li>links</li></ul> | — | Yes |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_format` | Format of the extract output | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate | string | `", "` | No |
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
  "description": "Extract elements from strings containing html. Requires WrangleWorks Account.",
  "required": [
    "input",
    "output",
    "data_type"
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
      "description": "Name or list of output columns"
    },
    "data_type": {
      "type": "string",
      "description": "The type of data to extract",
      "enum": [
        "text",
        "links"
      ]
    },
    "output_format": {
      "type": "string",
      "description": "Format of the extract output",
      "enum": [
        "list",
        "columns",
        "concatenate"
      ]
    },
    "char": {
      "type": "string",
      "description": "Character to use when output_format is concatenate"
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
  - extract.html:
      input: HTML
      output: Text
      data_type: text
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| HTML |
| --- |
| ` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Text |
| --- |
|  |

</div>

</div>





```yaml
wrangles:
  - extract.html:
      input: HTML
      output: Links
      data_type: links
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| HTML |
| --- |
| ` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Links |
| --- |
|  |

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
| Catalog ID | `28` |
| Catalog key | `extract.html` |
| Recipe key | `extract.html` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.html` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `728fc87a-a20d-4efa-833a-612e0b5eadc3` |

**Sources**

- [WranglesPY extract.html implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.html Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/html.md)

</details>


---

## Properties <CopyableCode value="extract.properties" /> {#properties}

Extract text properties from the input. Requires WrangleWorks Account.

Extract categorical properties from unstructured text, such as colours or materials. Requires WrangleWorks Account.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column | string, integer, array | — | Yes |
| `output` | Name of the output columns | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `property_type` | The specific type of properties to extract | string; one of:<ul className="ww-param-enum-values"><li>Colours</li><li>Materials</li><li>Shapes</li><li>Standards</li></ul> | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `return_data_type` | Legacy format option. Prefer output_format. | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>string</li></ul> | `"list"` | No |
| `first_element` | Get the first element from results | boolean | `false` | No |
| `output_format` | Format of the extract output | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>dictionary</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate | string | `", "` | No |
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
  "description": "Extract text properties from the input. Requires WrangleWorks Account.",
  "required": [
    "input",
    "output"
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
      "description": "Name of the output columns"
    },
    "property_type": {
      "type": "string",
      "description": "The specific type of properties to extract",
      "enum": [
        "Colours",
        "Materials",
        "Shapes",
        "Standards"
      ]
    },
    "return_data_type": {
      "type": "string",
      "description": "Legacy format option. Prefer output_format.",
      "enum": [
        "list",
        "string"
      ]
    },
    "first_element": {
      "type": "boolean",
      "description": "Get the first element from results"
    },
    "output_format": {
      "type": "string",
      "description": "Format of the extract output",
      "enum": [
        "list",
        "dictionary",
        "columns",
        "concatenate"
      ]
    },
    "char": {
      "type": "string",
      "description": "Character to use when output_format is concatenate"
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
  - extract.properties:
      input: water bottles
      output: properties
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Products | Product Properties |
| --- | --- |
| Stainless Steel Blue Bottle | \{'Colours': ['Blue'], 'Materials': ['Stainless Steel']\} |
| Plastic Yellow Bottle | \{'Colours': ['Yellow'], 'Materials': ['Plastic']\} |

</div>

</div>





```yaml
wrangles:
  - extract.properties:
      input: water bottles
      output: properties
      property_type: Colours # Optional
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Products | Product Colours |
| --- | --- |
| Stainless Steel Blue Bottle | ['Blue'] |
| Plastic Yellow Bottle | ['Yellow'] |

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
| Catalog ID | `29` |
| Catalog key | `extract.properties` |
| Recipe key | `extract.properties` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.properties` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `23bbdb86-fd13-4b78-8fff-a7a76769ab63` |

**Sources**

- [WranglesPY extract.properties implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.properties Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/properties.md)

</details>


---

## Regex <CopyableCode value="extract.regex" /> {#regex}

Extract matches or specific capture groups using regex.

Extract single values, matches, or specific capture groups using regex.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column(s). | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `find` | Pattern to find using regex | string | — | Yes |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_pattern` | Specifies the format to output matches and specific capture groups using backreferences (e.g., `\1`, `\2`). Default is to return entire matches.<br /><br />**Example**: For a regex pattern `r'(\d+)\s(\w+)'` and `output_pattern = '\2 \1'`, with input `'120 volt'`, the output would be `'volt 120'`.<br /> | string | `null` | No |
| `first_element` | Get the first element from results | boolean | `false` | No |
| `output_format` | Format of the extract output | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate | string | `", "` | No |
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
  "description": "Extract matches or specific capture groups using regex",
  "additionalProperties": false,
  "required": [
    "input",
    "output",
    "find"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the input column(s)."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column(s)."
    },
    "find": {
      "type": "string",
      "description": "Pattern to find using regex"
    },
    "output_pattern": {
      "type": "string",
      "description": "Specifies the format to output matches and specific capture groups using backreferences (e.g., `\\1`, `\\2`). Default is to return entire matches.\n\n**Example**: For a regex pattern `r'(\\d+)\\s(\\w+)'` and `output_pattern = '\\2 \\1'`, with input `'120 volt'`, the output would be `'volt 120'`.\n"
    },
    "first_element": {
      "type": "boolean",
      "description": "Get the first element from results"
    },
    "output_format": {
      "type": "string",
      "description": "Format of the extract output",
      "enum": [
        "list",
        "columns",
        "concatenate"
      ]
    },
    "char": {
      "type": "string",
      "description": "Character to use when output_format is concatenate"
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
  - extract.regex:
      input: Product
      output: GPM
      find: \d\.?\d? ?gpm
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| 3.4 gpm water pump |
| 2gpm water pump |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| GPM |
| --- |
| 3.4 gpm |
| 2gpm |

</div>

</div>





```yaml
wrangles:
  - extract.regex:
      input: Product
      output: GPM
      find: (\d\.?\d?) ?gpm
      output_pattern: \1 Gallons Per Minute
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| 3.4 gpm water pump for 5.5 gallon tank |
| 2gpm water pump for 2 gal tank |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| GPM |
| --- |
| 3.4 Gallons Per Minute |
| 2 Gallons Per Minute |

</div>

</div>

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
| Catalog ID | `30` |
| Catalog key | `extract.regex` |
| Recipe key | `extract.regex` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.regex` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `9aa0253a-4b70-4737-832c-964e15967289` |

**Sources**

- [WranglesPY extract.regex implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.regex Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/regex.md)

</details>
