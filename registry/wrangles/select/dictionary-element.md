---
schema_version: '0.1'
type: wrangle
id: 5adaeada-6da8-464f-84cb-9fb5ecc17e48
wrangle_name: dictionary_element
namespace: select
title: Dictionary Element
description: Select one or more element of a dictionary.
wrangle_key: select.dictionary_element
aliases: []
slug: select/dictionary-element
status: active
visibility: public
tags:
  - select
  - dictionary-element
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.dictionary_element
  contract_status: verified
access:
  ai_powered: false
  requires_account: false
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: input
    description: Name of the input column.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: element
    description: >-
      The key or keys from the dictionary to select. If a single key is provided, the value will be
      returned If a lists of keys are selected, the result will be a new dictionary.
    required: true
    param_group: Options
    schema:
      type: string
  - name: output
    description: Name of the output column. If omitted, the input column will be replaced.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: default
    description: >-
      Set the default value to return if the specified element doesn't exist. If selecting multiple
      elements, a dict of defaults can be set.
    required: false
    param_group: Errors
    runtime_default: ''
    schema:
      type:
        - string
        - number
        - array
        - object
        - boolean
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.dictionary_element implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/dictionary-element.md
    title: Existing select.dictionary_element Markdown
---

# Dictionary Element

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
