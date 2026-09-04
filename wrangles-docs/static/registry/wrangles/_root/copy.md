---
schema_version: '0.1'
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
    description: Name of the input columns or columns.
    required: false
    role: column-selector
    runtime_default: null
    schema:
      type:
        - string
        - integer
        - array
        - 'null'
  - name: output
    description: Name of the output columns or columns.
    required: false
    role: column-output
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py
    title: WranglesPY copy implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/transform/_sources/copy.md
    title: Existing copy Markdown
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
| SKF ball bearing | SKF ball bearing |
| bearing seal | bearing seal |

</div>

</div>

#### Copying a Column Express as a Dictionary

##### Recipe

```yaml
wrangles:
  - copy:
      Product Data: Product Data (copy)
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
| SKF ball bearing | SKF ball bearing |
| bearing seal | bearing seal |

</div>

</div>
