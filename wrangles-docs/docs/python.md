---
title: "Python"
slug: /python
---

- [Installation Guide *Not installed the package yet? Learn how.*](/python/install)
\{.links-list\}
---

# What are Wrangles?

Wrangles are a set of modular transformations for data cleaning and enrichment. Each Wrangle is optimized for a particular job, many of which are backed by sophisticated machine learning models.

With Wrangles, you can:
- Extract information from a set of messy descriptions.
- Predict which category items belong to.
- Standardize text data to a desired format.
- Move data from one system to another.
- Much more...

Wrangles are system independent, and allow you to pull data from one system, transform it and push it to another. By using the Wrangles python package, Wrangles can be incorporated directly into python code, or an automated sequence of wrangles can be run as a recipe.

# Functions
- [Functions *Incorporate Wrangles directly into python code*](/python/functions)
\{.links-list\}

```python
>>> wrangles.extract.attributes('it is 15mm long')
{'length': ['15mm']}
```

# Recipes
- [Recipes *Run a series of Wrangles in an automated sequence*](/python/recipes)
\{.links-list\}
```python
wrangles.recipe.run('recipe.wrgl.yml')
```



# Connectors
- [Connectors *Connect data from other systems as a function or in a recipe*](/python/connectors)
\{.links-list\}
```yaml
read:
  - file:
      name: myfile.xlsx
```