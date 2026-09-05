---
title: "Dictionary"
description: "Split one or more dictionaries into columns. The dictionary keys will be returned as the new column headers. If the dictionaries contain overlapping values, the last value will be returned."
sidebar_label: "Dictionary"
slug: "/split/dictionary"
---

# Dictionary

Split one or more dictionaries into columns. The dictionary keys will be returned as the new column headers. If the dictionaries contain overlapping values, the last value will be returned.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name or lists of the column(s) containing dictionaries to be split. If providing multiple dictionaries and the dictionaries contain overlapping values, the last value will be returned. | — |
| `output` | No | string, array, null | In columns output_format, this is an optional subset of keys to extract from the dictionary. If not provided, all keys will be returned. Columns can be renamed with the following syntax: output: - key1: new_column_name1 - key2: new_column_name2 In to_lists output_format, this must be two output columns for the keys and values lists. If not provided, Keys and Values will be used. | `null` |
| `default` | No | object, null | Provide a set of default headings and values if they are not found within the input. | `null` |
| `output_format` | No | string; one of: columns, to_lists | How to split the dictionary. columns creates one output column for each dictionary key. to_lists creates two output columns containing lists of keys and values. | `"columns"` |
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

Split a dictionary into columns. The dictionary keys are used as the new column headers.

## Migrated examples
#### Splitting an Entire Dictionary

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      # Output not required
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |

</div>

</div>

#### Choosing Specific Keys by Name

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      output: Col2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col2 |
| --- |
| B |

</div>

</div>

#### Using a Wildcard Output to Choose Specific Keys

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      output: Col*
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Other': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col1 | Col2 |
| --- | --- |
| A | B |

</div>

</div>

#### Using Regular Expressions to Choose Specific Keys

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      output: "regex: .*3"
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col3 |
| --- |
| C |

</div>

</div>

#### Choosing Specific Keys While Renaming the Output

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      output:
        - Col1: Column 1
        - Col2: Column 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column 1 | Column 2 |
| --- | --- |
| A | B |

</div>

</div>

#### Using a Wildcard While Renaming

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      output:
        - Col*: Column *
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| A | B | C |

</div>

</div>

## Provenance

- [WranglesPY split.dictionary implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Existing split.dictionary Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/dictionary.md)

## Registry metadata

- Registry ID: `06ca98e4-d026-43f7-84eb-af246d401ba9`
- Namespace: `split`
- Recipe key: `split.dictionary`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.split.dictionary`
- Status: `active`
- Registry version: `0.1.0-pilot`
