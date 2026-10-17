---
title: "Tokenize"
description: "Split text into tokens. A variety of methods are available. The default method is to split on spaces."
sidebar_label: "Tokenize"
slug: "/split/tokenize"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Tokenize <CopyableCode value="split.tokenize" />

Split text into tokens. A variety of methods are available. The default method is to split on spaces.

Tokenize elements in a list or string into individual tokens.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Column(s) to be split into tokens | string, integer, array | — | Yes |
| `output` | Name of the output column | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | Method to split the list. Options include `space`, `boundary`, `boundary_ignore_space`, custom functions as `custom.<function>`, or regex patterns as `regex:<pattern>`. | string; one of:<ul className="ww-param-enum-values"><li>space</li><li>boundary</li><li>boundary_ignore_space</li></ul> or string | `"space"` | No |
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
  "description": "Split text into tokens. A variety of methods are available. The default method is to split on spaces.",
  "additionalProperties": false,
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Column(s) to be split into tokens"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column"
    },
    "method": {
      "anyOf": [
        {
          "type": "string",
          "enum": [
            "space",
            "boundary",
            "boundary_ignore_space"
          ],
          "description": "Method to split the list. Options: space, boundary, boundary_ignore_space or use a custom function with custom.<function> or use a regex pattern with regex:<pattern>"
        },
        {
          "type": "string",
          "description": "Method to split the list. Options: space, boundary, boundary_ignore_space or use a custom function with custom.<function> or use a regex pattern with regex:<pattern>"
        }
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

```yaml
wrangles:
  - split.tokenize:
      input: Materials
      output: Tokenized List
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Materials |
| --- |
| Stainless Steel Oak Wood |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Tokenized List |
| --- |
| ['Stainless', 'Steel', 'Oak', 'Wood'] |

</div>

</div>






```yaml
wrangles:
  - split.tokenize:
      input: Materials
      output: Tokenized List
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Materials |
| --- |
| ['Stainless Steel', 'Oak Wood'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Tokenized List |
| --- |
| ['Stainless', 'Steel', 'Oak', 'Wood'] |

</div>

</div>

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
| Catalog ID | `66` |
| Catalog key | `split.tokenize` |
| Recipe key | `split.tokenize` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.tokenize` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `6cc88418-ae0c-43f6-84ee-31e0d5f838c3` |

**Sources**

- [WranglesPY split.tokenize implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Archived split.tokenize Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/split/_sources/tokenize.md)

</details>
