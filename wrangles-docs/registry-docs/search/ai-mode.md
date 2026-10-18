---
title: "Ai Mode"
description: "Retrieve Google AI Mode Markdown and metadata. Use standardize.clean and extract.ai afterwards for cleanup and structuring."
sidebar_label: "Ai Mode"
slug: "/search/ai-mode"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Ai Mode <CopyableCode value="search.ai_mode" />

Retrieve Google AI Mode Markdown and metadata. Use standardize.clean and extract.ai afterwards for cleanup and structuring.

Usage guidance and examples have not yet been reviewed.

## Parameters

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
