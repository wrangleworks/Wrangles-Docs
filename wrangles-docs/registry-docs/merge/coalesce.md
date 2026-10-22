---
title: "Coalesce"
description: "Take the first non-empty value from a series of columns or lists."
sidebar_label: "Coalesce"
slug: "/merge/coalesce"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Coalesce <CopyableCode value="merge.coalesce" />

Take the first non-empty value from a series of columns.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Take the first non-empty value from a series of columns or lists.",
  "additionalProperties": false,
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": [
        "array",
        "string",
        "integer"
      ],
      "description": "List of input columns or a single column containing lists"
    },
    "output": {
      "type": "string",
      "description": "Name of the output columns. This is required if multiple input columns are provided."
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
  - merge.coalesce:
      input:
        - Col1
        - Col2
        - Col3
      output: Output Col
      where: Col2 = 'E'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |
| D | E | F |
| G | H | I |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Output Col |
| --- |
|  |
| D |
|  |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns or a single column containing lists | array, string, integer | — | Yes |
| `output` | Name of the output columns. This is required if multiple input columns are provided. | string | `null` | No |
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
| Catalog ID | `40` |
| Catalog key | `merge.coalesce` |
| Recipe key | `merge.coalesce` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.coalesce` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `25c1a60d-fa48-4b9a-8c03-0921d5b31049` |

**Sources**

- [WranglesPY merge.coalesce implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Archived merge.coalesce Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/merge/_sources/coalesce.md)

</details>
