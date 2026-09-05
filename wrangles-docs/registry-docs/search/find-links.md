---
title: "Find Links"
description: "Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing."
sidebar_label: "Find Links"
slug: "/search/find-links"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Find Links

Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing.



## Parameters

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

## Examples

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
