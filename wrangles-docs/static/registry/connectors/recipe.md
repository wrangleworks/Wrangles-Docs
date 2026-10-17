---
schema_version: '0.2'
type: connector
catalog_id: '129'
catalog_key: connector.recipe
catalog_kind: connector
runtime_key: recipe
status: active
title: Recipe
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    anyOf:
      - $ref: '#'
      - type: object
        required:
          - name
        properties:
          name:
            type: string
            description: The name of the recipe to read from
          variables:
            type: object
            description: A dictionary of variables to pass to the recipe
          columns:
            type: array
            description: >-
              Subset of the columns to include from the output of the recipe. If not provided, all
              columns will be included.
  run:
    anyOf:
      - $ref: '#'
      - type: object
        required:
          - name
        properties:
          name:
            type: string
            description: The name of the recipe to execute
          variables:
            type: object
            description: A dictionary of variables to pass to the recipe
  write:
    anyOf:
      - $ref: '#'
      - type: object
        required:
          - name
        properties:
          name:
            type: string
            description: The name of the recipe to read from
          variables:
            type: object
            description: A dictionary of variables to pass to the recipe
description: Use recipe in recipe read, run, write operations.
slug: connectors/recipe
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/recipe.md
    title: Existing connector documentation
---

# Recipe

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
