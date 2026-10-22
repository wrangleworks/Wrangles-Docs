---
title: "CKAN"
description: "Read data from CKAN"
slug: /connectors/ckan
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# CKAN <CopyableCode value="ckan" />

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

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Read data from CKAN

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | The host name of the CKAN site. e.g. https://data.example.com |
| `dataset` | Yes | string | The name of the dataset. This should be the url version e.g. my-dataset |
| `file` | Yes | string | The name of the specific file within the dataset. e.g. example.csv |
| `api_key` | No | string | API Key for the CKAN site. |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
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
  "description": "Read data from CKAN",
  "required": [
    "host",
    "dataset",
    "file"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "The host name of the CKAN site. e.g. https://data.example.com"
    },
    "dataset": {
      "type": "string",
      "description": "The name of the dataset. This should be the url version e.g. my-dataset"
    },
    "file": {
      "type": "string",
      "description": "The name of the specific file within the dataset. e.g. example.csv"
    },
    "api_key": {
      "type": "string",
      "description": "API Key for the CKAN site."
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
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

Write a file to a dataset in CKAN

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | The host name of the CKAN site. e.g. https://data.example.com |
| `api_key` | Yes | string | API Key for the CKAN site. |
| `dataset` | Yes | string | The name of the dataset. This should be the url version e.g. my-dataset |
| `file` | Yes | string | The name of the specific file within the dataset. e.g. example.csv |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
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
  "description": "Write a file to a dataset in CKAN",
  "required": [
    "host",
    "api_key",
    "dataset",
    "file"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "The host name of the CKAN site. e.g. https://data.example.com"
    },
    "api_key": {
      "type": "string",
      "description": "API Key for the CKAN site."
    },
    "dataset": {
      "type": "string",
      "description": "The name of the dataset. This should be the url version e.g. my-dataset"
    },
    "file": {
      "type": "string",
      "description": "The name of the specific file within the dataset. e.g. example.csv"
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
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

[Machine-readable contract](/registry/connectors/ckan.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
