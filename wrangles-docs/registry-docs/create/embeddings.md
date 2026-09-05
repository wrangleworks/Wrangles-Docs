---
title: "Embeddings"
description: "Create an embedding based on text input."
sidebar_label: "Embeddings"
slug: "/create/embeddings"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Embeddings

Create an embedding based on text input.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The column of text to create the embeddings for. | string | — | Yes |
| `output` | The output column the embeddings will be saved as. | string, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `task` | The task type for the embedding model. Only applicable for the Jina provider. Selects the appropriate task-specific adapter. | string, null; one of:<ul className="ww-param-enum-values"><li>retrieval.query</li><li>retrieval.passage</li><li>text-matching</li><li>classification</li><li>separation</li></ul> | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_type` | Output the embeddings as a numpy array or a python list Default - python list. | string; one of:<ul className="ww-param-enum-values"><li>numpy array</li><li>python list</li></ul> | `"python list"` | No |
| `precision` | The precision of the embeddings. Default is float32. This should be used with output_type numpy array. | string; one of:<ul className="ww-param-enum-values"><li>float16</li><li>float32</li></ul> | `"float32"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `batch_size` | The number of rows to submit per individual request. | integer | `100` | No |
| `threads` | The number of requests to submit in parallel. Each request contains the number of rows set as batch_size. | integer | `10` | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `retries` | The number of times to retry if the request fails. This will apply exponential backoff to help with rate limiting. | integer | `0` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `api_key` | The API key. | string | — | Yes |
| `model` | The specific model to use to generate the embeddings. | string | `"text-embedding-3-small"` | No |
| `url` | The endpoint to send embedding requests to. Defaults to the standard endpoint for the resolved provider. Setting a Jina URL without an explicit provider will automatically use Jina's request/response format. | string | `"https://api.openai.com/v1/embeddings"` | No |
| `provider` | Controls the request/response format for the embedding API. When omitted, inferred from url (jina.ai → jina, otherwise openai). Setting provider also sets the default url for that provider, so you only need one of provider or url for standard endpoints. Use both together only when pointing to a custom endpoint that uses a non-default provider's API format (e.g. a Jina-compatible proxy). | string, null; one of:<ul className="ww-param-enum-values"><li>openai</li><li>jina</li></ul> | `null` | No |

</div>

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
| Recipe key | `create.embeddings` |
| Lifecycle status | active |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.embeddings` |

**Sources**

- [WranglesPY create.embeddings implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.embeddings Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/embeddings.md)

</details>
