---
title: "Pricefx"
slug: /python/connectors/pricefx
---

> Added **v0.5**
\{.is-info\}


The PriceFx connector supports reading and writing to/from a PriceFx instance. Product and Customer master/extension tables, data sources, and Company Parameters are supported.


# Tabset \{.tabset\}
## Read
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

### Parameters
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| host | ✓ | str | Hostname of the server. |
| partition | ✓ | str | PriceFx partition. |
| user | ✓ | str | The user to connect as. |
| password | ✓ | str | Password for the specified user. |
| target | ✓ | Products / Product Extensions / Customers / Customer Extensions / Data Source | The type of data. For Data Sources or Product/Customer Extensions a source must also be provided. |
| columns | | list | Specify which columns to include. |
| source | | str | If the data type is a Data Source or Extension, set the specific table. |
| criteria | | dict | Filter the returned data set. |
| batch_size | | int | Queries are broken into batches for large data sets. Set the size of the batch. If you're having trouble with timeouts, try reducing this. Default 10,000. |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

## Write
> The column names must match the target column names. For master tables either names (e.g. attribute3) or labels may be used.
\{.is-info\}

> For Product/Customer extensions, a column called 'name' with the name of the Extension must be included.
\{.is-info\}

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

### Parameters
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame | Function only. DataFrame of contents to write to the server. Columns must match the target schema. |
| host | ✓ | str | Hostname of the server. |
| partition | ✓ | str | PriceFx partition. |
| user | ✓ | str | The user to connect as. |
| password | ✓ | str | Password for the specified user. |
| target | ✓ | Products / Product Extensions / Customers / Customer Extensions / Data Source | The type of data. For Data Sources or Product/Customer Extensions a source must also be provided. |
| columns | | list | Specify which columns to include. |
| source | | str | Required for Data Sources. Set the specific table. |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |