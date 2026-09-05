---
schema_version: '0.1'
type: wrangle
id: e8e96b76-86bf-41dc-8d16-825dcff9688b
wrangle_name: custom
namespace: extract
title: Custom
description: >-
  Extract data from the input using a DIY or bespoke extraction wrangle. Requires WrangleWorks
  Account and Subscription.
wrangle_key: extract.custom
aliases: []
slug: extract/custom
status: active
visibility: public
tags:
  - extract
  - custom
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.extract.custom
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
  - name: model_id
    description: The ID of the wrangle to use.
    required: true
    param_group: Details
    schema:
      type:
        - string
        - array
  - name: output
    description: Name or list of output columns.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: use_labels
    description: 'Use Labels in the extract output {label: value}.'
    required: false
    param_group: Formatting
    runtime_default: false
    schema:
      type: boolean
  - name: first_element
    description: Get the first element from results.
    required: false
    param_group: Formatting
    runtime_default: false
    schema:
      type: boolean
  - name: case_sensitive
    description: Allows the wrangle to be case sensitive if set to True, default is False.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
  - name: extract_raw
    description: Extract the raw data from the wrangle.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
  - name: use_spellcheck
    description: Use spellcheck to also find minor mispellings compared to the reference data.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
  - name: include_empty_labels
    description: Include labels with no found values in the output when using use_labels=True.
    required: false
    param_group: Formatting
    runtime_default: true
    schema:
      type: boolean
  - name: sort
    description: Sort the results.
    required: false
    param_group: Options
    runtime_default: training_order
    schema:
      type: string
      enum:
        - training_order
        - input_order
        - longest
        - shortest
        - alphabetical
        - reverse_alphabetical
        - ascending
        - descending
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
        - dictionary
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
    title: WranglesPY extract.custom implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/custom.md
    title: Existing extract.custom Markdown
---

# Custom

Extract data from the input using a DIY or bespoke extraction wrangle. Can be performed on one column or multiple columns. Requires WrangleWorks Account and Subscription.

:::info
Non-regex pattern matching extracts whole-word matches separated by word boundaries. Word boundaries include anything that is not a letter, number, or underscore.
:::

## Migrated examples
#### Extracting Wood Types From Single Column

##### Recipe

```yaml
# One column input
wrangles:
  - extract.custom:
      input: Product
      output: Wood Types
      model_id: model_id_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product | Wood Types |
| --- | --- |
| Dining Oakwood Chair | Oakwood |
| Living Room Teakwood Frame Mirror | Teakwood |

</div>

</div>

#### Extracting Wood Types From Multiple Columns

##### Recipe

```yaml
# Multi column input
wrangles:
  - extract.custom:
      input:
        - Part 1 of 2
        - Part 2 of 2
      output: Wood Types
      model_id: model_id_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Wood Types | Part 1 of 2 | Part 2 of 2 |
| --- | --- | --- |
| ['Acacia Wood', 'Imitation Wood'] | Dining Acacia Wood Table | Imitation Wood Table Chairs |

</div>

</div>

#### Using Multiple Extract Models

##### Recipe

```yaml
# Multiple Models
wrangles:
  - extract.custom:
      input:
        - Product
        - Product
      output:
        - Wood Types
        - Item Type
      model_id:
        - wood_Type_model_id
        - item_type_model_id
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product | Item Type | Wood Types |
| --- | --- | --- |
| Dining Oakwood Chair | Chair | Oakwood |
| Living Room Teakwood Frame Mirror | Mirror | Teakwood |

</div>

</div>
