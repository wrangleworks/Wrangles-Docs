---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: replace
namespace: standardize
title: Replace
description: >-
  Quick find and replace for simple values. Can use regex if 'input' in params and
  isinstance(params['input'], list):in the find field.
wrangle_key: standardize.replace
aliases: []
slug: standardize/replace
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: Automatically documented from schema; execution eligibility requires review.
tags:
  - standardize
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.standardize.replace
  contract_status: verified
access:
  ai_powered: null
  requires_account: null
  requires_subscription: null
  requires_external_api_key: null
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: input
    description: Name or list of input column
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
      description: Name or list of input column
    runtime_required: true
    required: true
  - name: find
    description: Pattern to find using regex
    param_group: Options
    schema:
      type: string
      description: Pattern to find using regex
    runtime_required: true
    required: true
  - name: replace
    description: Value to replace the pattern found
    param_group: Options
    schema:
      type: string
      description: Value to replace the pattern found
    runtime_required: true
    required: true
  - name: output
    description: Name or list of output column
    param_group: I/O
    schema:
      type:
        - string
        - array
      description: Name or list of output column
    runtime_required: false
    required: false
    runtime_default: null
examples: []
sources:
  - id: schema
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/standardize.py
    title: WranglesPY schema
configuration_schema:
  type: object
  catalog_id: '90'
  status: active
  description: >-
    Quick find and replace for simple values. Can use regex if 'input' in params and
    isinstance(params['input'], list):in the find field.
  additionalProperties: false
  required:
    - input
    - find
    - replace
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: Name or list of input column
    output:
      type:
        - string
        - array
      description: Name or list of output column
    find:
      type: string
      description: Pattern to find using regex
    replace:
      type: string
      description: Value to replace the pattern found
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Replace

Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field.

Usage guidance and examples have not yet been reviewed.
