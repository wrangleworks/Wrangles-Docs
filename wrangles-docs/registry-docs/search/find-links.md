---
title: "Find Links"
description: "Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing."
sidebar_label: "Find Links"
slug: "/search/find-links"
---

# Find Links

Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `queries` | Yes | string, array | Name or list of input columns containing search queries. | — |
| `id` | Yes | string | Name of the column containing the row ID to append to each search result. | — |
| `output` | No | string, array, null | Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column, pretty_strings_column]. | `null` |
| `client` | No | string; one of: serpapi | The search provider to use. | `"serpapi"` |
| `api_key` | No | string, null | API key for the search client. Can also be set as an environment variable (e.g., SERPAPI_API_KEY). | `null` |
| `n_results` | No | integer | Number of search results to return per query (default 10, max 100). | `10` |
| `threads` | No | integer | Number of concurrent threads for parallel processing (default 10). | `10` |
| `country` | No | string | Country code for search results (default 'us'). Alias: gl. | — |
| `language` | No | string | Language code for search results (default 'en'). Alias: hl. | — |
| `location` | No | string | Location for search results (e.g., 'Austin, Texas'). | — |
| `device` | No | string; one of: desktop, mobile, tablet | Device type for search results. | — |
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

Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing.

## Migrated examples
#### Find Product Links

This template searches once per query and returns structured result dictionaries. Search results vary by provider, location, and time.

##### Recipe

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

<div className="ww-sample-panel">

##### Input Sample

| Row ID | Search Query |
| --- | --- |
| 1001 | SKF 6202 bearing supplier |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Row ID | Search Query | Search Results |
| --- | --- | --- |
| 1001 | SKF 6202 bearing supplier | `[{"title": "Example result", "link": "https://example.com/6202", "snippet": "SKF 6202 bearing"}]` |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

## Provenance

- [WranglesPY search.find_links implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/search.py)
- [Existing search.find_links Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/search/_sources/find-links.md)

## Registry metadata

- Registry ID: `ec1f661b-2cbc-4a47-88e3-646179104376`
- Namespace: `search`
- Recipe key: `search.find_links`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.search.find_links`
- Status: `active`
- Registry version: `0.1.0-pilot`
