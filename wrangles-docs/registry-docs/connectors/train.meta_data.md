---
title: "Train Meta Data"
description: "Read the metadata for a Wrangle model.\nReturns a DataFrame with the following columns:\n    - id\n    - name\n    - type\n    - purpose\n    - status\n    - path\n    - batch_size\n    - tags\n    - notes\n    - created_by\n    - date_created\n    - modified_by\n    - date_modified\n    - variant\n    - settings"
slug: /connectors/train.meta_data
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Train Meta Data <CopyableCode value="train.meta_data" />

Read the metadata for a Wrangle model.
Returns a DataFrame with the following columns:
    - id
    - name
    - type
    - purpose
    - status
    - path
    - batch_size
    - tags
    - notes
    - created_by
    - date_created
    - modified_by
    - date_modified
    - variant
    - settings

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Read the metadata for a Wrangle model. Returns a DataFrame with the following columns:     - id     - name     - type     - purpose     - status     - path     - batch_size     - tags     - notes     - created_by     - date_created     - modified_by     - date_modified     - variant     - settings

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model_id` | Yes | string | Specific model to read |
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
  "description": "Read the metadata for a Wrangle model.\nReturns a DataFrame with the following columns:\n    - id\n    - name\n    - type\n    - purpose\n    - status\n    - path\n    - batch_size\n    - tags\n    - notes\n    - created_by\n    - date_created\n    - modified_by\n    - date_modified\n    - variant\n    - settings\n",
  "additionalProperties": false,
  "required": [
    "model_id"
  ],
  "properties": {
    "model_id": {
      "type": "string",
      "description": "Specific model to read"
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

Update the metadata for a Wrangle model. The following fields can be updated:     - name     - batch_size     - tags     - notes     - settings

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model_id` | Yes | string | Model to update |
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
  "description": "Update the metadata for a Wrangle model.\nThe following fields can be updated:\n    - name\n    - batch_size\n    - tags\n    - notes\n    - settings\n",
  "additionalProperties": false,
  "required": [
    "model_id"
  ],
  "properties": {
    "model_id": {
      "type": "string",
      "description": "Model to update"
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

[Machine-readable contract](/registry/connectors/train.meta_data.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
