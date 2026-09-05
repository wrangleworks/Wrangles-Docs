---
schema_version: '0.2'
type: wrangle
id: e76e43f7-d129-4bf8-87b4-a304a378b130
wrangle_name: text
namespace: split
title: Text
description: Split a string to multiple columns or a list.
wrangle_key: split.text
aliases: []
slug: split/text
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - split
  - text
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.split.text
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
    description: Name of the column to be split.
    required: true
    param_group: I/O
    schema:
      type: string
  - name: output
    description: >-
      Name of the output column(s) If a single column is provided, the results will be returned as a
      list If multiple columns are listed, the results will be separated into the columns. If
      omitted, will overwrite the input.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: char
    description: >-
      Set the character(s) to split on. Default comma (,) Can also prefix with "regex:" to split on
      a pattern.
    required: false
    param_group: Options
    runtime_default: ','
    schema:
      type: string
  - name: pad
    description: >-
      Choose whether to pad to ensure a consistent length. Default true if outputting to columns,
      false for lists.
    required: false
    param_group: Formatting
    runtime_default: null
    schema:
      type:
        - boolean
        - 'null'
  - name: element
    description: >-
      Select a specific element or range after splitting using slicing syntax. e.g. 0, ":5", "5:",
      "2:8:2".
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - integer
        - 'null'
  - name: inclusive
    description: If true, include the split character in the output. Default False.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
  - name: skip_empty
    description: Whether to skip empty values.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py
    title: WranglesPY split.text implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/text.md
    title: Existing split.text Markdown
---

# Text

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
