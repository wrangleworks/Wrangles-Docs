---
title: "Regex"
description: "Extract matches or specific capture groups using regex."
sidebar_label: "Regex"
slug: "/extract/regex"
---

# Regex

Extract matches or specific capture groups using regex.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column(s). | — |
| `find` | Yes | string | Pattern to find using regex. | — |
| `output` | Yes | string, array | Name of the output column(s). | — |
| `output_pattern` | No | string, null | Specifies the format to output matches and specific capture groups using backreferences (e.g., `\1`, `\2`). Default is to return entire matches. **Example**: For a regex pattern `r'(\d+)\s(\w+)'` and `output_pattern = '\2 \1'`, with input `'120 volt'`, the output would be `'volt 120'`. | `null` |
| `first_element` | No | boolean | Get the first element from results. | `false` |
| `output_format` | No | string, null; one of: list, columns, concatenate | Format of the extract output. | `null` |
| `char` | No | string | Character to use when output_format is concatenate. | `", "` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | No |
| requires subscription | No |
| requires external api key | No |

## Guidance

Extract single values, matches, or specific capture groups using regex.

## Migrated examples
#### Extracting Number of Months From Range

##### Recipe

```yaml
wrangles:
  - extract.regex:
      input: Product
      output: GPM
      find: \d\.?\d? ?gpm
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| GPM | Product |
| --- | --- |
| 3.4 gpm | 3.4 gpm water pump |
| 2gpm | 2gpm water pump |

</div>

</div>

#### Implementing output_pattern

##### Recipe

```yaml
wrangles:
  - extract.regex:
      input: Product
      output: GPM
      find: (\d\.?\d?) ?gpm
      output_pattern: \1 Gallons Per Minute
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| GPM | Product |
| --- | --- |
| 3.4 Gallons Per Minute | 3.4 gpm water pump for 5.5 gallon tank |
| 2 Gallons Per Minute | 2gpm water pump for 2 gal tank |

</div>

</div>

## Provenance

- [WranglesPY extract.regex implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.regex Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/regex.md)

## Registry metadata

- Registry ID: `9aa0253a-4b70-4737-832c-964e15967289`
- Namespace: `extract`
- Recipe key: `extract.regex`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.extract.regex`
- Status: `active`
- Registry version: `0.1.0-pilot`
