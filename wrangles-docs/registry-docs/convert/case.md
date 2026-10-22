---
title: "Convert Case"
description: "Change the letter case of text values."
sidebar_label: "Convert Case"
slug: "/convert/case"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Convert Case <CopyableCode value="convert.case" />

Use `convert.case` to normalize capitalization while keeping the source column
or writing the result to a new column.

## Behavior

- Supported modes are `lower`, `upper`, `title`, and `sentence`.
- Omitting `output` overwrites the input column.
- Input and output lists must have equal lengths.
- Non-string values are passed through unchanged and produce a warning.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Change the case of the input.",
  "additionalProperties": false,
  "required": [
    "input",
    "case"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name or list of input columns"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output columns"
    },
    "case": {
      "type": "string",
      "description": "The case to convert to. lower, upper, title or sentence",
      "enum": [
        "lower",
        "upper",
        "title",
        "sentence"
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
  - convert.case:
      input: product
      output: product_upper
      case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| product |
| --- |
| Cordless Drill |
| bearing seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| product_upper |
| --- |
| CORDLESS DRILL |
| BEARING SEAL |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns | string, integer, array | — | Yes |
| `output` | Name or list of output columns | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `case` | The case to convert to. lower, upper, title or sentence | string; one of:<ul className="ww-param-enum-values"><li>lower</li><li>upper</li><li>title</li><li>sentence</li></ul> | `"lower"` | Yes |
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
| Catalog ID | `5` |
| Catalog key | `convert.case` |
| Recipe key | `convert.case` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.case` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `12ff4120-3613-4801-8653-99c793477fbc` |

**Sources**

- [WranglesPY convert.case implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Legacy convert.case documentation](https://wrangles.io/python/recipes/wrangles/convert#case)

</details>
