---
schema_version: '0.2'
type: connector
catalog_id: '146'
catalog_key: connector.union
catalog_kind: connector
runtime_key: union
status: active
title: Union
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Combine two or more data sets together, stacked vertically. Equivalent to a union in SQL.
    required:
      - sources
    properties:
      sources:
        type: array
        description: The data sources to be combined
        minItems: 1
        items:
          $ref: '#/$defs/read/items'
description: Combine two or more data sets together, stacked vertically. Equivalent to a union in SQL.
slug: connectors/union
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/recipes/read.md
    title: Existing connector documentation
---

# Union

Combine data from multiple sources, stacked vertically, equivalent to a union in SQL.

Where headers differ, columns will be matched by name.

```yaml
read:
  - union:
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

| column |
| :-----: |
| a |
| b |

</td></tr>
</table>
</div>

> Union is the default aggregation for multiple reads.
