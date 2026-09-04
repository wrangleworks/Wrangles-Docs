---
title: "Custom Functions"
slug: /python/recipes/custom-functions
---

Custom functions may be used within any part of a recipe.

To use a custom function, specify *custom.\&lt;function name>* within the recipe.

```yaml
# recipe.wrgl.yml
read:
  - custom.my_function:
      my_paramater: my_value
```

```python
import wrangles

def my_function(my_parameter):
    # get data from somewhere
    return df
    
wrangles.recipe.run('recipe.wrgl.yml', functions=[my_function])
```

Custom functions must be structured in a specific way to be used within a recipe. Learn how to structure a function for each section:

- [Read *Read data with custom code*](/python/recipes/custom-functions/read)
- [Wrangles *Wrangle data with custom code*](/python/recipes/custom-functions/wrangles)
- [Write *Write data with custom code*](/python/recipes/custom-functions/write)
\{.links-list\}