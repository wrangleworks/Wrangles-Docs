---
title: "Retrieve Link Content"
description: "Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data."
sidebar_label: "Retrieve Link Content"
slug: "/search/retrieve-link-content"
---

# Retrieve Link Content

Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, array | Name or list of input columns containing URLs or Scored Search Result dictionaries. | — |
| `output` | No | string, array, null | Name of the output column for the raw dictionaries. To output BOTH the raw dictionaries and the formatted text, provide a list of exactly two column names (e.g., [page_data, page_text]). | `null` |
| `client` | No | string; one of: google_url_context | The retrieval provider to use. | `"google_url_context"` |
| `api_key` | No | string, null | API key for the provider. Can also be set as an environment variable (e.g., GOOGLE_API_KEY). | `null` |
| `prompt` | No | string, null | Optional custom system prompt to guide the extraction behavior and output format. | `null` |
| `model_id` | No | string | The specific model ID to use (default models/gemini-3-flash-preview). | `"models/gemini-3-flash-preview"` |
| `output_format` | No | string; one of: markdown, json | The desired format for the extracted content. | `"json"` |
| `threads` | No | integer | Number of concurrent threads for parallel processing (default 10). | `10` |
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

Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data.

## Migrated examples
#### Retrieve Structured Page Content

This template extracts JSON content from a URL. Returned fields depend on the page, prompt, and retrieval model.

##### Recipe

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

<div className="ww-sample-panel">

##### Input Sample

| Product URL |
| --- |
| https://example.com/products/6202 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product URL | Page Data |
| --- | --- |
| https://example.com/products/6202 | `{"title": "6202 Bearing", "manufacturer": "SKF"}` |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

## Provenance

- [WranglesPY search.retrieve_link_content implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/search.py)
- [Existing search.retrieve_link_content Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/search/_sources/retrieve-link-content.md)

## Registry metadata

- Registry ID: `3d5faa87-9e96-48c0-8226-5ae566e8d76c`
- Namespace: `search`
- Recipe key: `search.retrieve_link_content`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.search.retrieve_link_content`
- Status: `active`
- Registry version: `0.1.0-pilot`
