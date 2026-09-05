---
title: "Lookup"
description: "Lookup values from a saved lookup wrangle."
sidebar_label: "Lookup"
slug: "/lookup"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Lookup

Lookup values from a saved lookup wrangle.

Look up data from a saved Lookup Wrangle. Data is output as a dictionary if an output is not specified or the output does not match any columns in the lookup. If specific lookup columns are named in the output, they will be output as individual columns.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to lookup. | string | — | Yes |
| `output` | Name of the output column(s). When n is provided and the output list length equals n, each output column receives the corresponding match. A single output containing a wildcard (*) is expanded into n columns, e.g. "Top *" with n: 3 becomes "Top 1", "Top 2", "Top 3". | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `lookup_mode` | How to perform lookups. 'by_row' (default): lookup each row individually. 'by_dataframe': lookup unique values once, copy results to all rows. 'by_matrix': lookup once per matrix permutation. | string; one of:<ul className="ww-param-enum-values"><li>by_row</li><li>by_matrix</li><li>by_dataframe</li></ul> | `"by_row"` | No |
| `n` | Number of matches to return per input value. When the output list length equals n, each output column receives the corresponding match. Otherwise all n matches are stored as a list in each output column. | integer, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | The model_id to use lookup against. | string, null | `null` | No |

</div>

## Examples

```yaml
wrangles:
  - lookup:
      input: State
      output:
        - Abbreviation
      model_id: 55555555-5555-5555
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| State |
| --- |
| Texas |
| New York |
| Virginia |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Abbreviation |
| --- |
| TX |
| NY |
| VA |

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
| Recipe key | `lookup` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `lookup` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.lookup` |

**Sources**

- [WranglesPY lookup implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing lookup Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/lookup/_sources/lookup.md)

</details>
