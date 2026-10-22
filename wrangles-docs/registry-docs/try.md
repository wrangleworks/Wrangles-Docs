---
title: "Try"
description: "Try a list of wrangles and catch any errors that occur."
sidebar_label: "Try"
slug: "/try"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Try <CopyableCode value="try" />

Run a list of wrangles and catch errors. When `except` is provided, its wrangles or fallback column values run after an error; otherwise, the error is logged and the recipe continues.

The runtime supports both forms, but the pinned upstream schema only permits a
dictionary for `except`. Use fallback column values for schema-validated recipes.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Try a list of wrangles and catch any errors that occur",
  "required": [
    "wrangles"
  ],
  "properties": {
    "wrangles": {
      "type": "array",
      "description": "List of wrangles to apply",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/wrangles/items"
      }
    },
    "except": {
      "type": [
        "object"
      ],
      "description": "An action to take if the wrangles encounter an error.\nThis can contain a list of wrangles or a dictionary of column names and values.\nIf except is not provided, the error will be logged and the recipe will continue.",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/wrangles/items"
      }
    },
    "retries": {
      "type": "integer",
      "description": "Number of times to retry the wrangles if an error occurs. Default 0.",
      "minimum": 0
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

This input deliberately lacks `column`, so the conversion raises a missing-column error and `except` creates it with the fallback value. Invalid numeric text alone does not trigger this fallback: `convert.data_type` retains unconvertible values unless a default is provided.



```yaml
wrangles:
  - try:
      wrangles:
        - convert.data_type:
            input: column
            data_type: int
      except:
        column: unavailable
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| Hammer |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| column |
| --- |
| unavailable |

</div>

</div>



The same recipe preserves a successful conversion rather than applying the fallback.

```yaml
wrangles:
  - try:
      wrangles:
        - convert.data_type:
            input: column
            data_type: int
      except:
        column: unavailable
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column |
| --- |
| "42" |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| column |
| --- |
| 42 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `wrangles` | List of wrangles to apply | array | — | Yes |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `retries` | Number of times to retry the wrangles if an error occurs. Default 0. | integer | `0` | No |
| `except` | An action to take if the wrangles encounter an error.<br />This can contain a list of wrangles or a dictionary of column names and values.<br />If except is not provided, the error will be logged and the recipe will continue. | object | — | No |
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
| Catalog ID | `98` |
| Catalog key | `try` |
| Recipe key | `try` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Error-control orchestration is not supported in the baseline. |
| Namespace | Root-level |
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.Try` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY try implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived try Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/try.md)

</details>
