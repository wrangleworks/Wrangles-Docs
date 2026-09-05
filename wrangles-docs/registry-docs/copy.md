---
title: "Copy"
description: "Make a copy of a column or a list of columns."
sidebar_label: "Copy"
slug: "/copy"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Copy

Make a copy of a column or a list of columns.

Create a copy of columns in a dataframe.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input columns or columns. | string, integer, array, null | `null` | No |
| `output` | Name of the output columns or columns. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - copy:
      input: Product Data
      output: Product Data (copy)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product Data | Product Data (copy) |
| --- | --- |
| SKF ball bearing | SKF ball bearing |
| bearing seal | bearing seal |

</div>

</div>





```yaml
wrangles:
  - copy:
      Product Data: Product Data (copy)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product Data | Product Data (copy) |
| --- | --- |
| SKF ball bearing | SKF ball bearing |
| bearing seal | bearing seal |

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
| Recipe key | `copy` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `transform` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.copy` |

**Sources**

- [WranglesPY copy implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing copy Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/transform/_sources/copy.md)

</details>
