---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: recipe
namespace: null
title: Recipe
description: Run another recipe as a wrangle against the current dataframe.
wrangle_key: recipe
aliases: []
slug: recipe
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: Nested recipe composition is outside the baseline.
tags:
  - recipe
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.recipe
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
    description: Name, index, or list of input columns.
    required: false
    param_group: I/O
    runtime_default: null
    schema: {}
    runtime_required: false
  - name: output
    description: Name or list of output columns.
    required: false
    param_group: I/O
    runtime_default: null
    schema: {}
    runtime_required: false
  - name: name
    description: file name of the recipe
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type: string
      description: file name of the recipe
    runtime_required: false
  - name: variables
    description: A dictionary of variables to pass to the recipe
    required: false
    param_group: Execution
    runtime_default: null
    schema:
      type: object
      description: A dictionary of variables to pass to the recipe
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY recipe implementation
configuration_schema:
  anyOf:
    - $ref: '#'
    - type: object
      description: Run a recipe as a Wrangle. Recipe-ception,
      additionalProperties: false
      required:
        - name
      properties:
        name:
          type: string
          description: file name of the recipe
        variables:
          type: object
          description: A dictionary of variables to pass to the recipe
        if:
          $ref: '#/$defs/wrangles/commonProperties/if'
        where:
          $ref: '#/$defs/wrangles/commonProperties/where'
        where_params:
          $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Recipe

## Behavior

Run another recipe as a wrangle against the current dataframe.

This guidance was derived from the callable signature and its embedded Python schema docstring.
