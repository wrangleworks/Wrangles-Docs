---
schema_version: '0.2'
type: wrangle
id: 73c3ceb6-ffd8-4d74-8389-c83b99d33bb0
wrangle_name: translate
namespace: null
title: Translate
description: >-
  Translate the input to a different language. Requires WrangleWorks Account and DeepL API Key (A
  free account for up to 500,000 characters per month is available).
wrangle_key: translate
aliases: []
slug: translate
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - format
  - translate
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.translate
  contract_status: verified
access:
  ai_powered: false
  requires_account: true
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: input
    description: Name of the column to translate.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name of the output column.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
  - name: target_language
    description: Code of the language to translate to.
    required: true
    param_group: Options
    schema:
      type: string
      enum:
        - Bulgarian
        - Chinese
        - Czech
        - Danish
        - Dutch
        - English (American)
        - English (British)
        - Estonian
        - Finnish
        - French
        - German
        - Greek
        - Hungarian
        - Italian
        - Japanese
        - Latvian
        - Lithuanian
        - Polish
        - Portuguese
        - Portuguese (Brazilian)
        - Romanian
        - Russian
        - Slovak
        - Slovenian
        - Spanish
        - Swedish
  - name: source_language
    description: Code of the language to translate from. If omitted, automatically detects the input language.
    required: false
    param_group: Options
    runtime_default: AUTO
    schema:
      type: string
      enum:
        - Auto
        - Bulgarian
        - Chinese
        - Czech
        - Danish
        - Dutch
        - English
        - Estonian
        - Finnish
        - French
        - German
        - Greek
        - Hungarian
        - Italian
        - Japanese
        - Latvian
        - Lithuanian
        - Polish
        - Portuguese
        - Romanian
        - Russian
        - Slovak
        - Slovenian
        - Spanish
        - Swedish
  - name: case
    description: Allow changing the case of the input prior to translation.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY translate implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/translate.md
    title: Existing translate Markdown
---

# Translate

Translate the input column to another language. Powered by DeepL.

## Migrated examples
#### Translating Spanish to English

##### Recipe

```yaml
wrangles:
  - translate:
      input: Español
      output: English
      source_language: Spanish
      target_language: English (British)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Español |
| --- |
| ¡Hola Mundo! |

</div>

<div className="ww-sample-panel">

##### Output Sample

| English |
| --- |
| Hello World! |

</div>

</div>
