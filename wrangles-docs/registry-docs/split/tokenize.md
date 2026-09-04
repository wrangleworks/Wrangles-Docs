---
title: "Tokenize"
description: "Split text into tokens. A variety of methods are available. The default method is to split on spaces."
sidebar_label: "Tokenize"
slug: "/split/tokenize"
---

# Tokenize

Split text into tokens. A variety of methods are available. The default method is to split on spaces.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Column(s) to be split into tokens. | — |
| `output` | No | string, array, null | Name of the output column. | `null` |
| `method` | No | string; one of: space, boundary, boundary_ignore_space or string | Method to split the list. Options include `space`, `boundary`, `boundary_ignore_space`, custom functions as `custom.<function>`, or regex patterns as `regex:<pattern>`. | `"space"` |
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

Tokenize elements in a list or string into individual tokens.

## Migrated examples
#### Tokenizing a String

##### Recipe

```yaml
wrangles:
  - split.tokenize:
      input: Materials
      output: Tokenized List
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Materials |
| --- |
| Stainless Steel Oak Wood |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Tokenized List |
| --- |
| ['Stainless', 'Steel', 'Oak', 'Wood'] |

</div>

</div>


#### Tokenizing a List

##### Recipe

```yaml
wrangles:
  - split.tokenize:
      input: Materials
      output: Tokenized List
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Materials |
| --- |
| ['Stainless Steel', 'Oak Wood'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Tokenized List |
| --- |
| ['Stainless', 'Steel', 'Oak', 'Wood'] |

</div>

</div>

## Provenance

- [WranglesPY split.tokenize implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Existing split.tokenize Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/tokenize.md)

## Registry metadata

- Registry ID: `6cc88418-ae0c-43f6-84ee-31e0d5f838c3`
- Namespace: `split`
- Recipe key: `split.tokenize`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.split.tokenize`
- Status: `active`
- Registry version: `0.1.0-pilot`
