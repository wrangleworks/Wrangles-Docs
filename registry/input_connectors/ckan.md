---
schema_version: '0.2'
type: connector
catalog_id: '105'
catalog_key: connector.ckan
catalog_kind: connector
runtime_key: ckan
status: active
title: CKAN
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Read data from CKAN
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
        type: string
        description: The name of the specific file within the dataset. e.g. example.csv
      api_key:
        type: string
        description: API Key for the CKAN site.
  write:
    type: object
    description: Write a file to a dataset in CKAN
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
        type: string
        description: The name of the specific file within the dataset. e.g. example.csv
description: Read data from CKAN
slug: connectors/ckan
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/ckan.md
    title: Existing connector documentation
---

# CKAN

The CKAN connector allows users to read and write data to/from CKAN servers.

### Read
### Recipe
```yaml
read:
  - ckan:
      host: https://data.example.com
      dataset: my-dataset
      file: example.csv
      api_key: my_key
```

### Function
```python
from wrangles.connectors import ckan
df = ckan.read(
    host='https://data.example.com',
    dataset='my-dataset',
    file='example.csv',
    api_key='my_key'
)
```

### Write

### Recipe
```yaml
write:
  - ckan:
      host: https://data.example.com
      api_key: my_key
      dataset: my-dataset
      file: example.csv
```

### Function
```python
from wrangles.connectors import ckan
ckan.write(
    df,
    host='https://data.example.com',
    api_key='my_key',
    dataset='my-dataset',
    file='example.csv'
)
```
