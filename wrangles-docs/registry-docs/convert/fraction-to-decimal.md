---
title: "Fraction to Decimal"
description: "Convert fractions to decimals."
sidebar_label: "Fraction to Decimal"
slug: "/convert/fraction-to-decimal"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Fraction to Decimal <CopyableCode value="convert.fraction_to_decimal" />

Convert fractions to decimals.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column | string, integer, array | — | Yes |
| `output` | Name of the output colum | string, array | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `decimals` | Number of decimals to round fraction | number | `4` | No |
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
  "description": "Convert fractions to decimals",
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
      "description": "Name of the input column"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output colum"
    },
    "decimals": {
      "type": [
        "number"
      ],
      "description": "Number of decimals to round fraction"
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
  - convert.fraction_to_decimal:
      input: fractions
      output: decimals
      decimals: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| fractions |
| --- |
| 3/32 |
| 25/64 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| decimals |
| --- |
| 0.094 |
| 0.391 |

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
| Catalog ID | `7` |
| Catalog key | `convert.fraction_to_decimal` |
| Recipe key | `convert.fraction_to_decimal` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.fraction_to_decimal` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `7c55752e-70ab-4809-8298-c59436127457` |

**Sources**

- [WranglesPY convert.fraction_to_decimal implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Archived convert.fraction_to_decimal Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/convert/_sources/fraction-to-decimal.md)

</details>
