---
title: "Recipe"
slug: /python/connectors/recipe
---

> Added **v0.5**
\{.is-info\}

This connector allows you to trigger another recipe, from a recipe. Click [here](https://wrangles.io/python/recipes/wrangles/standalone#recipe) for the wrangle equivalent of this connector.


# Tabset \{.tabset\}
## Read
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

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| name | ✓ | str | The name (and path, if required), model id, or url of the recipe to read the data from. |
| variables |  | dict | A dictionary of custom variables to override placeholders in the recipe. Variables can be indicated as $\{MY_VARIABLE\}. Variables can also be overwritten by Environment Variables. |
| columns | | list | A list with a subset of the columns to import. |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

## Write
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

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame | Function only. DataFrame of contents to write to the database. Columns must match the target schema. By default, if the target table doesn't exist, it will be created. |
| name | ✓ | str | The name (and path, if required), model id, or url of the recipe to read the data from. |
| variables |  | dict | A dictionary of custom variables to override placeholders in the recipe. Variables can be indicated as $\{MY_VARIABLE\}. Variables can also be overwritten by Environment Variables. |
| columns | | list | A list of the columns to pass to the recipe. If omitted, all columns will be included. |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

## Run

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

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| name | ✓ | str | The name (and path, if required), model id, or url of the recipe to read the data from. |
| variables |  | dict | A dictionary of custom variables to override placeholders in the recipe. Variables can be indicated as $\{MY_VARIABLE\}. Variables can also be overwritten by Environment Variables. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

## Wrangles

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

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| name | ✓ | str | The name (and path, if required), model id, or url of the recipe to read the data from. |
| variables |  | dict | A dictionary of custom variables to override placeholders in the recipe. Variables can be indicated as $\{MY_VARIABLE\}. Variables can also be overwritten by Environment Variables. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |