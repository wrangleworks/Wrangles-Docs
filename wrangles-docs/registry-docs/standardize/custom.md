---
title: "Standardize Custom"
description: "Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription."
sidebar_label: "Standardize Custom"
slug: "/standardize/custom"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Standardize Custom

Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription.

## Behavior

Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription.

This guidance was derived from the callable signature and its embedded Python schema docstring.

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



<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | Yes |
| Requires subscription | Yes |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Recipe key | `standardize.custom` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `standardize` |
| Documentation group | `standardize` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.standardize.custom` |

**Sources**

- [WranglesPY standardize.custom implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/standardize.py)

</details>
