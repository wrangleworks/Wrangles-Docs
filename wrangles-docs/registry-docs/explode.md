---
title: "Explode"
description: "Explode a column of lists into rows."
sidebar_label: "Explode"
slug: "/explode"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Explode <CopyableCode value="explode" />

Explode a column of lists into rows.

Explode a column of lists into rows

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to explode. If multiple columns are included they must contain lists of the same length | string, integer, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `drop_empty` | If true, any rows that contain an empty list will be dropped.<br />If false, rows that contain empty lists will keep 1 row with an empty value.<br />Default False. | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `reset_index` | Reset the index after exploding. Default True. | boolean | `true` | No |
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
  "description": "Explode a column of lists into rows",
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
      "description": "Name of the column(s) to explode. If multiple columns are included they must contain lists of the same length"
    },
    "reset_index": {
      "type": "boolean",
      "description": "Reset the index after exploding. Default True."
    },
    "drop_empty": {
      "type": "boolean",
      "description": "If true, any rows that contain an empty list will be dropped.\nIf false, rows that contain empty lists will keep 1 row with an empty value.\nDefault False."
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
  - explode:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Products | Manufacturer |
| --- | --- |
| [Ball Bearing, Bearing Seal] | SKF |
| [Angle Grinder, Drill, Impact Driver] | Milwaukee |
| Solid State Relay | Schneider |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Products | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Seal | SKF |
| Angle Grinder | Milwaukee |
| Drill | Milwaukee |
| Impact Driver | Milwaukee |
| Solid State Relay | Schneider |

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
| Catalog ID | `77` |
| Catalog key | `explode` |
| Recipe key | `explode` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.explode` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `4e4b13ac-8d50-4b2c-85c8-2c31de1e817d` |

**Sources**

- [WranglesPY explode implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived explode Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/split/_sources/explode.md)

</details>
