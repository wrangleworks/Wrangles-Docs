---
schema_version: "0.1"
type: wrangle
id: 12ff4120-3613-4801-8653-99c793477fbc
wrangle_name: case
namespace: convert
title: Convert Case
description: Change the letter case of text values.
wrangle_key: convert.case
aliases: []
slug: convert/case
status: active
visibility: public
tags:
  - convert
  - text
  - case
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.convert.case
  contract_status: verified
access:
  ai_powered: false
  requires_account: false
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  where: true
  where_params: true
  if: true
parameters:
  - name: input
    description: Name, index, or list of input columns.
    required: true
    param_group: I/O
    schema:
      type: [string, integer, array]
      items:
        type: [string, integer]
  - name: output
    description: Name or list of output columns. If omitted, each input column is overwritten.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type: [string, array]
      items:
        type: string
  - name: case
    description: Letter case to apply. Sentence case lowercases the value and capitalizes sentence starts.
    required: false
    param_group: Options
    runtime_default: lower
    schema:
      type: string
      enum: [lower, upper, title, sentence]
examples:
  - id: uppercase-output
    title: Write uppercase text to a new column
    recipe: |-
      wrangles:
        - convert.case:
            input: product
            output: product_upper
            case: upper
    input_fixture: ../../fixtures/convert.case/uppercase-output.input.json
    output_fixture: ../../fixtures/convert.case/uppercase-output.output.json
    verification: static
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py
    title: WranglesPY convert.case implementation
  - id: legacy-docs
    resource: https://wrangles.io/python/recipes/wrangles/convert#case
    title: Legacy convert.case documentation
---

# Convert Case

Use `convert.case` to normalize capitalization while keeping the source column
or writing the result to a new column.

## Behavior

- Supported modes are `lower`, `upper`, `title`, and `sentence`.
- Omitting `output` overwrites the input column.
- Input and output lists must have equal lengths.
- Non-string values are passed through unchanged and produce a warning.
