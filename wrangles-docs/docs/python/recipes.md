---
title: "Recipes"
slug: /python/recipes
---

import RecipePlayground from '@site/src/components/RecipePlayground';


Recipes allow a series of Wrangles to be defined and run as an automated sequence.

# The Four Rs

Recipes are written with [YAML](https://en.wikipedia.org/wiki/YAML) and follow a typical [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load) format. Recipes are divided into four main sections:

- [:book: Read *Import data from different sources*](/python/recipes/read)
- [:cowboy_hat_face: Wrangles *Manipulate the structure and content of the data*](/wrangle)
- [:pen: Write *Export data to different targets*](/python/recipes/write)
- [:runner: Run *Run a recipe or connector at the start, on success or on failure of a recipe.*](/python/recipes/run)
\{.links-list\}

# Example
> Autocompletion and validation can be added in many code editors.
> [Set up Recipe Validation](/python/recipes/schema)
\{.is-info\}

## Tabset \{.tabset\}
### Sample

#### Example Run Command

```python
wrangles.recipe.run(recipe = 'my_recipe.wrgl.yml', variables = my_variables, dataframe = my_data, functions = [my_function], timeout = 30)
```
> **Recipes execute code. Be careful running recipes from remote sources. Only run recipes from sources you trust.**
\{.is-warning\}

### Parameters
<div className="table-scroll">
 
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| recipe | ✓ | str | YAML recipe, **filepath** to a YAML file containing the recipe, **url** to a YAML file containing the recipe or a **model id** to the recipe. | 
| variables | | dict | (Optional) A dictionary of custom variables to override placeholders in the recipe. Variables can be indicated as $\{MY_VARIABLE\}. Variables can also be overwritten by Environment Variables. |
| dataframe | | Pandas Dataframe | (Optional) Pass in a pandas dataframe, instead of defining a read section within the YAML |
| functions | | list, dict | (Optional) A function or list of functions that can be called as part of the recipe. Functions can be referenced as custom.function_name |
| timeout | | str | (Optional) Set a timeout for the recipe in seconds. If not provided, the time is unlimited. |
</div>

> **Recipes execute code. Be careful running recipes from remote sources. Only run recipes from sources you trust.**
\{.is-warning\}

## Example Recipe
```yaml
# file: recipe.wrgl.yml
# ---
# Convert a CSV file to an Excel file
# and change the case of a column.
read:
  - file:
      name: file.csv
    
wrangles:
  - convert.case:
      input: column
      case: upper

write:
  - file:
      name: file.xlsx
```

> To run a recipe from a recipe, see the [recipe connector](/python/connectors/recipe)
\{.is-info\}

## Dynamic Column Selections

For *input* for wrangles, and *columns* for read and write, a variety of tools can be used to dynamically select which columns to use.

### Wildcards
A (*) can be used as a wildcard character to match any characters.

<RecipePlayground
  editable={true}
  recipe={"# Using concatenate to combine multiple columns.\nwrangles:\n  - merge.concatenate:\n      input:\n        - Col* # This will match any column beginning 'Col'\n      output: Join Col\n      char: ', '"}
  exampleSource={"<div className=\"table-scroll\">\n<table>\n<tr><th></th><th></th><th></th></tr>\n<tr><td>\n\n| Col1   | Col2   | Col3   |\n|:-------|:-------|:-------|\n| A      | B      | C      |\n\n</td><td>\n→ \n</td><td>\n\n| Join Col   |\n|:------------:|\n| A, B, C      |\n  \n</td></tr>\n</table>\n</div>"}
/>

### Optional Columns
Wrangles will generally fail if applied to a column that doesn't exist. A question mark (?) can be added to the end of a column name to make it optional. This disables the validation, but may still fail if the column is essential to the functioning of the wrangle.

<RecipePlayground
  editable={true}
  recipe={"wrangles:\n  # Merge the contents of column1 and column2\n  # to a list. Also merge column3 if it exists,\n  # but do not fail if it does not exist\n  - merge.to_list:\n      input:\n        - Col1\n        - Col2\n        - Col3? # this will include Col3 if it exists\n      output: output_column"}
  exampleSource={"<div className=\"table-scroll\">\n<table>\n<tr><th></th><th></th><th></th></tr>\n<tr><td>\n\n| Col1   | Col2   |\n|:-------|:-------|\n| A      | B      |\n\n</td><td>\n→ \n</td><td>\n\n| output_column   |\n|:------------:|\n| ['A', 'B']      |\n\n</td></tr>\n</table>\n</div>"}
/>

### Exclude Columns
A dash (-) attached to the front of the column name will not include that column. Typically, this can be combined with a wildcard to find all columns matching a pattern except certain ones.

<RecipePlayground
  editable={true}
  recipe={"# Concatenate all columns beginning Col, except Col2\nwrangles:\n  - merge.concatenate:\n      input:\n        - Col*\n        - -Col2\n      output: Join Col\n      char: ', '"}
  exampleSource={"<div className=\"table-scroll\">\n<table>\n<tr><th></th><th></th><th></th></tr>\n<tr><td>\n\n| Col1   | Col2   | Col3   |\n|:-------|:-------|:-------|\n| A      | B      | C      |\n\n</td><td>\n→ \n</td><td>\n\n| Join Col   |\n|:------------:|\n| A, C      |\n  \n</td></tr>\n</table>\n</div>"}
/>

# Advanced Topics

- [Custom Functions *Incorporate custom python code into a recipe.*](/python/recipes/custom-functions)
- [Conditions *Use if or where to execute wrangles and connectors only in some circumstances or on subsets of the data*](/python/recipes/conditions)
- [Variables *Use environment or python variables in recipes. Pass secrets or enable recipes to be reusable.*](/python/recipes/variables)
\{.links-list\}