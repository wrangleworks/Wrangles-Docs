---
schema_version: '0.2'
type: connector
catalog_id: '133'
catalog_key: connector.salesforce
catalog_kind: connector
runtime_key: salesforce
status: active
title: Salesforce
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Import data from Salesforce
    required:
      - instance
      - user
      - password
      - token
      - object
      - command
    properties:
      instance:
        type: string
        description: The salesforce instance to read from. e.g. <custom>.my.salesforce.com
      user:
        type: string
        description: User with read permission
      password:
        type: string
        description: Password for the user
      token:
        type: string
        description: Security token for the user
      object:
        type: string
        description: Object to read data from e.g. Contact
      command:
        type: string
        description: SOQL query
      columns:
        type: array
        description: Subset of the columns to select
      params:
        type: object
        description: >-
          (Optional) Parameters to be used in the SOQL query Use {my_key} in the command to insert a
          parameter.
      domain:
        type: string
        description: (Optional) Use test to connect to a sandbox instance.
  write:
    type: object
    description: Write data to Salesforce
    required:
      - instance
      - user
      - password
      - token
      - object
      - id
    properties:
      instance:
        type: string
        description: The salesforce instance to write to e.g. <custom>.my.salesforce.com
      user:
        type: string
        description: User with write permission
      password:
        type: string
        description: Password for the user
      token:
        type: string
        description: Security token for the user
      object:
        type: string
        description: Object to write the data to e.g. Contact
      id:
        type: string
        description: >-
          Indicate the Id field. If the Id exists and is provided, the record will be updated,
          otherwise inserted.
      columns:
        type: array
        description: (Optional) A subset of the columns to be written
      domain:
        type: string
        description: (Optional) Use test to connect to a sandbox instance
description: Import data from Salesforce
slug: connectors/salesforce
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/salesforce.md
    title: Existing connector documentation
---

# Salesforce

> Added **v0.5**

The salesforce connector supports reading and writing to/from Salesforce using [SOQL](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm).

### Read
### Recipe
```yaml
read:
  - salesforce:
      instance: sf.domain
      user: user
      password: password
      token: token
      object: Contact
      command: |
        SELECT Id, Email, Name
        FROM Contact
```

### Function
```python
from wrangles.connectors import salesforce
df = salesforce.read(
    instance='sf.domain',
    object='object',
    user='user',
    password='password',
    token='token',
    command='SELECT Id, Name FROM Contact'
)
```

### Write

### Recipe
```yaml
write:
  - salesforce:
      instance: sf.domain
      user: user
      password: password
      token: token
      object: Contact
      id: Id
```

### Function
```python
from wrangles.connectors import salesforce
salesforce.write(
    df,
    instance='sf.domain',
    user='user',
    password='password',
    token='token',
    object='Contact',
    id='Id'
)
```
