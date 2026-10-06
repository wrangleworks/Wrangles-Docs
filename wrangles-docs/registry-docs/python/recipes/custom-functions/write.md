---
title: "Write"
slug: /python/recipes/custom-functions/write
---

These custom functions allow data to be written with custom code.

Write custom functions must:
- Include the DataFrame (df) as the first parameter.
- Other parameters may be included after.

# Python

```python
import wrangles

# Import your custom function from another module
from module_name import function_name

# OR

# Define the function within the same script
def function_name(df):
  # Do something with the dataframe

# Run the recipe with the custom function
wrangles.recipe.run('recipe.wrgl.yml', functions=[function_name])
```

# Recipe
```yaml
# Without parameters. Note {} must be included.
write:
  - custom.function_name: {}
```

```yaml
# With parameters
write:
  - custom.function_name:
      example_parameter: example_value
```

# Function
```python
def function_name(df):
  """
  Base version. df must be the first parameters and will contain the Dataframe.
  """
  # Do something with the dataframe
```

```python
def function_name(df: pandas.DataFrame) -> None:
  """
  Typed version
  """
  # Do something with the dataframe
```

```python
def function_name(df, example_parameter, **kwargs):
  """
  With parameters.
  
  kwargs is optional and will contain any parameters not explicitly named as a dictionary.
  """
  # Do something with the dataframe
```