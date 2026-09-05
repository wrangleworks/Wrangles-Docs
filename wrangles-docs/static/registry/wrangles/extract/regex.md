---
schema_version: '0.2'
type: wrangle
id: 9aa0253a-4b70-4737-832c-964e15967289
wrangle_name: regex
namespace: extract
title: Regex
description: Extract matches or specific capture groups using regex.
wrangle_key: extract.regex
aliases: []
slug: extract/regex
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - extract
  - regex
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.extract.regex
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
    description: Name of the input column(s).
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: find
    description: Pattern to find using regex.
    required: true
    param_group: Options
    schema:
      type: string
  - name: output
    description: Name of the output column(s).
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
  - name: output_pattern
    description: >-
      Specifies the format to output matches and specific capture groups using backreferences (e.g.,
      `\1`, `\2`). Default is to return entire matches. **Example**: For a regex pattern
      `r'(\d+)\s(\w+)'` and `output_pattern = '\2 \1'`, with input `'120 volt'`, the output would be
      `'volt 120'`.
    required: false
    param_group: Formatting
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: first_element
    description: Get the first element from results.
    required: false
    param_group: Formatting
    runtime_default: false
    schema:
      type: boolean
  - name: output_format
    description: Format of the extract output.
    required: false
    param_group: Formatting
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
      enum:
        - list
        - columns
        - concatenate
  - name: char
    description: Character to use when output_format is concatenate.
    required: false
    param_group: Formatting
    runtime_default: ', '
    schema:
      type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py
    title: WranglesPY extract.regex implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/regex.md
    title: Existing extract.regex Markdown
---

# Regex

Extract single values, matches, or specific capture groups using regex.

## Migrated examples
#### Extracting Number of Months From Range

##### Recipe

```yaml
wrangles:
  - extract.regex:
      input: Product
      output: GPM
      find: \d\.?\d? ?gpm
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| GPM | Product |
| --- | --- |
| 3.4 gpm | 3.4 gpm water pump |
| 2gpm | 2gpm water pump |

</div>

</div>

#### Implementing output_pattern

##### Recipe

```yaml
wrangles:
  - extract.regex:
      input: Product
      output: GPM
      find: (\d\.?\d?) ?gpm
      output_pattern: \1 Gallons Per Minute
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| GPM | Product |
| --- | --- |
| 3.4 Gallons Per Minute | 3.4 gpm water pump for 5.5 gallon tank |
| 2 Gallons Per Minute | 2gpm water pump for 2 gal tank |

</div>

</div>
