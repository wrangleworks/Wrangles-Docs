---
title: "Codes"
description: "Extract alphanumeric codes from the input. Requires WrangleWorks Account."
sidebar_label: "Codes"
slug: "/extract/codes"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Codes

Extract alphanumeric codes from the input. Requires WrangleWorks Account.

Extract alphanumeric codes from unstructured text. Can be performed on one column or multiple columns. Requires WrangleWorks Account.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `min_length` | Minimum length of allowed results. | integer, string | — | No |
| `max_length` | Maximum length of allowed results. | integer, string | — | No |
| `strategy` | Controls filtering of likely false positives such as measurements. Lenient skips this filter; balanced and strict currently apply the same filter. Default is balanced. Unless min_length is provided, minimum lengths default to 3 for lenient, 4 for balanced, and 5 for strict. | string; one of:<ul className="ww-param-enum-values"><li>lenient</li><li>balanced</li><li>strict</li></ul> | — | No |
| `disallowed_patterns` | A pattern or JSON array of regex patterns to not include in the found codes. | string | — | No |
| `include_multi_part_tokens` | Whether to include multi-part tokens that have a space. Default True. | boolean | — | No |
| `extract_raw` | Whether to return tokens with their adjacent non-whitespace characters included, rather than the cleaned token. Default False. | boolean | — | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `first_element` | Get the first element from results. | boolean | `false` | No |
| `output_format` | Format of the extract output. | string, null; one of:<ul className="ww-param-enum-values"><li>list</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate. | string | `", "` | No |
| `sort_order` | Default is input order. Also allows longest or shortest. | string; one of:<ul className="ww-param-enum-values"><li>input</li><li>longest</li><li>shortest</li></ul> | — | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
# One column input
wrangles:
  - extract.codes:
      input: Secret
      output: Code Extract
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Secret |
| --- |
| to gain access use Z1ON0101 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Code Extract |
| --- |
| ['Z1ON0101'] |

</div>

</div>





```yaml
# Multi column input
wrangles:
  - extract.codes:
      input:
        - code1
        - code2
      output: Codes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| code1 | code2 |
| --- | --- |
| code CH465517080-1 | code CH465517080-2 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Codes |
| --- |
| ['CH465517080-1', 'CH465517080-2'] |

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
| Recipe key | `extract.codes` |
| Lifecycle status | active |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.codes` |

**Sources**

- [WranglesPY extract.codes implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.codes Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/codes.md)

</details>
