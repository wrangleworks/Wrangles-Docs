---
title: "SFTP"
description: "Import a file from an SFTP server"
slug: /connectors/sftp
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# SFTP <CopyableCode value="sftp" />

The sftp connector supports reading and writing CSV, Excel and JSON files to & from an SFTP server.

### Read
### Recipe
```yaml
read:
  - sftp:
      host: sftp.domain
      user: user
      password: password
      file: file.csv

      # Optional
      columns:             # Only import select columns
        - column1
        - column2
      sheet_name: Sheet1   # Used for Excel files
      nrows: 10            # Limit the number of rows
      orient: records      # Used for JSON files - defines the structure
```

### Function
```python
from wrangles.connectors import sftp
df = sftp.read(
    host='sftp.domain',
    user='user',
    password='password',
    file='myfile.csv'
)
```

> The SFTP connector also supports the same optional parameters as the file connector. See the [file connector](/py/connectors/file) for more details.

### Write
### Recipe
```yaml
# Write specific fields
write:
  - sftp:
      host: sftp.domain
      user: user
      password: password
      file: file.csv

      # Optional
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import sftp
sftp.write(
    df,
    host='sftp.domain',
    user='user',
    password='password',
    file='myfile.csv'
)
```

> The SFTP connector also supports the same optional parameters as the file connector. See the [file connector](/py/connectors/file) for more details.

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Import a file from an SFTP server

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | The domain or IP of the SFTP server |
| `user` | Yes | string | The user to connect as |
| `password` | Yes | string | The password for the user |
| `file` | Yes | string | The filename including path on the remote server |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `nrows` | No | integer | Number of rows to read |
| `header` | No | integer | Set the header row number. |
| `sheet_name` | No | string | Used for Excel files. Specify the sheet to read. |
| `orient` | No | string | Used for JSON files. Specifies the input arrangement |
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
  "description": "Import a file from an SFTP server",
  "required": [
    "host",
    "user",
    "password",
    "file"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "The domain or IP of the SFTP server"
    },
    "user": {
      "type": "string",
      "description": "The user to connect as"
    },
    "password": {
      "type": "string",
      "description": "The password for the user"
    },
    "file": {
      "type": "string",
      "description": "The filename including path on the remote server"
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
    },
    "nrows": {
      "type": "integer",
      "description": "Number of rows to read",
      "minimum": 1
    },
    "header": {
      "type": "integer",
      "description": "Set the header row number.",
      "minimum": 0
    },
    "sheet_name": {
      "type": "string",
      "description": "Used for Excel files. Specify the sheet to read."
    },
    "orient": {
      "type": "string",
      "description": "Used for JSON files. Specifies the input arrangement",
      "enum": [
        "split",
        "records",
        "index",
        "columns",
        "values"
      ]
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

Export a file to an SFTP server

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | The domain or IP of the SFTP server |
| `user` | Yes | string | The user to connect as |
| `password` | Yes | string | The password for the user |
| `file` | Yes | string | The filename including path on the remote server |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `sheet_name` | No | string | Used for Excel files. Specify the sheet to create. |
| `orient` | No | string | Used for JSON files. Specifies the output arrangement |
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
  "description": "Export a file to an SFTP server",
  "required": [
    "host",
    "user",
    "password",
    "file"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "The domain or IP of the SFTP server"
    },
    "user": {
      "type": "string",
      "description": "The user to connect as"
    },
    "password": {
      "type": "string",
      "description": "The password for the user"
    },
    "file": {
      "type": "string",
      "description": "The filename including path on the remote server"
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
    },
    "sheet_name": {
      "type": "string",
      "description": "Used for Excel files. Specify the sheet to create."
    },
    "orient": {
      "type": "string",
      "description": "Used for JSON files. Specifies the output arrangement",
      "enum": [
        "split",
        "records",
        "index",
        "columns",
        "values"
      ]
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

[Machine-readable contract](/registry/connectors/sftp.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
