---
schema_version: '0.2'
type: wrangle
id: e370dfcf-b0fe-4c48-8a52-6f34c47e7978
wrangle_name: from_json
namespace: convert
title: Convert From JSON
description: Parse JSON text into lists, objects, scalars, booleans, or null values.
wrangle_key: convert.from_json
aliases: []
slug: convert/from-json
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - convert
  - json
  - structured-data
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.convert.from_json
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
    description: Name of the input column.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
      description: Name of the input column.
    runtime_required: true
  - name: output
    description: Name of the output column. If omitted, the input column will be overwritten
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: Name of the output column. If omitted, the input column will be overwritten
    runtime_required: false
  - name: default
    description: >-
      Value to return if the row is empty or fails to be parsed as JSON. If input is a list, default
      may also be a list - either a single value to apply to all columns, or one value per input
      column.
    required: false
    param_group: Errors
    runtime_default: null
    schema:
      type:
        - string
        - array
        - object
        - number
        - boolean
        - 'null'
      description: >-
        Value to return if the row is empty or fails to be parsed as JSON. If input is a list,
        default may also be a list - either a single value to apply to all columns, or one value per
        input column.
    runtime_required: false
examples:
  - id: parse-structured-values
    title: Parse JSON objects and lists
    recipe: |-
      wrangles:
        - convert.from_json:
            input: attributes_json
            output: attributes
    input_fixture: ../../fixtures/convert.from_json/parse-structured-values.input.json
    output_fixture: ../../fixtures/convert.from_json/parse-structured-values.output.json
    verification: static
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py
    title: WranglesPY convert.from_json implementation
  - id: legacy-docs
    resource: https://wrangles.io/python/recipes/wrangles/convert#from-json
    title: Legacy convert.from_json documentation
configuration_schema:
  type: object
  description: Convert a JSON representation into an object.
  required:
    - input
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: Name of the input column.
    output:
      type:
        - string
        - array
      description: Name of the output column. If omitted, the input column will be overwritten
    default:
      type:
        - string
        - array
        - object
        - number
        - boolean
        - 'null'
      description: >-
        Value to return if the row is empty or fails to be parsed as JSON. If input is a list,
        default may also be a list - either a single value to apply to all columns, or one value per
        input column.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Convert From JSON

Use `convert.from_json` when a column contains JSON text that later wrangles
need to treat as structured values.

## Behavior

- Each non-fallback value is parsed with Python's JSON parser.
- Omitting `output` overwrites the input column.
- Multiple input columns may share one fallback or use one fallback per input.
- Invalid JSON raises an error unless a non-null fallback is supplied.
- Permissive Python-literal or YAML-like parsing is outside this wrangle's
  contract.
