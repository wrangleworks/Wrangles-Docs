---
schema_version: '0.1'
type: wrangle
id: 06ca98e4-d026-43f7-84eb-af246d401ba9
wrangle_name: dictionary
namespace: split
title: Dictionary
description: >-
  Split one or more dictionaries into columns. The dictionary keys will be returned as the new
  column headers. If the dictionaries contain overlapping values, the last value will be returned.
wrangle_key: split.dictionary
aliases: []
slug: split/dictionary
status: active
visibility: public
tags:
  - split
  - dictionary
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.split.dictionary
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
    description: >-
      Name or lists of the column(s) containing dictionaries to be split. If providing multiple
      dictionaries and the dictionaries contain overlapping values, the last value will be returned.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: >-
      In columns output_format, this is an optional subset of keys to extract from the dictionary.
      If not provided, all keys will be returned. Columns can be renamed with the following syntax:
      output: - key1: new_column_name1 - key2: new_column_name2 In to_lists output_format, this must
      be two output columns for the keys and values lists. If not provided, Keys and Values will be
      used.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: default
    description: Provide a set of default headings and values if they are not found within the input.
    required: false
    param_group: Errors
    runtime_default: null
    schema:
      type:
        - object
        - 'null'
  - name: output_format
    description: >-
      How to split the dictionary. columns creates one output column for each dictionary key.
      to_lists creates two output columns containing lists of keys and values.
    required: false
    param_group: Formatting
    runtime_default: columns
    schema:
      type: string
      enum:
        - columns
        - to_lists
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py
    title: WranglesPY split.dictionary implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/dictionary.md
    title: Existing split.dictionary Markdown
---

# Dictionary

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
