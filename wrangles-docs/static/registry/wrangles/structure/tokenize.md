---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: tokenize
namespace: structure
title: Tokenize
description: >-
  Split text into tokens. A variety of methods are available. The default method is to split on
  spaces.
wrangle_key: structure.tokenize
aliases: []
slug: structure/tokenize
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: Automatically documented from schema; execution eligibility requires review.
tags:
  - structure
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.structure.tokenize
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
    description: Column(s) to be split into tokens
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
      description: Column(s) to be split into tokens
    runtime_required: true
    required: true
  - name: output
    description: Name of the output column
    param_group: I/O
    schema:
      type:
        - string
        - array
      description: Name of the output column
    runtime_required: false
    required: false
    runtime_default: null
  - name: method
    description: The method parameter.
    param_group: Options
    schema:
      anyOf:
        - type: string
          enum:
            - space
            - boundary
            - boundary_ignore_space
          description: >-
            Method to split the list. Options: space, boundary, boundary_ignore_space or use a
            custom function with custom.<function> or use a regex pattern with regex:<pattern>
        - type: string
          description: >-
            Method to split the list. Options: space, boundary, boundary_ignore_space or use a
            custom function with custom.<function> or use a regex pattern with regex:<pattern>
    runtime_required: false
    required: false
    runtime_default: space
examples: []
sources:
  - id: schema
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/structure.py
    title: WranglesPY schema
configuration_schema:
  type: object
  catalog_id: '66'
  status: active
  description: >-
    Split text into tokens. A variety of methods are available. The default method is to split on
    spaces.
  additionalProperties: false
  required:
    - input
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: Column(s) to be split into tokens
    output:
      type:
        - string
        - array
      description: Name of the output column
    method:
      anyOf:
        - type: string
          enum:
            - space
            - boundary
            - boundary_ignore_space
          description: >-
            Method to split the list. Options: space, boundary, boundary_ignore_space or use a
            custom function with custom.<function> or use a regex pattern with regex:<pattern>
        - type: string
          description: >-
            Method to split the list. Options: space, boundary, boundary_ignore_space or use a
            custom function with custom.<function> or use a regex pattern with regex:<pattern>
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Tokenize

Split text into tokens. A variety of methods are available. The default method is to split on spaces.

Usage guidance and examples have not yet been reviewed.
