---
title: "Embeddings"
description: "Create an embedding based on text input."
sidebar_label: "Embeddings"
slug: "/create/embeddings"
---

# Embeddings

Create an embedding based on text input.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string | The column of text to create the embeddings for. | — |
| `api_key` | Yes | string | The API key. | — |
| `output` | No | string, null | The output column the embeddings will be saved as. | `null` |
| `batch_size` | No | integer | The number of rows to submit per individual request. | `100` |
| `threads` | No | integer | The number of requests to submit in parallel. Each request contains the number of rows set as batch_size. | `10` |
| `output_type` | No | string; one of: numpy array, python list | Output the embeddings as a numpy array or a python list Default - python list. | `"python list"` |
| `model` | No | string | The specific model to use to generate the embeddings. | `"text-embedding-3-small"` |
| `retries` | No | integer | The number of times to retry if the request fails. This will apply exponential backoff to help with rate limiting. | `0` |
| `url` | No | string | The endpoint to send embedding requests to. Defaults to the standard endpoint for the resolved provider. Setting a Jina URL without an explicit provider will automatically use Jina's request/response format. | `"https://api.openai.com/v1/embeddings"` |
| `precision` | No | string; one of: float16, float32 | The precision of the embeddings. Default is float32. This should be used with output_type numpy array. | `"float32"` |
| `provider` | No | string, null; one of: openai, jina | Controls the request/response format for the embedding API. When omitted, inferred from url (jina.ai → jina, otherwise openai). Setting provider also sets the default url for that provider, so you only need one of provider or url for standard endpoints. Use both together only when pointing to a custom endpoint that uses a non-default provider's API format (e.g. a Jina-compatible proxy). | `null` |
| `task` | No | string, null; one of: retrieval.query, retrieval.passage, text-matching, classification, separation | The task type for the embedding model. Only applicable for the Jina provider. Selects the appropriate task-specific adapter. | `null` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | No |
| requires subscription | No |
| requires external api key | No |

## Guidance

Create an embedding based on text input.

## Migrated examples
#### Creating Embeddings

##### Recipe

```yaml
wrangles:
  - create.embeddings:
      input: my_column
      api_key: ${my_key}
      output: embeddings
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| my_column |
| --- |
| angle grinder |
| jig saw |

</div>

<div className="ww-sample-panel">

##### Output Sample

| my_column | embeddings |
| --- | --- |
| angle grinder | [0.010793785, -0.010007165, 0.0028609, -0.0139...] |
| jig saw | [-0.008975127, 0.009314879, -0.024150735, -0.0...] |

</div>

</div>

## Provenance

- [WranglesPY create.embeddings implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.embeddings Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/embeddings.md)

## Registry metadata

- Registry ID: `e3518afd-a819-40ec-8b49-eb25690220c1`
- Namespace: `create`
- Recipe key: `create.embeddings`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.create.embeddings`
- Status: `active`
- Registry version: `0.1.0-pilot`
