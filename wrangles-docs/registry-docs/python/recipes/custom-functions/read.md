---
title: "Read"
slug: /python/recipes/custom-functions/read
---

These custom functions allow data to be read with custom code.

Read custom functions must:
- Return a Pandas DataFrame
- Parameters may be included if required.

# Python

```python
import wrangles

# Import your custom function from another module
from module_name import function_name

# OR

# Define the function within the same script
def function_name():
  # Get data from somewhere and convert to a DataFrame
  return df

# Run the recipe with the custom function
wrangles.recipe.run('recipe.wrgl.yml', functions=[function_name])
```

# Recipe
```yaml
# Without parameters. Note {} must be included.
read:
  - custom.function_name: {}
```

```yaml
# With parameters
read:
  - custom.function_name:
      example_parameter: example_value
```

# Function
```python
def function_name():
  """
  Base version. Must return a pandas DataFrame containing the data.
  """
  # Get data from somewhere and convert to a DataFrame
  return df
```

```python
def function_name() -> pandas.DataFrame:
  """
  Typed version
  """
  # Get data from somewhere and convert to a DataFrame
  return df
```

```python
def function_name(example_parameter, **kwargs):
  """
  With parameters.
  
  kwargs is optional and will contain any parameters not explicitly named as a dictionary.
  """
  # Get data from somewhere and convert to a DataFrame
  return df
```