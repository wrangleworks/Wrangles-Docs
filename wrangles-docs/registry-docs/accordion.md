---
title: "Accordion"
description: "Apply a series of wrangles to column(s) containing lists. The wrangles will be applied to each element in the list and the results will be returned back as a list."
sidebar_label: "Accordion"
slug: "/accordion"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Accordion

Apply a series of wrangles to column(s) containing lists. The wrangles will be applied to each element in the list and the results will be returned back as a list.

Apply a series of wrangles to the individual elements of one or more lists.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The column(s) containing the list(s) that the wrangles will be applied to the elements of. | string, integer, array | — | Yes |
| `output` | Output of the wrangles to save back to the dataframe. | string, array, null | `null` | No |
| `propagate` | Limit the column(s) that will be available to the wrangles and replicated for each element. If not specified, all columns will be propogated. This may be useful to limit the memory use for large datasets. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `wrangles` | List of wrangles to apply. | array | — | Yes |

</div>

## Examples

This example applies `convert.case` to each string in a list, where the wrangle would not normally operate on the list as a whole.



```yaml
wrangles:
  - accordion:
      input: list_column
      output: modified_lists
      wrangles:
        - convert.case:
            input: list_column
            output: modified_lists
            case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| list_column |
| --- |
| ["a", "b", "c"] |
| ["e", "f", "g"] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| modified_lists |
| --- |
| ["A", "B", "C"] |
| ["E", "F", "G"] |

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
| Recipe key | `accordion` |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Nested-list orchestration is not supported in the baseline. |
| Namespace | Root-level |
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.accordion` |

**Sources**

- [WranglesPY accordion implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing accordion Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/accordion.md)

</details>
