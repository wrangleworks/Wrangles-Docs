---
title: "Log"
description: "Log the current status of the dataframe."
sidebar_label: "Log"
slug: "/log"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Log <CopyableCode value="log" />

Print the current status of the dataframe. Only a sample of rows is logged.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Log the current status of the dataframe.",
  "additionalProperties": false,
  "properties": {
    "columns": {
      "type": "array",
      "description": "(Optional, default all columns) List of specific columns to log."
    },
    "write": {
      "type": "array",
      "description": "(Optional) Allows for an intermediate output to a file/dataframe/database etc.",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/write/items"
      }
    },
    "error": {
      "type": "string",
      "description": "Log an error to the console"
    },
    "warning": {
      "type": "string",
      "description": "Log a warning to the console"
    },
    "info": {
      "type": "string",
      "description": "Log info to the console"
    },
    "log_data": {
      "type": "boolean",
      "description": "Whether to log a sample of the contents of the dataframe. Default True if not logging to a write, error, warning or info. Default False otherwise."
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
  - log: {}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product | Quantity |
| --- | --- |
| Hammer | 2 |
| Drill | 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product | Quantity |
| --- | --- |
| Hammer | 2 |
| Drill | 3 |

The data is returned unchanged. A sample of the dataframe is written to the server log, not added to the result table.

</div>

</div>





```yaml
wrangles:
  - log:
      columns:
        - column1
        - column2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column1 | column2 |
| --- | --- |
| Hammer | 3 |
| Drill | 2 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

The input data is returned unchanged; the selected columns are also logged.

| column1 | column2 |
| --- | --- |
| Hammer | 3 |
| Drill | 2 |

</div>

</div>





```yaml
wrangles:
  - log:
      write:
        - file:
            name: output/filepath
            columns:
              - column 1
              - column 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_Logs a sample of rows or status information to the configured destination._

</div>

</div>



| Variable | Function |
| --- | --- |
| `${column_count}` | Number of columns. |
| `${columns}` | List of all columns. |
| `${df}` | Current dataframe. |
| `${row_count}` | Number of visible rows processed in each batch. |

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `columns` | (Optional, default all columns) List of specific columns to log. | array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `write` | (Optional) Allows for an intermediate output to a file/dataframe/database etc. | array | `null` | No |
| `warning` | Log a warning to the console | string | `null` | No |
| `info` | Log info to the console | string | `null` | No |
| `log_data` | Whether to log a sample of the contents of the dataframe. Default True if not logging to a write, error, warning or info. Default False otherwise. | boolean | `null` | No |
| `error` | Log an error to the console | string | — | No |
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
| Catalog ID | `80` |
| Catalog key | `log` |
| Recipe key | `log` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Operational logging steps are not authored in the baseline. |
| Namespace | Root-level |
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.log` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `6177808e-aa2d-4d0b-8385-858b16948a5d` |

**Sources**

- [WranglesPY log implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived log Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/log.md)

</details>
