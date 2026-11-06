---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: split_text
namespace: structure
title: Split Text
description: Split a string to multiple columns or a list.
wrangle_key: structure.split_text
aliases: []
slug: structure/split-text
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: Automatically documented from schema; execution eligibility requires review.
tags:
  - structure
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.structure.split_text
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
      type: string
      description: Name of the column to be split
    runtime_required: true
    required: true
  - name: output
    description: |-
      Name of the output column(s)
      If a single column is provided,
      the results will be returned as a list
      If multiple columns are listed,
      the results will be separated into the columns.
      If omitted, will overwrite the input.
    param_group: I/O
    schema:
      type:
        - string
        - array
      description: |-
        Name of the output column(s)
        If a single column is provided,
        the results will be returned as a list
        If multiple columns are listed,
        the results will be separated into the columns.
        If omitted, will overwrite the input.
    runtime_required: false
    required: false
    runtime_default: null
  - name: char
    description: |-
      Set the character(s) to split on.
      Default comma (,)
      Can also prefix with "regex:" to split on a pattern.
    param_group: Options
    schema:
      type: string
      description: |-
        Set the character(s) to split on.
        Default comma (,)
        Can also prefix with "regex:" to split on a pattern.
    runtime_required: false
    required: false
    runtime_default: ','
  - name: pad
    description: >-
      Choose whether to pad to ensure a consistent length. Default true if outputting to columns,
      false for lists.
    param_group: Options
    schema:
      type: boolean
      description: >-
        Choose whether to pad to ensure a consistent length. Default true if outputting to columns,
        false for lists.
    runtime_required: false
    required: false
    runtime_default: null
  - name: element
    description: >-
      Select a specific element or range after splitting using slicing syntax. e.g. 0, ":5", "5:",
      "2:8:2"
    param_group: Options
    schema:
      type:
        - integer
        - string
      description: >-
        Select a specific element or range after splitting using slicing syntax. e.g. 0, ":5", "5:",
        "2:8:2"
    runtime_required: false
    required: false
    runtime_default: null
  - name: inclusive
    description: If true, include the split character in the output. Default False
    param_group: Options
    schema:
      type: boolean
      description: If true, include the split character in the output. Default False
    runtime_required: false
    required: false
    runtime_default: false
  - name: skip_empty
    description: Whether to skip empty values
    param_group: Options
    schema:
      type: boolean
      description: Whether to skip empty values
      default: false
    runtime_required: false
    required: false
    runtime_default: false
examples: []
sources:
  - id: schema
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/structure.py
    title: WranglesPY schema
configuration_schema:
  type: object
  catalog_id: '65'
  status: active
  description: Split a string to multiple columns or a list.
  additionalProperties: false
  required:
    - input
  properties:
    input:
      type: string
      description: Name of the column to be split
    output:
      type:
        - string
        - array
      description: |-
        Name of the output column(s)
        If a single column is provided,
        the results will be returned as a list
        If multiple columns are listed,
        the results will be separated into the columns.
        If omitted, will overwrite the input.
    char:
      type: string
      description: |-
        Set the character(s) to split on.
        Default comma (,)
        Can also prefix with "regex:" to split on a pattern.
    pad:
      type: boolean
      description: >-
        Choose whether to pad to ensure a consistent length. Default true if outputting to columns,
        false for lists.
    element:
      type:
        - integer
        - string
      description: >-
        Select a specific element or range after splitting using slicing syntax. e.g. 0, ":5", "5:",
        "2:8:2"
    inclusive:
      type: boolean
      description: If true, include the split character in the output. Default False
    skip_empty:
      type: boolean
      description: Whether to skip empty values
      default: false
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Split Text

Split a string to multiple columns or a list.

Usage guidance and examples have not yet been reviewed.
