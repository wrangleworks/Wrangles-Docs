---
schema_version: '0.2'
type: 'wrangle'
id: '52384f01-7164-404f-8615-063e7677a588'
wrangle_name: 'data_type'
namespace: 'convert'
title: 'Convert Data Type'
description: 'Convert values to strings, numbers, booleans, or datetimes.'
wrangle_key: 'convert.data_type'
aliases: []
slug: 'convert/data-type'
status: 'active'
visibility: 'public'
recipe_writer:
  eligible: true
tags:
  - 'convert'
  - 'data-type'
  - 'validation'
runtime:
  package: 'wrangles'
  symbol: 'wrangles.recipe_wrangles.convert.data_type'
  contract_status: 'verified'
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
  - name: 'input'
    description: 'Name or list of input columns'
    required: true
    param_group: 'I/O'
    schema:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name or list of input columns'
    runtime_required: true
  - name: 'output'
    description: 'Name or list of output columns'
    required: false
    param_group: 'I/O'
    runtime_default: null
    schema:
      type:
        - 'string'
        - 'array'
      description: 'Name or list of output columns'
    runtime_required: false
  - name: 'data_type'
    description: 'The new data type'
    required: true
    param_group: 'Options'
    runtime_default: 'str'
    schema:
      type: 'string'
      description: 'The new data type'
      enum:
        - 'str'
        - 'float'
        - 'int'
        - 'bool'
        - 'datetime'
    runtime_required: false
  - name: 'default'
    description: "Set the default value to return if the input data \ncannot be converted to the specified data_type."
    required: false
    param_group: 'Errors'
    runtime_default: null
    schema:
      type:
        - 'string'
        - 'number'
        - 'array'
        - 'boolean'
      description: "Set the default value to return if the input data \ncannot be converted to the specified data_type."
    runtime_required: false
examples:
  - id: 'integer-with-fallback'
    title: 'Convert quantities to integers with a fallback'
    recipe: "wrangles:\n  - convert.data_type:\n      input: quantity\n      output: quantity_integer\n      data_type: int\n      default: 0"
    input_fixture: '../../fixtures/convert.data_type/integer-with-fallback.input.json'
    output_fixture: '../../fixtures/convert.data_type/integer-with-fallback.output.json'
    verification: 'static'
sources:
  - id: 'runtime'
    resource: 'https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py'
    title: 'WranglesPY convert.data_type implementation'
  - id: 'legacy-docs'
    resource: 'https://wrangles.io/python/recipes/wrangles/convert#data-type'
    title: 'Legacy convert.data_type documentation'
configuration_schema:
  type: 'object'
  description: 'Change the data type of the input.'
  additionalProperties: false
  required:
    - 'input'
    - 'data_type'
  properties:
    input:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name or list of input columns'
    output:
      type:
        - 'string'
        - 'array'
      description: 'Name or list of output columns'
    data_type:
      type: 'string'
      description: 'The new data type'
      enum:
        - 'str'
        - 'float'
        - 'int'
        - 'bool'
        - 'datetime'
    default:
      type:
        - 'string'
        - 'number'
        - 'array'
        - 'boolean'
      description: "Set the default value to return if the input data \ncannot be converted to the specified data_type."
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: 'upstream-docstring'
schema_adjustments:
  - 'JSON Schema has no datetime primitive; JSON timestamps use string.'
---

# Convert Data Type

Use `convert.data_type` when a recipe needs consistent Python-compatible
values rather than display-only formatting.

## Behavior

- Supported target types are `str`, `float`, `int`, `bool`, and `datetime`.
- Omitting `data_type` uses the runtime default `str`.
- Omitting `output` overwrites the input column.
- Failed conversions retain the original value unless `default` is supplied.
- Additional undocumented keyword arguments are implementation details and are
  not part of the public Registry contract.
