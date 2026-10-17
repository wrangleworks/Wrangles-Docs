---
schema_version: '0.2'
type: 'wrangle'
id: null
wrangle_name: 'clean'
namespace: 'standardize'
title: 'Standardize Clean'
description: 'Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally.'
wrangle_key: 'standardize.clean'
aliases: []
slug: 'standardize/clean'
status: 'active'
visibility: 'public'
recipe_writer:
  eligible: true
tags:
  - 'standardize'
  - 'clean'
runtime:
  package: 'wrangles'
  symbol: 'wrangles.recipe_wrangles.standardize.clean'
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
    description: 'Name or list of input columns.'
    required: true
    param_group: 'I/O'
    column_semantics:
      role: 'reference'
      cardinality: 'scalar_or_list'
    schema:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name or list of input columns.'
    runtime_required: true
  - name: 'output'
    description: 'Name or list of output columns. Defaults to overwriting input.'
    required: false
    param_group: 'I/O'
    column_semantics:
      role: 'destination'
      cardinality: 'scalar_or_list'
    runtime_default: null
    schema:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name or list of output columns. Defaults to overwriting input.'
    runtime_required: false
  - name: 'fix_encoding'
    description: 'Repair mojibake and other reversible encoding errors.'
    required: false
    param_group: 'Options'
    runtime_default: true
    schema:
      type: 'boolean'
      default: true
      description: 'Repair mojibake and other reversible encoding errors.'
    runtime_required: false
  - name: 'unescape_html'
    description: 'Decode HTML character references. Auto avoids decoding text that appears to contain HTML markup.'
    required: false
    param_group: 'Options'
    runtime_default: 'auto'
    schema:
      anyOf:
        - type: 'boolean'
        - type: 'string'
          enum:
            - 'auto'
      default: 'auto'
      description: 'Decode HTML character references. Auto avoids decoding text that appears to contain HTML markup.'
    runtime_required: false
  - name: 'normalization'
    description: 'Unicode normalization form.'
    required: false
    param_group: 'Options'
    runtime_default: 'NFC'
    schema:
      type:
        - 'string'
        - 'null'
      enum:
        - 'NFC'
        - 'NFKC'
        - 'NFD'
        - 'NFKD'
        - null
      default: 'NFC'
      description: 'Unicode normalization form.'
    runtime_required: false
  - name: 'fix_character_width'
    description: 'Normalize fullwidth and halfwidth characters.'
    required: false
    param_group: 'Options'
    runtime_default: true
    schema:
      type: 'boolean'
      default: true
      description: 'Normalize fullwidth and halfwidth characters.'
    runtime_required: false
  - name: 'uncurl_quotes'
    description: 'Replace typographic quotes with straight quotes.'
    required: false
    param_group: 'Options'
    runtime_default: true
    schema:
      type: 'boolean'
      default: true
      description: 'Replace typographic quotes with straight quotes.'
    runtime_required: false
  - name: 'remove_control_chars'
    description: 'Remove C0 and C1 control characters.'
    required: false
    param_group: 'Options'
    runtime_default: true
    schema:
      type: 'boolean'
      default: true
      description: 'Remove C0 and C1 control characters.'
    runtime_required: false
  - name: 'collapse_whitespace'
    description: 'Collapse runs of Unicode whitespace.'
    required: false
    param_group: 'Options'
    runtime_default: true
    schema:
      type: 'boolean'
      default: true
      description: 'Collapse runs of Unicode whitespace.'
    runtime_required: false
  - name: 'preserve_line_breaks'
    description: 'Preserve line breaks while collapsing other whitespace.'
    required: false
    param_group: 'Options'
    runtime_default: false
    schema:
      type: 'boolean'
      default: false
      description: 'Preserve line breaks while collapsing other whitespace.'
    runtime_required: false
  - name: 'trim'
    description: 'Remove leading and trailing whitespace.'
    required: false
    param_group: 'Options'
    runtime_default: true
    schema:
      type: 'boolean'
      default: true
      description: 'Remove leading and trailing whitespace.'
    runtime_required: false
  - name: 'separator'
    description: 'Text used to join multiple input columns into one output.'
    required: false
    param_group: 'Formatting'
    runtime_default: ' '
    schema:
      type: 'string'
      default: ' '
      description: 'Text used to join multiple input columns into one output.'
    runtime_required: false
  - name: 'unescape_unicode'
    description: 'Decode literal printable Unicode escapes in prose, preserving code and Markdown link destinations.'
    param_group: 'Options'
    schema:
      type: 'boolean'
      default: false
      description: 'Decode literal printable Unicode escapes in prose, preserving code and Markdown link destinations.'
    required: false
    runtime_default: false
    runtime_required: false
  - name: 'latex_to_text'
    description: 'Convert supported inline LaTeX units, symbols and numeric fractions to readable text. Preserve numeric dollar amounts, ranges and explicit price qualifiers; remove extra dollar signs from other supported inline math. Preserve unsupported formulas. Set collapse_whitespace and trim to false to retain Markdown layout.'
    param_group: 'Options'
    schema:
      type: 'boolean'
      default: false
      description: 'Convert supported inline LaTeX units, symbols and numeric fractions to readable text. Preserve numeric dollar amounts, ranges and explicit price qualifiers; remove extra dollar signs from other supported inline math. Preserve unsupported formulas. Set collapse_whitespace and trim to false to retain Markdown layout.'
    required: false
    runtime_default: false
    runtime_required: false
examples: []
sources:
  - id: 'runtime'
    resource: 'https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/standardize.py'
    title: 'WranglesPY standardize.clean implementation'
configuration_schema:
  type: 'object'
  description: 'Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally.'
  required:
    - 'input'
  properties:
    input:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name or list of input columns.'
    output:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name or list of output columns. Defaults to overwriting input.'
    fix_encoding:
      type: 'boolean'
      default: true
      description: 'Repair mojibake and other reversible encoding errors.'
    unescape_html:
      anyOf:
        - type: 'boolean'
        - type: 'string'
          enum:
            - 'auto'
      default: 'auto'
      description: 'Decode HTML character references. Auto avoids decoding text that appears to contain HTML markup.'
    normalization:
      type:
        - 'string'
        - 'null'
      enum:
        - 'NFC'
        - 'NFKC'
        - 'NFD'
        - 'NFKD'
        - null
      default: 'NFC'
      description: 'Unicode normalization form.'
    fix_character_width:
      type: 'boolean'
      default: true
      description: 'Normalize fullwidth and halfwidth characters.'
    uncurl_quotes:
      type: 'boolean'
      default: true
      description: 'Replace typographic quotes with straight quotes.'
    remove_control_chars:
      type: 'boolean'
      default: true
      description: 'Remove C0 and C1 control characters.'
    collapse_whitespace:
      type: 'boolean'
      default: true
      description: 'Collapse runs of Unicode whitespace.'
    preserve_line_breaks:
      type: 'boolean'
      default: false
      description: 'Preserve line breaks while collapsing other whitespace.'
    trim:
      type: 'boolean'
      default: true
      description: 'Remove leading and trailing whitespace.'
    unescape_unicode:
      type: 'boolean'
      default: false
      description: 'Decode literal printable Unicode escapes in prose, preserving code and Markdown link destinations.'
    latex_to_text:
      type: 'boolean'
      default: false
      description: 'Convert supported inline LaTeX units, symbols and numeric fractions to readable text. Preserve numeric dollar amounts, ranges and explicit price qualifiers; remove extra dollar signs from other supported inline math. Preserve unsupported formulas. Set collapse_whitespace and trim to false to retain Markdown layout.'
    separator:
      type: 'string'
      default: ' '
      description: 'Text used to join multiple input columns into one output.'
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: 'upstream-docstring'
schema_adjustments: []
---

# Standardize Clean

## Behavior

Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally.

This guidance was derived from the callable signature and its embedded Python schema docstring.
