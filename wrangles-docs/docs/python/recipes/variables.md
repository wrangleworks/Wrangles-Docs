---
title: "Variables"
slug: /python/recipes/variables
---

Variables can be set within a recipe.

Typical uses for variables are to keep sensitive information hidden, such as passwords, or being able to reuse a recipe for multiple scenarios e.g. multiple files.

Variables are set using the format:
`${MY_VARIABLE_NAME}`


Variables can either be set as system environment variables, or provided as a dictionary to the recipe.run() function.

> If duplicated, variables passed as an argument will override environment variables.
\{.is-info\}


# Pass to Function
```python
my_variables = {
  'key': 'value'
}

wrangles.recipe.run('recipe.wrgl.yml', variables=my_variables)
```


# Passing Custom Functions as Variables
Custom functions can be passed as variables. This allows variables to be dynamic. There are two ways to implement custom functions as variables: simply by running the function which returns a value, or a function that takes in the variables dictionary and returns a different value.

## Custom Function That Returns a Value
```python
def variable_function():
    return 'Col2'
    
variables = {
    'function': "variable_function"
}

functions = [variable_function]

df = wrangles.recipe.run(
    recipe='recipe.wrgl.yml',
    functions=functions,
    variables=variables
    )
```

```yaml
wrangles:
  - convert.case:
      input: ${function}
      case: upper
```

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Col1 | Col2 |
|:----:|:----:|
| SKF | Ball Bearing |
| Timken | Bearing Race |
| Acme Bearings | Needle Bearing |
| General Bearing Co. | Roller Bearing |

</td><td>
→ 
</td><td>

| Col1 | Col2 |
|:----:|:----:|
| SKF | BALL BEARING |
| Timken | BEARING RACE |
| Acme Bearings | NEEDLE BEARING |
| General Bearing Co. | ROLLER BEARING |

</td></tr>
</table>
</div>


## Custom Function That Takes in Variables Dictionary
```python
def variable_function(variables = {}):
    return variables['other_col']
    
variables = {
    'column': 'col1',
    'function': "custom.variable_function",
    'other_col': 'col2'
}

functions = [variable_function]

df = wrangles.recipe.run(
    recipe='recipe.wrgl.yml',
    functions=functions,
    variables=variables
    )
```

```yaml
wrangles:
  - convert.case:
      input: ${function}
      case: upper
```

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Col1 | Col2 |
|:----:|:----:|
| SKF | Ball Bearing |
| Timken | Bearing Race |
| Acme Bearings | Needle Bearing |
| General Bearing Co. | Roller Bearing |

</td><td>
→ 
</td><td>

| Col1 | Col2 |
|:----:|:----:|
| SKF | BALL BEARING |
| Timken | BEARING RACE |
| Acme Bearings | NEEDLE BEARING |
| General Bearing Co. | ROLLER BEARING |

</td></tr>
</table>
</div>


# Samples
## Keep Password Secret
```yaml
read:
  - mssql:
      host: sql.domain
      user: user
      password: ${PASSWORD}
      command: |
        SELECT *
        FROM table
```

## Run a List of Files
```python
"""
Convert a batch of files from csv to xlsx
"""
import wrangles

recipe = """
read:
  - file:
      name: ${FILENAME}.csv

write:
  - file:
      name: ${FILENAME}.xlsx
"""

for filename in ['file1', 'file2', 'file3']:
    wrangles.recipe.run(recipe, variables={'FILENAME': filename})
```