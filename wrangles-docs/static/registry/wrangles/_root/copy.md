---
schema_version: '0.2'
type: wrangle
id: b002fbdc-92c0-4347-889d-0f4bfeec99fa
wrangle_name: copy
namespace: null
title: Copy
description: Make a copy of a column or a list of columns.
wrangle_key: copy
aliases: []
slug: copy
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - transform
  - copy
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.pandas.copy
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
    description: Name of the input columns or columns
    required: true
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - integer
        - array
      description: Name of the input columns or columns
    runtime_required: false
  - name: output
    description: Name of the output columns or columns
    required: true
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: Name of the output columns or columns
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py
    title: WranglesPY copy implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/transform/_sources/copy.md
    title: Archived copy Markdown
configuration_schema:
  type: object
  description: Make a copy of a column or a list of columns
  additionalProperties: false
  required:
    - input
    - output
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: Name of the input columns or columns
    output:
      type:
        - string
        - array
      description: Name of the output columns or columns
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Copy

Create a copy of columns in a dataframe.

## Migrated examples
#### Copying a Column With Input and Output

##### Recipe

```yaml
wrangles:
  - copy:
      input: Product Data
      output: Product Data (copy)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Data | Product Data (copy) |
| --- | --- |
| SKF ball brg | SKF ball brg |
| brg seal | brg seal |

</div>

</div>

#### Schema-compatible Copy Parameters

The runtime also accepts dictionary shorthand, but the upstream recipe schema
requires explicit `input` and `output`. Use this form for schema-validated recipes.

##### Recipe

```yaml
wrangles:
  - copy:
      input: Product Data
      output: Product Data (copy)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Data | Product Data (copy) |
| --- | --- |
| SKF ball brg | SKF ball brg |
| brg seal | brg seal |

</div>

</div>
