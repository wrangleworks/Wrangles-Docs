---
schema_version: '0.1'
type: wrangle
id: null
wrangle_name: maths
namespace: null
title: Maths
description: Deprecated alias for `math`; evaluate an expression and write its result to an output column.
wrangle_key: maths
aliases: []
slug: maths
status: deprecated
replaced_by: math
visibility: public
tags:
  - maths
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.maths
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
    description: Name, index, or list of input columns.
    required: true
    param_group: I/O
    schema:
      type: string
  - name: output
    description: Name or list of output columns.
    required: true
    param_group: I/O
    schema:
      type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY maths implementation
---

# Maths

## Behavior

Deprecated alias for `math`; evaluate an expression and write its result to an output column.

This first-pass guidance is derived from the callable signature.
