---
schema_version: '0.2'
type: connector
catalog_id: '148'
catalog_key: connector.dataframe
catalog_kind: connector
runtime_key: dataframe
status: active
title: Dataframe
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  write:
    type: object
    description: >-
      Define the dataframe returned from recipe.run(). Retains its generic Python return-value
      behavior. In Excel this is also legacy columns-mode syntax; prefer excel.columns for an
      explicit spreadsheet write mode.
    properties: {}
description: >-
  Define the dataframe returned from recipe.run(). Retains its generic Python return-value behavior.
  In Excel this is also legacy columns-mode syntax; prefer excel.columns for an explicit spreadsheet
  write mode.
slug: connectors/dataframe
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/recipes/write.md
    title: Existing connector documentation
---

# Dataframe

By default, the output data can be returned as a Pandas Dataframe for further manipulation.

```python
df = wrangles.recipe.run('recipe.wrgl.yml')
```

It is possible to define the returned dataframe within the `write` section. If omitted, all columns will be included.

```yaml
# Return a Dataframe with specified columns
write:
  - dataframe:
      columns:
        - ID Number
        - Product Properties
        - Product Name in French
```
