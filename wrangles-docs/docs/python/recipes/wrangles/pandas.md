---
title: "Pandas"
slug: /python/recipes/wrangles/pandas
---

import RecipePlayground from '@site/src/components/RecipePlayground';


> Pandas functions within Wrangles are currently under development and therefore do not possess all the functionality of pandas or other Wrangles. See below for details.
\{.is-warning\}

Pandas functions within recipes allow users to employ the powerful [pandas](https://pandas.pydata.org/) Python package seamlessly into their recipe without using any custom code or writing any Python script. Pandas is a very powerful data tool with a wide range of functions, but there are some restrictions as to which pandas functions work in a recipe. Of course, any pandas functions which do not work in a recipe will still work within a [custom function](https://wrangles.io//en/python/recipes/custom-functions).

**Note:** These are just a very small handful of examples for pandas functions, many of which have a native Wrangles counterpart which will be noted below each example where applicable.

# pandas.drop_duplicates

## Removing Duplicate Rows

<RecipePlayground
  editable={true}
  recipe={"wrangles:\n  - pandas.drop_duplicates: {}"}
  exampleSource={"<div className=\"table-scroll\">\n<table>\n<tr><th></th><th></th><th></th></tr>\n<tr><td>\n  \n| Part Number | Item |\n|:--------|:--------|\n| 123456 | ball bearing |\n| 789123 | angle grinder |\n| 456789 | screwdriver |\n| 123456 | ball bearing |\n\n</td><td>\n→ \n</td><td>\n  \n| Part Number | Item |\n|:--------|:--------|\n| 123456 | ball bearing |\n| 789123 | angle grinder |\n| 456789 | screwdriver |\n</td></tr>\n</table>\n</div>"}
/>


> This example does not use any parameters, see [pandas.drop_duplicates](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html) for function parameters.
\{.is-note\}

See [format.remove_duplicates](/wrangle/format#remove-duplicates) for the native Wrangle equivalent.

# pandas.groupby
## Tabset \{.tabset\}
### Sample

#### Group DataFrame using a mapper or by a Series of columns.

<RecipePlayground
  editable={true}
  recipe={"wrangles:\n  - pandas.groupby:\n      parameters:\n        by: Product Type"}
  exampleSource={"<div className=\"table-scroll\">\n<table>\n<tr><th></th><th></th><th></th></tr>\n<tr><td>\n  \n| Product Type | Description |\n|:--------|:--------|\n| bearings | 14mm skf radial ball bearing |\n| hardware | 1/4-20x3\" machine screw |\n| bearings | 3\"odx2.5\"id thrust bearing |\n| hardware | m6x35mm stainless steel bolt |\n\n</td><td>\n→ \n</td><td>\n  \n| Product Type | Description |\n|:--------|:--------|\n| bearings | 14mm skf radial ball bearing |\n| bearings | 3\"odx2.5\"id thrust bearing |\n| hardware | 1/4-20x3\" machine screw |\n| hardware | m6x35mm stainless steel bolt |\n</td></tr>\n</table>\n</div>"}
/>

### Parameters
<div className="table-scroll">
 
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| parameters | ✓ | dictionary | The "parameters" parameter is a dictionary of all the parameters needed for the function | 
| by | ✓ | str, list | mapping, function, str, or iterable to be used for grouping |
| where | | str | Filter the data to only apply the wrangle to certain rows using an equivalent to a SQL where criteria, such as column1 = 123 OR column2 = 'abc' |
| where_params | | str | Variables to use in conjunctions with where. This allows the query to be parameterized. This uses sqlite syntax (? or :name) |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>

> More parameters for this function can be found in the [pandas.groupby](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.groupby.html) documentation.
\{.is-note\}

See [select.group_by](/wrangle/select#group-by) for the native Wrangles equivalent.

# pandas.sample

## Tabset \{.tabset\}
### Sample

#### Selects a random sample from the dataframe

<RecipePlayground
  editable={true}
  recipe={"wrangles:\n  - pandas.sample:\n      parameters:\n      \tn: 2"}
  exampleSource={"<div className=\"table-scroll\">\n<table>\n<tr><th></th><th></th><th></th></tr>\n<tr><td>\n  \n| Voltage | Current | Resistance |\n|:--------|:--------|:-----------|\n| 12v | 6a | 2ohm |\n| 18v | 6a | 3ohm |\n| 24v | 12a | 2ohm |\n| 36v | 12a | 3ohm |\n\n</td><td>\n→ \n</td><td>\n  \n| Voltage | Current | Resistance |\n|:--------|:--------|:-----------|\n| 12v | 6a | 2ohm |\n| 24v | 12a | 2ohm |\n</td></tr>\n</table>\n</div>"}
/>

### Parameters
<div className="table-scroll">
 
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| n | | integer | The number of rows to be selected, defaults to 1. |
| where | | str | Filter the data to only apply the wrangle to certain rows using an equivalent to a SQL where criteria, such as column1 = 123 OR column2 = 'abc' |
| where_params | | str | Variables to use in conjunctions with where. This allows the query to be parameterized. This uses sqlite syntax (? or :name) |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>

> See [pandas.sample](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.sample.html) for more parameters and information on this function.
\{.is-note\}

See [select.sample](/wrangle/select#sample) for the native Wrangles equivalent.


# Restrictions

Pandas functions within recipes are restricted to those that return a dataframe, or a column of the same length as the input dataframe. Functions which return return a series or an object will have to have [custom functions](https://wrangles.io/python/recipes/custom-functions) written in order to work.

Some functions may work on the dataframe as a whole but not on individual columns. If this occurs, try running the function on the entire dataframe and verify that the results are what was intended.