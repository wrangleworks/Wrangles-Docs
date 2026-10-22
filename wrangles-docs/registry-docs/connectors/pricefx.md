---
title: "Pricefx"
description: "Import data from a PriceFx instance."
slug: /connectors/pricefx
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Pricefx <CopyableCode value="pricefx" />

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

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Import data from a PriceFx instance.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | Hostname e.g. example.pricefx.com |
| `partition` | Yes | string | Partition |
| `user` | Yes | string | The user to connect as |
| `password` | Yes | string | Password for the specified user |
| `target` | Yes | string | Type of Data. Products, Customers, Data Source, etc. For Data Sources or Product/Customer Extensions a source must also be provided. |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `source` | No | string | If the data type is a Data Source or Extension, set the specific table. |
| `batch_size` | No | integer | Queries are broken into batches for large data sets. Set the size of the batch. If you're having trouble with timeouts, try reducing this. Default 10,000. |
| `critera` | No | array | Filter the returned data set. |
| `not_columns` | No | array / integer / string | Specify a subset of the columns to ignore. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `order_by` | No | string | Order the data by one or more columns. Use a comma to separate multiple columns. Use DESC to sort in descending order. Example: column1 DESC, column2 Columns with spaces should be enclosed in double quotes. |
| `where` | No | string | Filter the data to include using an equivalent to a SQL where criteria, such as column1 = 123 OR column2 = 'a' |
| `where_params` | No | array / object | Variables to use in conjunctions with where. This allows the query to be parameterized. This uses sqlite syntax (? or :name) |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. Additional variables 'columns', 'row_count', 'column_count' and 'df' (the entire dataframe) are available. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Import data from a PriceFx instance.",
  "required": [
    "host",
    "partition",
    "target",
    "user",
    "password"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "Hostname e.g. example.pricefx.com"
    },
    "partition": {
      "type": "string",
      "description": "Partition"
    },
    "user": {
      "type": "string",
      "description": "The user to connect as"
    },
    "password": {
      "type": "string",
      "description": "Password for the specified user"
    },
    "target": {
      "type": "string",
      "description": "Type of Data. Products, Customers, Data Source, etc. For Data Sources or Product/Customer Extensions a source must also be provided.",
      "enum": [
        "Products",
        "Product Extensions",
        "Customers",
        "Customer Extensions",
        "Data Source"
      ]
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
    },
    "source": {
      "type": "string",
      "description": "If the data type is a Data Source or Extension, set the specific table."
    },
    "batch_size": {
      "type": "integer",
      "description": "Queries are broken into batches for large data sets. Set the size of the batch. If you're having trouble with timeouts, try reducing this. Default 10,000."
    },
    "critera": {
      "type": "array",
      "description": "Filter the returned data set."
    },
    "not_columns": {
      "$ref": "#/$defs/write/commonProperties/not_columns"
    },
    "where": {
      "$ref": "#/$defs/write/commonProperties/where"
    },
    "where_params": {
      "$ref": "#/$defs/write/commonProperties/where_params"
    },
    "order_by": {
      "$ref": "#/$defs/write/commonProperties/order_by"
    },
    "if": {
      "$ref": "#/$defs/write/commonProperties/if"
    }
  }
}
```

</details>

### Write

Write data to a PriceFx instance. The names of the columns must match to the names within PriceFx.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | Hostname e.g. example.pricefx.com |
| `partition` | Yes | string | Partition |
| `user` | Yes | string | The user to connect as |
| `password` | Yes | string | Password for the specified user |
| `target` | Yes | string | Target for the data. Products, Customers, Data Source, etc. |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `source` | No | string | Required for Data Sources. Set the specific table. |
| `autoflush` | No | boolean | Only relevant for Data Sources. If true, automatically trigger a flush after writing the data to a Data Source. Default True. |
| `not_columns` | No | array / integer / string | Specify a subset of the columns to ignore. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `order_by` | No | string | Order the data by one or more columns. Use a comma to separate multiple columns. Use DESC to sort in descending order. Example: column1 DESC, column2 Columns with spaces should be enclosed in double quotes. |
| `where` | No | string | Filter the data to include using an equivalent to a SQL where criteria, such as column1 = 123 OR column2 = 'a' |
| `where_params` | No | array / object | Variables to use in conjunctions with where. This allows the query to be parameterized. This uses sqlite syntax (? or :name) |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. Additional variables 'columns', 'row_count', 'column_count' and 'df' (the entire dataframe) are available. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Write data to a PriceFx instance. The names of the columns must match to the names within PriceFx.",
  "required": [
    "host",
    "partition",
    "target",
    "user",
    "password"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "Hostname e.g. example.pricefx.com"
    },
    "partition": {
      "type": "string",
      "description": "Partition"
    },
    "user": {
      "type": "string",
      "description": "The user to connect as"
    },
    "password": {
      "type": "string",
      "description": "Password for the specified user"
    },
    "target": {
      "type": "string",
      "description": "Target for the data. Products, Customers, Data Source, etc.",
      "enum": [
        "Company Parameters",
        "Customers",
        "Customer Extensions",
        "Data Source",
        "Products",
        "Product Extensions",
        "Product References",
        "Product Competition"
      ]
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
    },
    "source": {
      "type": "string",
      "description": "Required for Data Sources. Set the specific table."
    },
    "autoflush": {
      "type": "boolean",
      "description": "Only relevant for Data Sources. If true, automatically trigger a flush after writing the data to a Data Source. Default True."
    },
    "not_columns": {
      "$ref": "#/$defs/write/commonProperties/not_columns"
    },
    "where": {
      "$ref": "#/$defs/write/commonProperties/where"
    },
    "where_params": {
      "$ref": "#/$defs/write/commonProperties/where_params"
    },
    "order_by": {
      "$ref": "#/$defs/write/commonProperties/order_by"
    },
    "if": {
      "$ref": "#/$defs/write/commonProperties/if"
    }
  }
}
```

</details>

</details>

[Machine-readable contract](/registry/connectors/pricefx.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
