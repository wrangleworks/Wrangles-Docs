---
title: "SQLite"
description: "Import data from a SQLite Database"
slug: /connectors/sqlite
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# SQLite <CopyableCode value="sqlite" />

The sqlite connector supports read and writing to/from a sqlite database.

### Read
Import data from a SQLite Database

### Recipe
```yaml
read:
  - sqlite:
      database: './tests/test.db'
      command: SELECT * from my_table
```

### Function
```python
from wrangles.connectors import sqlite
df = sqlite.read(
    database = './tests/test.db',
    command = 'SELECT * from my_table'
)
```

### Write
Export data to a SQLite Database

### Recipe
```yaml
write:
  - sqlite:
      database: './sample/fake.db'
      table: my_table
```

### Function
```python
from wrangles.connectors import sqlite
sqlite.write(
    df = df,
    database = './sample/fake.db',
    table = 'my_table'
)
```

### Run
Run a command on a SQLite Database.

### Recipe
```yaml
run:
  on_start:
    - sqlite:
        database: './sample/my_db.db'
        command: CREATE TABLE test_table_copy AS SELECT * FROM test_table
```

### Function
```python
from wrangles.connectors import sqlite
sqlite.run(
    database = './temp/fake.db',
    command = 'CREATE TABLE test_table_copy AS SELECT * FROM test_table'
)
```

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Import data from a SQLite Database

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `database` | Yes | string | The database to connect to including the file path. e.g. directory/database.db |
| `command` | Yes | string | Table name or SQL command to select data. Note - using variables here can make your recipe vulnerable to sql injection. Use params if using variables from untrusted sources. |
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
  "description": "Import data from a SQLite Database",
  "required": [
    "database",
    "command"
  ],
  "properties": {
    "database": {
      "type": "string",
      "description": "The database to connect to including the file path. e.g. directory/database.db"
    },
    "command": {
      "type": "string",
      "description": "Table name or SQL command to select data.\nNote - using variables here can make your recipe vulnerable\nto sql injection. Use params if using variables from\nuntrusted sources."
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

### Run

Run a command against a SQLite Database

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `database` | Yes | string | The database to connect to including the file path. e.g. directory/database.db |
| `command` | Yes | string / array | SQL command or a list of SQL commands to execute |
| `params` | No | array / object | Variables to pass to a parameterized query. This may use %s or %(name)s syntax |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Run a command against a SQLite Database",
  "required": [
    "database",
    "command"
  ],
  "properties": {
    "database": {
      "type": "string",
      "description": "The database to connect to including the file path. e.g. directory/database.db"
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

Export data to a SQLite Database

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `database` | Yes | string | The database to connect to including the file path. e.g. directory/database.db |
| `table` | Yes | string | The table to write to |
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
  "description": "Export data to a SQLite Database",
  "required": [
    "database",
    "table"
  ],
  "properties": {
    "database": {
      "type": "string",
      "description": "The database to connect to including the file path. e.g. directory/database.db"
    },
    "table": {
      "type": "string",
      "description": "The table to write to"
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

[Machine-readable contract](/registry/connectors/sqlite.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
