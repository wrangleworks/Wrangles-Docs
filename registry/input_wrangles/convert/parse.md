---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: parse
namespace: convert
title: Parse
description: >-
  Parse JSON, Python, YAML, or human-readable JSON-like structures into JSON-compatible Python
  values. YAML-only numeric forms such as 00123 and 12:34 remain strings. YAML anchors, aliases, and
  explicit tags are not supported. Parsed values retain their Python types, preserving integer
  precision in mixed columns. Excessively nested inputs use the configured default or raise a
  contextual ValueError.
wrangle_key: convert.parse
aliases: []
slug: convert/parse
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: Automatically documented from schema; execution eligibility requires review.
tags:
  - convert
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.convert.parse
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
    description: Name or list of input columns.
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
      description: Name or list of input columns.
    runtime_required: true
    required: true
  - name: output
    description: Name or list of output columns. If omitted, the input columns will be overwritten.
    param_group: I/O
    schema:
      type:
        - string
        - array
      description: Name or list of output columns. If omitted, the input columns will be overwritten.
    runtime_required: false
    required: false
    runtime_default: null
  - name: default
    description: >-
      Value to return for missing, invalid, or type-mismatched rows. If input is a list, default may
      be a single value applied to every column or a list containing one value per input column.
      Defaults must be JSON-compatible; NumPy values are normalized and mutable defaults are copied
      independently for each row.
    param_group: Options
    schema:
      type:
        - string
        - array
        - object
        - number
        - boolean
        - 'null'
      description: >-
        Value to return for missing, invalid, or type-mismatched rows. If input is a list, default
        may be a single value applied to every column or a list containing one value per input
        column. Defaults must be JSON-compatible; NumPy values are normalized and mutable defaults
        are copied independently for each row.
    runtime_required: false
    required: false
  - name: expected
    description: >-
      Required result category. Use any, dictionary, list, or scalar. A list may provide one
      category per input column.
    param_group: Options
    schema:
      description: >-
        Required result category. Use any, dictionary, list, or scalar. A list may provide one
        category per input column.
      default: any
      oneOf:
        - type: string
          enum:
            - any
            - dictionary
            - list
            - scalar
        - type: array
          items:
            type: string
            enum:
              - any
              - dictionary
              - list
              - scalar
    runtime_required: false
    required: false
    runtime_default: any
examples: []
sources:
  - id: schema
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/bd5f88fba479ec406b409cb2880689c54e72b298/wrangles/recipe_wrangles/convert.py
    title: WranglesPY schema
configuration_schema:
  type: object
  description: >-
    Parse JSON, Python, YAML, or human-readable JSON-like structures into JSON-compatible Python
    values. YAML-only numeric forms such as 00123 and 12:34 remain strings. YAML anchors, aliases,
    and explicit tags are not supported. Parsed values retain their Python types, preserving integer
    precision in mixed columns. Excessively nested inputs use the configured default or raise a
    contextual ValueError.
  additionalProperties: false
  required:
    - input
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: Name or list of input columns.
    output:
      type:
        - string
        - array
      description: Name or list of output columns. If omitted, the input columns will be overwritten.
    default:
      type:
        - string
        - array
        - object
        - number
        - boolean
        - 'null'
      description: >-
        Value to return for missing, invalid, or type-mismatched rows. If input is a list, default
        may be a single value applied to every column or a list containing one value per input
        column. Defaults must be JSON-compatible; NumPy values are normalized and mutable defaults
        are copied independently for each row.
    expected:
      description: >-
        Required result category. Use any, dictionary, list, or scalar. A list may provide one
        category per input column.
      default: any
      oneOf:
        - type: string
          enum:
            - any
            - dictionary
            - list
            - scalar
        - type: array
          items:
            type: string
            enum:
              - any
              - dictionary
              - list
              - scalar
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Parse

Parse JSON, Python, YAML, or human-readable JSON-like structures into JSON-compatible Python values. YAML-only numeric forms such as 00123 and 12:34 remain strings. YAML anchors, aliases, and explicit tags are not supported. Parsed values retain their Python types, preserving integer precision in mixed columns. Excessively nested inputs use the configured default or raise a contextual ValueError.

Usage guidance and examples have not yet been reviewed.
