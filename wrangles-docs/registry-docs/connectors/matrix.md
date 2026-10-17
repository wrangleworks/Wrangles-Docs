---
title: "Matrix"
description: "The matrix connector lets you use variables to automatically execute multiple reads that are based on the combinations of the variables. If the outputs of the reads are not otherwise aggregated, they will be merged together via a union."
slug: /connectors/matrix
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Matrix <CopyableCode value="matrix" />

> Added v1.5.0

The matrix write connector lets you use variables in a single write definition to automatically execute multiple writes that are based on the combinations of the variables. Ie: if you wanted to split your data into categories with a different sheet for each category. Click [here](/py/matrix) for the wrangle equivalent of this connector.

### Read

> Added **v1.12.0**

### Recipes
#### Three Ways to Implement Variables
```yaml
read:
  - union:
      sources:
        - matrix:
            variables:
              file_name:
                - file1.csv
                - file2.csv
                - file3.json
            read:
              - file:
                  name: ${file_name}
```

The above example shows 3 different ways to implement variables: List of Values, Variables From a Custom Function, and a File Directory that contains all variables/files.

```python
def get_list():
    return ["file1.csv","file2.csv","file3.json"]
```

#### Input

| Product | Price | Quantity | Category |
| :------ | :---- | :------- | :------- |
| Hammer | $3.99 | 31 | Tools |
| Screw Driver | $11.99 | 17 | Tools |

| Product | Price | Quantity | Category |
| :------ | :---- | :------- | :------- |
| Safety Glasses | $1.99 | 12 | PPE |
| Hard Hat | $12.99 | 4 | PPE |

| Product | Price | Quantity | Category |
| :------ | :---- | :------- | :------- |
| Extension Cord | $4.95 | 14 | Electrical |
| Wire Nuts | $1.99 | 11 | Electrical |

#### Output

| Product | Price | Quantity | Category |
| :------ | :---- | :------- | :------- |
| Hammer | $3.99 | 31 | Tools |
| Safety Glasses | $1.99 | 12 | PPE |
| Hard Hat | $12.99 | 4 | PPE |
| Extension Cord | $4.95 | 14 | Electrical |
| Screw Driver | $11.99 | 17 | Tools |
| Wire Nuts | $1.99 | 11 | Electrical |

### Function
```python
import pandas as pd
from wrangles.connectors import matrix

products_dataframe = matrix.read(variables={'files': ['file1.csv', 'file2.csv', 'file3.json']}, read=[{'file': {'name': '${files}'}}])
```

### Write
### Recipes
#### Three Ways to Implement Variables
```yaml
write:
  - matrix:
      variables:
        category:
          - Tools
          - PPE
          - Electrical
      write:
        - file:
            name: ${category}.xlsx
            where: category = ?
            where_params:
              - ${category}
```

The above example shows 3 different ways to implement variables: List of Values, Variables as a Set, and Variables From a Custom Function.

```python
def get_list():
    return ["Tools","PPE","Electrical"]
```

#### Input

| Product | Price | Quantity | Category |
| :------ | :---- | :------- | :------- |
| Hammer | $3.99 | 31 | Tools |
| Safety Glasses | $1.99 | 12 | PPE |
| Hard Hat | $12.99 | 4 | PPE |
| Extension Cord | $4.95 | 14 | Electrical |
| Screw Driver | $11.99 | 17 | Tools |
| Wire Nuts | $1.99 | 11 | Electrical |

#### Output

| Product | Price | Quantity | Category |
| :------ | :---- | :------- | :------- |
| Hammer | $3.99 | 31 | Tools |
| Screw Driver | $11.99 | 17 | Tools |

| Product | Price | Quantity | Category |
| :------ | :---- | :------- | :------- |
| Safety Glasses | $1.99 | 12 | PPE |
| Hard Hat | $12.99 | 4 | PPE |

| Product | Price | Quantity | Category |
| :------ | :---- | :------- | :------- |
| Extension Cord | $4.95 | 14 | Electrical |
| Wire Nuts | $1.99 | 11 | Electrical |

### Function
```python
import pandas as pd
from wrangles.connectors import matrix

products_dataframe = pd.read_excel('product_file.xlsx')
matrix.write(df=products_dataframe, variables={'category': ['Tools', 'PPE', 'Electrical']}, write=[{'file': {'name': '${category}.xlsx', 'where': 'category = ?', 'where_params': ['${category}']}}])
```

### Run

> Added **v1.12.0**

### Recipes
#### Three Ways to Implement Variables
```yaml
run:
  on_start:
    - matrix:
        variables:
          category:
            - Tools
            - PPE
            - Electrical
        run:
          - custom.function:
              value: ${category}
```

The above example shows 3 different ways to implement variables: List of Values, Variables from a list defined by an Input Variable, and Variables From a a list defined by and Input Variable as JSON.

```python
test_vals = []
def function(value):
    test_vals.append(value)
variables = {"input_var1": ["a", "b", "c"], "input_var2": '["a", "b", "c"]'}
```

#### Output

```python
test_vals = ["a", "b", "c"]
```

### Function
```python
from wrangles.connectors import matrix

test_vals = []
def function(value):
    test_vals.append(value)

products_dataframe = matrix.run(variables={"input_var1": ["a", "b", "c"], "input_var2":'["a", "b", "c"]'}, run=[my_function], functions={"my_function": function})
```

## Parameters

### Read

The matrix connector lets you use variables to automatically execute multiple reads that are based on the combinations of the variables. If the outputs of the reads are not otherwise aggregated, they will be merged together via a union.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `variables` | Yes | object | A set of variables as key/values. The action will be execute once for each combination of variables. Values may be a single value or a list or reference a custom function. |
| `read` | Yes | array | The read section of a recipe to execute for each combination of variables |
| `strategy` | No | string | Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists  until the longest is completed. permutations uses the combination of all  variables against all other variables. |
| `max_concurrency` | No | integer | The maximum number to execute in parallel. If there are more than this, the rest will be queued. Default 10. |
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
  "description": "The matrix connector lets you use variables to automatically execute multiple reads that are based on the combinations of the variables. If the outputs of the reads are not otherwise aggregated, they will be merged together via a union.",
  "required": [
    "variables",
    "read"
  ],
  "properties": {
    "variables": {
      "type": "object",
      "description": "A set of variables as key/values. The action will be execute once for each combination of variables.\nValues may be a single value or a list or reference a custom function."
    },
    "read": {
      "type": "array",
      "description": "The read section of a recipe to execute for each combination of variables",
      "minItems": 1,
      "items": [
        {
          "$ref": "#/$defs/read/items"
        }
      ]
    },
    "strategy": {
      "type": "string",
      "enum": [
        "permutations",
        "loop"
      ],
      "description": "Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists  until the longest is completed. permutations uses the combination of all  variables against all other variables."
    },
    "max_concurrency": {
      "type": "integer",
      "minimum": 1,
      "description": "The maximum number to execute in parallel. If there are more than this, the rest will be queued. Default 10."
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

The matrix connector lets you use variables to automatically execute multiple actions based on the combinations of those variables.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `variables` | Yes | object | A set of variables as key/values. The action will be execute once for each combination of variables. Values may be a single value or a list or reference a custom function. |
| `run` | Yes | array | The run section of a recipe to execute for each combination of variables |
| `strategy` | No | string | Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists  until the longest is completed. permutations uses the combination of all  variables against all other variables. |
| `max_concurrency` | No | integer | The maximum number to execute in parallel. If there are more than this, the rest will be queued. Default 10. |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "The matrix connector lets you use variables to automatically execute multiple actions based on the combinations of those variables.",
  "required": [
    "variables",
    "run"
  ],
  "properties": {
    "variables": {
      "type": "object",
      "description": "A set of variables as key/values. The action will be execute once for each combination of variables.\nValues may be a single value or a list or reference a custom function."
    },
    "run": {
      "type": "array",
      "description": "The run section of a recipe to execute for each combination of variables",
      "minItems": 1,
      "items": [
        {
          "$ref": "#/$defs/run/items"
        }
      ]
    },
    "strategy": {
      "type": "string",
      "enum": [
        "permutations",
        "loop"
      ],
      "description": "Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists  until the longest is completed. permutations uses the combination of all  variables against all other variables."
    },
    "max_concurrency": {
      "type": "integer",
      "minimum": 1,
      "description": "The maximum number to execute in parallel. If there are more than this, the rest will be queued. Default 10."
    },
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

### Write

The matrix connector lets you use variables in a single write definition to automatically execute multiple writes that are based on the combinations of the variables.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `variables` | Yes | object | A set of variables as key/values. The write will be execute once for each combination of variables. Values may be a single value or a list, may use custom functions and may use the special syntax set(column_name) to use the unique values from a column. |
| `write` | Yes | array | The write section of a recipe to execute for each combination of variables |
| `strategy` | No | string | Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists  until the longest is completed. permutations uses the combination of all  variables against all other variables. |
| `max_concurrency` | No | integer | The maximum number to execute in parallel. If there are more than this, the rest will be queued. Default 10. |
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
  "description": "The matrix connector lets you use variables in a single write definition to automatically execute multiple writes that are based on the combinations of the variables. ",
  "required": [
    "variables",
    "write"
  ],
  "properties": {
    "variables": {
      "type": "object",
      "description": "A set of variables as key/values. The write will be execute once for each combination of variables.\nValues may be a single value or a list, may use custom functions and may use the special syntax set(column_name) to use the unique values from a column."
    },
    "write": {
      "type": "array",
      "description": "The write section of a recipe to execute for each combination of variables",
      "minItems": 1,
      "items": [
        {
          "$ref": "#/$defs/write/items"
        }
      ]
    },
    "strategy": {
      "type": "string",
      "enum": [
        "permutations",
        "loop"
      ],
      "description": "Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists  until the longest is completed. permutations uses the combination of all  variables against all other variables."
    },
    "max_concurrency": {
      "type": "integer",
      "minimum": 1,
      "description": "The maximum number to execute in parallel. If there are more than this, the rest will be queued. Default 10."
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

[Machine-readable contract](/registry/connectors/matrix.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
