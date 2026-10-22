---
title: "Sample"
description: "Return a random sample of the rows."
sidebar_label: "Sample"
slug: "/select/sample"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Sample <CopyableCode value="select.sample" />

Return a random sample of the rows

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Return a random sample of the rows",
  "required": [
    "rows"
  ],
  "properties": {
    "rows": {
      "type": [
        "integer",
        "number"
      ],
      "description": "If a whole number, will select that number of rows.\nIf a decimal between 0 and 1 will select that fraction \nof the rows e.g. 0.1 => 10% of rows will be returned",
      "exclusiveMinimum": 0
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    },
    "where": {
      "$ref": "#/$defs/wrangles/commonProperties/where_special"
    },
    "where_params": {
      "$ref": "#/$defs/wrangles/commonProperties/where_params"
    }
  }
}
```

</details>

## Examples

The output is illustrative: each run can select different rows. Two rows are selected without replacement, with their column values unchanged.



```yaml
wrangles:
  - select.sample:
      rows: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Race | Timken |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Needle Bearing | Acme Bearings |

</div>

</div>



The output is illustrative: each run can select a different row. With four input rows, 25% selects one row.



```yaml
wrangles:
  - select.sample:
      rows: .25
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Race | Timken |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product | Manufacturer |
| --- | --- |
| Needle Bearing | Acme Bearings |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `rows` | If a whole number, will select that number of rows.<br />If a decimal between 0 and 1 will select that fraction <br />of the rows e.g. 0.1 =&gt; 10% of rows will be returned | integer, number | — | Yes |
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
| Catalog ID | `59` |
| Catalog key | `select.sample` |
| Recipe key | `select.sample` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.sample` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `95a84ab6-a66e-450f-8a4a-7a87e3a77932` |

**Sources**

- [WranglesPY select.sample implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Archived select.sample Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/select/_sources/sample.md)

</details>
