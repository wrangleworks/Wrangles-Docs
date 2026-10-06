---
title: "Wrangles"
slug: /python/recipes/custom-functions/wrangles
---

Custom functions allow data to be wrangled using python code. With custom functions, anything that can be done with python can be implemented into a recipe. Nested function calls can be used for custom functions if users wish to implement modules or classes in the same way a custom function can be called (custom.module.class.function).

> **Note:** Spaces within column headers are automatically replaced with an underscore, so it is important to keep this in mind when writing your custom function.
\{.is-info\}

# Python

```python
import wrangles

# Import your custom function from another module
from module_name import function_name

# OR

# Define the function within the same script
def function_name(df):
  # Do something with the dataframe
  return df

# Run the recipe with the custom function
wrangles.recipe.run('recipe.wrgl.yml', functions=[function_name])
```

# Recipe
```yaml
# Without parameters. Note {} must be included.
wrangles:
  - custom.function_name: {}
```

```yaml
# With parameters
wrangles:
  - custom.function_name:
      example_param: example_value
```

# Dataframe Level Functions
Dataframe level functions take in the dataframe as a variable and run on the dataframe as a whole. Dataframe level functions must return a dataframe.

<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Products   |
|:----------:|
| Hammer |

</td><td>
→ 
</td><td>
  
| Products |Stock   |
|:---------|------:|
| Hammer | Hammer is out of stock |
  
</td></tr>
</table>

```python
def function(df, input, output):
		df[output] = df[input] + ' is out of stock'
    return df
```

```yaml
wrangles:
  - custom.function:
      input: Products
      output: Stock
```

# Row Level Functions
Row level functions are performed row by row and therefore do not take the dataframe in as a variable. Row level functions do not return a dataframe but instead return the values that will fill the output column.

<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Products   |
|:----------:|
| Hammer |

</td><td>
→ 
</td><td>
  
| Products |Stock   |
|:---------|------:|
| Hammer | Hammer is out of stock |
  
</td></tr>
</table>

```python
def function(Products):
    return Products + ' is out of stock'
```

```yaml
wrangles:
  - custom.function:
      input: Products
      output: Stock
```

> The two examples above have the same outcome but it is important to note the difference in the use of input, output and the dataframe itself.
\{.is-note\}

# Using **kwargs
The function variable kwargs is a dictionary that stores wildcard function variables. That is, it allows you to pass variables into functions without explicitly naming them. 

<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Products   |
|:----------:|
| Hammer |

</td><td>
→ 
</td><td>
  
| Products |Stock   |
|:---------|------:|
| Hammer | Hammer is out of stock |
  
</td></tr>
</table>

```python
def function(Products, **kwargs):
    outputString = ''
    for value in kwargs.values():
        outputString += Products + ' ' + value
    return outputString
```

```yaml
wrangles:
  - custom.function:
      input: Products
      string: is out of stock
      output: Stock
```

# Recipe Parameters
Recipe parameters can be passed to a custom function as variables.

<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Products   |
|:----------:|
| Hammer |

</td><td>
→ 
</td><td>
  
| Products | Products with suffix |
|:---------|------:|
| Hammer | Hammer abc |
  
</td></tr>
</table>

```python
def function(Products, suffix):
    """ 
    Append suffix to each row in Products column
    """
    return Products + suffix
```

```yaml
wrangles:
  - custom.function:
      suffix: abc
      output: Products with suffix
```

# Samples
```python
def function_name(df):
  """
  Base version. df must be the first parameters and will contain the Dataframe.
  """
  # Do something with the dataframe

  return df
```

```python
def function_name(df: pandas.DataFrame) -> pandas.DataFrame:
  """
  Typed version
  """
  # Do something with the dataframe

  return df
```

```python
def function_name(df, example_param, **kwargs):
  """
  With parameters.
  
  kwargs is optional and will contain any parameters not explicitly named as a dictionary.
  """
  # Do something with the dataframe

  return df
```

# Examples

## Reverse Strings (Dataframe Level)

<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Strings         |
|:---------------:|
| Reverse Reverse |

</td><td>
→ 
</td><td>
  
|Reverse         |
|:---------------:|
|esreveR esreveR |
  
</td></tr>
</table>

```python
def reverse_strings(df, input, output):
    """
    Reverse the strings within the input column
    """
    df[output] = df[input].apply(lambda x: x[::-1])
    return df
    
# Use parameter 'functions' to pass one or more custom functions when running the recipe.
wrangles.recipe.run(recipe, functions=[reverse_strings])
```

```yaml
# Use the function in the recipe
wrangles:
  - custom.reverse_strings:
  	  input: Strings
      output: Reverse
```

## Reverse Strings (Row Level)

<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Strings         |
|:---------------:|
| Reverse Reverse |

</td><td>
→ 
</td><td>
  
|Reverse         |
|:---------------:|
|esreveR esreveR |
  
</td></tr>
</table>

```python
def reverse_strings(Strings):
    """
    Reverse the strings within the input column
    """
    return Strings[::-1]
    
# Use parameter 'functions' to pass one or more custom functions when running the recipe.
wrangles.recipe.run(recipe, functions=[reverse_strings])
```

```yaml
# Use the function in the recipe
wrangles:
  - custom.reverse_strings:
  	  input: Strings
      output: Reverse
```