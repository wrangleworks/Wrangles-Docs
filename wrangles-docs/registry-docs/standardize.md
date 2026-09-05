---
title: "Standardize"
description: "Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription."
sidebar_label: "Standardize"
slug: "/standardize"
---

# Standardize

Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name or list of input columns. | — |
| `model_id` | Yes | string, array | The ID of the wrangle to use (do not include 'find' and 'replace'). | — |
| `output` | No | string, array, null | Name or list of output columns. | `null` |
| `case_sensitive` | No | boolean | Allows the wrangle to be case sensitive if set to True, default is False. | `false` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | Yes |
| requires subscription | No |
| requires external api key | No |

## Guidance

Run a standardize wrangle, such as one that expands abbreviations. A standardization wrangle must be trained first.

## Migrated examples
#### Replacing Abbreviations

##### Recipe

```yaml
wrangles:
  - standardize:
      input: Abbrev
      output: Abbreviations
      model_id: code_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Abbrev |
| --- |
| ASAP |
| ETA |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Abbreviations |
| --- |
| As Soon As Possible |
| Estimated Time of Arrival |

</div>

</div>

## Provenance

- [WranglesPY standardize implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing standardize Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/standardize.md)

## Registry metadata

- Registry ID: `53cd3fdd-24e2-4411-8655-6014b92a3f3a`
- Namespace: root-level runtime key
- Recipe key: `standardize`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.standardize`
- Status: `active`
- Registry version: `0.1.0-pilot`
