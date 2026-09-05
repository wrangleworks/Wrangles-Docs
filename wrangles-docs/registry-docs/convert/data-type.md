---
title: "Convert Data Type"
description: "Convert values to strings, numbers, booleans, or datetimes."
sidebar_label: "Convert Data Type"
slug: "/convert/data-type"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Convert Data Type

Convert values to strings, numbers, booleans, or datetimes.

Use `convert.data_type` when a recipe needs consistent Python-compatible
values rather than display-only formatting.

## Behavior

- Supported target types are `str`, `float`, `int`, `bool`, and `datetime`.
- Omitting `data_type` uses the runtime default `str`.
- Omitting `output` overwrites the input column.
- Failed conversions retain the original value unless `default` is supplied.
- Additional undocumented keyword arguments are implementation details and are
  not part of the public Registry contract.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name, index, or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. If omitted, each input column is overwritten. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `data_type` | Data type to produce. | string; one of:<ul className="ww-param-enum-values"><li>str</li><li>float</li><li>int</li><li>bool</li><li>datetime</li></ul> | `"str"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Value returned when conversion fails. If omitted, the original value is retained. | string, number, array, object, boolean, null | `null` | No |

</div>

## Examples

```yaml
wrangles:
  - convert.data_type:
      input: quantity
      output: quantity_integer
      data_type: int
      default: 0
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| quantity |
| --- |
| 12 |
| not available |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| quantity_integer |
| --- |
| 12 |
| 0 |

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
| Recipe key | `convert.data_type` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.data_type` |

**Sources**

- [WranglesPY convert.data_type implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Legacy convert.data_type documentation](https://wrangles.io/python/recipes/wrangles/convert#data-type)

</details>
