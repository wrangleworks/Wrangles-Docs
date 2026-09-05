---
title: "Highest Confidence"
description: "Select the option with the highest confidence from multiple columns. Inputs are expected to be of the form [<<value>>, <<confidence_score>>]."
sidebar_label: "Highest Confidence"
slug: "/select/highest-confidence"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Highest Confidence

Select the option with the highest confidence from multiple columns. Inputs are expected to be of the form [&lt;&lt;value&gt;&gt;, &lt;&lt;confidence_score&gt;&gt;].

Select the option with the highest confidence from multiple columns. Inputs are expected to be of the form `[value, confidence_score]`.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of the input columns to select from. | array | — | Yes |
| `output` | If two columns; the result and confidence. If one column; [result, confidence]. | string, array | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - select.highest_confidence:
      input:
        - Col1
        - Col2
        - Col3
      output: Highest Confidence
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| ['A', 0.79] | ['B', 0.77] | ['C', 0.99] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Highest Confidence |
| --- |
| ['C', 0.99] |

</div>

</div>





```yaml
wrangles:
  - select.highest_confidence:
      input:
        - Col1
        - Col2
        - Col3
      output:
        - Item
        - Confidence
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| ['A', 0.79] | ['B', 0.77] | ['C', 0.99] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Item | Confidence |
| --- | --- |
| C | 0.99 |

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
| Recipe key | `select.highest_confidence` |
| Lifecycle status | active |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.highest_confidence` |

**Sources**

- [WranglesPY select.highest_confidence implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.highest_confidence Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/highest-confidence.md)

</details>
