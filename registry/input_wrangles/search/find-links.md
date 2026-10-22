---
schema_version: '0.2'
type: wrangle
id: ec1f661b-2cbc-4a47-88e3-646179104376
wrangle_name: find_links
namespace: search
title: Find Links
description: >-
  Perform web searches to find links. Returns structured search results with titles, links,
  snippets, and optional pricing.
wrangle_key: search.find_links
aliases: []
slug: search/find-links
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - search
  - find-links
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.search.find_links
  contract_status: verified
access:
  ai_powered: false
  requires_account: false
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: queries
    description: Name or list of input columns containing search queries.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
      description: Name or list of input columns containing search queries.
    runtime_required: true
  - name: id
    description: Name of the column containing the row ID to append to each search result.
    required: true
    param_group: I/O
    schema:
      type: string
      description: Name of the column containing the row ID to append to each search result.
    runtime_required: true
  - name: output
    description: >-
      Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column,
      pretty_strings_column].
    required: true
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: >-
        Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column,
        pretty_strings_column].
    runtime_required: false
  - name: client
    description: The search provider to use.
    required: false
    param_group: Details
    runtime_default: serpapi
    schema:
      type: string
      description: The search provider to use.
      enum:
        - serpapi
      default: serpapi
    runtime_required: false
  - name: api_key
    description: >-
      API key for the search client. Can also be set as an environment variable (e.g.,
      SERPAPI_API_KEY).
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type: string
      description: >-
        API key for the search client. Can also be set as an environment variable (e.g.,
        SERPAPI_API_KEY).
    runtime_required: false
  - name: n_results
    description: Number of search results to return per query (default 10, max 100).
    required: false
    param_group: Options
    runtime_default: 10
    schema:
      type: integer
      description: Number of search results to return per query (default 10, max 100).
      default: 10
    runtime_required: false
  - name: threads
    description: Number of concurrent threads for parallel processing (default 10).
    required: false
    param_group: Execution
    runtime_default: 10
    schema:
      type: integer
      description: Number of concurrent threads for parallel processing (default 10).
      default: 10
    runtime_required: false
  - name: country
    description: 'Country code for search results (default ''us''). Alias: gl.'
    required: false
    param_group: Options
    schema:
      type: string
      description: 'Country code for search results (default ''us''). Alias: gl.'
      default: us
    runtime_required: false
  - name: language
    description: 'Language code for search results (default ''en''). Alias: hl.'
    required: false
    param_group: Options
    schema:
      type: string
      description: 'Language code for search results (default ''en''). Alias: hl.'
      default: en
    runtime_required: false
  - name: location
    description: Location for search results (e.g., 'Austin, Texas').
    required: false
    param_group: Options
    schema:
      type: string
      description: Location for search results (e.g., 'Austin, Texas').
    runtime_required: false
  - name: device
    description: Device type for search results.
    required: false
    param_group: Options
    schema:
      type: string
      description: Device type for search results.
      enum:
        - desktop
        - mobile
        - tablet
    runtime_required: false
  - name: google_domain
    description: Google domain for search results (e.g., google.com, google.co.uk).
    param_group: Options
    schema:
      type: string
      description: Google domain for search results (e.g., google.com, google.co.uk).
    required: false
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/search.py
    title: WranglesPY search.find_links implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/search/_sources/find-links.md
    title: Archived search.find_links Markdown
configuration_schema:
  type: object
  description: >-
    Perform web searches to find links. Returns structured search results with titles, links,
    snippets, and optional pricing.
  additionalProperties: false
  required:
    - queries
    - id
    - output
  properties:
    queries:
      type:
        - string
        - array
      description: Name or list of input columns containing search queries.
    id:
      type: string
      description: Name of the column containing the row ID to append to each search result.
    output:
      type:
        - string
        - array
      description: >-
        Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column,
        pretty_strings_column].
    client:
      type: string
      description: The search provider to use.
      enum:
        - serpapi
      default: serpapi
    api_key:
      type: string
      description: >-
        API key for the search client. Can also be set as an environment variable (e.g.,
        SERPAPI_API_KEY).
    n_results:
      type: integer
      description: Number of search results to return per query (default 10, max 100).
      default: 10
    threads:
      type: integer
      description: Number of concurrent threads for parallel processing (default 10).
      default: 10
    country:
      type: string
      description: 'Country code for search results (default ''us''). Alias: gl.'
      default: us
    language:
      type: string
      description: 'Language code for search results (default ''en''). Alias: hl.'
      default: en
    google_domain:
      type: string
      description: Google domain for search results (e.g., google.com, google.co.uk).
    location:
      type: string
      description: Location for search results (e.g., 'Austin, Texas').
    device:
      type: string
      description: Device type for search results.
      enum:
        - desktop
        - mobile
        - tablet
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Find Links

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
