---
title: "MongoDB"
description: "Import data from a mongoDB Server"
slug: /connectors/mongodb
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# MongoDB <CopyableCode value="mongodb" />

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

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Import data from a mongoDB Server

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `user` | Yes | string | User with access to the database |
| `password` | Yes | string | Password of user |
| `database` | Yes | string | Database to be queried |
| `host` | Yes | string | mongoDB cluster-url |
| `query` | Yes | string | mongoDB query |
| `projection` | No | string | Select which fields to include |
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
  "description": "Import data from a mongoDB Server",
  "required": [
    "user",
    "password",
    "database",
    "collection",
    "host",
    "query"
  ],
  "properties": {
    "user": {
      "type": "string",
      "description": "User with access to the database"
    },
    "password": {
      "type": "string",
      "description": "Password of user"
    },
    "database": {
      "type": "string",
      "description": "Database to be queried"
    },
    "host": {
      "type": "string",
      "description": "mongoDB cluster-url"
    },
    "query": {
      "type": "string",
      "description": "mongoDB query"
    },
    "projection": {
      "type": "string",
      "description": "Select which fields to include"
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

Write data into a mongoDB database

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `user` | Yes | string | User with access to the database |
| `password` | Yes | string | Password of user |
| `database` | Yes | string | Database to be queried |
| `host` | Yes | string | mongoDB cluster-url |
| `action` | Yes | string | action to perform, actions supported INSERT UPDATE |
| `query` | No | object | mongoDB query to search for value to update or delete, only valid when using UPDATE, DELETE |
| `update` | No | object | mongoDB query value to update, only valid when using UPDATE |
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
  "description": "Write data into a mongoDB database",
  "required": [
    "user",
    "password",
    "database",
    "collection",
    "host",
    "action"
  ],
  "properties": {
    "user": {
      "type": "string",
      "description": "User with access to the database"
    },
    "password": {
      "type": "string",
      "description": "Password of user"
    },
    "database": {
      "type": "string",
      "description": "Database to be queried"
    },
    "host": {
      "type": "string",
      "description": "mongoDB cluster-url"
    },
    "action": {
      "type": "string",
      "description": "action to perform, actions supported INSERT UPDATE"
    },
    "query": {
      "type": "object",
      "description": "mongoDB query to search for value to update or delete, only valid when using UPDATE, DELETE"
    },
    "update": {
      "type": "object",
      "description": "mongoDB query value to update, only valid when using UPDATE"
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

[Machine-readable contract](/registry/connectors/mongodb.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
