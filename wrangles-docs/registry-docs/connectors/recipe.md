---
title: "Recipe"
description: "Use recipe in recipe read, run, write operations."
slug: /connectors/recipe
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Recipe <CopyableCode value="recipe" />

> Added **v0.5**

This connector allows you to trigger another recipe, from a recipe. Click [here](/py/recipe) for the wrangle equivalent of this connector.

### Read
### Recipe
```yaml
read:
  - recipe:
      name: my_recipe.wrgl.yml

      # Optional
      variables:
        my_variables: my_value
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import recipe
df = recipe.read('recipe.wrgl.yml')
```

### Write
### Recipe
```yaml
write:
  - recipe:
      name: my_recipe.wrgl.yml

      # Optional
      variables:
        my_variables: my_value
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import recipe
recipe.write(
    df,
    name = 'recipe.wrgl.yml'
)
```

### Run

### Recipe
```yaml
run:
  on_start:
    - recipe:
        name: my_recipe.wrgl.yml

        # Optional
        variables:
          my_variables: my_value
```

### Function
```python
from wrangles.connectors import recipe
recipe.run('recipe.wrgl.yml')
```

### Wrangles

### Recipe
```yaml
wrangles:
    - recipe:
        name: my_recipe.wrgl.yml

        # Optional
        variables:
          my_variables: my_value
```

### Function
```python
import wrangles
wrangles.recipe.run('recipe.wrgl.yml')
```

## Parameters

### Read



| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | Yes | string | The name of the recipe to read from |
| `variables` | No | object | A dictionary of variables to pass to the recipe |
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
  "anyOf": [
    {
      "$ref": "#"
    },
    {
      "type": "object",
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the recipe to read from"
        },
        "variables": {
          "type": "object",
          "description": "A dictionary of variables to pass to the recipe"
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
  ]
}
```

</details>

### Run



| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | Yes | string | The name of the recipe to execute |
| `variables` | No | object | A dictionary of variables to pass to the recipe |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "anyOf": [
    {
      "$ref": "#"
    },
    {
      "type": "object",
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the recipe to execute"
        },
        "variables": {
          "type": "object",
          "description": "A dictionary of variables to pass to the recipe"
        },
        "if": {
          "$ref": "#/$defs/run/commonProperties/if"
        }
      }
    }
  ]
}
```

</details>

### Write



| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | Yes | string | The name of the recipe to read from |
| `variables` | No | object | A dictionary of variables to pass to the recipe |
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
  "anyOf": [
    {
      "$ref": "#"
    },
    {
      "type": "object",
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the recipe to read from"
        },
        "variables": {
          "type": "object",
          "description": "A dictionary of variables to pass to the recipe"
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
  ]
}
```

</details>

[Machine-readable contract](/registry/connectors/recipe.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
