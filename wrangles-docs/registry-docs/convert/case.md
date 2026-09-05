---
title: "Convert Case"
description: "Change the letter case of text values."
sidebar_label: "Convert Case"
slug: "/convert/case"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Convert Case

Change the letter case of text values.

Use `convert.case` to normalize capitalization while keeping the source column
or writing the result to a new column.

## Behavior

- Supported modes are `lower`, `upper`, `title`, and `sentence`.
- Omitting `output` overwrites the input column.
- Input and output lists must have equal lengths.
- Non-string values are passed through unchanged and produce a warning.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name, index, or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. If omitted, each input column is overwritten. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `case` | Letter case to apply. Sentence case lowercases the value and capitalizes sentence starts. | string; one of:<ul className="ww-param-enum-values"><li>lower</li><li>upper</li><li>title</li><li>sentence</li></ul> | `"lower"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |

</div>

## Examples

```yaml
wrangles:
  - convert.case:
      input: product
      output: product_upper
      case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| product |
| --- |
| Cordless Drill |
| bearing seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| product_upper |
| --- |
| CORDLESS DRILL |
| BEARING SEAL |

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
| Recipe key | `convert.case` |
| Lifecycle status | active |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.case` |

**Sources**

- [WranglesPY convert.case implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Legacy convert.case documentation](https://wrangles.io/python/recipes/wrangles/convert#case)

</details>
