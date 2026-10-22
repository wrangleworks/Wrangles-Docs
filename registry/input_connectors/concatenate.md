---
schema_version: '0.2'
type: connector
catalog_id: '147'
catalog_key: connector.concatenate
catalog_kind: connector
runtime_key: concatenate
status: active
title: Concatenate
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Combine two or more data sets together, stacked horizontally.
    required:
      - sources
    properties:
      sources:
        type: array
        description: The data sources to be combined
        minItems: 1
        items:
          $ref: '#/$defs/read/items'
description: Combine two or more data sets together, stacked horizontally.
slug: connectors/concatenate
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/recipes/read.md
    title: Existing connector documentation
---

# Concatenate

Combine data from multiple sources, stacked horizontally.

```yaml
read:
  - concatenate:
      sources:
        - file:
            name: file1.xlsx
        - file:
            name: file2.xlsx
```
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th><th></th><th></th></tr>
<tr><td>

| column |
| :-----: |
| a |

</td><td>

\+

</td><td>

| column |
| :-----: |
| b |

</td><td>

→
</td><td>

| column | column |
| :-----: | :---: |
| a | b |

</td></tr>
</table>
</div>
