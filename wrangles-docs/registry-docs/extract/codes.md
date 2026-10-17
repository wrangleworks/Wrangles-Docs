---
title: "Codes"
description: "Extract alphanumeric codes from the input. Requires WrangleWorks Account."
sidebar_label: "Codes"
slug: "/extract/codes"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Codes <CopyableCode value="extract.codes" />

Extract alphanumeric codes from the input. Requires WrangleWorks Account.

Extract alphanumeric codes from unstructured text. Can be performed on one column or multiple columns. Requires WrangleWorks Account.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `min_length` | Minimum length of allowed results | integer, string | — | No |
| `max_length` | Maximum length of allowed results | integer, string | — | No |
| `strategy` | Controls filtering of likely false positives such as measurements. Lenient skips this filter; balanced and strict currently apply the same filter. Default is balanced. Unless min_length is provided, minimum lengths default to 3 for lenient, 4 for balanced, and 5 for strict. | string; one of:<ul className="ww-param-enum-values"><li>lenient</li><li>balanced</li><li>strict</li></ul> | — | No |
| `disallowed_patterns` | A pattern or JSON array of regex patterns to not include in the found codes | string | — | No |
| `include_multi_part_tokens` | Whether to include multi-part tokens that have a space. Default True. | boolean | — | No |
| `extract_raw` | Whether to return tokens with their adjacent non-whitespace characters included, rather than the cleaned token. Default False. | boolean | — | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `first_element` | Get the first element from results | boolean | `false` | No |
| `output_format` | Format of the extract output | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate | string | `", "` | No |
| `sort_order` | Default is input order. Also allows longest or shortest. | string; one of:<ul className="ww-param-enum-values"><li>input</li><li>longest</li><li>shortest</li></ul> | — | No |
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
  "description": "Extract alphanumeric codes from the input. Requires WrangleWorks Account.",
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name or list of input columns."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output columns"
    },
    "first_element": {
      "type": "boolean",
      "description": "Get the first element from results"
    },
    "output_format": {
      "type": "string",
      "description": "Format of the extract output",
      "enum": [
        "list",
        "columns",
        "concatenate"
      ]
    },
    "char": {
      "type": "string",
      "description": "Character to use when output_format is concatenate"
    },
    "min_length": {
      "type": [
        "integer",
        "string"
      ],
      "description": "Minimum length of allowed results"
    },
    "max_length": {
      "type": [
        "integer",
        "string"
      ],
      "description": "Maximum length of allowed results"
    },
    "strategy": {
      "type": "string",
      "description": "Controls filtering of likely false positives such as measurements. Lenient skips this filter; balanced and strict currently apply the same filter. Default is balanced. Unless min_length is provided, minimum lengths default to 3 for lenient, 4 for balanced, and 5 for strict.",
      "enum": [
        "lenient",
        "balanced",
        "strict"
      ]
    },
    "sort_order": {
      "type": "string",
      "description": "Default is input order. Also allows longest or shortest.",
      "enum": [
        "input",
        "longest",
        "shortest"
      ]
    },
    "disallowed_patterns": {
      "type": "string",
      "description": "A pattern or JSON array of regex patterns to not include in the found codes"
    },
    "include_multi_part_tokens": {
      "type": "boolean",
      "description": "Whether to include multi-part tokens that have a space. Default True."
    },
    "extract_raw": {
      "type": "boolean",
      "description": "Whether to return tokens with their adjacent non-whitespace characters included, rather than the cleaned token. Default False."
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
# One column input
wrangles:
  - extract.codes:
      input: Secret
      output: Code Extract
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Secret |
| --- |
| to gain access use Z1ON0101 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Code Extract |
| --- |
| ['Z1ON0101'] |

</div>

</div>





```yaml
# Multi column input
wrangles:
  - extract.codes:
      input:
        - code1
        - code2
      output: Codes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| code1 | code2 |
| --- | --- |
| code CH465517080-1 | code CH465517080-2 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Codes |
| --- |
| ['CH465517080-1', 'CH465517080-2'] |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `24` |
| Catalog key | `extract.codes` |
| Recipe key | `extract.codes` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.codes` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `da591387-0fca-4842-8bcb-d19f561f0292` |

**Sources**

- [WranglesPY extract.codes implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.codes Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/codes.md)

</details>
