---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: maths
namespace: null
title: Maths
description: Deprecated alias for `math`; evaluate an expression and write its result to an output column.
wrangle_key: maths
aliases: []
slug: maths
status: deprecated
replaced_by: math
visibility: public
recipe_writer:
  eligible: false
  reason: Deprecated compatibility key; use math.
tags:
  - maths
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.maths
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
    description: |
      The mathematical expression using column names. e.g. column1 * column2
      + column3.  Note: spaces within column names are replaced by underscores (_).
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
      description: |
        The mathematical expression using column names. e.g. column1 * column2
        + column3.  Note: spaces within column names are replaced by underscores (_).
    runtime_required: true
  - name: output
    description: The column to output the results to
    required: true
    param_group: I/O
    schema:
      type: string
      description: The column to output the results to
    runtime_required: true
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY maths implementation
configuration_schema:
  type: object
  description: Apply a mathematical calculation.
  additionalProperties: false
  required:
    - input
    - output
  properties:
    input:
      type:
        - string
        - integer
      description: |
        The mathematical expression using column names. e.g. column1 * column2
        + column3.  Note: spaces within column names are replaced by underscores (_).
    output:
      type: string
      description: The column to output the results to
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: deprecated-alias:math
schema_adjustments: []
---

# Maths

## Behavior

Deprecated alias for `math`; evaluate an expression and write its result to an output column.

This guidance was derived from the callable signature.
