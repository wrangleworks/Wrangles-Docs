---
title: "Matrix"
slug: /python/connectors/matrix
---

> Added v1.5.0
\{.is-info\}

The matrix write connector lets you use variables in a single write definition to automatically execute multiple writes that are based on the combinations of the variables. Ie: if you wanted to split your data into categories with a different sheet for each category. Click [here](https://wrangles.io/python/recipes/wrangles/utilities#matrix) for the wrangle equivalent of this connector.

# Tabset \{.tabset\}

## Read

> Added **v1.12.0**
\{.is-info\}

### Recipes
#### Three Ways to Implement Variables
```yaml
# Read files for a list of categories
# a file for Tools.xlsx, PPE.xlsx and Electrical.xlsx will be read and merged
read:
  - union:
      sources:
        - matrix:
            variables:
              file_names1: [file1.csv,file2.csv,file3.json] # Variables as a List of Values, uses list items as file names
              file_names2: custom.get_list # Variables as a Custom Function, uses a custom function to return list of file names
              folder: dir(tests/samples/matrix_dir) # Use a file directory to define the variables
            read:
              - file:
                  name: ${file_names1}
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

products_dataframe = matrix.read(variables={'files': ['file1.csv', 'file2.csv', 'file3.json']}, read=['file':{'name': '${files}'}])
```

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| variables | ✓ | dict | A list of variables. The read will be execute once for each combination of variables. |
| read | ✓ | list | The read section of a recipe to executed for each combination of variables |
| functions | | dict | Any user defined custom functions |
| strategy | | string | Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists until the longest is completed. permutations uses the combination of all variables against all other variables. |
| use_multiprocessing | | bool | Use multiprocessing instead of threading |
| max_concurrency | | integer | The maximum number to execute in parallel. If there are more than this, the rest will be queued. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |


## Write
### Recipes
#### Three Ways to Implement Variables
```yaml
# Create files for a list of categories
# a file for Tools.xlsx, PPE.xlsx and Electrical.xlsx will be created
write:
  - matrix:
      variables:
        category1: ["Tools", "PPE", "Electrical"] # Variables as a List of Values, uses list items as categories
        category2: set(Category) # Variables as a Set (From Column Data), gets all unique values from the Category column
        category3: custom.get_list() # Variables From a Custom Function, runs custom function that returns a list
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
matrix.write(df = products_dataframe, variables={'category': ['Tools', 'PPE', 'Electrical']}, write=['file':{'name': '${category}.xlsx', 'where': 'category = ?', 'where_params':['${category}']}])
```

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | Pandas Dataframe | The input dataframe |
| variables | ✓ | dict | A list of variables. The write will be executed once for each combination of variables. Can be passed through as a list, a column based set, or with a custom function that returns a list. |
| write | ✓ | list |The write section of a recipe to execute for each combination of variables. |
| functions | | list | Custom functions to provide to the write recipes. |
| strategy | | string | Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists until the longest is completed. permutations uses the combination of all variables against all other variables. |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |


## Run

> Added **v1.12.0**
\{.is-info\}

### Recipes
#### Three Ways to Implement Variables
```yaml
# Read files for a list of categories
# a file for Tools.xlsx, PPE.xlsx and Electrical.xlsx will be read and merged
run:
  on_start:
    - matrix:
        variables:
          var1: [a, b, c]
          var2: ${input_var1}
          var3: ${input_var2}
        run:
          - custom.function:
          		value: ${var}
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

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| variables | ✓ | dict | A list of variables. The action will be execute once for each combination of variables. |
| run | ✓ | list | The run section of a recipe to execute for each combination of variables |
| functions | | dict | Any user defined custom functions |
| strategy | | string | Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists until the longest is completed. permutations uses the combination of all variables against all other variables. |
| use_multiprocessing | | bool | Use multiprocessing instead of threading |
| max_concurrency | | integer | The maximum number to execute in parallel. If there are more than this, the rest will be queued. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |