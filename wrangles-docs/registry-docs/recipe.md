---
title: "Recipe"
description: "Run another recipe as a wrangle against the current dataframe."
sidebar_label: "Recipe"
slug: "/recipe"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Recipe <CopyableCode value="recipe" />

Run another recipe as a wrangle against the current dataframe.

## Behavior

Run another recipe as a wrangle against the current dataframe.

This guidance was derived from the callable signature and its embedded Python schema docstring.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name, index, or list of input columns. | Any JSON value (not constrained upstream) | `null` | No |
| `output` | Name or list of output columns. | Any JSON value (not constrained upstream) | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `name` | file name of the recipe | string | `null` | Conditional; see schema |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `variables` | A dictionary of variables to pass to the recipe | object | `null` | No |
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
  "anyOf": [
    {
      "$ref": "#"
    },
    {
      "type": "object",
      "description": "Run a recipe as a Wrangle. Recipe-ception,",
      "additionalProperties": false,
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "description": "file name of the recipe"
        },
        "variables": {
          "type": "object",
          "description": "A dictionary of variables to pass to the recipe"
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
  ]
}
```

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
| Catalog ID | `86` |
| Catalog key | `recipe` |
| Recipe key | `recipe` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Nested recipe composition is outside the baseline. |
| Namespace | Root-level |
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.recipe` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY recipe implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)

</details>
