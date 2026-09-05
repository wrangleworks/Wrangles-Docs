---
title: "AI Wrangles"
description: "AI wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "AI"
slug: "/namespaces/ai"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# AI Wrangles

AI wrangles, with recipe examples, parameters, and behavior.

## Classify {#classify}

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
| `include_confidence` | For models that support it, include the confidence level in the output. | boolean | — | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | ID of the classification model to be used. | string | — | Yes |

</div>

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
| Recipe key | `classify` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `ai` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.classify` |

**Sources**

- [WranglesPY classify implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing classify Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/ai/_sources/classify.md)

</details>


---

## Huggingface {#huggingface}

Use a model from huggingface.

Use a model from huggingface

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. If not provided, will overwrite the input column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `parameters` | Optionally, provide additional parameters to define the model behaviour. | object, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `api_token` | Huggingface API Token. | string | — | Yes |
| `model` | Name of the model to use. e.g. facebook/bart-large-cnn. | string | — | Yes |

</div>

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
| Recipe key | `huggingface` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `ai` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.huggingface` |

**Sources**

- [WranglesPY huggingface implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing huggingface Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/ai/_sources/huggingface.md)

</details>
