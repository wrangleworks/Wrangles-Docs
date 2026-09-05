---
title: "Search Wrangles"
description: "Search wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Search"
slug: "/namespaces/search"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Search Wrangles

Search wrangles, with recipe examples, parameters, and behavior.

## Find Links {#find-links}

Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `queries` | Name or list of input columns containing search queries. | string, array | — | Yes |
| `id` | Name of the column containing the row ID to append to each search result. | string | — | Yes |
| `output` | Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column, pretty_strings_column]. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `n_results` | Number of search results to return per query (default 10, max 100). | integer | `10` | No |
| `country` | Country code for search results (default 'us'). Alias: gl. | string | — | No |
| `language` | Language code for search results (default 'en'). Alias: hl. | string | — | No |
| `location` | Location for search results (e.g., 'Austin, Texas'). | string | — | No |
| `device` | Device type for search results. | string; one of:<ul className="ww-param-enum-values"><li>desktop</li><li>mobile</li><li>tablet</li></ul> | — | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `threads` | Number of concurrent threads for parallel processing (default 10). | integer | `10` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `client` | The search provider to use. | string; one of:<ul className="ww-param-enum-values"><li>serpapi</li></ul> | `"serpapi"` | No |
| `api_key` | API key for the search client. Can also be set as an environment variable (e.g., SERPAPI_API_KEY). | string, null | `null` | No |

</div>

### Examples

This template searches once per query and returns structured result dictionaries. Search results vary by provider, location, and time.



```yaml
wrangles:
  - search.find_links:
      id: Row ID
      queries:
        - Search Query
      output:
        - Search Results
      api_key: Your SerpApi API key
      client: serpapi
      n_results: 5
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Row ID | Search Query |
| --- | --- |
| 1001 | SKF 6202 bearing supplier |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Search Results |
| --- |
| `[{"title": "Example result", "link": "https://example.com/6202", "snippet": "SKF 6202 bearing"}]` |

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
| Recipe key | `search.find_links` |
| Lifecycle status | active |
| Namespace | `search` |
| Documentation group | `search` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.search.find_links` |

**Sources**

- [WranglesPY search.find_links implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/search.py)
- [Existing search.find_links Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/search/_sources/find-links.md)

</details>


---

## Retrieve Link Content {#retrieve-link-content}

Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data.



### Parameters

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

### Examples

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
