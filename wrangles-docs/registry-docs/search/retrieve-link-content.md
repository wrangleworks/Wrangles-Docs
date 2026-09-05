---
title: "Retrieve Link Content"
description: "Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data."
sidebar_label: "Retrieve Link Content"
slug: "/search/retrieve-link-content"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Retrieve Link Content

Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns containing URLs or Scored Search Result dictionaries. | string, array | — | Yes |
| `output` | Name of the output column for the raw dictionaries. To output BOTH the raw dictionaries and the formatted text, provide a list of exactly two column names (e.g., [page_data, page_text]). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `prompt` | Optional custom system prompt to guide the extraction behavior and output format. | string, null | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_format` | The desired format for the extracted content. | string; one of:<ul className="ww-param-enum-values"><li>markdown</li><li>json</li></ul> | `"json"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `threads` | Number of concurrent threads for parallel processing (default 10). | integer | `10` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `client` | The retrieval provider to use. | string; one of:<ul className="ww-param-enum-values"><li>google_url_context</li></ul> | `"google_url_context"` | No |
| `api_key` | API key for the provider. Can also be set as an environment variable (e.g., GOOGLE_API_KEY). | string, null | `null` | No |
| `model_id` | The specific model ID to use (default models/gemini-3-flash-preview). | string | `"models/gemini-3-flash-preview"` | No |

</div>

## Examples

This template extracts JSON content from a URL. Returned fields depend on the page, prompt, and retrieval model.



```yaml
wrangles:
  - search.retrieve_link_content:
      input:
        - Product URL
      output:
        - Page Data
      api_key: Your Google API key
      client: google_url_context
      output_format: json
      prompt: Extract the product title and manufacturer.
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product URL |
| --- |
| https://example.com/products/6202 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Page Data |
| --- |
| `{"title": "6202 Bearing", "manufacturer": "SKF"}` |

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
| Recipe key | `search.retrieve_link_content` |
| Lifecycle status | active |
| Namespace | `search` |
| Documentation group | `search` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.search.retrieve_link_content` |

**Sources**

- [WranglesPY search.retrieve_link_content implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/search.py)
- [Existing search.retrieve_link_content Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/search/_sources/retrieve-link-content.md)

</details>
