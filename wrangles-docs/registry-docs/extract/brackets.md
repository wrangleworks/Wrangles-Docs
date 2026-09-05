---
title: "Brackets"
description: "Extract text properties in brackets from the input."
sidebar_label: "Brackets"
slug: "/extract/brackets"
---

# Brackets

Extract text properties in brackets from the input.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `output` | Yes | string, array | Name of the output columns. | — |
| `find` | No | string, array | (Optional) The type of brackets to find (round '()', square '[]', curly '&#123;&#125;', angled '&lt;&gt;'). Default is all brackets. | `"all"` |
| `include_brackets` | No | boolean | (Optional) Include the brackets in the output. | `false` |
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

Extract text in brackets from the input.

## Migrated examples
#### Extracting Data Within Brackets

##### Recipe

```yaml
wrangles:
  - extract.brackets:
      input: Data
      output: Output
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Data | Output |
| --- | --- |
| `{Hello}` | Hello |
| `[Wrangles]` | Wrangles |
| `(!)` | ! |
| `<!>` | ! |

</div>

</div>

## Provenance

- [WranglesPY extract.brackets implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.brackets Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/brackets.md)

## Registry metadata

- Registry ID: `9b4c15fa-2aaa-40c8-8834-6e835760bee5`
- Namespace: `extract`
- Recipe key: `extract.brackets`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.extract.brackets`
- Status: `active`
- Registry version: `0.1.0-pilot`
