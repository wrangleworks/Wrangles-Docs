---
schema_version: '0.2'
type: connector
catalog_id: '128'
catalog_key: connector.pricefx
catalog_kind: connector
runtime_key: pricefx
status: active
title: Pricefx
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Import data from a PriceFx instance.
    required:
      - host
      - partition
      - target
      - user
      - password
    properties:
      host:
        type: string
        description: Hostname e.g. example.pricefx.com
      partition:
        type: string
        description: Partition
      user:
        type: string
        description: The user to connect as
      password:
        type: string
        description: Password for the specified user
      target:
        type: string
        description: >-
          Type of Data. Products, Customers, Data Source, etc. For Data Sources or Product/Customer
          Extensions a source must also be provided.
        enum:
          - Products
          - Product Extensions
          - Customers
          - Customer Extensions
          - Data Source
      columns:
        type: array
        description: Specify which columns to include
      source:
        type: string
        description: If the data type is a Data Source or Extension, set the specific table.
      batch_size:
        type: integer
        description: >-
          Queries are broken into batches for large data sets. Set the size of the batch. If you're
          having trouble with timeouts, try reducing this. Default 10,000.
      critera:
        type: array
        description: Filter the returned data set.
  write:
    type: object
    description: >-
      Write data to a PriceFx instance. The names of the columns must match to the names within
      PriceFx.
    required:
      - host
      - partition
      - target
      - user
      - password
    properties:
      host:
        type: string
        description: Hostname e.g. example.pricefx.com
      partition:
        type: string
        description: Partition
      user:
        type: string
        description: The user to connect as
      password:
        type: string
        description: Password for the specified user
      target:
        type: string
        description: Target for the data. Products, Customers, Data Source, etc.
        enum:
          - Company Parameters
          - Customers
          - Customer Extensions
          - Data Source
          - Products
          - Product Extensions
          - Product References
          - Product Competition
      columns:
        type: array
        description: A list of the columns to write to the table.
      source:
        type: string
        description: Required for Data Sources. Set the specific table.
      autoflush:
        type: boolean
        description: >-
          Only relevant for Data Sources. If true, automatically trigger a flush after writing the
          data to a Data Source. Default True.
description: Import data from a PriceFx instance.
slug: connectors/pricefx
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/pricefx.md
    title: Existing connector documentation
---

# Pricefx

> Added **v0.5**

The PriceFx connector supports reading and writing to/from a PriceFx instance. Product and Customer master/extension tables, data sources, and Company Parameters are supported.

### Read
### Recipe
```yaml
read:
  - pricefx:
      host: domain.pricefx.com
      partition: partition
      user: user
      password: password
      target: Products

      # Optional
      columns:
        - Product Id
        - Product Name
      source: dataSource # Required for Data Sources or Product/Customer Extensions
      criteria:
        - fieldName: ColumnName
          operator: equals
          value: A Value
```

### Function
```python
from wrangles.connectors import pricefx
df = pricefx.read(
    host='example.pricefx.com',
    partition='partition',
    target='Products',
    user='user',
    password='password'
)
```

### Write
> The column names must match the target column names. For master tables either names (e.g. attribute3) or labels may be used.

> For Product/Customer extensions, a column called 'name' with the name of the Extension must be included.

### Recipe
```yaml
write:
  - pricefx:
      host: domain.pricefx.com
      partition: partition
      user: user
      password: password
      target: Products

      # Optional
      columns:
        - sku
        - Product Name
        - currency
      source: table # Required for Data Sources
```

### Function
```python
from wrangles.connectors import pricefx
pricefx.write(
    df,
    host='example.pricefx.com',
    partition='partition',
    target='Products',
    user='user',
    password='password'
)
```
