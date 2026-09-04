---
schema_version: "0.1"
type: wrangle
id: e370dfcf-b0fe-4c48-8a52-6f34c47e7978
wrangle_name: from_json
namespace: convert
title: Convert From JSON
description: Parse JSON text into lists, objects, scalars, booleans, or null values.
wrangle_key: convert.from_json
aliases: []
slug: convert/from-json
status: active
visibility: public
tags:
  - convert
  - json
  - structured-data
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.convert.from_json
  contract_status: verified
access:
  ai_powered: false
  requires_account: false
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  where: true
  where_params: true
  if: true
parameters:
  - name: input
    description: Name, index, or list of columns containing valid JSON text.
    required: true
    role: column-selector
    schema:
      type: [string, integer, array]
      items:
        type: [string, integer]
  - name: output
    description: Name or list of output columns. If omitted, each input column is overwritten.
    required: false
    role: column-output
    runtime_default: null
    schema:
      type: [string, array]
      items:
        type: string
  - name: default
    description: Value returned for empty or invalid JSON. A list may supply one fallback per input column.
    required: false
    role: fallback-value
    runtime_default: null
    schema:
      type: [string, number, array, object, boolean, "null"]
examples:
  - id: parse-structured-values
    title: Parse JSON objects and lists
    recipe: |-
      wrangles:
        - convert.from_json:
            input: attributes_json
            output: attributes
    input_fixture: ../../fixtures/convert.from_json/parse-structured-values.input.json
    output_fixture: ../../fixtures/convert.from_json/parse-structured-values.output.json
    verification: static
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py
    title: WranglesPY convert.from_json implementation
  - id: legacy-docs
    resource: https://wrangles.io/python/recipes/wrangles/convert#from-json
    title: Legacy convert.from_json documentation
---

# Convert From JSON

Use `convert.from_json` when a column contains JSON text that later wrangles
need to treat as structured values.

## Behavior

- Each non-fallback value is parsed with Python's JSON parser.
- Omitting `output` overwrites the input column.
- Multiple input columns may share one fallback or use one fallback per input.
- Invalid JSON raises an error unless a non-null fallback is supplied.
- Permissive Python-literal or YAML-like parsing is outside this wrangle's
  contract.
