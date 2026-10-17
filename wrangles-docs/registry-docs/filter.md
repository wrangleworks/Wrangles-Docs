---
title: "Filter"
description: "Filter the dataframe based on the contents. If multiple filters are specified, all must be correct. For complex filters, use the where parameter."
sidebar_label: "Filter"
slug: "/filter"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Filter <CopyableCode value="filter" />

Filter the dataframe based on the contents. If multiple filters are specified, all must be correct. For complex filters, use the where parameter.

Filter the dataframe based on the contents.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to filter on.<br />If multiple are provided, all must match the criteria. | string, integer, array | `[]` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `equal` | Select rows where the values equal a given value. | string, array, boolean, number | `null` | No |
| `not_equal` | Select rows where the values do not equal a given value. | string, array, boolean, number | `null` | No |
| `is_in` | Select rows where the values are in a given list. | array, string | `null` | No |
| `not_in` | Select rows where the values are not in a given list. | array, string | `null` | No |
| `greater_than` | Select rows where the values are greater than a specified value. Does include the value itself. | integer, number | `null` | No |
| `greater_than_equal_to` | Select rows where the values are greater than a specified value. Does include the value itself. | integer, number | `null` | No |
| `less_than` | Select rows where the values are less than a specified value. Does not include the value itself. | integer, number | `null` | No |
| `less_than_equal_to` | Select rows where the values are less than a specified value. Does include the value itself. | integer, number | `null` | No |
| `between` | Value or list of values to filter that are in between two parameter values | array | `null` | No |
| `contains` | Select rows where the input contains the value. Allows regular expressions. | string | `null` | No |
| `not_contains` | Select rows where the input does not contain the value. Allows regular expressions. | string | `null` | No |
| `is_null` | If true, select all rows where the value is NULL. If false, where is not NULL. | boolean | `null` | No |
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
  "description": "Filter the dataframe based on the contents.\nIf multiple filters are specified, all must be correct.\nFor complex filters, use the where parameter.",
  "additionalProperties": false,
  "properties": {
    "where": {
      "$ref": "#/$defs/wrangles/commonProperties/where_special"
    },
    "where_params": {
      "$ref": "#/$defs/wrangles/commonProperties/where_params"
    },
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the column to filter on.\nIf multiple are provided, all must match the criteria."
    },
    "equal": {
      "type": [
        "string",
        "array",
        "boolean",
        "number"
      ],
      "description": "Select rows where the values equal a given value."
    },
    "not_equal": {
      "type": [
        "string",
        "array",
        "boolean",
        "number"
      ],
      "description": "Select rows where the values do not equal a given value."
    },
    "is_in": {
      "type": [
        "array",
        "string"
      ],
      "description": "Select rows where the values are in a given list."
    },
    "not_in": {
      "type": [
        "array",
        "string"
      ],
      "description": "Select rows where the values are not in a given list."
    },
    "is_null": {
      "type": "boolean",
      "description": "If true, select all rows where the value is NULL. If false, where is not NULL."
    },
    "greater_than": {
      "type": [
        "integer",
        "number"
      ],
      "description": "Select rows where the values are greater than a specified value. Does include the value itself."
    },
    "greater_than_equal_to": {
      "type": [
        "integer",
        "number"
      ],
      "description": "Select rows where the values are greater than a specified value. Does include the value itself."
    },
    "less_than": {
      "type": [
        "integer",
        "number"
      ],
      "description": "Select rows where the values are less than a specified value. Does not include the value itself."
    },
    "less_than_equal_to": {
      "type": [
        "integer",
        "number"
      ],
      "description": "Select rows where the values are less than a specified value. Does include the value itself."
    },
    "between": {
      "type": [
        "array"
      ],
      "description": "Value or list of values to filter that are in between two parameter values"
    },
    "contains": {
      "type": "string",
      "description": "Select rows where the input contains the value. Allows regular expressions."
    },
    "not_contains": {
      "type": "string",
      "description": "Select rows where the input does not contain the value. Allows regular expressions."
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    }
  }
}
```

</details>

## Examples

```yaml
wrangles:
  # Select only red fruits
  - filter:
      input: Color
      equal:
        - red
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Color | Fruit |
| --- | --- |
| red | Apple |
| green | Apple |
| orange | Orange |
| red | Strawberry |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Color | Fruit |
| --- | --- |
| red | Apple |
| red | Strawberry |

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
| Catalog ID | `78` |
| Catalog key | `filter` |
| Recipe key | `filter` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.filter` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `e3242acf-d204-433f-8373-205b77481131` |

**Sources**

- [WranglesPY filter implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived filter Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/select/_sources/filter.md)

</details>
