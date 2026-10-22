---
schema_version: '0.2'
type: connector
catalog_id: '143'
catalog_key: connector.train.meta_data
catalog_kind: connector
runtime_key: train.meta_data
status: active
title: Train Meta Data
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: |
      Read the metadata for a Wrangle model.
      Returns a DataFrame with the following columns:
          - id
          - name
          - type
          - purpose
          - status
          - path
          - batch_size
          - tags
          - notes
          - created_by
          - date_created
          - modified_by
          - date_modified
          - variant
          - settings
    additionalProperties: false
    required:
      - model_id
    properties:
      model_id:
        type: string
        description: Specific model to read
  write:
    type: object
    description: |
      Update the metadata for a Wrangle model.
      The following fields can be updated:
          - name
          - batch_size
          - tags
          - notes
          - settings
    additionalProperties: false
    required:
      - model_id
    properties:
      model_id:
        type: string
        description: Model to update
description: |-
  Read the metadata for a Wrangle model.
  Returns a DataFrame with the following columns:
      - id
      - name
      - type
      - purpose
      - status
      - path
      - batch_size
      - tags
      - notes
      - created_by
      - date_created
      - modified_by
      - date_modified
      - variant
      - settings
slug: connectors/train.meta_data
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: documentation-search
    resource: https://wrangles.io/python/connectors/train/meta_data
    title: >-
      Checked for matching guide; no matching material retrieved. Description derived from pinned
      schema.
---

# Train Meta Data

Read the metadata for a Wrangle model.
Returns a DataFrame with the following columns:
    - id
    - name
    - type
    - purpose
    - status
    - path
    - batch_size
    - tags
    - notes
    - created_by
    - date_created
    - modified_by
    - date_modified
    - variant
    - settings
