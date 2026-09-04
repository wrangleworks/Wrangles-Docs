---
title: "Dictionary Element"
description: "Select one or more element of a dictionary."
sidebar_label: "Dictionary Element"
slug: "/select/dictionary-element"
---

# Dictionary Element

Select one or more element of a dictionary.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `element` | Yes | string | The key or keys from the dictionary to select. If a single key is provided, the value will be returned If a lists of keys are selected, the result will be a new dictionary. | — |
| `output` | No | string, array, null | Name of the output column. If omitted, the input column will be replaced. | `null` |
| `default` | No | string, number, array, object, boolean, null | Set the default value to return if the specified element doesn't exist. If selecting multiple elements, a dict of defaults can be set. | `""` |
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

Select one or more element of a dictionary.

## Migrated examples
#### Selecting Dictionary Element Using Where

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Shapes
      element: shapes
      default: square
      where: Part Number = 1234
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Properties | Part Number |
| --- | --- |
| \{'colours': ['red', 'white', 'blue'], 'shapes': 'round', 'materials': 'tungsten'\} | 1234 |
| \{'colours': ['green', 'yellow', 'orange'], 'shapes': 'square', 'materials': 'tungsten'\} | 5678 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Shapes |
| --- |
| round |
|  |

</div>

</div>

#### Selecting Multiple Dictionary Elements

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      element:
        - shapes
        - materials
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Properties |
| --- |
| \{'colours': ['red', 'white', 'blue'], 'shapes': 'round', 'materials': 'tungsten'\} |
| \{'colours': ['green', 'yellow', 'orange'], 'shapes': 'square', 'materials': 'tungsten'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Properties |
| --- |
| \{'shapes': 'round', 'materials': 'tungsten'\} |
| \{'shapes': 'square', 'materials': 'tungsten'\} |

</div>

</div>

#### Selecting Multiple Dictionary Elements Using a Wildcard

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
        - Col*
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Other3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column | Output Dict |
| --- | --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} | \{'Col1': 'A', 'Col2': 'B'\} |

</div>

</div>

#### Selecting Multiple Dictionary Elements Using Regex

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
        - "regex: .*2"
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

| Column | Output Dict |
| --- | --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} | \{'Col2': 'B'\} |

</div>

</div>

#### Selecting Elements While Renaming

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
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

| Column | Output Dict |
| --- | --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} | \{'Column 1': 'A', 'Column 2': 'B'\} |

</div>

</div>

#### Using Default to Fill Missing Elements

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
        - Col1
        - Col3
      default:
        Col1: Z
        Col3: Y
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |
| \{'Col1': 'D', 'Col2': 'E'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column | Output Dict |
| --- | --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} | \{'Col1': 'A', 'Col3': 'C'\} |
| \{'Col1': 'D', 'Col2': 'E'\} | \{'Col1': 'D', 'Col3': 'Y'\} |

</div>

</div>

## Provenance

- [WranglesPY select.dictionary_element implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.dictionary_element Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/dictionary-element.md)

## Registry metadata

- Registry ID: `5adaeada-6da8-464f-84cb-9fb5ecc17e48`
- Namespace: `select`
- Recipe key: `select.dictionary_element`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.select.dictionary_element`
- Status: `active`
- Registry version: `0.1.0-pilot`
