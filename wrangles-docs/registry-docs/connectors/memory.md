---
title: "Memory"
description: "The memory connector allows saving dataframes and variables in memory for communication between successive wrangles and recipes. All contents of the memory connector are lost once the python script finishes executing."
slug: /connectors/memory
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Memory <CopyableCode value="memory" />

The memory connector allows saving dataframes and variables in memory for communication between successive wrangles and recipes. All contents of the memory connector are lost once the python script finishes executing.

### Read
### Recipe
```yaml
read:
  - memory:
      id: '1234'
```

### Function
```python
from wrangles.connectors import memory
df = memory.read(id='1234')
```

### Write
### Recipe
```yaml
write:
  - memory:
      id: '1234'
```

### Function
```python
from wrangles.connectors import memory
import pandas as pd

df = pd.read_csv('example.csv')
memory.write(df=df, id='1234')
```

### Clear
Clear and reset any existing data stored in the connector.

### Function
```python
from wrangles.connectors import memory
import pandas as pd

df = pd.read_csv('example.csv')
memory.write(df=df, id='1234')
memory.clear()
```

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

The memory connector allows saving dataframes and variables in memory for communication between successive wrangles and recipes. All contents of the memory connector are lost once the python script finishes executing.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `id` | No | string | A unique ID to identify the data. If not specified, will read the last dataframe saved in memory |
| `orient` | No | string | Set the arrangement of the data. See pandas.DataFrame.to_dict method for options. Default is tight |
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
  "description": "The memory connector allows saving dataframes and variables in memory for communication between successive wrangles and recipes. All contents of the memory connector are lost once the python script finishes executing.",
  "properties": {
    "id": {
      "type": "string",
      "description": "A unique ID to identify the data. If not specified, will read the last dataframe saved in memory"
    },
    "orient": {
      "type": "string",
      "enum": [
        "dict",
        "list",
        "split",
        "tight",
        "index"
      ],
      "description": "Set the arrangement of the data. See pandas.DataFrame.to_dict method for options. Default is tight"
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

The memory connector allows saving dataframes and variables in memory for communication between successive wrangles and recipes. All contents of the memory connector are lost once the python script finishes executing.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `id` | No | string | A unique ID to identify the data |
| `orient` | No | string | Set the arrangement of the data. See pandas.DataFrame.to_dict method for options. Default is tight |
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
  "description": "The memory connector allows saving dataframes and variables in memory for communication between successive wrangles and recipes. All contents of the memory connector are lost once the python script finishes executing.",
  "properties": {
    "id": {
      "type": "string",
      "description": "A unique ID to identify the data"
    },
    "orient": {
      "type": "string",
      "enum": [
        "dict",
        "list",
        "split",
        "tight",
        "index"
      ],
      "description": "Set the arrangement of the data. See pandas.DataFrame.to_dict method for options. Default is tight"
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

[Machine-readable contract](/registry/connectors/memory.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
