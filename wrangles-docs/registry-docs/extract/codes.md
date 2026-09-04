---
title: "Codes"
description: "Extract alphanumeric codes from the input. Requires WrangleWorks Account."
sidebar_label: "Codes"
slug: "/extract/codes"
---

# Codes

Extract alphanumeric codes from the input. Requires WrangleWorks Account.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name or list of input columns. | — |
| `output` | Yes | string, array | Name or list of output columns. | — |
| `first_element` | No | boolean | Get the first element from results. | `false` |
| `output_format` | No | string, null; one of: list, columns, concatenate | Format of the extract output. | `null` |
| `char` | No | string | Character to use when output_format is concatenate. | `", "` |
| `min_length` | No | integer, string | Minimum length of allowed results. | — |
| `max_length` | No | integer, string | Maximum length of allowed results. | — |
| `strategy` | No | string; one of: lenient, balanced, strict | Controls filtering of likely false positives such as measurements. Lenient skips this filter; balanced and strict currently apply the same filter. Default is balanced. Unless min_length is provided, minimum lengths default to 3 for lenient, 4 for balanced, and 5 for strict. | — |
| `sort_order` | No | string; one of: input, longest, shortest | Default is input order. Also allows longest or shortest. | — |
| `disallowed_patterns` | No | string | A pattern or JSON array of regex patterns to not include in the found codes. | — |
| `include_multi_part_tokens` | No | boolean | Whether to include multi-part tokens that have a space. Default True. | — |
| `extract_raw` | No | boolean | Whether to return tokens with their adjacent non-whitespace characters included, rather than the cleaned token. Default False. | — |
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

Extract alphanumeric codes from unstructured text. Can be performed on one column or multiple columns. Requires WrangleWorks Account.

## Migrated examples
#### Extracting Codes From Single Column

##### Recipe

```yaml
# One column input
wrangles:
  - extract.codes:
      input: Secret
      output: Code Extract
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Secret | Code Extract |
| --- | --- |
| to gain access use Z1ON0101 | ['Z1ON0101'] |

</div>

</div>

#### Extracting Codes From Multiple Columns

##### Recipe

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

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Codes | code1 | code2 |
| --- | --- | --- |
| ['CH465517080-1', 'CH465517080-2'] | code CH465517080-1 | code CH465517080-2 |

</div>

</div>

## Provenance

- [WranglesPY extract.codes implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.codes Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/codes.md)

## Registry metadata

- Registry ID: `da591387-0fca-4842-8bcb-d19f561f0292`
- Namespace: `extract`
- Recipe key: `extract.codes`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.extract.codes`
- Status: `active`
- Registry version: `0.1.0-pilot`
