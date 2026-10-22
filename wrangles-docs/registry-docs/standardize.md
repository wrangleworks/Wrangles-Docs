---
title: "Standardize (Deprecated)"
description: "Deprecated compatibility key for `standardize.custom`, which standardizes data using a trained DIY or bespoke model."
sidebar_label: "Standardize (Deprecated)"
slug: "/standardize"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Standardize (Deprecated) <CopyableCode value="standardize" />

:::warning Deprecated
This compatibility wrangle remains available for existing recipes. Use [`standardize.custom`](/py/namespaces/standardize#custom) for new recipes.
:::

Run a standardize wrangle, such as one that expands abbreviations. A standardization wrangle must be trained first.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription.",
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
      "description": "Name or list of input columns."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output columns"
    },
    "model_id": {
      "type": [
        "string",
        "array"
      ],
      "description": "The ID of the wrangle to use (do not include 'find' and 'replace')"
    },
    "case_sensitive": {
      "type": "boolean",
      "description": "Allows the wrangle to be case sensitive if set to True, default is False."
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
  - standardize:
      input: Abbrev
      output: Abbreviations
      model_id: code_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Abbrev |
| --- |
| ASAP |
| ETA |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Abbreviations |
| --- |
| As Soon As Possible |
| Estimated Time of Arrival |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `case_sensitive` | Allows the wrangle to be case sensitive if set to True, default is False. | boolean | `false` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | The ID of the wrangle to use (do not include 'find' and 'replace') | string, array | — | No |
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
| Catalog ID | `95` |
| Catalog key | `standardize` |
| Recipe key | `standardize` |
| Catalog status | active |
| Lifecycle status | deprecated |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Deprecated compatibility key; use standardize.custom. |
| Replaced by | [`standardize.custom`](/py/namespaces/standardize#custom) |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.standardize` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `53cd3fdd-24e2-4411-8655-6014b92a3f3a` |

**Sources**

- [WranglesPY standardize implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived standardize Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/standardize.md)

</details>
