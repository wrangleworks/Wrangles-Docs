---
title: "DuckDB"
description: "Import data from a DuckDB Database"
slug: /connectors/duckdb
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# DuckDB <CopyableCode value="duckdb" />

Import data from a DuckDB Database

## Parameters

### Read

Import data from a DuckDB Database

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `database` | Yes | string | The database to connect to including the file path. Use ':memory:' for an in-memory database. |
| `command` | Yes | string | SQL command to select data. Note - using variables here can make your recipe vulnerable to sql injection. Use params if using variables from untrusted sources. |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `params` | No | array / object | Variables to pass to a parameterized query. |
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
  "description": "Import data from a DuckDB Database",
  "required": [
    "database",
    "command"
  ],
  "properties": {
    "database": {
      "type": "string",
      "description": "The database to connect to including the file path. Use ':memory:' for an in-memory database."
    },
    "command": {
      "type": "string",
      "description": "SQL command to select data.\nNote - using variables here can make your recipe vulnerable\nto sql injection. Use params if using variables from\nuntrusted sources."
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
    },
    "params": {
      "type": [
        "array",
        "object"
      ],
      "description": "Variables to pass to a parameterized query."
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

Run a command against a DuckDB Database

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `database` | Yes | string | The database to connect to including the file path. Use ':memory:' for an in-memory database. |
| `command` | Yes | string / array | SQL command or a list of SQL commands to execute |
| `params` | No | array / object | Variables to pass to a parameterized query. |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Run a command against a DuckDB Database",
  "required": [
    "database",
    "command"
  ],
  "properties": {
    "database": {
      "type": "string",
      "description": "The database to connect to including the file path. Use ':memory:' for an in-memory database."
    },
    "command": {
      "type": [
        "string",
        "array"
      ],
      "description": "SQL command or a list of SQL commands to execute"
    },
    "params": {
      "type": [
        "array",
        "object"
      ],
      "description": "Variables to pass to a parameterized query."
    },
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

### Write

Export data to a DuckDB Database

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `database` | Yes | string | The database to connect to including the file path. Use ':memory:' for an in-memory database. |
| `table` | Yes | string | The table to write to |
| `action` | No | string | INSERT appends, REPLACE recreates the table, FAIL errors if the table exists. Defaults to INSERT. |
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
  "description": "Export data to a DuckDB Database",
  "required": [
    "database",
    "table"
  ],
  "properties": {
    "database": {
      "type": "string",
      "description": "The database to connect to including the file path. Use ':memory:' for an in-memory database."
    },
    "table": {
      "type": "string",
      "description": "The table to write to"
    },
    "action": {
      "type": "string",
      "description": "INSERT appends, REPLACE recreates the table, FAIL errors if the table exists. Defaults to INSERT.",
      "enum": [
        "INSERT",
        "REPLACE",
        "FAIL"
      ]
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

[Machine-readable contract](/registry/connectors/duckdb.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
