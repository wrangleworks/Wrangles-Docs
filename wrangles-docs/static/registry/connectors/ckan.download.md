---
schema_version: '0.2'
type: connector
catalog_id: '106'
catalog_key: connector.ckan.download
catalog_kind: connector
runtime_key: ckan.download
status: active
title: Ckan Download
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  run:
    type: object
    description: Download data from CKAN and save to the local file system
    required:
      - host
      - dataset
      - file
    properties:
      host:
        type: string
        description: The host name of the CKAN site. e.g. https://data.example.com
      dataset:
        type: string
        description: The name of the dataset. This should be the url version e.g. my-dataset
      file:
        type:
          - string
          - array
        description: A name or list of files within the dataset. e.g. example.csv
      api_key:
        type: string
        description: API Key for the CKAN site.
      output_file:
        type:
          - string
          - array
        description: |
          A name or list of names that the output will be saved as.
          If omitted, defaults to the same as the file.
description: Download data from CKAN and save to the local file system
slug: connectors/ckan.download
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: documentation-search
    resource: https://wrangles.io/python/connectors/ckan/download
    title: >-
      Checked for matching guide; no matching material retrieved. Description derived from pinned
      schema.
---

# Ckan Download

Download data from CKAN and save to the local file system
