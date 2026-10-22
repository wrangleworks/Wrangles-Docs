---
title: "PostgreSQL"
description: "Import data from a PostgreSQL Server"
slug: /connectors/postgres
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# PostgreSQL <CopyableCode value="postgres" />

The postgres connector supports reading and writing to/from a PostgreSQL server.

### Read
### Recipe
```yaml
read:
  - postgres:
      host: sql.domain
      user: user
      password: password
      command: |
        SELECT *
        FROM table

      # Optional
      port: 5432
      database: database
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import postgres
df = postgres.read(
      host = 'sql.domain',
      user = 'user',
      password = 'password',
      command = 'SELECT * FROM table'
)
```

### Write

### Recipe
```yaml
write:
  - postgres:
      host: sql.domain
      database: database
      table: table
      user: user
      password: password

      # Optional
      port: 5432
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import postgres
postgres.write(
    df,
    host = 'sql.domain',
    database = 'database',
    table = 'table',
    user = 'user',
    password = 'password'
)
```

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Import data from a PostgreSQL Server

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | Hostname or IP address of the server |
| `user` | Yes | string | The user to connect to the database with |
| `password` | Yes | string | Password for the specified user |
| `command` | Yes | string | Table name or SQL command to select data. Note - using variables here can make your recipe vulnerable to sql injection. Use params for variables from untrusted sources. |
| `database` | No | string | The database to connect to |
| `port` | No | integer | The Port to connect to. Defaults to 5432. |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `params` | No | array / object | List of parameters to pass to execute method. This may use %s or %(name)s syntax |
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
  "description": "Import data from a PostgreSQL Server",
  "required": [
    "host",
    "user",
    "password",
    "command"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "Hostname or IP address of the server"
    },
    "user": {
      "type": "string",
      "description": "The user to connect to the database with"
    },
    "password": {
      "type": "string",
      "description": "Password for the specified user"
    },
    "command": {
      "type": "string",
      "description": "Table name or SQL command to select data.\nNote - using variables here can make your recipe vulnerable\nto sql injection. Use params for variables from\nuntrusted sources."
    },
    "database": {
      "type": "string",
      "description": "The database to connect to"
    },
    "port": {
      "type": "integer",
      "description": "The Port to connect to. Defaults to 5432."
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
    },
    "params": {
      "type": [
        "array",
        "object"
      ],
      "description": "List of parameters to pass to execute method.\nThis may use %s or %(name)s syntax"
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

### Run

Run a command against a PostgreSQL Server such as triggering a query or stored procedure

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | Hostname or IP address of the server |
| `database` | Yes | string | The name of the database to execute the query against |
| `user` | Yes | string | The user to connect to the server as |
| `password` | Yes | string | Password for the specified user |
| `command` | Yes | string / array | SQL command or a list of SQL commands to execute |
| `port` | No | integer | The Port to connect to. Defaults to 5432. |
| `params` | No | array / object | Variables to pass to a parameterized query. This may use %s or %(name)s syntax |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Run a command against a PostgreSQL Server such as triggering a query or stored procedure",
  "required": [
    "host",
    "database",
    "user",
    "password",
    "command"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "Hostname or IP address of the server"
    },
    "database": {
      "type": "string",
      "description": "The name of the database to execute the query against"
    },
    "user": {
      "type": "string",
      "description": "The user to connect to the server as"
    },
    "password": {
      "type": "string",
      "description": "Password for the specified user"
    },
    "command": {
      "type": [
        "string",
        "array"
      ],
      "description": "SQL command or a list of SQL commands to execute"
    },
    "port": {
      "type": "integer",
      "description": "The Port to connect to. Defaults to 5432."
    },
    "params": {
      "type": [
        "array",
        "object"
      ],
      "description": "Variables to pass to a parameterized query.\nThis may use %s or %(name)s syntax"
    },
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

### Write

Write data to a PostgreSQL Server

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | Hostname or IP address of the server |
| `user` | Yes | string | The user to connect to the database with |
| `password` | Yes | string | Password for the specified user |
| `database` | Yes | string | The database to connect to |
| `table` | Yes | string | The name of the table to insert the data into |
| `port` | No | integer | The Port to connect to. Defaults to 5432. |
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
  "description": "Write data to a PostgreSQL Server",
  "required": [
    "host",
    "user",
    "password",
    "database",
    "table"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "Hostname or IP address of the server"
    },
    "user": {
      "type": "string",
      "description": "The user to connect to the database with"
    },
    "password": {
      "type": "string",
      "description": "Password for the specified user"
    },
    "database": {
      "type": "string",
      "description": "The database to connect to"
    },
    "table": {
      "type": "string",
      "description": "The name of the table to insert the data into"
    },
    "port": {
      "type": "integer",
      "description": "The Port to connect to. Defaults to 5432."
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

[Machine-readable contract](/registry/connectors/postgres.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
