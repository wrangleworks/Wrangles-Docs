---
schema_version: '0.2'
type: 'wrangle'
id: 'e8e96b76-86bf-41dc-8d16-825dcff9688b'
wrangle_name: 'custom'
namespace: 'extract'
title: 'Custom'
description: 'Extract data from the input using a DIY or bespoke extraction wrangle. Requires WrangleWorks Account and Subscription.'
wrangle_key: 'extract.custom'
aliases: []
slug: 'extract/custom'
status: 'active'
visibility: 'public'
recipe_writer:
  eligible: true
tags:
  - 'extract'
  - 'custom'
runtime:
  package: 'wrangles'
  symbol: 'wrangles.recipe_wrangles.extract.custom'
  contract_status: 'verified'
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
  - name: 'input'
    description: 'Name or list of input columns.'
    required: true
    param_group: 'I/O'
    schema:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name or list of input columns.'
    runtime_required: true
  - name: 'model_id'
    description: 'The ID of the wrangle to use'
    required: true
    param_group: 'Details'
    schema:
      type:
        - 'string'
        - 'array'
      description: 'The ID of the wrangle to use'
    runtime_required: true
  - name: 'output'
    description: 'Name or list of output columns'
    required: false
    param_group: 'I/O'
    runtime_default: null
    schema:
      type:
        - 'string'
        - 'array'
      description: 'Name or list of output columns'
    runtime_required: false
  - name: 'use_labels'
    description: 'Use Labels in the extract output {label: value}'
    required: false
    param_group: 'Formatting'
    runtime_default: false
    schema:
      type: 'boolean'
      description: 'Use Labels in the extract output {label: value}'
    runtime_required: false
  - name: 'first_element'
    description: 'Get the first element from results'
    required: false
    param_group: 'Formatting'
    runtime_default: false
    schema:
      type: 'boolean'
      description: 'Get the first element from results'
    runtime_required: false
  - name: 'case_sensitive'
    description: 'Allows the wrangle to be case sensitive if set to True, default is False.'
    required: false
    param_group: 'Options'
    runtime_default: false
    schema:
      type: 'boolean'
      description: 'Allows the wrangle to be case sensitive if set to True, default is False.'
    runtime_required: false
  - name: 'extract_raw'
    description: 'Extract the raw data from the wrangle'
    required: false
    param_group: 'Options'
    runtime_default: false
    schema:
      type: 'boolean'
      description: 'Extract the raw data from the wrangle'
    runtime_required: false
  - name: 'use_spellcheck'
    description: 'Use spellcheck to also find minor mispellings compared to the reference data'
    required: false
    param_group: 'Options'
    runtime_default: false
    schema:
      type: 'boolean'
      description: 'Use spellcheck to also find minor mispellings compared to the reference data'
    runtime_required: false
  - name: 'include_empty_labels'
    description: 'Include labels with no found values in the output when using use_labels=True'
    required: false
    param_group: 'Formatting'
    runtime_default: true
    schema:
      type: 'boolean'
      description: 'Include labels with no found values in the output when using use_labels=True'
    runtime_required: false
  - name: 'sort'
    description: 'Sort the results'
    required: false
    param_group: 'Options'
    runtime_default: 'training_order'
    schema:
      type: 'string'
      description: 'Sort the results'
      enum:
        - 'training_order'
        - 'input_order'
        - 'longest'
        - 'shortest'
        - 'alphabetical'
        - 'reverse_alphabetical'
        - 'ascending'
        - 'descending'
    runtime_required: false
  - name: 'output_format'
    description: 'Format of the extract output'
    required: false
    param_group: 'Formatting'
    runtime_default: null
    schema:
      type: 'string'
      description: 'Format of the extract output'
      enum:
        - 'list'
        - 'dictionary'
        - 'columns'
        - 'concatenate'
    runtime_required: false
  - name: 'char'
    description: 'Character to use when output_format is concatenate'
    required: false
    param_group: 'Formatting'
    runtime_default: ', '
    schema:
      type: 'string'
      description: 'Character to use when output_format is concatenate'
    runtime_required: false
examples: []
sources:
  - id: 'runtime'
    resource: 'https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py'
    title: 'WranglesPY extract.custom implementation'
  - id: 'legacy-docs-archive'
    resource: 'https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/custom.md'
    title: 'Archived extract.custom Markdown'
configuration_schema:
  type: 'object'
  description: 'Extract data from the input using a DIY or bespoke extraction wrangle. Requires WrangleWorks Account and Subscription.'
  required:
    - 'input'
    - 'model_id'
  properties:
    input:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name or list of input columns.'
    output:
      type:
        - 'string'
        - 'array'
      description: 'Name or list of output columns'
    model_id:
      type:
        - 'string'
        - 'array'
      description: 'The ID of the wrangle to use'
    use_labels:
      type: 'boolean'
      description: 'Use Labels in the extract output {label: value}'
    first_element:
      type: 'boolean'
      description: 'Get the first element from results'
    case_sensitive:
      type: 'boolean'
      description: 'Allows the wrangle to be case sensitive if set to True, default is False.'
    extract_raw:
      type: 'boolean'
      description: 'Extract the raw data from the wrangle'
    use_spellcheck:
      type: 'boolean'
      description: 'Use spellcheck to also find minor mispellings compared to the reference data'
    sort:
      type: 'string'
      description: 'Sort the results'
      enum:
        - 'training_order'
        - 'input_order'
        - 'longest'
        - 'shortest'
        - 'alphabetical'
        - 'reverse_alphabetical'
        - 'ascending'
        - 'descending'
    output_format:
      type: 'string'
      description: 'Format of the extract output'
      enum:
        - 'list'
        - 'dictionary'
        - 'columns'
        - 'concatenate'
    char:
      type: 'string'
      description: 'Character to use when output_format is concatenate'
    include_empty_labels:
      type: 'boolean'
      description: 'Include labels with no found values in the output when using use_labels=True'
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: 'upstream-docstring'
schema_adjustments: []
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
