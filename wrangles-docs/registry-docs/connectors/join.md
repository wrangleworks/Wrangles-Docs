---
title: "Join"
description: "Join two data sources on key(s). Equivalent to a join in SQL."
slug: /connectors/join
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Join <CopyableCode value="join" />

> Joins can be done using data from any connector, or even custom functions.
> Want to join a csv to data from a database? Go for it!

Import data from two sources and merge the data, equivalent to a join in SQL.

This can be used recursively to join more than two tables.

```yaml
read:
  - join:
      how: inner
      left_on: column
      right_on: column
      sources:
        - file:
            name: file1.xlsx
        - file:
            name: file2.xlsx
```

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Join two data sources on key(s). Equivalent to a join in SQL.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `how` | Yes | string | Method of join |
| `left_on` | Yes | string / array | Key(s) to join on from first source |
| `right_on` | Yes | string / array | Key(s) to join on from second source |
| `sources` | Yes | array | Two data sources to be joined |
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
  "description": "Join two data sources on key(s). Equivalent to a join in SQL.",
  "required": [
    "how",
    "left_on",
    "right_on",
    "sources"
  ],
  "properties": {
    "how": {
      "type": "string",
      "description": "Method of join",
      "enum": [
        "left",
        "right",
        "outer",
        "inner",
        "cross"
      ]
    },
    "left_on": {
      "type": [
        "string",
        "array"
      ],
      "description": "Key(s) to join on from first source"
    },
    "right_on": {
      "type": [
        "string",
        "array"
      ],
      "description": "Key(s) to join on from second source"
    },
    "sources": {
      "type": "array",
      "description": "Two data sources to be joined",
      "minItems": 2,
      "maxItems": 2,
      "items": {
        "$ref": "#/$defs/read/items"
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

</details>

[Machine-readable contract](/registry/connectors/join.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
