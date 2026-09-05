---
title: "HTML"
description: "Extract elements from strings containing html. Requires WrangleWorks Account."
sidebar_label: "HTML"
slug: "/extract/html"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# HTML

Extract elements from strings containing html. Requires WrangleWorks Account.

Extract text and links from HTML elements. Requires WrangleWorks Account.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `data_type` | The type of data to extract. | string; one of:<ul className="ww-param-enum-values"><li>text</li><li>links</li></ul> | — | Yes |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
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
  - extract.html:
      input: HTML
      output: Text
      data_type: text
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| HTML |
| --- |
| ` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Text |
| --- |
|  |

</div>

</div>





```yaml
wrangles:
  - extract.html:
      input: HTML
      output: Links
      data_type: links
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| HTML |
| --- |
| ` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Links |
| --- |
|  |

</div>

</div>

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
| Recipe key | `extract.html` |
| Lifecycle status | active |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.html` |

**Sources**

- [WranglesPY extract.html implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.html Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/html.md)

</details>
