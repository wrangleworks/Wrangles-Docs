---
title: "Text"
description: "Split a string to multiple columns or a list."
sidebar_label: "Text"
slug: "/split/text"
---

# Text

Split a string to multiple columns or a list.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string | Name of the column to be split. | — |
| `output` | No | string, array, null | Name of the output column(s) If a single column is provided, the results will be returned as a list If multiple columns are listed, the results will be separated into the columns. If omitted, will overwrite the input. | `null` |
| `char` | No | string | Set the character(s) to split on. Default comma (,) Can also prefix with "regex:" to split on a pattern. | `","` |
| `pad` | No | boolean, null | Choose whether to pad to ensure a consistent length. Default true if outputting to columns, false for lists. | `null` |
| `element` | No | string, integer, null | Select a specific element or range after splitting using slicing syntax. e.g. 0, ":5", "5:", "2:8:2". | `null` |
| `inclusive` | No | boolean | If true, include the split character in the output. Default False. | `false` |
| `skip_empty` | No | boolean | Whether to skip empty values. | `false` |
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

Split text strings on certain characters. The text can be split into either multiple columns or a list.

## Migrated examples
#### To a List

##### Recipe

```yaml
wrangles:
  - split.text:
      input: Column1
      output: Column2
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column1 |
| --- |
| Hello, Wrangles! |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column2 |
| --- |
| ['Hello', 'Wrangles!'] |

</div>

</div>

#### Split Using Regex

##### Recipe

```yaml
# Split on x, case insensitive.
wrangles:
  - split.text:
      input: Col1
      output: Col2
      char: 'regex:(?i)x'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 |
| --- |
| 1x2 |
| 1X2 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col2 |
| --- |
| ['1', '2'] |
| ['1', '2'] |

</div>

</div>

#### Slice the Output

##### Recipe

```yaml
wrangles:
  - split.text:
      input: Column1
      output: Column2
      char: ', '
      element: 0
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column1 |
| --- |
| Hello, Wrangles! |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column2 |
| --- |
| Hello |

</div>

</div>

#### Split to Columns (Wildcard)

##### Recipe

```yaml
wrangles:
  - split.text:
      input: Col
      output: Col*              # Optional
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col |
| --- |
| Hello, Wrangles! |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col1 | Col2 |
| --- | --- |
| Hello | Wrangles! |

</div>

</div>

#### Split to Columns (Named)

##### Recipe

```yaml
wrangles:
  - split.text:
      input: Col
      output:
        - Col 1
        - Col 2
        - Col 3
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col |
| --- |
| Wrangles, are, Cool! |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col 1 | Col 2 | Col 3 |
| --- | --- | --- |
| Wrangles | are | Cool! |

</div>

</div>

## Provenance

- [WranglesPY split.text implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Existing split.text Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/text.md)

## Registry metadata

- Registry ID: `e76e43f7-d129-4bf8-87b4-a304a378b130`
- Namespace: `split`
- Recipe key: `split.text`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.split.text`
- Status: `active`
- Registry version: `0.1.0-pilot`
