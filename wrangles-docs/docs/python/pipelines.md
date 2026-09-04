---
title: "Pipelines"
slug: /python/pipelines
---

- [Recipes *Pipelines run recipes, learn how to write them here.*](/python/pipelines/recipes)
\{.links-list\}

---

Pipelines allow a series of wrangles to be executed. Pipelines are based around [Pandas Dataframes](https://pandas.pydata.org/docs/index.html), although they do not require knowledge of pandas to get started.



# Pipeline.Run

```python
import wrangles
wrangles.pipeline.run('recipe.wrgl.yml')
```
pipeline.run is the main function to execute a pipeline. It executes a recipe, as a string or from a yaml file, and optionally a list of placeholder variables and a dataframe.

## Parameters
| Parameter | Data Type | Required | Notes |
| :-------- | :-------- | :------- | :---- |
| **recipe** | *string* |  ✓ | Either a YAML recipe as a string or a path to a YAML file |
| **params** | *dict* |  | A dictionary of variables to overwrite placeholders in the recipe |
| **dataframe** | *dataframe* |  | This can be used instead of read in a recipe to provide a pre-created pandas dataframe. Either this or a read section must be provided. |

## Returns

If a write section of the recipe is defined, the data can be written to external systems such as files or databases.

The function also returns a dataframe of the transformed data if requested.

## Samples

```python
# Run a recipe defined as a string
recipe = """
read:
  file:
    name: file.csv
  
write:
  file:
    name: file.json
"""

wrangles.pipeline.run(recipe)
```
```python
# Run a recipe from a file
wrangles.pipeline.run('recipe.wrgl.yml')
```
```python
# Return a dataframe
df = wrangles.pipeline.run(recipe)
```
```python
# Provide variables to overwrite placeholders in a recipe
wrangles.pipeline.run(recipe, params={'myplaceholder':'myvalue'})
```
```python
# Run on a pre-created dataframe
df = pandas.DataFrame([['a', 'b'], ['c', 'd']], columns = ['Header1', 'Header2'])

wrangles.pipeline.run(recipe, df)
```