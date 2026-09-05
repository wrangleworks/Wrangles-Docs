---
title: "HTML"
description: "Extract elements from strings containing html. Requires WrangleWorks Account."
sidebar_label: "HTML"
slug: "/extract/html"
---

# HTML

Extract elements from strings containing html. Requires WrangleWorks Account.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name or list of input columns. | — |
| `data_type` | Yes | string; one of: text, links | The type of data to extract. | — |
| `output` | No | string, array, null | Name or list of output columns. | `null` |
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
| requires account | Yes |
| requires subscription | No |
| requires external api key | No |

## Guidance

Extract text and links from HTML elements. Requires WrangleWorks Account.

## Migrated examples
#### Extracting Text From HTML

##### Recipe

```yaml
wrangles:
  - extract.html:
      input: HTML
      output: Text
      data_type: text
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| HTML | Text |
| --- | --- |
| ` |  |

</div>

</div>

#### Extracting Links From HTML

##### Recipe

```yaml
wrangles:
  - extract.html:
      input: HTML
      output: Links
      data_type: links
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| HTML | Links |
| --- | --- |
| ` |  |

</div>

</div>

## Provenance

- [WranglesPY extract.html implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.html Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/html.md)

## Registry metadata

- Registry ID: `728fc87a-a20d-4efa-833a-612e0b5eadc3`
- Namespace: `extract`
- Recipe key: `extract.html`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.extract.html`
- Status: `active`
- Registry version: `0.1.0-pilot`
