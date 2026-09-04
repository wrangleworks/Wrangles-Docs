---
title: Utilities
slug: /python/recipes/wrangles/utilities
---

import RecipePlayground from '@site/src/components/RecipePlayground';

# Accordion
Allows applying a series of wrangles to the elements of a list individually.

## Tabset \{.tabset\}
### Sample

#### Example
This example shows how to use convert.case on a list of strings, where normally it would not work on a list.

<RecipePlayground
  editable={true}
  recipe={"wrangles:\n- accordion:\n    input: list_column\n    output: modified_lists\n    wrangles:\n      - convert.case:\n          input: list_column\n          output: modified_lists\n          case: upper"}
  exampleSource={"<div className=\"table-scroll\">\n<table>\n<tr><th></th><th></th><th></th></tr>\n<tr><td>\n\n| list_column |\n|:-----------:|\n| [\"a\", \"b\", \"c\"] |\n| [\"e\", \"f\", \"g\"] |\n\n</td><td>\n→ \n</td><td>\n\n| list_column | modified_lists |\n|:-----------:|:--------------:|\n| [\"a\", \"b\", \"c\"] | [\"A\", \"B\", \"C\"] |\n| [\"e\", \"f\", \"g\"] | [\"E\", \"F\", \"G\"] |\n  \n</td></tr>\n</table>\n</div>"}
/>

### Parameters
<div className="table-scroll">
 
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | The column(s) containing the list(s) that the wrangles will be applied to the elements of. **Note:** When accordioning on multiple columns, they must have matching element counts. | 
| output | ✓ | str, list | Output of the wrangles to save back to the dataframe. **Note:** All columns which are created within the accordion will be dropped if they are not listed in the output. |
| wrangles | ✓ | list | List of wrangles to apply. |
| propagate | | str, list | Limit the column(s) that will be available to the wrangles and replicated for each element. If not specified, all columns will be propogated. This may be useful to limit the memory use for large datasets. |
| where | | str | Filter the data to only apply the wrangle to certain rows using an equivalent to a SQL where criteria, such as column1 = 123 OR column2 = 'abc' |
| where_params | | str | Variables to use in conjunctions with where. This allows the query to be parameterized. This uses sqlite syntax (? or :name) |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>

# Batch
Execute a series of wrangles broken into a series of batches. The batches can optionally be executed in parallel with the threads parameter, and provide an error output to catch errors.

## Tabset \{.tabset\}
### Sample

#### Example
This example shows how to use batch on an Extract AI Wrangle

<RecipePlayground
  editable={true}
  recipe={"wrangles:\n  - batch:\n  \t\tbatch_size: 2\n      threads: 1\n      wrangles:\n      \t- extract.ai:\n            api_key: Your OpenAI api key\n            input: Product Description\n            output:\n              Title:\n                type: string\n                description: Title of the product\n          "}
  exampleSource={"<div className=\"table-scroll\">\n<table>\n<tr><th></th><th></th><th></th></tr>\n<tr><td>\n\n| Product Description |\n|:-------------: |\n| Sleep better with our Memory Foam Pillow, designed to contour to your head and neck. |\n| Stay comfortable and stylish with our Organic Cotton T-Shirt, made from soft, breathable fabric. |\n| Keep drinks hot or cold with our Stainless Steel Water Bottle, featuring durable insulation. |\n| Enjoy crisp sound and long battery life with our Wireless Bluetooth Earbuds. |\n\n</td><td>\n→ \n</td><td>\n\n| Product Description | Title |\n|:------------------: | :------------: |\n| Sleep better with our Memory Foam Pillow, designed to contour to your head and neck. | Memory Foam Pillow |\n| Stay comfortable and stylish with our Organic Cotton T-Shirt, made from soft, breathable fabric. | Organic Cotton T-Shirt |\n| Keep drinks hot or cold with our Stainless Steel Water Bottle, featuring durable insulation. | Stainless Steel Water Bottle |\n| Enjoy crisp sound and long battery life with our Wireless Bluetooth Earbuds. | Wireless Bluetooth Earbuds |\n  \n</td></tr>\n</table>\n</div>"}
/>

### Parameters
<div className="table-scroll">
 
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| batch_size | ✓ | int | The amount of rows in each batch | 
| wrangles | ✓ | dict | Wrangles to apply to the data (this can be thought of as a sub recipe). |
| threads | | int | The amount of batches than are run in parallel |
| on_error | | dict | Provides a default output if there is an error within the batch. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>

# Concurrent
The Concurrent Wrangle allows users to run multiple wrangles concurrently rather than sequentially. Wrangles must specify output columns to be used concurrently. When using concurrent, Wrangles may not complete in a predictable order and it is not recommended to update overlapping columns with different wrangles.

See [here](https://wrangles.io/python/connectors/concurrent) for the Concurrent Connector.

## Tabset \{.tabset\}
### Sample
#### Running Wrangles Concurrently
<RecipePlayground
  editable={true}
  recipe={"wrangles:\n  - concurrent:\n      wrangles:\n        - extract.codes:\n        \t  input: Products\n            output: Part Codes\n            \n        - extract.attributes:\n            input: Products\n            output: Attributes"}
  exampleSource={"<div className=\"table-scroll\">\n<table>\n<tr><th></th><th></th><th></th></tr>\n<tr><td>\n  \n| Products |\n|:--------:|\n| SKF ball brg 2\" od 6202 |\n| brg seal 1\" id 5493 |\n| 3lb hammer 87102 |\n\n</td><td>\n→ \n</td><td>\n\n| Products | Part Codes | Attributes |\n|:--------:|:----------:|:----------:|\n| ball brg 2\" od 6202 | 6202 | \\{\"length\":[\"2in\"]\\} |\n| brg seal 1\" id 5493 | 5493 | \\{\"length\":[\"1in\"]\\} |\n| 3lb hammer 87102 | 87102 | \\{\"weight\":[\"3lb\"]\\} |\n    \n</td></tr>\n</table>\n</div>"}
/>

### Parameters
<div className="table-scroll">
 
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| wrangles | ✓ | list | The wrangles section of a recipe to execute for each combination of variables | 
| max_concurrency | | int | The maximum number of wrangles to execute in parallel |
</div>




  
# Matrix
Apply a matrix of wrangles to the dataframe. This will run the wrangles for each combination of the variables. Click [here](https://wrangles.io/en/python/connectors/matrix) for the connector equivalent of this wrangle.

## Tabset \{.tabset\}
### Sample
#### Using Hardcoded Variables
Run a simple custom function with a variable that is a list of values

<RecipePlayground
  recipe={`wrangles:
  - matrix:
      variables:
        var: [A,B,C]
      wrangles:
        - custom.test_fn:
            input: Col1
            output: Part Code \${var}
            value: \${var}`}
  exampleSource={"<div className=\"table-scroll\">\n<table>\n<tr><th></th><th></th><th></th></tr>\n<tr><td>\n\n| Part Code | \n|:---------:|\n| 6202      |\n| br549     |\n| 554-114   |\n| 554-112   |\n\n</td><td>\n→ \n</td><td>\n\n| Part Code | Part Code A | Part Code B | Part Code C |\n|:---------:|:-----------:|:-----------:|:-----------:|\n| 6202      | 6202A       | 6202B       | 6202C       |\n| br549     | br549A      | br549B      | br549C      |\n| 554-114   | 554-114A    | 554-114B    | 554-114C    |\n| 554-112   | 554-112A    | 554-112B    | 554-112C    |\n  \n</td></tr>\n</table>\n</div>"}
/>

```python
def test_fn(Col1, value):
    return Col1 + value
```

#### Using Unique Variables Per Row
Unique variables for each row can be utlized by following the example below where a different model id is used for each row.

<RecipePlayground
  editable={true}
  recipe={"wrangles:\n  - matrix:\n      variables:\n        model_id: set(Model ID)\n      wrangles:\n        - extract.custom:\n            input: Description\n            output: Extracted Values\n            model_id: ${model_id}\n            where: \"[Model ID] = ?\"\n            where_params:\n               - ${model_id}"}
  exampleSource={"<div className=\"table-scroll\">\n<table>\n<tr><th></th><th></th><th></th></tr>\n<tr><td>\n\n| Description | Model ID |\n|:-----------:|:--------:|\n| The SKF 6202 bearing is the best bearing in the world | xxxxxxxx-xxxx-xxxx |\n| The Timken 6102 bearing is indestructible | yyyyyyyy-yyyy-yyyy |\n| The Milwaukee impact has 1200lft-lbs of torque | zzzzzzzz-zzzz-zzzz |\n\n</td><td>\n→ \n</td><td>\n\n| Description | Model ID | Extracted Values |\n|:-----------:|:--------:|:----------------:|\n| The SKF 6202 bearing is the best bearing in the world | xxxxxxxx-xxxx-xxxx | 6202 |\n| The Timken 6102 bearing is indestructible | yyyyyyyy-yyyy-yyyy | indestructible |\n| The Milwaukee impact has 1200lft-lbs of torque | zzzzzzzz-zzzz-zzzz | 1200ft-lbs |\n  \n</td></tr>\n</table>\n</div>"}
/>

### Parameters
<div className="table-scroll">
 
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| variables | ✓ | dict | A dictionary of variables to pass to the wrangle. The key is the variable name and the value is a list of values. |
| wrangles | ✓ | list | The wrangles to apply to the dataframe. Each wrangle will be run for each combination of the variables. |
| functions | | function, list  | Any user defined custom functions. |
| strategy | | str | Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists until the longest is completed. permutations uses the combination of all variables against all other variables. |
</div>


# Try
Try a list of wrangles and catch any errors that occur

## Tabset \{.tabset\}
### Sample
#### Using Try in a Recipe
<RecipePlayground
  recipe={`wrangles:
  - try:
      wrangles:
        - risky_wrangle:
            input: column
      except:
        - backup_wrangle:
            input: column`}
/>

### Parameters
<div className="table-scroll">
 
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame |  |
| wrangles | ✓ | list | List of wrangles to apply |
| except | | list | An action to take if the wrangles encounter an error. This can contain a list of wrangles or a dictionary of column names and values. If except is not provided, the error will be logged and the recipe will continue. |
| functions | | function, list, dict | User provided custom functions to be used in the Try. |
| variables | | dict | Variables to be used in the Try. |
| retries | | int | Number of times to retry the wrangles if an error occurs. Default 0. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>