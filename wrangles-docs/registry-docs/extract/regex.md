---
title: "Regex"
description: "Extract matches or specific capture groups using regex."
sidebar_label: "Regex"
slug: "/extract/regex"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Regex <CopyableCode value="extract.regex" />

Extract matches or specific capture groups using regex.

Extract single values, matches, or specific capture groups using regex.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column(s). | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `find` | Pattern to find using regex | string | — | Yes |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_pattern` | Specifies the format to output matches and specific capture groups using backreferences (e.g., `\1`, `\2`). Default is to return entire matches.<br /><br />**Example**: For a regex pattern `r'(\d+)\s(\w+)'` and `output_pattern = '\2 \1'`, with input `'120 volt'`, the output would be `'volt 120'`.<br /> | string | `null` | No |
| `first_element` | Get the first element from results | boolean | `false` | No |
| `output_format` | Format of the extract output | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate | string | `", "` | No |
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
  "description": "Extract matches or specific capture groups using regex",
  "additionalProperties": false,
  "required": [
    "input",
    "output",
    "find"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the input column(s)."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column(s)."
    },
    "find": {
      "type": "string",
      "description": "Pattern to find using regex"
    },
    "output_pattern": {
      "type": "string",
      "description": "Specifies the format to output matches and specific capture groups using backreferences (e.g., `\\1`, `\\2`). Default is to return entire matches.\n\n**Example**: For a regex pattern `r'(\\d+)\\s(\\w+)'` and `output_pattern = '\\2 \\1'`, with input `'120 volt'`, the output would be `'volt 120'`.\n"
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
  - extract.regex:
      input: Product
      output: GPM
      find: \d\.?\d? ?gpm
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| 3.4 gpm water pump |
| 2gpm water pump |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| GPM |
| --- |
| 3.4 gpm |
| 2gpm |

</div>

</div>





```yaml
wrangles:
  - extract.regex:
      input: Product
      output: GPM
      find: (\d\.?\d?) ?gpm
      output_pattern: \1 Gallons Per Minute
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| 3.4 gpm water pump for 5.5 gallon tank |
| 2gpm water pump for 2 gal tank |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| GPM |
| --- |
| 3.4 Gallons Per Minute |
| 2 Gallons Per Minute |

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
| Catalog ID | `30` |
| Catalog key | `extract.regex` |
| Recipe key | `extract.regex` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.regex` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `9aa0253a-4b70-4737-832c-964e15967289` |

**Sources**

- [WranglesPY extract.regex implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.regex Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/regex.md)

</details>
