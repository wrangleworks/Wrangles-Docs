---
schema_version: '0.2'
type: wrangle
id: da591387-0fca-4842-8bcb-d19f561f0292
wrangle_name: codes
namespace: extract
title: Codes
description: Extract alphanumeric codes from the input. Requires WrangleWorks Account.
wrangle_key: extract.codes
aliases: []
slug: extract/codes
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - extract
  - codes
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.extract.codes
  contract_status: verified
access:
  ai_powered: false
  requires_account: true
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: input
    description: Name or list of input columns.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name or list of output columns.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
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
  - name: min_length
    description: Minimum length of allowed results.
    required: false
    param_group: Options
    schema:
      type:
        - integer
        - string
  - name: max_length
    description: Maximum length of allowed results.
    required: false
    param_group: Options
    schema:
      type:
        - integer
        - string
  - name: strategy
    description: >-
      Controls filtering of likely false positives such as measurements. Lenient skips this filter;
      balanced and strict currently apply the same filter. Default is balanced. Unless min_length is
      provided, minimum lengths default to 3 for lenient, 4 for balanced, and 5 for strict.
    required: false
    param_group: Options
    schema:
      type: string
      enum:
        - lenient
        - balanced
        - strict
  - name: sort_order
    description: Default is input order. Also allows longest or shortest.
    required: false
    param_group: Formatting
    schema:
      type: string
      enum:
        - input
        - longest
        - shortest
  - name: disallowed_patterns
    description: A pattern or JSON array of regex patterns to not include in the found codes.
    required: false
    param_group: Options
    schema:
      type: string
  - name: include_multi_part_tokens
    description: Whether to include multi-part tokens that have a space. Default True.
    required: false
    param_group: Options
    schema:
      type: boolean
  - name: extract_raw
    description: >-
      Whether to return tokens with their adjacent non-whitespace characters included, rather than
      the cleaned token. Default False.
    required: false
    param_group: Options
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py
    title: WranglesPY extract.codes implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/codes.md
    title: Existing extract.codes Markdown
---

# Codes

Extract alphanumeric codes from unstructured text. Can be performed on one column or multiple columns. Requires WrangleWorks Account.

## Migrated examples
#### Extracting Codes From Single Column

##### Recipe

```yaml
# One column input
wrangles:
  - extract.codes:
      input: Secret
      output: Code Extract
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Secret | Code Extract |
| --- | --- |
| to gain access use Z1ON0101 | ['Z1ON0101'] |

</div>

</div>

#### Extracting Codes From Multiple Columns

##### Recipe

```yaml
# Multi column input
wrangles:
  - extract.codes:
      input:
        - code1
        - code2
      output: Codes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Codes | code1 | code2 |
| --- | --- | --- |
| ['CH465517080-1', 'CH465517080-2'] | code CH465517080-1 | code CH465517080-2 |

</div>

</div>
