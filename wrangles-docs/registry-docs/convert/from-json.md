---
title: "Convert From JSON"
description: "Parse JSON text into lists, objects, scalars, booleans, or null values."
sidebar_label: "Convert From JSON"
slug: "/convert/from-json"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Convert From JSON

Parse JSON text into lists, objects, scalars, booleans, or null values.

Use `convert.from_json` when a column contains JSON text that later wrangles
need to treat as structured values.

## Behavior

- Each non-fallback value is parsed with Python's JSON parser.
- Omitting `output` overwrites the input column.
- Multiple input columns may share one fallback or use one fallback per input.
- Invalid JSON raises an error unless a non-null fallback is supplied.
- Permissive Python-literal or YAML-like parsing is outside this wrangle's
  contract.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name, index, or list of columns containing valid JSON text. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. If omitted, each input column is overwritten. | string, array | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Value returned for empty or invalid JSON. A list may supply one fallback per input column. | string, number, array, object, boolean, null | `null` | No |

</div>

## Examples

```yaml
wrangles:
  - convert.from_json:
      input: attributes_json
      output: attributes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| attributes_json |
| --- |
| &#123;"material":"steel","voltage":18&#125; |
| ["corded","variable speed"] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| attributes |
| --- |
| &#123;"material":"steel","voltage":18&#125; |
| ["corded","variable speed"] |

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
| Recipe key | `convert.from_json` |
| Lifecycle status | active |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.from_json` |

**Sources**

- [WranglesPY convert.from_json implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Legacy convert.from_json documentation](https://wrangles.io/python/recipes/wrangles/convert#from-json)

</details>
