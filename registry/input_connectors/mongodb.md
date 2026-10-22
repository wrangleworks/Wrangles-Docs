---
schema_version: '0.2'
type: connector
catalog_id: '120'
catalog_key: connector.mongodb
catalog_kind: connector
runtime_key: mongodb
status: active
title: MongoDB
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Import data from a mongoDB Server
    required:
      - user
      - password
      - database
      - collection
      - host
      - query
    properties:
      user:
        type: string
        description: User with access to the database
      password:
        type: string
        description: Password of user
      database:
        type: string
        description: Database to be queried
      host:
        type: string
        description: mongoDB cluster-url
      query:
        type: string
        description: mongoDB query
      projection:
        type: string
        description: Select which fields to include
  write:
    type: object
    description: Write data into a mongoDB database
    required:
      - user
      - password
      - database
      - collection
      - host
      - action
    properties:
      user:
        type: string
        description: User with access to the database
      password:
        type: string
        description: Password of user
      database:
        type: string
        description: Database to be queried
      host:
        type: string
        description: mongoDB cluster-url
      action:
        type: string
        description: action to perform, actions supported INSERT UPDATE
      query:
        type: object
        description: >-
          mongoDB query to search for value to update or delete, only valid when using UPDATE,
          DELETE
      update:
        type: object
        description: mongoDB query value to update, only valid when using UPDATE
description: Import data from a mongoDB Server
slug: connectors/mongodb
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/mongodb.md
    title: Existing connector documentation
---

# MongoDB

The MongoDB connector supports read and writing to/from a collection.

### Read
### Recipe
```yaml
read:
  - mongodb:
      user: user
      password: password
      database: database
      collection: collection
      host: host			# mongoDB cluster-url
      query: query

      # Optional
      projection: projection
```

### Function
```python
from wrangles.connectors import mongodb
df = mongodb.read(
      user='user',
      password='password',
      database='db',
      collection='products',
      host='cluster123.mongodb.net',
      query='{"name": "WrWx"}',
      projection='{"_id": 0, "name": 1}'
)
```

### Write
### Recipe
```yaml
write:
  - mongodb:
      user: user
      password: password
      database: database_write
      collection: collection_write
      host: host    # mongoDB cluster-url
      action: action

      # Optional
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import mongodb
mongodb.write(
      df,
      user='user',
      password='password',
      database='db',
      collection='products',
      host='cluster123.mongodb.net',
      action='INSERT',
)
```
