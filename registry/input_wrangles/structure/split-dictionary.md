---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: split_dictionary
namespace: structure
title: Split Dictionary
description: |-
  Split one or more dictionaries into columns.
  The dictionary keys will be returned as the new column headers.
  Dictionary keys are case-sensitive. With multiple input columns,
  later dictionaries overwrite earlier keys before defaults are applied.
wrangle_key: structure.split_dictionary
aliases: []
slug: structure/split-dictionary
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: Automatically documented from schema; execution eligibility requires review.
tags:
  - structure
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.structure.split_dictionary
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
    description: |-
      Name or list of columns containing dictionaries or JSON object strings to split.
      For overlapping keys, later input columns take precedence
      before defaults are applied.
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
      description: |-
        Name or list of columns containing dictionaries or JSON object strings to split.
        For overlapping keys, later input columns take precedence
        before defaults are applied.
    runtime_required: true
    required: true
  - name: output
    description: |-
      In columns output_format, this is an optional subset of keys to extract
      from the dictionary. If not provided, all keys will be returned.
      Columns can be renamed with the following syntax:
      output:
        - key1: new_column_name1
        - key2: new_column_name2
      In to_lists output_format, this must be two output columns for the keys
      and values lists. If not provided, Keys and Values will be used.
    param_group: I/O
    schema:
      type:
        - string
        - array
      description: |-
        In columns output_format, this is an optional subset of keys to extract
        from the dictionary. If not provided, all keys will be returned.
        Columns can be renamed with the following syntax:
        output:
          - key1: new_column_name1
          - key2: new_column_name2
        In to_lists output_format, this must be two output columns for the keys
        and values lists. If not provided, Keys and Values will be used.
    runtime_required: false
    required: false
    runtime_default: null
  - name: default
    description: >-
      Provide defaults for missing top-level keys or keys with null values after merging the input
      dictionaries. Keys use their original names before output renaming. Non-null values, including
      0, false, empty strings, lists, and dictionaries, are preserved. Nested values are not filled
      recursively. When default is supplied (including {}), invalid or non-dictionary input cells
      are treated as empty dictionaries, so valid values from other input columns are retained.
      Without default, invalid input raises an error.
    param_group: Options
    schema:
      type: object
      description: >-
        Provide defaults for missing top-level keys or keys with null values after merging the input
        dictionaries. Keys use their original names before output renaming. Non-null values,
        including 0, false, empty strings, lists, and dictionaries, are preserved. Nested values are
        not filled recursively. When default is supplied (including {}), invalid or non-dictionary
        input cells are treated as empty dictionaries, so valid values from other input columns are
        retained. Without default, invalid input raises an error.
    runtime_required: false
    required: false
    runtime_default: null
  - name: output_format
    description: |-
      How to split the dictionary.
      columns creates one output column for each dictionary key.
      In recipes, remaining null cells are normalized to empty strings.
      to_lists creates two output columns containing lists of keys and values.
      Remaining null values inside these lists are preserved.
    param_group: Options
    schema:
      type: string
      enum:
        - columns
        - to_lists
      description: |-
        How to split the dictionary.
        columns creates one output column for each dictionary key.
        In recipes, remaining null cells are normalized to empty strings.
        to_lists creates two output columns containing lists of keys and values.
        Remaining null values inside these lists are preserved.
    runtime_required: false
    required: false
    runtime_default: columns
examples: []
sources:
  - id: schema
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/structure.py
    title: WranglesPY schema
configuration_schema:
  type: object
  catalog_id: '63'
  status: active
  description: |-
    Split one or more dictionaries into columns.
    The dictionary keys will be returned as the new column headers.
    Dictionary keys are case-sensitive. With multiple input columns,
    later dictionaries overwrite earlier keys before defaults are applied.
  additionalProperties: false
  required:
    - input
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: |-
        Name or list of columns containing dictionaries or JSON object strings to split.
        For overlapping keys, later input columns take precedence
        before defaults are applied.
    output:
      type:
        - string
        - array
      description: |-
        In columns output_format, this is an optional subset of keys to extract
        from the dictionary. If not provided, all keys will be returned.
        Columns can be renamed with the following syntax:
        output:
          - key1: new_column_name1
          - key2: new_column_name2
        In to_lists output_format, this must be two output columns for the keys
        and values lists. If not provided, Keys and Values will be used.
    default:
      type: object
      description: >-
        Provide defaults for missing top-level keys or keys with null values after merging the input
        dictionaries. Keys use their original names before output renaming. Non-null values,
        including 0, false, empty strings, lists, and dictionaries, are preserved. Nested values are
        not filled recursively. When default is supplied (including {}), invalid or non-dictionary
        input cells are treated as empty dictionaries, so valid values from other input columns are
        retained. Without default, invalid input raises an error.
    output_format:
      type: string
      enum:
        - columns
        - to_lists
      description: |-
        How to split the dictionary.
        columns creates one output column for each dictionary key.
        In recipes, remaining null cells are normalized to empty strings.
        to_lists creates two output columns containing lists of keys and values.
        Remaining null values inside these lists are preserved.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Split Dictionary

Split one or more dictionaries into columns.
The dictionary keys will be returned as the new column headers.
Dictionary keys are case-sensitive. With multiple input columns,
later dictionaries overwrite earlier keys before defaults are applied.

Usage guidance and examples have not yet been reviewed.
