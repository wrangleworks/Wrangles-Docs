---
title: "Excel Sheet"
description: "Spreadsheet write mode: sheet. Write all requested columns to an Excel sheet/range, including unchanged input columns."
slug: /connectors/excel.sheet
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Excel Sheet <CopyableCode value="excel.sheet" />

> Note: The Excel connector is only to be used in recipes within WranglesXL and will not function properly otherwise.

The Excel connector allows users to define which sheet and where to write the output, write to multiple sheets, write to sheets dynamically or return data at different stages of the recipe. More configuration options will be added over time.

### Write
#### Recipe
```yml
write:
  - excel.sheet:
      name: NewSheet
      cell: C3
```

#### Function
The Excel connector can be utilized in a custom function but please remember that it was built only to function within WranglesXL and will not function properly otherwise.

```python
from wrangles.connectors import excel
excel.sheet.write(df=my_dataframe, name='NewSheet', cell = 'C3')
```

## Parameters

### Write

Spreadsheet write mode: sheet. Write all requested columns to an Excel sheet/range, including unchanged input columns.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | No | string | Name of the sheet to write to. If omitted, will default to the name of the recipe. |
| `cell` | No | string | The top left cell to write the data from. Default A1. |
| `action` | No | string | Action to take when writing the data if the sheet already exists. Default append. append - add to the existing sheet. increment - add a new sheet with an incrementing number. overwrite - replace existing sheet. |
| `freezepanes` | No | boolean | If true, will freeze the first row. Default false. |
| `as_table` | No | boolean | If true, will write the data as an Excel table. Default true. |
| `formatting` | No | object | Formatting to apply to named columns in WranglesXL. Option names and values follow the same Polars/XlsxWriter formatting syntax used by the `file` connector's `formatting.column_formats`. |
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
  "description": "Spreadsheet write mode: sheet. Write all requested columns to an Excel sheet/range, including unchanged input columns.",
  "additionalProperties": false,
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the sheet to write to. If omitted, will default to the name of the recipe."
    },
    "cell": {
      "type": "string",
      "description": "The top left cell to write the data from. Default A1."
    },
    "action": {
      "type": "string",
      "description": "Action to take when writing the data if the sheet already exists. Default append.\nappend - add to the existing sheet.\nincrement - add a new sheet with an incrementing number.\noverwrite - replace existing sheet.",
      "enum": [
        "overwrite",
        "append",
        "increment"
      ]
    },
    "freezepanes": {
      "type": "boolean",
      "description": "If true, will freeze the first row. Default false."
    },
    "as_table": {
      "type": "boolean",
      "description": "If true, will write the data as an Excel table. Default true."
    },
    "formatting": {
      "type": "object",
      "description": "Formatting to apply to named columns in WranglesXL. Option names and values follow the same Polars/XlsxWriter formatting syntax used by the `file` connector's `formatting.column_formats`.",
      "additionalProperties": false,
      "required": [
        "columns"
      ],
      "properties": {
        "columns": {
          "type": "object",
          "description": "Column headings mapped to their formatting options.",
          "minProperties": 1,
          "additionalProperties": {
            "type": "object",
            "additionalProperties": false,
            "minProperties": 1,
            "properties": {
              "align": {
                "type": "string",
                "description": "Horizontal alignment for the column values.",
                "enum": [
                  "general",
                  "left",
                  "center",
                  "right"
                ]
              },
              "num_format": {
                "type": "string",
                "minLength": 1,
                "description": "Excel number format code for the column values. Matches the `num_format` key used by the Polars/XlsxWriter `column_formats` formatting syntax on the `file` connector."
              },
              "bold": {
                "type": "boolean",
                "description": "Whether the column values should be bold."
              },
              "checkbox": {
                "type": "boolean",
                "description": "Whether boolean column values should display as checkboxes."
              },
              "text_wrap": {
                "type": "boolean",
                "description": "Whether the column values should wrap text within the cell."
              }
            }
          }
        }
      }
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

[Machine-readable contract](/registry/connectors/excel.sheet.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
