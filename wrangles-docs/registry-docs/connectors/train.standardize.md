---
title: "Train Standardize"
description: "Read the training data for a Standardize Wrangle"
slug: /connectors/train.standardize
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Train Standardize <CopyableCode value="train.standardize" />

### Read
#### Recipe
```yaml
read:
  - train.standardize:
      model_id: xxxxxxxx-xxxx-xxxx
```

##### Output

<div className="table-scroll">

| Find | Replace | Notes |
| :--- | :------ | :---- |
| Pizza | Hamburger | |
| Beef | Chicken | |
| Bagel | Donut | |
| Taco | Burrito | |

</div>

#### Function
```python
from wrangles.connectors import train
df = train.standardize.read(model_id = 'xxxxxxxx-xxxx-xxxx')
```

##### Output

<div className="table-scroll">

| Find | Replace | Notes |
| :--- | :------ | :---- |
| Pizza | Hamburger | |
| Beef | Chicken | |
| Bagel | Donut | |
| Taco | Burrito | |

</div>

### Write
#### Recipe
Update the training data for an existing standardize wrangle.

```yaml
write:
  - train.standardize:
      columns:
        - Find
        - Replace
        - Notes
      model_id: xxxxxxxx-xxxx-xxxx
```

#### Function
Create a new standardize wrangle.
```python
from wrangles.connectors import train
import pandas as pd

df = pd.DataFrame({
		'Find': ['Pizza', 'Beef', 'Bagel', 'Taco'],
    'Replace': ['Hamburger', 'Chicken', 'Donut', 'Burrito'],
    'Notes': ['', '', '', '']
})

train.standardize.write(df = df, name = 'Menu Updates')
```

> Note both name and model_id **cannot** be used together. Name is used when creating models and model_id is used when updating an existing model.

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Read the training data for a Standardize Wrangle

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
  "description": "Read the training data for a Standardize Wrangle",
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

Train a new or existing Standardize Wrangle

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | No | string | Name to give to a new Wrangle that will be created |
| `model_id` | No | string | Model to be updated. Either this or a name must be provided |
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
  "description": "Train a new or existing Standardize Wrangle",
  "additionalProperties": false,
  "properties": {
    "name": {
      "type": "string",
      "description": "Name to give to a new Wrangle that will be created"
    },
    "model_id": {
      "type": "string",
      "description": "Model to be updated. Either this or a name must be provided"
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

[Machine-readable contract](/registry/connectors/train.standardize.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
