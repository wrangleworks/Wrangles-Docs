---
title: "Find Links"
description: "Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing."
sidebar_label: "Find Links"
slug: "/search/find-links"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Find Links <CopyableCode value="search.find_links" />

Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `queries` | Name or list of input columns containing search queries. | string, array | — | Yes |
| `id` | Name of the column containing the row ID to append to each search result. | string | — | Yes |
| `output` | Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column, pretty_strings_column]. | string, array | `null` | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `n_results` | Number of search results to return per query (default 10, max 100). | integer | `10` | No |
| `country` | Country code for search results (default 'us'). Alias: gl. | string | — | No |
| `language` | Language code for search results (default 'en'). Alias: hl. | string | — | No |
| `location` | Location for search results (e.g., 'Austin, Texas'). | string | — | No |
| `device` | Device type for search results. | string; one of:<ul className="ww-param-enum-values"><li>desktop</li><li>mobile</li><li>tablet</li></ul> | — | No |
| `google_domain` | Google domain for search results (e.g., google.com, google.co.uk). | string | — | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `threads` | Number of concurrent threads for parallel processing (default 10). | integer | `10` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `client` | The search provider to use. | string; one of:<ul className="ww-param-enum-values"><li>serpapi</li></ul> | `"serpapi"` | No |
| `api_key` | API key for the search client. Can also be set as an environment variable (e.g., SERPAPI_API_KEY). | string | `null` | No |
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
  "description": "Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing.",
  "additionalProperties": false,
  "required": [
    "queries",
    "id",
    "output"
  ],
  "properties": {
    "queries": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of input columns containing search queries."
    },
    "id": {
      "type": "string",
      "description": "Name of the column containing the row ID to append to each search result."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column, pretty_strings_column]."
    },
    "client": {
      "type": "string",
      "description": "The search provider to use.",
      "enum": [
        "serpapi"
      ],
      "default": "serpapi"
    },
    "api_key": {
      "type": "string",
      "description": "API key for the search client. Can also be set as an environment variable (e.g., SERPAPI_API_KEY)."
    },
    "n_results": {
      "type": "integer",
      "description": "Number of search results to return per query (default 10, max 100).",
      "default": 10
    },
    "threads": {
      "type": "integer",
      "description": "Number of concurrent threads for parallel processing (default 10).",
      "default": 10
    },
    "country": {
      "type": "string",
      "description": "Country code for search results (default 'us'). Alias: gl.",
      "default": "us"
    },
    "language": {
      "type": "string",
      "description": "Language code for search results (default 'en'). Alias: hl.",
      "default": "en"
    },
    "google_domain": {
      "type": "string",
      "description": "Google domain for search results (e.g., google.com, google.co.uk)."
    },
    "location": {
      "type": "string",
      "description": "Location for search results (e.g., 'Austin, Texas')."
    },
    "device": {
      "type": "string",
      "description": "Device type for search results.",
      "enum": [
        "desktop",
        "mobile",
        "tablet"
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
| Catalog ID | `47` |
| Catalog key | `search.find_links` |
| Recipe key | `search.find_links` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `search` |
| Documentation group | `search` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.search.find_links` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `ec1f661b-2cbc-4a47-88e3-646179104376` |

**Sources**

- [WranglesPY search.find_links implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/search.py)
- [Archived search.find_links Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/search/_sources/find-links.md)

</details>
