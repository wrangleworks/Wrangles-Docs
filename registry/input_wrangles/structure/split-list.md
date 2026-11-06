---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: split_list
namespace: structure
title: Split List
description: Split a list in a single column to multiple columns.
wrangle_key: structure.split_list
aliases: []
slug: structure/split-list
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: Automatically documented from schema; execution eligibility requires review.
tags:
  - structure
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.structure.split_list
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
    description: Name of the column to be split
    param_group: I/O
    schema:
      type:
        - string
        - integer
      description: Name of the column to be split
    runtime_required: true
    required: true
  - name: output
    description: >-
      Name of column(s) for the results. If providing a single column, use a wildcard (*) to
      indicate a incrementing integer
    param_group: I/O
    schema:
      type:
        - string
        - array
      description: >-
        Name of column(s) for the results. If providing a single column, use a wildcard (*) to
        indicate a incrementing integer
    runtime_required: true
    required: true
examples: []
sources:
  - id: schema
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/structure.py
    title: WranglesPY schema
configuration_schema:
  type: object
  catalog_id: '64'
  status: active
  description: Split a list in a single column to multiple columns.
  additionalProperties: false
  required:
    - input
    - output
  properties:
    input:
      type:
        - string
        - integer
      description: Name of the column to be split
    output:
      type:
        - string
        - array
      description: >-
        Name of column(s) for the results. If providing a single column, use a wildcard (*) to
        indicate a incrementing integer
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments:
  - Normalize schema type "int" to integer.
---

# Split List

Split a list in a single column to multiple columns.

Usage guidance and examples have not yet been reviewed.
