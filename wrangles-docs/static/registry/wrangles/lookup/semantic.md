---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: semantic
namespace: lookup
title: Semantic
description: >-
  Look up values using a saved semantic lookup model. Requires a WrangleWorks account and a model
  with purpose lookup and stored variant embedding. Missing or unknown variants are rejected; use
  lookup for legacy models.
wrangle_key: lookup.semantic
aliases: []
slug: lookup/semantic
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: Automatically documented from schema; execution eligibility requires review.
tags:
  - lookup
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.lookup.semantic
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
    description: One input column, optionally expressed as a single-item list.
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
      items:
        type:
          - string
          - integer
      minItems: 1
      maxItems: 1
      description: One input column, optionally expressed as a single-item list.
    runtime_required: true
    required: true
  - name: model_id
    description: Existing saved semantic lookup model ID, not a catalog ID.
    param_group: Options
    schema:
      type: string
      description: Existing saved semantic lookup model ID, not a catalog ID.
    runtime_required: true
    required: true
  - name: output
    description: >-
      Output column or columns; defaults to the input column. Named lookup columns return their
      values; other names receive match dictionaries. With n greater than one, n output columns or a
      wildcard name such as 'Match *' distribute match dictionaries across columns.
    param_group: I/O
    schema:
      type:
        - string
        - array
        - 'null'
      default: null
      description: >-
        Output column or columns; defaults to the input column. Named lookup columns return their
        values; other names receive match dictionaries. With n greater than one, n output columns or
        a wildcard name such as 'Match *' distribute match dictionaries across columns.
    runtime_required: false
    required: false
    runtime_default: null
  - name: lookup_mode
    description: The lookup_mode parameter.
    param_group: Options
    schema:
      const: by_row
    runtime_required: false
    required: false
    runtime_default: by_row
  - name: 'n'
    description: >-
      Optional number of matches. Supported only with by_row. When greater than one, a single output
      contains a list of match dictionaries unless expanded with a wildcard. Each of n output
      columns receives one match.
    param_group: Options
    schema:
      type:
        - integer
        - 'null'
      default: null
      description: >-
        Optional number of matches. Supported only with by_row. When greater than one, a single
        output contains a list of match dictionaries unless expanded with a wildcard. Each of n
        output columns receives one match.
    runtime_required: false
    required: false
    runtime_default: null
  - name: matrix_variables
    description: Columns that define the permutations for by_matrix mode.
    param_group: Options
    schema:
      type: array
      minItems: 1
      items:
        type: string
      description: Columns that define the permutations for by_matrix mode.
    runtime_required: false
    required: false
examples: []
sources:
  - id: schema
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/bd5f88fba479ec406b409cb2880689c54e72b298/wrangles/recipe_wrangles/lookup.py
    title: WranglesPY schema
configuration_schema:
  type: object
  description: >-
    Look up values using a saved semantic lookup model. Requires a WrangleWorks account and a model
    with purpose lookup and stored variant embedding. Missing or unknown variants are rejected; use
    lookup for legacy models.
  additionalProperties: true
  required:
    - input
    - model_id
  allOf:
    - if:
        required:
          - 'n'
        properties:
          'n':
            type: integer
      then:
        properties:
          lookup_mode:
            const: by_row
    - if:
        required:
          - lookup_mode
        properties:
          lookup_mode:
            const: by_matrix
      then:
        required:
          - matrix_variables
  properties:
    input:
      type:
        - string
        - integer
        - array
      items:
        type:
          - string
          - integer
      minItems: 1
      maxItems: 1
      description: One input column, optionally expressed as a single-item list.
    model_id:
      type: string
      description: Existing saved semantic lookup model ID, not a catalog ID.
    output:
      type:
        - string
        - array
        - 'null'
      default: null
      description: >-
        Output column or columns; defaults to the input column. Named lookup columns return their
        values; other names receive match dictionaries. With n greater than one, n output columns or
        a wildcard name such as 'Match *' distribute match dictionaries across columns.
    lookup_mode:
      type: string
      default: by_row
      enum:
        - by_row
        - by_dataframe
        - by_matrix
      description: >-
        Look up each row, each distinct input, or each matrix permutation. by_matrix requires
        matrix_variables in the forwarded options.
    matrix_variables:
      type: array
      minItems: 1
      items:
        type: string
      description: Columns that define the permutations for by_matrix mode.
    'n':
      type:
        - integer
        - 'null'
      default: null
      description: >-
        Optional number of matches. Supported only with by_row. When greater than one, a single
        output contains a list of match dictionaries unless expanded with a wildcard. Each of n
        output columns receives one match.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
  examples:
    - input: Description
      output: Match *
      model_id: ${SEMANTIC_LOOKUP_MODEL_ID}
      'n': 3
schema_origin: upstream-docstring
schema_adjustments: []
---

# Semantic

Look up values using a saved semantic lookup model. Requires a WrangleWorks account and a model with purpose lookup and stored variant embedding. Missing or unknown variants are rejected; use lookup for legacy models.

Usage guidance and examples have not yet been reviewed.
