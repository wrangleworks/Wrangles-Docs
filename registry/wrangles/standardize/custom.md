---
schema_version: '0.1'
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
  - name: model_id
    description: The ID of the wrangle to use (do not include 'find' and 'replace').
    required: true
    param_group: Details
    schema:
      type:
        - string
        - array
  - name: output
    description: Name or list of output columns.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: case_sensitive
    description: Allows the wrangle to be case sensitive if set to True, default is False.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/standardize.py
    title: WranglesPY standardize.custom implementation
---

# Standardize Custom

## Behavior

Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription.

This first-pass guidance is derived from the callable signature and its embedded Python schema docstring.
