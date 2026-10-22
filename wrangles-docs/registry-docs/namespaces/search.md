---
title: "Search Wrangles"
description: "Search wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Search"
slug: "/namespaces/search"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Search Wrangles

Search wrangles, with recipe examples, parameters, and behavior.

## Ai Mode <CopyableCode value="search.ai_mode" /> {#ai-mode}

Retrieve Google AI Mode Markdown and metadata. Use standardize.clean and extract.ai afterwards for cleanup and structuring.

Usage guidance and examples have not yet been reviewed.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Retrieve Google AI Mode Markdown and metadata. Use standardize.clean and extract.ai afterwards for cleanup and structuring.",
  "additionalProperties": false,
  "required": [
    "queries",
    "id",
    "output"
  ],
  "properties": {
    "queries": {
      "type": "string",
      "description": "Column containing one query string per row. Explode query lists before searching."
    },
    "id": {
      "type": "string",
      "description": "Input row ID column, retained in metadata.input_row_id."
    },
    "output": {
      "oneOf": [
        {
          "type": "string",
          "minLength": 1
        },
        {
          "type": "array",
          "minItems": 1,
          "maxItems": 2,
          "uniqueItems": true,
          "items": {
            "type": "string",
            "minLength": 1
          }
        }
      ],
      "description": "Outputs are ordered [ai_mode_results, ai_mode_metadata]. The first is\nthe untouched Markdown body; the optional second is the YAML frontmatter\nas a JSON-compatible dictionary, with query, query_index, input_row_id,\nsearch_id, status and error. Search requests output=md. It does not parse\nheadings, select references, clean the body or extract prices. Blank\nqueries have status Skipped. Missing/malformed metadata, provider errors\nand empty successful answers are explicit errors; non-success rows must\nnot be passed to extraction. query_config and the previous three-output\ncompact/complete/Markdown contract are no longer supported."
    },
    "client": {
      "type": "string",
      "enum": [
        "serpapi"
      ],
      "default": "serpapi"
    },
    "api_key": {
      "type": "string",
      "description": "Search key; defaults to SERPAPI_API_KEY."
    },
    "threads": {
      "type": "integer",
      "minimum": 1,
      "default": 10
    },
    "include_raw_response": {
      "type": "boolean",
      "default": false,
      "description": "Retain the untouched Markdown response including frontmatter under metadata.raw_response for trial capture and replay."
    },
    "country": {
      "type": [
        "string",
        "null"
      ],
      "description": "Optional country code. Alias: gl. Null or empty means omit."
    },
    "gl": {
      "type": [
        "string",
        "null"
      ],
      "description": "Optional country code; omitted unless supplied."
    },
    "language": {
      "type": [
        "string",
        "null"
      ],
      "description": "Optional language code. Alias: hl. Null or empty means omit."
    },
    "hl": {
      "type": [
        "string",
        "null"
      ],
      "description": "Optional language code; omitted unless supplied."
    },
    "location": {
      "type": [
        "string",
        "null"
      ],
      "description": "Optional city or geographic location; omitted unless supplied."
    },
    "device": {
      "type": "string",
      "enum": [
        "desktop",
        "mobile",
        "tablet"
      ],
      "description": "Optional device override."
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



<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Outputs are ordered [ai_mode_results, ai_mode_metadata]. The first is<br />the untouched Markdown body; the optional second is the YAML frontmatter<br />as a JSON-compatible dictionary, with query, query_index, input_row_id,<br />search_id, status and error. Search requests output=md. It does not parse<br />headings, select references, clean the body or extract prices. Blank<br />queries have status Skipped. Missing/malformed metadata, provider errors<br />and empty successful answers are explicit errors; non-success rows must<br />not be passed to extraction. query_config and the previous three-output<br />compact/complete/Markdown contract are no longer supported. | string or array | `null` | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `queries` | Column containing one query string per row. Explode query lists before searching. | string | — | Yes |
| `id` | Input row ID column, retained in metadata.input_row_id. | string | — | Yes |
| `client` | The client parameter. | string; one of:<ul className="ww-param-enum-values"><li>serpapi</li></ul> | `"serpapi"` | No |
| `api_key` | Search key; defaults to SERPAPI_API_KEY. | string | `null` | No |
| `threads` | The threads parameter. | integer | `10` | No |
| `include_raw_response` | Retain the untouched Markdown response including frontmatter under metadata.raw_response for trial capture and replay. | boolean | `false` | No |
| `country` | Optional country code. Alias: gl. Null or empty means omit. | string, null | — | No |
| `gl` | Optional country code; omitted unless supplied. | string, null | — | No |
| `language` | Optional language code. Alias: hl. Null or empty means omit. | string, null | — | No |
| `hl` | Optional language code; omitted unless supplied. | string, null | — | No |
| `location` | Optional city or geographic location; omitted unless supplied. | string, null | — | No |
| `device` | Optional device override. | string; one of:<ul className="ww-param-enum-values"><li>desktop</li><li>mobile</li><li>tablet</li></ul> | — | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

</details>

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | Not reviewed |
| Requires WrangleWorks account | Not reviewed |
| Requires subscription | Not reviewed |
| Requires external API key | Not reviewed |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `154` |
| Catalog key | `search.ai_mode` |
| Recipe key | `search.ai_mode` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `search` |
| Documentation group | `search` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.search.ai_mode` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bd5f88fba479ec406b409cb2880689c54e72b298/wrangles/recipe_wrangles/search.py)

</details>


---

## Find Links <CopyableCode value="search.find_links" /> {#find-links}

Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing.

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

<summary>Parameters</summary>

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

</details>

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


---

## Retrieve Link Content <CopyableCode value="search.retrieve_link_content" /> {#retrieve-link-content}

Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data. Additional options are passed to Gemini GenerateContentConfig.",
  "additionalProperties": true,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of input columns containing URLs or Scored Search Result dictionaries."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column for the raw dictionaries. To output BOTH the raw dictionaries and the formatted text, provide a list of exactly two column names (e.g., [page_data, page_text])."
    },
    "client": {
      "type": "string",
      "description": "The retrieval provider to use.",
      "enum": [
        "google_url_context"
      ],
      "default": "google_url_context"
    },
    "api_key": {
      "type": "string",
      "description": "API key for the provider. Can also be set as an environment variable (e.g., GOOGLE_API_KEY)."
    },
    "prompt": {
      "type": "string",
      "description": "Optional custom system prompt. Use {{ column_name }} to insert values from the full input row, including columns not selected by input. Replace spaces and punctuation in column names with underscores; aliases must be ASCII identifiers. Dictionaries and lists are inserted as finite JSON text. Substitution is literal and single-pass, without expressions or filters. Missing or ambiguous references fail before retrieval. Omit to use the default prompt."
    },
    "model_id": {
      "type": "string",
      "description": "The specific model ID to use. Defaults to the AI configuration."
    },
    "output_format": {
      "type": "string",
      "description": "The desired format for the extracted content.",
      "enum": [
        "markdown",
        "json"
      ],
      "default": "json"
    },
    "threads": {
      "type": "integer",
      "description": "Number of concurrent threads for parallel processing. Defaults to the AI configuration."
    },
    "thinking_level": {
      "type": "string",
      "enum": [
        "minimal",
        "low",
        "medium",
        "high"
      ],
      "description": "Gemini thinking level. Defaults to the configured value, packaged as minimal. Supported levels depend on the selected model."
    },
    "request_timeout_seconds": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "Total deadline in seconds for each URL, including retries. Defaults to the configured value, packaged as 10 seconds. A batch may take longer when URLs run in several waves."
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

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns containing URLs or Scored Search Result dictionaries. | string, array | — | Yes |
| `output` | Name of the output column for the raw dictionaries. To output BOTH the raw dictionaries and the formatted text, provide a list of exactly two column names (e.g., [page_data, page_text]). | string, array | `null` | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `prompt` | Optional custom system prompt. Use &#123;&#123; column_name &#125;&#125; to insert values from the full input row, including columns not selected by input. Replace spaces and punctuation in column names with underscores; aliases must be ASCII identifiers. Dictionaries and lists are inserted as finite JSON text. Substitution is literal and single-pass, without expressions or filters. Missing or ambiguous references fail before retrieval. Omit to use the default prompt. | string | `null` | No |
| `thinking_level` | Gemini thinking level. Defaults to the configured value, packaged as minimal. Supported levels depend on the selected model. | string; one of:<ul className="ww-param-enum-values"><li>minimal</li><li>low</li><li>medium</li><li>high</li></ul> | `null` | No |
| `request_timeout_seconds` | Total deadline in seconds for each URL, including retries. Defaults to the configured value, packaged as 10 seconds. A batch may take longer when URLs run in several waves. | number | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_format` | The desired format for the extracted content. | string; one of:<ul className="ww-param-enum-values"><li>markdown</li><li>json</li></ul> | `"json"` | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `threads` | Number of concurrent threads for parallel processing. Defaults to the AI configuration. | integer | `null` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `client` | The retrieval provider to use. | string; one of:<ul className="ww-param-enum-values"><li>google_url_context</li></ul> | `"google_url_context"` | No |
| `api_key` | API key for the provider. Can also be set as an environment variable (e.g., GOOGLE_API_KEY). | string | `null` | No |
| `model_id` | The specific model ID to use. Defaults to the AI configuration. | string | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

</details>

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
| Catalog ID | `48` |
| Catalog key | `search.retrieve_link_content` |
| Recipe key | `search.retrieve_link_content` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `search` |
| Documentation group | `search` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.search.retrieve_link_content` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `3d5faa87-9e96-48c0-8226-5ae566e8d76c` |

**Sources**

- [WranglesPY search.retrieve_link_content implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/search.py)
- [Archived search.retrieve_link_content Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/search/_sources/retrieve-link-content.md)

</details>
