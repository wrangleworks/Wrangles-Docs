---
schema_version: '0.2'
type: wrangle
id: 10fc6709-16d4-4eab-8f56-6cb5d170ea66
wrangle_name: jinja
namespace: create
title: Jinja
description: Output text using a jinja template.
wrangle_key: create.jinja
aliases: []
slug: create/jinja
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - create
  - jinja
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.create.jinja
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
  - name: template
    description: >
      A dictionary which defines the template/location as well as the form which the template is
      input.

      If any keys use a space, they must be replaced with an underscore.  Note: spaces within column
      names

      are replaced by underscores (_).
    required: true
    param_group: Options
    schema:
      type: object
      description: >
        A dictionary which defines the template/location as well as the form which the template is
        input.

        If any keys use a space, they must be replaced with an underscore.  Note: spaces within
        column names

        are replaced by underscores (_).
      additionalProperties: false
      properties:
        file:
          type: string
          description: A .jinja file containing the template
        column:
          type: string
          description: A column containing the jinja template - this will apply to the corresponding row.
        string:
          type: string
          description: A string which is used as the jinja template
    runtime_required: true
  - name: output
    description: Name of the column to be output to.
    required: true
    param_group: I/O
    schema:
      type: string
      description: Name of the column to be output to.
    runtime_required: true
  - name: input
    description: |
      Specify a name of column containing a dictionary of elements to be used in jinja template.
      Otherwise, the column headers will be used as keys.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - integer
      description: |
        Specify a name of column containing a dictionary of elements to be used in jinja template.
        Otherwise, the column headers will be used as keys.
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py
    title: WranglesPY create.jinja implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/jinja.md
    title: Archived create.jinja Markdown
configuration_schema:
  type: object
  description: Output text using a jinja template
  additionalProperties: false
  required:
    - output
    - template
  properties:
    input:
      type:
        - string
        - integer
      description: |
        Specify a name of column containing a dictionary of elements to be used in jinja template.
        Otherwise, the column headers will be used as keys.
    output:
      type: string
      description: Name of the column to be output to.
    template:
      type: object
      description: >
        A dictionary which defines the template/location as well as the form which the template is
        input.

        If any keys use a space, they must be replaced with an underscore.  Note: spaces within
        column names

        are replaced by underscores (_).
      additionalProperties: false
      properties:
        file:
          type: string
          description: A .jinja file containing the template
        column:
          type: string
          description: A column containing the jinja template - this will apply to the corresponding row.
        string:
          type: string
          description: A string which is used as the jinja template
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Jinja

Makes use of a Jinja template to create a description, title, or summary based on your data.

:::info
Jinja templates do not allow variables with spaces. This wrangle automatically replaces spaces in column headers with underscores, so use underscores instead of spaces when referencing columns in the template.
:::

## Migrated examples
#### Creating a Jinja Description

##### Recipe

```yaml
wrangles:
  - create.jinja:
      output: Description
      template:
        string: |
          This is a {{ Brand }} {{ Item_Type }} that is {{ Size }}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Size | Brand | Item Type |
| --- | --- | --- |
| 10mm | SKF | ball bearing |
| 15mm | Timken | bearing seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Size | Brand | Item Type | Description |
| --- | --- | --- | --- |
| 10mm | SKF | ball bearing | This is a SKF ball bearing that is 10mm |
| 15mm | Timken | bearing seal | This is a Timken bearing seal that is 15mm |

</div>

</div>

Using `|` in YAML denotes a multi-line string that preserves line breaks. Use `>` for a multi-line string when line breaks should not be preserved.
