---
title: "Format Price Breaks"
description: "Expand non-empty price-break cells into paired category and value columns."
sidebar_label: "Format Price Breaks"
slug: "/format/price-breaks"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Format Price Breaks

Expand non-empty price-break cells into paired category and value columns.

## Behavior

Expand non-empty price-break cells into paired category and value columns.

This guidance was derived from the callable signature.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name, index, or list of input columns. | array | — | Yes |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `categoryLabel` | Prefix for output columns that identify the source price-break category. | string | — | Yes |
| `valueLabel` | Prefix for output columns that contain the corresponding price-break value. | string | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

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
| Recipe key | `format.price_breaks` |
| Lifecycle status | active |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.price_breaks` |

**Sources**

- [WranglesPY format.price_breaks implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)

</details>
