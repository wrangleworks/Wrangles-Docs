---
schema_version: '0.2'
type: connector
catalog_id: '116'
catalog_key: connector.input
catalog_kind: connector
runtime_key: input
status: active
title: Input
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: This connector can be used to reference the default dataframe that was passed to the recipe.
    properties: {}
description: This connector can be used to reference the default dataframe that was passed to the recipe.
slug: connectors/input
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/input.md
    title: Existing connector documentation
---

# Input

The input connector allows users to read in the default dataframe that was pass through to the recipe. This connector can only be used to read.

### Recipe
```yaml
read:
  - input:
      columns:
        - Col1
        - Col2
        - Col3
```
