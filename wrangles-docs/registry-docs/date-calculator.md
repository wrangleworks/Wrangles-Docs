---
title: "Date Calculator"
description: "Add or Subtract time from a date."
sidebar_label: "Date Calculator"
slug: "/date-calculator"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Date Calculator <CopyableCode value="date_calculator" />

Add or Subtract time from a date.

Add or subtract time from a date.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the dates column | string, integer | — | Yes |
| `output` | Name of the output column of dates | string | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `operation` | Date operation | string; one of:<ul className="ww-param-enum-values"><li>add</li><li>subtract</li></ul> | `"add"` | No |
| `time_unit` | time unit for operation | string; one of:<ul className="ww-param-enum-values"><li>years</li><li>months</li><li>weeks</li><li>days</li><li>hours</li><li>minutes</li><li>seconds</li><li>milliseconds</li></ul> | `null` | No |
| `time_value` | time unit value for operation | number | `null` | No |
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
  "description": "Add or Subtract time from a date",
  "additionalProperties": false,
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer"
      ],
      "description": "Name of the dates column"
    },
    "operation": {
      "type": "string",
      "description": "Date operation",
      "enum": [
        "add",
        "subtract"
      ]
    },
    "output": {
      "type": "string",
      "description": "Name of the output column of dates"
    },
    "time_unit": {
      "type": "string",
      "description": "time unit for operation",
      "enum": [
        "years",
        "months",
        "weeks",
        "days",
        "hours",
        "minutes",
        "seconds",
        "milliseconds"
      ]
    },
    "time_value": {
      "type": "number",
      "description": "time unit value for operation"
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
   - date_calculator:
      input: Date
      output: New Date
      operation: subtract  # Optional default is addition
      time_unit: days
      time_value: 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Date |
| --- |
| 2022-12-26 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| New Date |
| --- |
| 2022-12-25 |

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
| Catalog ID | `75` |
| Catalog key | `date_calculator` |
| Recipe key | `date_calculator` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `date` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.date_calculator` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `19cfeb4f-02af-4ab2-895c-0ff2bb5cce19` |

**Sources**

- [WranglesPY date_calculator implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived date_calculator Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/date/_sources/date-calculator.md)

</details>
