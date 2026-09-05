---
schema_version: '0.1'
type: wrangle
id: null
wrangle_name: accordion
namespace: null
title: Accordion
description: >-
  Apply a series of wrangles to column(s) containing lists. The wrangles will be applied to each
  element in the list and the results will be returned back as a list.
wrangle_key: accordion
aliases: []
slug: accordion
status: active
visibility: public
tags:
  - utility
  - accordion
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.accordion
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
  - name: wrangles
    description: List of wrangles to apply.
    required: true
    param_group: Execution
    schema:
      type: array
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
  - name: input
    description: The column(s) containing the list(s) that the wrangles will be applied to the elements of.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Output of the wrangles to save back to the dataframe.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: propagate
    description: >-
      Limit the column(s) that will be available to the wrangles and replicated for each element. If
      not specified, all columns will be propogated. This may be useful to limit the memory use for
      large datasets.
    required: false
    param_group: I/O
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
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY accordion implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/accordion.md
    title: Existing accordion Markdown
---

# Accordion

Apply a series of wrangles to the individual elements of one or more lists.

## Migrated examples
#### Apply Convert Case to List Elements

This example applies `convert.case` to each string in a list, where the wrangle would not normally operate on the list as a whole.

##### Recipe

```yaml
wrangles:
  - accordion:
      input: list_column
      output: modified_lists
      wrangles:
        - convert.case:
            input: list_column
            output: modified_lists
            case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| list_column |
| --- |
| ["a", "b", "c"] |
| ["e", "f", "g"] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| list_column | modified_lists |
| --- | --- |
| ["a", "b", "c"] | ["A", "B", "C"] |
| ["e", "f", "g"] | ["E", "F", "G"] |

</div>

</div>
