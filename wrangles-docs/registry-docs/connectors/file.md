---
title: "File"
description: "Import a file"
slug: /connectors/file
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# File <CopyableCode value="file" />

The file connector supports CSV, Excel and JSON files.

### Read
### Recipe
```yaml
read:
  - file:
      name: file.csv

      # Optional
      nrows: 10      	# Limit the number of rows
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import file
df = file.read('file.csv')
```

### Write
### Recipe
```yaml
write:
  - file:
      name: file.xlsx

      # Optional
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import file
file.write(df, 'file.xlsx')
```

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Import a file

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | Yes | string | The name or path of the file to import. Accepts a string or a Path object (pathlib.Path / os.PathLike). |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `drop_empty` | No | boolean | Whether to drop columns that are completely empty, defaults to false |
| `nrows` | No | integer | Number of rows to read |
| `header` | No | integer | Set the header row number. |
| `sheet_name` | No | string | Used for Excel files. Specify the sheet to read. |
| `orient` | No | string | Used for JSON files. Specifies the input arrangement |
| `sep` | No | string | Used for CSV files. Set the separation character. Default , (comma) |
| `encoding` | No | string | Used for CSV files. Set the encoding used for the file. Default utf-8 |
| `decimal` | No | string | Used for CSV files. Character to recognize as the decimal point (e.g. ',' for European data). |
| `thousands` | No | string | Used for CSV files. Character to recognize as the thousands separator |
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
  "description": "Import a file",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "The name or path of the file to import. Accepts a string or a Path object (pathlib.Path / os.PathLike)."
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
    },
    "drop_empty": {
      "type": "boolean",
      "description": "Whether to drop columns that are completely empty, defaults to false"
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
    "sep": {
      "type": "string",
      "description": "Used for CSV files. Set the separation character. Default , (comma)"
    },
    "encoding": {
      "type": "string",
      "description": "Used for CSV files. Set the encoding used for the file. Default utf-8"
    },
    "decimal": {
      "type": "string",
      "description": "Used for CSV files. Character to recognize as the decimal point (e.g. ',' for European data)."
    },
    "thousands": {
      "type": "string",
      "description": "Used for CSV files. Character to recognize as the thousands separator"
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

Export data to a file

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | Yes | string | The name or path of the file to write. Accepts a string or a Path object (pathlib.Path / os.PathLike). |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `orient` | No | string | Used for JSON files. Specifies the output arrangement |
| `sheet_name` | No | string | Used for Excel files. Specify the sheet to write. |
| `sep` | No | string | Used for CSV files. Set the separation character. Default , (comma) |
| `encoding` | No | string | Used for CSV files. Set the encoding used for the file. Default utf-8 |
| `mode` | No | string | Used for CSV files. Set whether to append to (a) or overwrite (w) the file if it already exists. Default w - overwrite |
| `decimal` | No | string | Used for CSV files. Character to use as the decimal point (e.g. ',' for European data). |
| `header` | No | boolean / array | Used for CSV files. Whether to write the column headers. Default true. Alternatively, provide a list to overwrite the headings. |
| `chunk_size` | No | integer | Used for Parquet files. Number of rows to write per chunk to limit peak memory usage. Defaults to an automatically calculated value that keeps each chunk under 128 MB of in-memory data. |
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
  "description": "Export data to a file",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "The name or path of the file to write. Accepts a string or a Path object (pathlib.Path / os.PathLike)."
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
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
    "sheet_name": {
      "type": "string",
      "description": "Used for Excel files. Specify the sheet to write."
    },
    "sep": {
      "type": "string",
      "description": "Used for CSV files. Set the separation character. Default , (comma)"
    },
    "encoding": {
      "type": "string",
      "description": "Used for CSV files. Set the encoding used for the file. Default utf-8"
    },
    "mode": {
      "type": "string",
      "description": "Used for CSV files. Set whether to append to (a) or overwrite (w) the file if it already exists. Default w - overwrite",
      "enum": [
        "w",
        "a"
      ]
    },
    "decimal": {
      "type": "string",
      "description": "Used for CSV files. Character to use as the decimal point (e.g. ',' for European data)."
    },
    "header": {
      "type": [
        "boolean",
        "array"
      ],
      "description": "Used for CSV files. Whether to write the column headers. Default true. Alternatively, provide a list to overwrite the headings."
    },
    "chunk_size": {
      "type": "integer",
      "description": "Used for Parquet files. Number of rows to write per chunk to limit peak memory usage. Defaults to an automatically calculated value that keeps each chunk under 128 MB of in-memory data."
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

[Machine-readable contract](/registry/connectors/file.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
