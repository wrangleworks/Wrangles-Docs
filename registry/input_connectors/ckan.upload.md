---
schema_version: '0.2'
type: connector
catalog_id: '107'
catalog_key: connector.ckan.upload
catalog_kind: connector
runtime_key: ckan.upload
status: active
title: Ckan Upload
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  run:
    type: object
    description: Upload a file or list of files to a CKAN dataset
    required:
      - host
      - api_key
      - dataset
      - file
    properties:
      host:
        type: string
        description: The host name of the CKAN site. e.g. https://data.example.com
      api_key:
        type: string
        description: API Key for the CKAN site.
      dataset:
        type: string
        description: The name of the dataset. This should be the url version e.g. my-dataset
      file:
        type:
          - string
          - array
        description: The name of the specific file within the dataset. e.g. example.csv
      output_file:
        type:
          - string
          - array
        description: |
          A name or list of names that the files will be saved as.
          If omitted, defaults to the original filename.
description: Upload a file or list of files to a CKAN dataset
slug: connectors/ckan.upload
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: documentation-search
    resource: https://wrangles.io/python/connectors/ckan/upload
    title: >-
      Checked for matching guide; no matching material retrieved. Description derived from pinned
      schema.
---

# Ckan Upload

Upload a file or list of files to a CKAN dataset
