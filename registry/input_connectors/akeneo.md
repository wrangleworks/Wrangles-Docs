---
schema_version: '0.2'
type: connector
catalog_id: '104'
catalog_key: connector.akeneo
catalog_kind: connector
runtime_key: akeneo
status: active
title: Akeneo
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Read data from an Akeneo PIM
    required:
      - host
      - user
      - password
      - client_id
      - client_secret
      - source
    properties:
      host:
        type: string
        description: |
          Hostname of the Akeneo PIM instance
          e.g. https://akeneo.example.com
      user:
        type: string
        description: User with access to read the data
      password:
        type: string
        description: Password for the user
      client_id:
        type: string
        description: |
          Client ID. These need to be generated in the PIM.
          See https://api.akeneo.com/documentation/authentication.html
      client_secret:
        type: string
        description: Client Secret
      source:
        type: string
        description: Type of data to return
        enum:
          - products
          - products-uuid
          - product-models
          - media-files
          - published-products
          - families
          - attributes
          - attribute-groups
          - association-types
          - categories
          - channels
          - locales
          - currencies
          - measure-families
          - measurement-families
          - reference-entities
          - reference-entities-media-files
          - asset-families
          - asset-media-files
      columns:
        type: array
        description: Specify which columns to return
      parameters:
        type: object
        description: |
          Set parameters for the query such as filtering the results.
          See the Akeneo query parameters for specifics.
          e.g. https://api.akeneo.com/api-reference.html#get_products for products.
  write:
    type: object
    description: Write data into an Akeneo PIM
    required:
      - host
      - user
      - password
      - client_id
      - client_secret
      - source
    properties:
      host:
        type: string
        description: |
          Hostname of the Akeneo PIM instance
          e.g. https://akeneo.example.com
      user:
        type: string
        description: User with access to write the data
      password:
        type: string
        description: Password for the user
      client_id:
        type: string
        description: |
          Client ID. These need to be generated in the PIM.
          See https://api.akeneo.com/documentation/authentication.html
      client_secret:
        type: string
        description: Client Secret
      source:
        type: string
        description: Type of data to write
        enum:
          - products
          - products-uuid
          - product-models
          - families
          - attributes
          - attribute-groups
          - association-types
          - categories
          - channels
          - measurement-families
description: Read data from an Akeneo PIM
slug: connectors/akeneo
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/akeneo.md
    title: Existing connector documentation
---

# Akeneo

> Added **v0.6**

The Akeneo connector supports write to a PIM product list

### Write
### Recipe
```yaml
write:
  - akeneo:
      host: https://akeneo.example.com
      user: user
      password: password
      client_id: client_id
      client_secret: client_secret
      source: products
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import akeneo
akeneo.write(
      df,
      user='user',
      password='password',
      host='https://akeneo.example.com',
      client_id='client_id',
      client_secret='client_secret',
      source='products',
)
```
