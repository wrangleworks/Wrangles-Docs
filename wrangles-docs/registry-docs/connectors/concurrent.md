---
title: "Concurrent"
description: "The concurrent connector lets you read multiple sources simultaneously rather than sequentially. If the outputs of the reads are not otherwise aggregated, they will be merged together via a union."
slug: /connectors/concurrent
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Concurrent <CopyableCode value="concurrent" />

By default, all functions executed by a recipe happen sequentially. The concurrent connector allows functions to be executed in parallel.

Click [here](/py/concurrent) to learn about the concurrent wrangle.

### Read
### Recipe
```yaml
read:
  - union:
      sources:
        - concurrent:
            read:
              - file:
                  name: file1.xlsx
              - file:
                  name: file2.xlsx
              - file:
                  name: file3.csv
```

### Write
### Recipe
```yaml
write:
  - concurrent:
      write:
        - file:
            name: file1.xlsx
            columns:
              - col1
              - col2
        - file:
            name: file2.xlsx
            columns:
              - col3
              - col4
```

### Run

Run multiple actions concurrently.

### Recipe
```yaml
run:
  on_start:
    - concurrent:
        run:
          - custom.my_function:
              category: Hand Tools
          - custom.my_function:
              category: Power Tools
          - custom.my_function:
              category: Hardware
```

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

The concurrent connector lets you read multiple sources simultaneously rather than sequentially. If the outputs of the reads are not otherwise aggregated, they will be merged together via a union.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `read` | Yes | array | Reads to be run concurrently |
| `max_concurrency` | No | integer | The maximum number to execute in parallel. If there are more than this, the rest will be queued. |
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
  "description": "The concurrent connector lets you read multiple sources simultaneously rather than sequentially. If the outputs of the reads are not otherwise aggregated, they will be merged together via a union.",
  "required": [
    "read"
  ],
  "properties": {
    "read": {
      "type": "array",
      "description": "Reads to be run concurrently",
      "minItems": 1,
      "items": [
        {
          "$ref": "#/$defs/read/items"
        }
      ]
    },
    "max_concurrency": {
      "type": "integer",
      "description": "The maximum number to execute in parallel. If there are more than this, the rest will be queued.",
      "minimum": 1
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

The concurrent connector lets you run multiple actions simultaneously rather than sequentially

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `run` | Yes | array | Actions to run concurrently |
| `max_concurrency` | No | integer | The maximum number to execute in parallel. If there are more than this, the rest will be queued. |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "The concurrent connector lets you run multiple actions simultaneously rather than sequentially",
  "required": [
    "run"
  ],
  "properties": {
    "run": {
      "type": "array",
      "description": "Actions to run concurrently",
      "minItems": 1,
      "items": [
        {
          "$ref": "#/$defs/run/items"
        }
      ]
    },
    "max_concurrency": {
      "type": "integer",
      "description": "The maximum number to execute in parallel. If there are more than this, the rest will be queued.",
      "minimum": 1
    },
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

### Write

The concurrent connector lets you run multiple write connectors in parallel rather than sequentially

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `write` | Yes | array | Writes to run concurrently |
| `max_concurrency` | No | integer | The maximum number to execute in parallel. If there are more than this, the rest will be queued. |
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
  "description": "The concurrent connector lets you run multiple write connectors in parallel rather than sequentially",
  "required": [
    "write"
  ],
  "properties": {
    "write": {
      "type": "array",
      "description": "Writes to run concurrently",
      "minItems": 1,
      "items": [
        {
          "$ref": "#/$defs/write/items"
        }
      ]
    },
    "max_concurrency": {
      "type": "integer",
      "description": "The maximum number to execute in parallel. If there are more than this, the rest will be queued.",
      "minimum": 1
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

[Machine-readable contract](/registry/connectors/concurrent.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
