---
title: "Embeddings"
description: "Create an embedding based on text input."
sidebar_label: "Embeddings"
slug: "/create/embeddings"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Embeddings <CopyableCode value="create.embeddings" />

Create an embedding based on text input.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Create an embedding based on text input.",
  "required": [
    "input",
    "api_key"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "The column of text to create the embeddings for."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "The output column the embeddings will be saved as."
    },
    "api_key": {
      "type": "string",
      "description": "The API key."
    },
    "model": {
      "type": "string",
      "description": "The embedding model. Defaults to the AI configuration for the resolved provider. Jina requires an explicit model unless a default is configured."
    },
    "batch_size": {
      "type": "integer",
      "description": "The number of rows to submit per individual request."
    },
    "threads": {
      "type": "integer",
      "description": "The number of requests to submit in parallel. Each request contains the number of rows set as batch_size."
    },
    "output_type": {
      "type": "string",
      "description": "Output the embeddings as a numpy array or a python list Default - python list.",
      "enum": [
        "numpy array",
        "python list"
      ]
    },
    "retries": {
      "type": "integer",
      "minimum": 0,
      "description": "Additional attempts after transient transport or HTTP errors. Defaults to the AI configuration. Retries use exponential backoff and respect Retry-After. Permanent errors fail immediately."
    },
    "timeout": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "Request timeout in seconds for each attempt. Defaults to the AI configuration. Each retry receives the full timeout; this is not a total batch deadline."
    },
    "provider": {
      "type": "string",
      "description": "Controls the request/response format for the embedding API. When omitted, inferred from an explicit url (jina.ai → jina, otherwise openai), or the AI configuration when no url is supplied. Setting provider also sets the default url for that provider, so you only need one of provider or url for standard endpoints. Use both together only when pointing to a custom endpoint that uses a non-default provider's API format (e.g. a Jina-compatible proxy).",
      "enum": [
        "openai",
        "jina"
      ]
    },
    "url": {
      "type": "string",
      "description": "The endpoint to send embedding requests to. Defaults to the standard endpoint for the resolved provider. Setting a Jina URL without an explicit provider will automatically use Jina's request/response format."
    },
    "precision": {
      "type": "string",
      "description": "The precision of the embeddings. Defaults to the AI configuration. This should be used with output_type numpy array.",
      "enum": [
        "float16",
        "float32"
      ]
    },
    "task": {
      "type": "string",
      "description": "The task type for the embedding model. Only applicable for the Jina provider. Selects the appropriate task-specific adapter. Defaults and allowed values come from the selected model's AI configuration. Jina v5 supports retrieval.query, retrieval.passage, text-matching, classification, and clustering. Legacy models without a configured task enum also support retrieval.query, retrieval.passage, text-matching, and classification, but use separation for clustering."
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
  - create.embeddings:
      input: my_column
      api_key: ${my_key}
      output: embeddings
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| my_column |
| --- |
| angle grinder |
| jig saw |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| embeddings |
| --- |
| [0.010793785, -0.010007165, 0.0028609, -0.0139...] |
| [-0.008975127, 0.009314879, -0.024150735, -0.0...] |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The column of text to create the embeddings for. | string, integer, array | — | Yes |
| `output` | The output column the embeddings will be saved as. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `task` | The task type for the embedding model. Only applicable for the Jina provider. Selects the appropriate task-specific adapter. Defaults and allowed values come from the selected model's AI configuration. Jina v5 supports retrieval.query, retrieval.passage, text-matching, classification, and clustering. Legacy models without a configured task enum also support retrieval.query, retrieval.passage, text-matching, and classification, but use separation for clustering. | string | `null` | No |
| `timeout` | Request timeout in seconds for each attempt. Defaults to the AI configuration. Each retry receives the full timeout; this is not a total batch deadline. | number | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_type` | Output the embeddings as a numpy array or a python list Default - python list. | string; one of:<ul className="ww-param-enum-values"><li>numpy array</li><li>python list</li></ul> | `"python list"` | No |
| `precision` | The precision of the embeddings. Defaults to the AI configuration. This should be used with output_type numpy array. | string; one of:<ul className="ww-param-enum-values"><li>float16</li><li>float32</li></ul> | `null` | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `batch_size` | The number of rows to submit per individual request. | integer | `null` | No |
| `threads` | The number of requests to submit in parallel. Each request contains the number of rows set as batch_size. | integer | `null` | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `retries` | Additional attempts after transient transport or HTTP errors. Defaults to the AI configuration. Retries use exponential backoff and respect Retry-After. Permanent errors fail immediately. | integer | `null` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `api_key` | The API key. | string | — | Yes |
| `model` | The embedding model. Defaults to the AI configuration for the resolved provider. Jina requires an explicit model unless a default is configured. | string | `null` | No |
| `url` | The endpoint to send embedding requests to. Defaults to the standard endpoint for the resolved provider. Setting a Jina URL without an explicit provider will automatically use Jina's request/response format. | string | `null` | No |
| `provider` | Controls the request/response format for the embedding API. When omitted, inferred from an explicit url (jina.ai → jina, otherwise openai), or the AI configuration when no url is supplied. Setting provider also sets the default url for that provider, so you only need one of provider or url for standard endpoints. Use both together only when pointing to a custom endpoint that uses a non-default provider's API format (e.g. a Jina-compatible proxy). | string; one of:<ul className="ww-param-enum-values"><li>openai</li><li>jina</li></ul> | `null` | No |
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
| Catalog ID | `14` |
| Catalog key | `create.embeddings` |
| Recipe key | `create.embeddings` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.embeddings` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `e3518afd-a819-40ec-8b49-eb25690220c1` |

**Sources**

- [WranglesPY create.embeddings implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.embeddings Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/embeddings.md)

</details>
