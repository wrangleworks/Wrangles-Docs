---
title: "Maths (Deprecated)"
description: "Deprecated alias for `math`; evaluate an expression and write its result to an output column."
sidebar_label: "Maths (Deprecated)"
slug: "/maths"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Maths (Deprecated) <CopyableCode value="maths" />

:::warning Deprecated
This compatibility wrangle remains available for existing recipes. Use [`math`](/py/namespaces/other#math) for new recipes.
:::

## Behavior

Deprecated alias for `math`; evaluate an expression and write its result to an output column.

This guidance was derived from the callable signature.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: deprecated-alias:math. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).

Compatibility correction: Exclude math's catalog_id from the maths alias schema.

Compatibility correction: Exclude math's status from the maths alias schema.

```json
{
  "type": "object",
  "description": "Apply a mathematical calculation.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer"
      ],
      "description": "The mathematical expression using column names. e.g. column1 * column2\n+ column3.  Note: spaces within column names are replaced by underscores (_).\n"
    },
    "output": {
      "type": "string",
      "description": "The column to output the results to"
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



<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The mathematical expression using column names. e.g. column1 * column2<br />+ column3.  Note: spaces within column names are replaced by underscores (_).<br /> | string, integer | — | Yes |
| `output` | The column to output the results to | string | — | Yes |
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
| Catalog ID | `83` |
| Catalog key | `maths` |
| Recipe key | `maths` |
| Catalog status | active |
| Lifecycle status | deprecated |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Deprecated compatibility key; use math. |
| Replaced by | [`math`](/py/namespaces/other#math) |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.maths` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY maths implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)

</details>
