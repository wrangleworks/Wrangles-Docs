---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: custom
namespace: standardize
title: Standardize Custom
description: >-
  Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and
  Subscription.
wrangle_key: standardize.custom
aliases: []
slug: standardize/custom
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - standardize
  - custom
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.standardize.custom
  contract_status: verified
access:
  ai_powered: false
  requires_account: true
  requires_subscription: true
  requires_external_api_key: false
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: input
    description: Name or list of input columns.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
      description: Name or list of input columns.
    runtime_required: true
  - name: model_id
    description: The ID of the wrangle to use (do not include 'find' and 'replace')
    required: false
    param_group: Details
    schema:
      type:
        - string
        - array
      description: The ID of the wrangle to use (do not include 'find' and 'replace')
    runtime_required: true
  - name: output
    description: Name or list of output columns
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: Name or list of output columns
    runtime_required: false
  - name: case_sensitive
    description: Allows the wrangle to be case sensitive if set to True, default is False.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
      description: Allows the wrangle to be case sensitive if set to True, default is False.
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/standardize.py
    title: WranglesPY standardize.custom implementation
configuration_schema:
  type: object
  description: >-
    Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account
    and Subscription.
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
      description: Name or list of output columns
    model_id:
      type:
        - string
        - array
      description: The ID of the wrangle to use (do not include 'find' and 'replace')
    case_sensitive:
      type: boolean
      description: Allows the wrangle to be case sensitive if set to True, default is False.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Standardize Custom

## Behavior

Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription.

This guidance was derived from the callable signature and its embedded Python schema docstring.
