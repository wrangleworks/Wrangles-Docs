---
title: "Regex"
description: "Extract matches or specific capture groups using regex."
sidebar_label: "Regex"
slug: "/extract/regex"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Regex

Extract matches or specific capture groups using regex.

Extract single values, matches, or specific capture groups using regex.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column(s). | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `find` | Pattern to find using regex. | string | — | Yes |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_pattern` | Specifies the format to output matches and specific capture groups using backreferences (e.g., `\1`, `\2`). Default is to return entire matches. **Example**: For a regex pattern `r'(\d+)\s(\w+)'` and `output_pattern = '\2 \1'`, with input `'120 volt'`, the output would be `'volt 120'`. | string, null | `null` | No |
| `first_element` | Get the first element from results. | boolean | `false` | No |
| `output_format` | Format of the extract output. | string, null; one of:<ul className="ww-param-enum-values"><li>list</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate. | string | `", "` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - extract.regex:
      input: Product
      output: GPM
      find: \d\.?\d? ?gpm
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| 3.4 gpm water pump |
| 2gpm water pump |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| GPM |
| --- |
| 3.4 gpm |
| 2gpm |

</div>

</div>





```yaml
wrangles:
  - extract.regex:
      input: Product
      output: GPM
      find: (\d\.?\d?) ?gpm
      output_pattern: \1 Gallons Per Minute
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| 3.4 gpm water pump for 5.5 gallon tank |
| 2gpm water pump for 2 gal tank |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| GPM |
| --- |
| 3.4 Gallons Per Minute |
| 2 Gallons Per Minute |

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
| Recipe key | `extract.regex` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.regex` |

**Sources**

- [WranglesPY extract.regex implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.regex Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/regex.md)

</details>
