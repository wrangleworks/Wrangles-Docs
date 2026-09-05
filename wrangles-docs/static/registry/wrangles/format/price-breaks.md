---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: price_breaks
namespace: format
title: Format Price Breaks
description: Expand non-empty price-break cells into paired category and value columns.
wrangle_key: format.price_breaks
aliases: []
slug: format/price-breaks
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: This newer wrangle is outside the pinned baseline.
tags:
  - format
  - price-breaks
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.format.price_breaks
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
      type: array
  - name: categoryLabel
    description: Prefix for output columns that identify the source price-break category.
    required: true
    param_group: Formatting
    schema:
      type: string
  - name: valueLabel
    description: Prefix for output columns that contain the corresponding price-break value.
    required: true
    param_group: Formatting
    schema:
      type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py
    title: WranglesPY format.price_breaks implementation
---

# Format Price Breaks

## Behavior

Expand non-empty price-break cells into paired category and value columns.

This guidance was derived from the callable signature.
