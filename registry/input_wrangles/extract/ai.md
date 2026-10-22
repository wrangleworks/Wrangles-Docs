---
schema_version: '0.2'
type: 'wrangle'
id: 'd9f89b00-fda3-4f4c-826c-6417b9390607'
wrangle_name: 'ai'
namespace: 'extract'
title: 'AI'
description: 'Extract structured data from each input row using an AI model. Define the desired fields with output, or reuse a saved definition with model_id.'
wrangle_key: 'extract.ai'
aliases: []
slug: 'extract/ai'
status: 'active'
visibility: 'public'
recipe_writer:
  eligible: true
tags:
  - 'ai'
  - 'extract'
runtime:
  package: 'wrangles'
  symbol: 'wrangles.recipe_wrangles.extract.ai'
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
  - name: 'api_key'
    description: 'OpenAI API key used for this wrangle, normally supplied through a recipe variable.'
    required: true
    param_group: 'Details'
    schema:
      type: 'string'
      description: 'OpenAI API key used for this wrangle, normally supplied through a recipe variable.'
    runtime_required: true
  - name: 'input'
    description: 'Input column name, column index, or list of columns supplied together as DATA for each row. If omitted, all dataframe columns are supplied.'
    required: false
    param_group: 'I/O'
    runtime_default: null
    schema:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Input column name, column index, or list of columns supplied together as DATA for each row. If omitted, all dataframe columns are supplied.'
      items:
        type:
          - 'string'
          - 'integer'
    runtime_required: false
  - name: 'output'
    description: 'Desired extraction. Use an object keyed by output column name for structured fields, a string for one prompted value, or an array of field names/definitions. Each field may use the schema options below.'
    required: false
    param_group: 'I/O'
    runtime_default: null
    schema:
      type:
        - 'object'
        - 'string'
        - 'array'
      description: 'Desired extraction. Use an object keyed by output column name for structured fields, a string for one prompted value, or an array of field names/definitions. Each field may use the schema options below.'
      patternProperties:
        ^[a-zA-Z0-9 _-]+$:
          type:
            - 'object'
            - 'string'
          properties:
            type:
              type: 'string'
              description: 'JSON data type required for this field. If omitted, common scalar types are accepted. Fields allow null by default.'
              enum:
                - 'string'
                - 'number'
                - 'integer'
                - 'boolean'
                - 'null'
                - 'object'
                - 'array'
            description:
              type: 'string'
              description: 'Plain-language definition of the value to extract, including any selection, normalization, unit, or evidence rules.'
            enum:
              type: 'array'
              description: 'Allowed output values. The model must choose one of these values; null is also allowed unless nullable is false.'
            default:
              type:
                - 'string'
                - 'number'
                - 'integer'
                - 'boolean'
                - 'null'
                - 'object'
                - 'array'
              description: 'JSON Schema annotation for a preferred default. extract.ai does not substitute this value when evidence is missing; describe fallback behavior explicitly or allow null.'
            examples:
              title: 'Field examples'
              type:
                - 'array'
                - 'object'
                - 'string'
                - 'number'
                - 'integer'
                - 'boolean'
                - 'null'
              description: 'Field-specific examples. The backward-compatible form is a scalar or list of typical output values. A paired example may instead use input and output, with optional name and notes. Paired examples apply only to this output field; use record_examples for complete output records. Object outputs must include every required non-null nested property.'
              properties:
                name:
                  type: 'string'
                  description: 'Optional label included with this paired field example.'
                notes:
                  type: 'string'
                  description: 'Optional explanatory guidance included with this paired field example.'
                input:
                  description: 'Source value or record for this paired field example. Plain multiline strings remain text; use an explicit object when the runtime input is structured.'
                output:
                  description: 'Expected value for this output field only.'
              items:
                anyOf:
                  - type: 'object'
                    required:
                      - 'input'
                      - 'output'
                    properties:
                      name:
                        type: 'string'
                        description: 'Optional label included with this paired field example.'
                      notes:
                        type: 'string'
                        description: 'Optional explanatory guidance included with this paired field example.'
                      input:
                        description: 'Source value or record for this paired field example. Plain multiline strings remain text; use an explicit object when the runtime input is structured.'
                      output:
                        description: 'Expected value for this output field only.'
                  - description: 'Backward-compatible output-only example value.'
            properties:
              type:
                - 'object'
                - 'array'
                - 'string'
              description: 'Child fields when type is object. Use an object to define a schema for each child. A list or comma-separated string is a shortcut that creates fixed child names. Named child values are non-null by default.'
            required:
              type:
                - 'array'
                - 'string'
              description: 'Named object properties that must be returned. If omitted, every named property is required. Strings may use pipe or comma delimiters.'
            additionalProperties:
              type:
                - 'boolean'
                - 'object'
              description: 'Controls keys beyond properties when type is object. Set false for fixed keys, true for arbitrary values, or provide one schema applied to every dynamic value. Dynamic dictionaries use non-strict provider mode plus local validation. Defaults to false when named properties exist.'
            items:
              type: 'object'
              description: 'Schema applied to every element when this field''s type is array.'
            nullable:
              type: 'boolean'
              description: 'Whether the field may return null. Defaults to true while a top-level field key remains required. Named nested properties default to false. Set this explicitly to override the applicable default.'
    runtime_required: false
  - name: 'model_id'
    description: 'ID of a saved extract.ai definition. Use it instead of defining an output schema. When output is also supplied with model_id in a recipe, output names the destination column or columns for the saved fields.'
    required: false
    param_group: 'Details'
    runtime_default: null
    schema:
      type: 'string'
      description: 'ID of a saved extract.ai definition. Use it instead of defining an output schema. When output is also supplied with model_id in a recipe, output names the destination column or columns for the saved fields.'
    runtime_required: false
  - name: 'record_examples'
    description: 'Whole-record examples. Each example has a separate input value or record and the complete expected output record. Optional name and notes provide model-visible context. Use {name: ..., notes: ..., input: ..., output: ...}. Omitted nullable output fields are completed with null. Required non-null nested properties must be supplied. This differs from examples nested under one output field, which teach only that field.'
    required: false
    param_group: 'Options'
    runtime_default: null
    schema:
      title: 'Record examples'
      type:
        - 'array'
        - 'object'
      description: 'Whole-record examples. Each example has a separate input value or record and the complete expected output record. Optional name and notes provide model-visible context. Use {name: ..., notes: ..., input: ..., output: ...}. Omitted nullable output fields are completed with null. Required non-null nested properties must be supplied. This differs from examples nested under one output field, which teach only that field.'
      required:
        - 'input'
        - 'output'
      properties:
        name:
          type: 'string'
          description: 'Optional label used to identify this example in the prompt.'
        notes:
          type: 'string'
          description: 'Optional explanatory guidance included with this example.'
        input:
          description: 'Source value or record the example should match.'
        output:
          description: 'Expected result using the field names defined by output.'
      items:
        type: 'object'
        required:
          - 'input'
          - 'output'
        properties:
          name:
            type: 'string'
            description: 'Optional label used to identify this example in the prompt.'
          notes:
            type: 'string'
            description: 'Optional explanatory guidance included with this example.'
          input:
            description: 'Source value or record the example should match.'
          output:
            description: 'Expected result using the field names defined by output.'
    runtime_required: false
  - name: 'output_format'
    description: 'How extracted fields are written. columns writes one dataframe column per field (default); dictionary keeps one object; concatenate joins fields into one string using char.'
    required: false
    param_group: 'Formatting'
    runtime_default: null
    schema:
      type: 'string'
      description: 'How extracted fields are written. columns writes one dataframe column per field (default); dictionary keeps one object; concatenate joins fields into one string using char.'
      enum:
        - 'dictionary'
        - 'columns'
        - 'concatenate'
    runtime_required: false
  - name: 'char'
    description: 'Separator used only when output_format is concatenate. Defaults to comma-space.'
    required: false
    param_group: 'Formatting'
    runtime_default: ', '
    schema:
      type: 'string'
      description: 'Separator used only when output_format is concatenate. Defaults to comma-space.'
    runtime_required: false
  - name: 'web_search'
    description: 'Enable OpenAI Responses web search; the model decides when searching helps. When true, every row also receives web_search_sources: a deduplicated list of {title, url} objects in source order, or an empty list when no source was used. This reserved column is automatic. Requires protocol responses. Defaults to false.'
    required: false
    param_group: 'Options'
    runtime_default: false
    schema:
      type: 'boolean'
      description: 'Enable OpenAI Responses web search; the model decides when searching helps. When true, every row also receives web_search_sources: a deduplicated list of {title, url} objects in source order, or an empty list when no source was used. This reserved column is automatic. Requires protocol responses. Defaults to false.'
    runtime_required: false
  - name: 'instructions'
    description: 'General instructions applied to every input row, in addition to any GeneralInstructions in the saved model. Use this for decision rules, evidence priorities, normalization requirements, or other behavior that applies to the complete extraction.'
    required: false
    param_group: 'Options'
    runtime_default: null
    schema:
      title: 'General Instructions'
      type:
        - 'string'
        - 'array'
      description: 'General instructions applied to every input row, in addition to any GeneralInstructions in the saved model. Use this for decision rules, evidence priorities, normalization requirements, or other behavior that applies to the complete extraction.'
      items:
        type: 'string'
    runtime_required: false
  - name: 'model'
    description: 'OpenAI model ID for this call. If omitted, uses the configured extract.ai default; a saved model definition may supply its own model.'
    required: false
    param_group: 'Details'
    schema:
      type: 'string'
      description: 'OpenAI model ID for this call. If omitted, uses the configured extract.ai default; a saved model definition may supply its own model.'
    runtime_required: false
  - name: 'threads'
    description: 'Maximum number of row-level requests sent in parallel. The configured default is 32.'
    required: false
    param_group: 'Execution'
    schema:
      type: 'integer'
      minimum: 1
      description: 'Maximum number of row-level requests sent in parallel. The configured default is 32.'
    runtime_required: false
  - name: 'timeout'
    description: 'Network timeout in seconds for each HTTP attempt. The configured default is 12. Each retry uses the same timeout.'
    required: false
    param_group: 'Execution'
    schema:
      type: 'number'
      exclusiveMinimum: 0
      description: 'Network timeout in seconds for each HTTP attempt. The configured default is 12. Each retry uses the same timeout.'
    runtime_required: false
  - name: 'retries'
    description: 'Number of additional attempts per row after a retryable failure. The configured default is 1. Retry delays are separate from timeout.'
    required: false
    param_group: 'Errors'
    schema:
      type: 'integer'
      minimum: 0
      description: 'Number of additional attempts per row after a retryable failure. The configured default is 1. Retry delays are separate from timeout.'
    runtime_required: false
  - name: 'url'
    description: "Override the endpoint for the selected protocol. A chat/completions URL\nselects the legacy protocol only when protocol is omitted; new recipes\nshould use the configured Responses endpoint."
    required: false
    param_group: 'Details'
    schema:
      type: 'string'
      description: "Override the endpoint for the selected protocol. A chat/completions URL\nselects the legacy protocol only when protocol is omitted; new recipes\nshould use the configured Responses endpoint."
    runtime_required: false
  - name: 'provider'
    description: 'AI service provider. Currently only OpenAI is supported.'
    required: false
    param_group: 'Details'
    schema:
      type: 'string'
      description: 'AI service provider. Currently only OpenAI is supported.'
      enum:
        - 'openai'
    runtime_required: false
  - name: 'protocol'
    description: 'OpenAI API protocol. Responses is the configured default and is required for web_search; chat_completions remains available for legacy definitions.'
    required: false
    param_group: 'Details'
    schema:
      type: 'string'
      description: 'OpenAI API protocol. Responses is the configured default and is required for web_search; chat_completions remains available for legacy definitions.'
      enum:
        - 'responses'
        - 'chat_completions'
    runtime_required: false
  - name: 'store'
    description: 'Whether OpenAI may store Responses API results. Defaults to true.'
    required: false
    param_group: 'Details'
    schema:
      type: 'boolean'
      description: 'Whether OpenAI may store Responses API results. Defaults to true.'
    runtime_required: false
  - name: 'cache'
    description: 'Reuse identical successful results from the bounded warm-instance cache. Defaults to true. Set false when fresh model or web results are required.'
    required: false
    param_group: 'Details'
    schema:
      type: 'boolean'
      description: 'Reuse identical successful results from the bounded warm-instance cache. Defaults to true. Set false when fresh model or web results are required.'
    runtime_required: false
  - name: 'cache_ttl'
    description: 'Maximum age in seconds for a cached result used by this call. Applies to extracted values and web_search_sources together.'
    required: false
    param_group: 'Details'
    schema:
      type: 'number'
      exclusiveMinimum: 0
      description: 'Maximum age in seconds for a cached result used by this call. Applies to extracted values and web_search_sources together.'
    runtime_required: false
  - name: 'strict'
    description: 'Require OpenAI structured-output strict mode. Defaults to true. Definitions with dynamic dictionary keys automatically switch to non-strict provider mode and are still validated locally.'
    required: false
    param_group: 'Details'
    schema:
      type: 'boolean'
      description: 'Require OpenAI structured-output strict mode. Defaults to true. Definitions with dynamic dictionary keys automatically switch to non-strict provider mode and are still validated locally.'
    runtime_required: false
  - name: 'reasoning'
    description: 'Reasoning effort, such as none or low, or an object with effort and other reasoning options. Both forms are equivalent for setting effort. Defaults to none for every model. Explicit settings are always sent to the provider; unsupported settings produce a provider error.'
    required: false
    param_group: 'Details'
    schema:
      description: 'Reasoning effort, such as none or low, or an object with effort and other reasoning options. Both forms are equivalent for setting effort. Defaults to none for every model. Explicit settings are always sent to the provider; unsupported settings produce a provider error.'
      oneOf:
        - type: 'string'
          enum:
            - 'none'
            - 'minimal'
            - 'low'
            - 'medium'
            - 'high'
            - 'xhigh'
            - 'max'
        - type: 'object'
          properties:
            effort:
              type: 'string'
              description: 'Amount of reasoning work requested from a compatible model.'
              enum:
                - 'none'
                - 'minimal'
                - 'low'
                - 'medium'
                - 'high'
                - 'xhigh'
                - 'max'
    runtime_required: false
  - name: 'verbosity'
    description: 'Responses API text verbosity for compatible models. Defaults to low when supported; ignored with a warning for incompatible models.'
    required: false
    param_group: 'Details'
    schema:
      type: 'string'
      description: 'Responses API text verbosity for compatible models. Defaults to low when supported; ignored with a warning for incompatible models.'
      enum:
        - 'low'
        - 'medium'
        - 'high'
    runtime_required: false
  - name: 'metadata'
    description: 'Labels attached to OpenAI requests, such as recipe_name and wrangles_user. Available recipe name and Wrangles user are added automatically. Explicit labels override those defaults; an empty object disables automatic labels. These appear with stored logs and are separate from model instructions. Up to 16 string pairs; keys may contain up to 64 characters and values up to 512 characters. Does not enable workflow tracing.'
    param_group: 'Options'
    schema:
      type: 'object'
      description: 'Labels attached to OpenAI requests, such as recipe_name and wrangles_user. Available recipe name and Wrangles user are added automatically. Explicit labels override those defaults; an empty object disables automatic labels. These appear with stored logs and are separate from model instructions. Up to 16 string pairs; keys may contain up to 64 characters and values up to 512 characters. Does not enable workflow tracing.'
      maxProperties: 16
      propertyNames:
        maxLength: 64
      additionalProperties:
        type: 'string'
        maxLength: 512
    required: false
    runtime_required: false
examples: []
sources:
  - id: 'runtime'
    resource: 'https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py'
    title: 'WranglesPY extract.ai implementation'
  - id: 'legacy-docs-archive'
    resource: 'https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/ai.md'
    title: 'Archived extract.ai Markdown'
configuration_schema:
  type: 'object'
  description: 'Extract structured data from each input row using an AI model. Define the desired fields with output, or reuse a saved definition with model_id.'
  additionalProperties: false
  required:
    - 'api_key'
  anyOf:
    - required:
        - 'output'
    - required:
        - 'model_id'
  properties:
    input:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Input column name, column index, or list of columns supplied together as DATA for each row. If omitted, all dataframe columns are supplied.'
      items:
        type:
          - 'string'
          - 'integer'
    output:
      type:
        - 'object'
        - 'string'
        - 'array'
      description: 'Desired extraction. Use an object keyed by output column name for structured fields, a string for one prompted value, or an array of field names/definitions. Each field may use the schema options below.'
      patternProperties:
        ^[a-zA-Z0-9 _-]+$:
          type:
            - 'object'
            - 'string'
          properties:
            type:
              type: 'string'
              description: 'JSON data type required for this field. If omitted, common scalar types are accepted. Fields allow null by default.'
              enum:
                - 'string'
                - 'number'
                - 'integer'
                - 'boolean'
                - 'null'
                - 'object'
                - 'array'
            description:
              type: 'string'
              description: 'Plain-language definition of the value to extract, including any selection, normalization, unit, or evidence rules.'
            enum:
              type: 'array'
              description: 'Allowed output values. The model must choose one of these values; null is also allowed unless nullable is false.'
            default:
              type:
                - 'string'
                - 'number'
                - 'integer'
                - 'boolean'
                - 'null'
                - 'object'
                - 'array'
              description: 'JSON Schema annotation for a preferred default. extract.ai does not substitute this value when evidence is missing; describe fallback behavior explicitly or allow null.'
            examples:
              title: 'Field examples'
              type:
                - 'array'
                - 'object'
                - 'string'
                - 'number'
                - 'integer'
                - 'boolean'
                - 'null'
              description: 'Field-specific examples. The backward-compatible form is a scalar or list of typical output values. A paired example may instead use input and output, with optional name and notes. Paired examples apply only to this output field; use record_examples for complete output records. Object outputs must include every required non-null nested property.'
              properties:
                name:
                  type: 'string'
                  description: 'Optional label included with this paired field example.'
                notes:
                  type: 'string'
                  description: 'Optional explanatory guidance included with this paired field example.'
                input:
                  description: 'Source value or record for this paired field example. Plain multiline strings remain text; use an explicit object when the runtime input is structured.'
                output:
                  description: 'Expected value for this output field only.'
              items:
                anyOf:
                  - type: 'object'
                    required:
                      - 'input'
                      - 'output'
                    properties:
                      name:
                        type: 'string'
                        description: 'Optional label included with this paired field example.'
                      notes:
                        type: 'string'
                        description: 'Optional explanatory guidance included with this paired field example.'
                      input:
                        description: 'Source value or record for this paired field example. Plain multiline strings remain text; use an explicit object when the runtime input is structured.'
                      output:
                        description: 'Expected value for this output field only.'
                  - description: 'Backward-compatible output-only example value.'
            properties:
              type:
                - 'object'
                - 'array'
                - 'string'
              description: 'Child fields when type is object. Use an object to define a schema for each child. A list or comma-separated string is a shortcut that creates fixed child names. Named child values are non-null by default.'
            required:
              type:
                - 'array'
                - 'string'
              description: 'Named object properties that must be returned. If omitted, every named property is required. Strings may use pipe or comma delimiters.'
            additionalProperties:
              type:
                - 'boolean'
                - 'object'
              description: 'Controls keys beyond properties when type is object. Set false for fixed keys, true for arbitrary values, or provide one schema applied to every dynamic value. Dynamic dictionaries use non-strict provider mode plus local validation. Defaults to false when named properties exist.'
            items:
              type: 'object'
              description: 'Schema applied to every element when this field''s type is array.'
            nullable:
              type: 'boolean'
              description: 'Whether the field may return null. Defaults to true while a top-level field key remains required. Named nested properties default to false. Set this explicitly to override the applicable default.'
    record_examples:
      title: 'Record examples'
      type:
        - 'array'
        - 'object'
      description: 'Whole-record examples. Each example has a separate input value or record and the complete expected output record. Optional name and notes provide model-visible context. Use {name: ..., notes: ..., input: ..., output: ...}. Omitted nullable output fields are completed with null. Required non-null nested properties must be supplied. This differs from examples nested under one output field, which teach only that field.'
      required:
        - 'input'
        - 'output'
      properties:
        name:
          type: 'string'
          description: 'Optional label used to identify this example in the prompt.'
        notes:
          type: 'string'
          description: 'Optional explanatory guidance included with this example.'
        input:
          description: 'Source value or record the example should match.'
        output:
          description: 'Expected result using the field names defined by output.'
      items:
        type: 'object'
        required:
          - 'input'
          - 'output'
        properties:
          name:
            type: 'string'
            description: 'Optional label used to identify this example in the prompt.'
          notes:
            type: 'string'
            description: 'Optional explanatory guidance included with this example.'
          input:
            description: 'Source value or record the example should match.'
          output:
            description: 'Expected result using the field names defined by output.'
    api_key:
      type: 'string'
      description: 'OpenAI API key used for this wrangle, normally supplied through a recipe variable.'
    model:
      type: 'string'
      description: 'OpenAI model ID for this call. If omitted, uses the configured extract.ai default; a saved model definition may supply its own model.'
    threads:
      type: 'integer'
      minimum: 1
      description: 'Maximum number of row-level requests sent in parallel. The configured default is 32.'
    timeout:
      type: 'number'
      exclusiveMinimum: 0
      description: 'Network timeout in seconds for each HTTP attempt. The configured default is 12. Each retry uses the same timeout.'
    retries:
      type: 'integer'
      minimum: 0
      description: 'Number of additional attempts per row after a retryable failure. The configured default is 1. Retry delays are separate from timeout.'
    url:
      type: 'string'
      description: "Override the endpoint for the selected protocol. A chat/completions URL\nselects the legacy protocol only when protocol is omitted; new recipes\nshould use the configured Responses endpoint."
    provider:
      type: 'string'
      description: 'AI service provider. Currently only OpenAI is supported.'
      enum:
        - 'openai'
    protocol:
      type: 'string'
      description: 'OpenAI API protocol. Responses is the configured default and is required for web_search; chat_completions remains available for legacy definitions.'
      enum:
        - 'responses'
        - 'chat_completions'
    store:
      type: 'boolean'
      description: 'Whether OpenAI may store Responses API results. Defaults to true.'
    metadata:
      type: 'object'
      description: 'Labels attached to OpenAI requests, such as recipe_name and wrangles_user. Available recipe name and Wrangles user are added automatically. Explicit labels override those defaults; an empty object disables automatic labels. These appear with stored logs and are separate from model instructions. Up to 16 string pairs; keys may contain up to 64 characters and values up to 512 characters. Does not enable workflow tracing.'
      maxProperties: 16
      propertyNames:
        maxLength: 64
      additionalProperties:
        type: 'string'
        maxLength: 512
    cache:
      type: 'boolean'
      description: 'Reuse identical successful results from the bounded warm-instance cache. Defaults to true. Set false when fresh model or web results are required.'
    cache_ttl:
      type: 'number'
      exclusiveMinimum: 0
      description: 'Maximum age in seconds for a cached result used by this call. Applies to extracted values and web_search_sources together.'
    instructions:
      title: 'General Instructions'
      type:
        - 'string'
        - 'array'
      description: 'General instructions applied to every input row, in addition to any GeneralInstructions in the saved model. Use this for decision rules, evidence priorities, normalization requirements, or other behavior that applies to the complete extraction.'
      items:
        type: 'string'
    model_id:
      type: 'string'
      description: 'ID of a saved extract.ai definition. Use it instead of defining an output schema. When output is also supplied with model_id in a recipe, output names the destination column or columns for the saved fields.'
    strict:
      type: 'boolean'
      description: 'Require OpenAI structured-output strict mode. Defaults to true. Definitions with dynamic dictionary keys automatically switch to non-strict provider mode and are still validated locally.'
    output_format:
      type: 'string'
      description: 'How extracted fields are written. columns writes one dataframe column per field (default); dictionary keeps one object; concatenate joins fields into one string using char.'
      enum:
        - 'dictionary'
        - 'columns'
        - 'concatenate'
    char:
      type: 'string'
      description: 'Separator used only when output_format is concatenate. Defaults to comma-space.'
    reasoning:
      description: 'Reasoning effort, such as none or low, or an object with effort and other reasoning options. Both forms are equivalent for setting effort. Defaults to none for every model. Explicit settings are always sent to the provider; unsupported settings produce a provider error.'
      oneOf:
        - type: 'string'
          enum:
            - 'none'
            - 'minimal'
            - 'low'
            - 'medium'
            - 'high'
            - 'xhigh'
            - 'max'
        - type: 'object'
          properties:
            effort:
              type: 'string'
              description: 'Amount of reasoning work requested from a compatible model.'
              enum:
                - 'none'
                - 'minimal'
                - 'low'
                - 'medium'
                - 'high'
                - 'xhigh'
                - 'max'
    verbosity:
      type: 'string'
      description: 'Responses API text verbosity for compatible models. Defaults to low when supported; ignored with a warning for incompatible models.'
      enum:
        - 'low'
        - 'medium'
        - 'high'
    web_search:
      type: 'boolean'
      description: 'Enable OpenAI Responses web search; the model decides when searching helps. When true, every row also receives web_search_sources: a deduplicated list of {title, url} objects in source order, or an empty list when no source was used. This reserved column is automatic. Requires protocol responses. Defaults to false.'
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: 'upstream-docstring'
schema_adjustments: []
---

# AI

Use AI to extract meaningful structured data. `extract.ai` can be used recipe-first, where the output schema is defined in the recipe, or model-first, where a saved extract.ai model is called by `model_id`.

:::info
For saved extract.ai models, this is the preferred calling pattern compared with using `extract.custom`.
:::

## Migrated examples
#### Making Use of Output Parameters

##### Recipe

```yaml
wrangles:
  - extract.ai:
      api_key: Your OpenAI api key
      input: Product Specs
      output:
        Blade Diameter:
          type: number
          description: The diameter of the blade used, reported in inches.
          default: N/A
          examples:
            - 4.5"
            - 8 inch
        Max. RPM:
          type: number
          description: The maximum rotations per minute (rpm).
          default: 3600
          examples:
            - 3600 max. rpm
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Specs |
| --- |
| 18V Cordless 4.5in angle grinder |
| 120V 12in chop saw 3600 max. rpm |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Blade Diameter | Max. RPM |
| --- | --- |
| 4.5 inches |  |
| 12 inches | 3600 |

</div>

</div>

#### Description Only

##### Recipe

```yaml
wrangles:
  - extract.ai:
      api_key: Your OpenAI api key
      input: Product Specs
      output:
        Blade Diameter: The diameter of the blade used, reported in inches.
        Max. RPM: The maximum rotations per minute (rpm).
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Specs |
| --- |
| 18V Cordless 4.5in angle grinder |
| 120V 12in chop saw 3600 max. rpm |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Blade Diameter | Max. RPM |
| --- | --- |
| 4.5 inches |  |
| 12 inches | 3600 |

</div>

</div>

#### Model Based Column Output by Name

##### Recipe

```yaml
wrangles:
  - extract.ai:
      api_key: Your OpenAI api key
      model_id: xxxx-xxxx-xxxxxxxx
      output:
        - Colors
        - Sizes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Items |
| --- |
| Large yellow square |
| Medium orange triangle |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Colors | Sizes |
| --- | --- |
| [yellow] | Large |
| [orange] | Medium |

</div>

</div>
