---
title: Standalone
slug: /python/recipes/wrangles/standalone
---

import RecipePlayground from '@site/src/components/RecipePlayground';


# Recipe

> Added **v0.5**
\{.is-info\}

Run a recipe as a wrangle. Click [here](https://wrangles.io/en/python/connectors/recipe) for the connector equivalent of this wrangle.

## Tabset \{.tabset\}
### Sample

#### Recipe Call Using Name

<RecipePlayground
  recipe={`wrangles:
  - recipe:
      name: recipe1.wrgl.yaml
`}
/>
The output columns of the Wrangle-Recipe will be added to the dataframe.

#### Imbedded Sub-Recipe

<RecipePlayground
  recipe={`wrangles:
	- recipe:
  		output: Description Refined
  		wrangles:
      	- merge.to_list:
        		input: Attributes
            output: Words to Remove
            
        - remove_words:
        		input: Description
            output: Description Refined`}
/>
            

### Parameters
<div className="table-scroll">
 
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| name | | str | File name/path of the recipe or the model id. Cannot be used in conjunction with wrangles. |
| wrangles | | list | The wrangles to run. Cannot be used in conjunction with name. |
| input | | str, list | Columns to only apply the recipe to. | 
| output | | str, list | Columns to output from the recipe. |
| variables | | dict | A dictionary of variables to pass to the recipe, defaults to pass all variables through. |
| output_columns | | str, list | Columns to output from the recipe, defaults to none. |
| functions | | str, list | A list of functions used in the recipe |
| where | | str | Filter the data to only apply the wrangle to certain rows using an equivalent to a SQL where criteria, such as column1 = 123 OR column2 = 'abc' |
| where_params | | str | Variables to use in conjunctions with where. This allows the query to be parameterized. This uses sqlite syntax (? or :name) |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>
