---
title: "Remove Words"
description: "Remove all the elements that occur in one list from another."
sidebar_label: "Remove Words"
slug: "/remove-words"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Remove Words <CopyableCode value="remove_words" />

Remove all the elements that occur in one list from another.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of column to remove words from | string, integer, array | — | Yes |
| `to_remove` | Column or list of columns with a list of words to be removed | array | — | Yes |
| `output` | Name of the output columns | string, array | `null` | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `tokenize_to_remove` | Tokenize all to_remove inputs | boolean | `false` | No |
| `ignore_case` | Ignore input and to_remove case | boolean | `true` | No |
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
  "description": "Remove all the elements that occur in one list from another.",
  "additionalProperties": false,
  "required": [
    "input",
    "to_remove",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of column to remove words from"
    },
    "to_remove": {
      "type": "array",
      "description": "Column or list of columns with a list of words to be removed"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output columns"
    },
    "tokenize_to_remove": {
      "type": "boolean",
      "description": "Tokenize all to_remove inputs"
    },
    "ignore_case": {
      "type": "boolean",
      "description": "Ignore input and to_remove case"
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
   - remove_words:
        input: Description
        to_remove: # To Remove columns must be list
          - Materials
          - Colours
        output: Product
        tokenize_to_remove: True
        ignore_case: False
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Colours | Materials | Description |
| --- | --- | --- |
| ['Blue'] | ['Steel'] | Steel Blue Bottle |
| ['Blue'] | ['Steel'] | ['Steel', 'Blue', 'Bottle'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product |
| --- |
| Bottle |
| Bottle |

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
| Catalog ID | `88` |
| Catalog key | `remove_words` |
| Recipe key | `remove_words` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.remove_words` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `543b96c3-f354-48be-8046-bf0cb9fbaf56` |

**Sources**

- [WranglesPY remove_words implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived remove_words Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/remove-words.md)

</details>
