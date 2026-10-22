---
title: "To JSON"
description: "Convert an object to a JSON representation."
sidebar_label: "To JSON"
slug: "/convert/to-json"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# To JSON <CopyableCode value="convert.to_json" />

Convert an object to a JSON representation.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Convert an object to a JSON representation.",
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
      "description": "Name of the input column."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column. If omitted, the input column will be overwritten"
    },
    "indent": {
      "type": [
        "string",
        "integer"
      ],
      "description": "If indent is a non-negative integer or string, then JSON array elements and object members will be pretty-printed  with that indent level. An indent level of 0, negative, or \"\" will only insert newlines. None (the default) selects the most  compact representation. Using a positive integer indent indents that many spaces per level. If indent is a string (such as '\\t'),  that string is used to indent each level."
    },
    "sort_keys": {
      "type": "boolean",
      "description": "If sort_keys is true (defaults to False), then the output of dictionaries will be sorted by key."
    },
    "ensure_ascii": {
      "type": "boolean",
      "description": "If true, non-ASCII characters will be escaped. Default is false"
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
  - convert.to_json:
      input: column
      output: new column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column |
| --- |
| `['a', 'python', 'list']` |
| `{'python': 'dict'}` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| new column |
| --- |
| `["a","python","list"]` |
| `{"python":"dict"}` |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. If omitted, the input column will be overwritten | string, array | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `ensure_ascii` | If true, non-ASCII characters will be escaped. Default is false | boolean | `false` | No |
| `indent` | If indent is a non-negative integer or string, then JSON array elements and object members will be pretty-printed  with that indent level. An indent level of 0, negative, or "" will only insert newlines. None (the default) selects the most  compact representation. Using a positive integer indent indents that many spaces per level. If indent is a string (such as '\t'),  that string is used to indent each level. | string, integer | — | No |
| `sort_keys` | If sort_keys is true (defaults to False), then the output of dictionaries will be sorted by key. | boolean | — | No |
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
| Catalog ID | `10` |
| Catalog key | `convert.to_json` |
| Recipe key | `convert.to_json` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.to_json` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `94e54eb7-2b8c-4047-89d0-fb5d16baf396` |

**Sources**

- [WranglesPY convert.to_json implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Archived convert.to_json Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/convert/_sources/to-json.md)

</details>
