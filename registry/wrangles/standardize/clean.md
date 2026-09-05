---
schema_version: '0.1'
type: wrangle
id: null
wrangle_name: clean
namespace: standardize
title: Standardize Clean
description: >-
  Repair common encoding, Unicode, HTML character reference, control character, and whitespace
  problems locally.
wrangle_key: standardize.clean
aliases: []
slug: standardize/clean
status: active
visibility: public
tags:
  - standardize
  - clean
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.standardize.clean
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
    description: Name or list of input columns.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name or list of output columns. Defaults to overwriting input.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - integer
        - array
        - 'null'
  - name: fix_encoding
    description: Repair mojibake and other reversible encoding errors.
    required: false
    param_group: Options
    runtime_default: true
    schema:
      type: boolean
  - name: unescape_html
    description: >-
      Decode HTML character references. Auto avoids decoding text that appears to contain HTML
      markup.
    required: false
    param_group: Options
    runtime_default: auto
    schema:
      anyOf:
        - type: boolean
        - type: string
          enum:
            - auto
  - name: normalization
    description: Unicode normalization form.
    required: false
    param_group: Options
    runtime_default: NFC
    schema:
      type: string
      enum:
        - NFC
        - NFKC
        - NFD
        - NFKD
        - null
  - name: fix_character_width
    description: Normalize fullwidth and halfwidth characters.
    required: false
    param_group: Options
    runtime_default: true
    schema:
      type: boolean
  - name: uncurl_quotes
    description: Replace typographic quotes with straight quotes.
    required: false
    param_group: Options
    runtime_default: true
    schema:
      type: boolean
  - name: remove_control_chars
    description: Remove C0 and C1 control characters.
    required: false
    param_group: Options
    runtime_default: true
    schema:
      type: boolean
  - name: collapse_whitespace
    description: Collapse runs of Unicode whitespace.
    required: false
    param_group: Options
    runtime_default: true
    schema:
      type: boolean
  - name: preserve_line_breaks
    description: Preserve line breaks while collapsing other whitespace.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
  - name: trim
    description: Remove leading and trailing whitespace.
    required: false
    param_group: Options
    runtime_default: true
    schema:
      type: boolean
  - name: separator
    description: Text used to join multiple input columns into one output.
    required: false
    param_group: Formatting
    runtime_default: ' '
    schema:
      type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/standardize.py
    title: WranglesPY standardize.clean implementation
---

# Standardize Clean

## Behavior

Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally.

This first-pass guidance is derived from the callable signature and its embedded Python schema docstring.
