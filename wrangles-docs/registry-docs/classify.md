---
title: "Classify"
description: "Run classify wrangles on the specified columns. Requires WrangleWorks Account and Subscription."
sidebar_label: "Classify"
slug: "/classify"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Classify <CopyableCode value="classify" />

Run a custom classification wrangle on the specified column or columns. A classification wrangle must be trained first.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Run classify wrangles on the specified columns.\nRequires WrangleWorks Account and Subscription.\n",
  "required": [
    "input",
    "output",
    "model_id"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the input column."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column."
    },
    "model_id": {
      "type": "string",
      "description": "ID of the classification model to be used"
    },
    "include_confidence": {
      "type": "boolean",
      "description": "For models that support it, include the confidence level in the output"
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
  - classify:
      input: Products
      output: Category
      model_id: ${model_id}
      where: Products = Milk
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Products |
| --- |
| Rice |
| Milk |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Category |
| --- |
|  |
| Dairy |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array | — | Yes |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `include_confidence` | For models that support it, include the confidence level in the output | boolean | — | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | ID of the classification model to be used | string | — | Yes |
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
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `71` |
| Catalog key | `classify` |
| Recipe key | `classify` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `ai` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.classify` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `06669ef8-cdd1-42f7-8078-98e0b7a42c30` |

**Sources**

- [WranglesPY classify implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived classify Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/ai/_sources/classify.md)

</details>
