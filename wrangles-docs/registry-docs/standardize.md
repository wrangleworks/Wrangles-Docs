---
title: "Standardize (Deprecated)"
description: "Deprecated compatibility key for `standardize.custom`, which standardizes data using a trained DIY or bespoke model."
sidebar_label: "Standardize (Deprecated)"
slug: "/standardize"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Standardize (Deprecated)

:::warning Deprecated
This compatibility wrangle remains available for existing recipes. Use [`standardize.custom`](/wrangles/namespaces/standardize#custom) for new recipes.
:::

Deprecated compatibility key for `standardize.custom`, which standardizes data using a trained DIY or bespoke model.

Run a standardize wrangle, such as one that expands abbreviations. A standardization wrangle must be trained first.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `case_sensitive` | Allows the wrangle to be case sensitive if set to True, default is False. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | The ID of the wrangle to use (do not include 'find' and 'replace'). | string, array | — | Yes |

</div>

## Examples

```yaml
wrangles:
  - standardize:
      input: Abbrev
      output: Abbreviations
      model_id: code_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Abbrev |
| --- |
| ASAP |
| ETA |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Abbreviations |
| --- |
| As Soon As Possible |
| Estimated Time of Arrival |

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
| Recipe key | `standardize` |
| Lifecycle status | deprecated |
| Replaced by | [`standardize.custom`](/wrangles/namespaces/standardize#custom) |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.standardize` |

**Sources**

- [WranglesPY standardize implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing standardize Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/standardize.md)

</details>
