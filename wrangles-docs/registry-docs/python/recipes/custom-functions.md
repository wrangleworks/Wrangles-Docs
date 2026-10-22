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

You can also pass a Python file path directly:

```python
wrangles.recipe.run('recipe.wrgl.yml', functions='customFunctions.py')
```

WranglesPY loads the functions from that file. The documentation's interactive
runner always passes its repository-owned `customFunctions.py`, including for
recipes that do not call a custom function. Add reviewed example functions to
that file; do not accept Python file paths or Python source from visitors.
Generic tutorial names such as `function_name` are placeholders, not built-in functions.

- [Read *Read data with custom code*](/py/python/recipes/custom-functions/read)
- [Wrangles *Wrangle data with custom code*](/py/python/recipes/custom-functions/wrangles)
- [Write *Write data with custom code*](/py/python/recipes/custom-functions/write)
