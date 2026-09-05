---
title: "Tokenize"
description: "Split text into tokens. A variety of methods are available. The default method is to split on spaces."
sidebar_label: "Tokenize"
slug: "/split/tokenize"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Tokenize

Split text into tokens. A variety of methods are available. The default method is to split on spaces.

Tokenize elements in a list or string into individual tokens.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Column(s) to be split into tokens. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | Method to split the list. Options include `space`, `boundary`, `boundary_ignore_space`, custom functions as `custom.<function>`, or regex patterns as `regex:<pattern>`. | string; one of:<ul className="ww-param-enum-values"><li>space</li><li>boundary</li><li>boundary_ignore_space</li></ul> or string | `"space"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - split.tokenize:
      input: Materials
      output: Tokenized List
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Materials |
| --- |
| Stainless Steel Oak Wood |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Tokenized List |
| --- |
| ['Stainless', 'Steel', 'Oak', 'Wood'] |

</div>

</div>






```yaml
wrangles:
  - split.tokenize:
      input: Materials
      output: Tokenized List
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Materials |
| --- |
| ['Stainless Steel', 'Oak Wood'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Tokenized List |
| --- |
| ['Stainless', 'Steel', 'Oak', 'Wood'] |

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
| Recipe key | `split.tokenize` |
| Lifecycle status | active |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.tokenize` |

**Sources**

- [WranglesPY split.tokenize implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Existing split.tokenize Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/tokenize.md)

</details>
