---
schema_version: '0.2'
type: connector
catalog_id: '119'
catalog_key: connector.memory
catalog_kind: connector
runtime_key: memory
status: active
title: Memory
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: >-
      The memory connector allows saving dataframes and variables in memory for communication
      between successive wrangles and recipes. All contents of the memory connector are lost once
      the python script finishes executing.
    properties:
      id:
        type: string
        description: >-
          A unique ID to identify the data. If not specified, will read the last dataframe saved in
          memory
      orient:
        type: string
        enum:
          - dict
          - list
          - split
          - tight
          - index
        description: >-
          Set the arrangement of the data. See pandas.DataFrame.to_dict method for options. Default
          is tight
  write:
    type: object
    description: >-
      The memory connector allows saving dataframes and variables in memory for communication
      between successive wrangles and recipes. All contents of the memory connector are lost once
      the python script finishes executing.
    properties:
      id:
        type: string
        description: A unique ID to identify the data
      orient:
        type: string
        enum:
          - dict
          - list
          - split
          - tight
          - index
        description: >-
          Set the arrangement of the data. See pandas.DataFrame.to_dict method for options. Default
          is tight
description: >-
  The memory connector allows saving dataframes and variables in memory for communication between
  successive wrangles and recipes. All contents of the memory connector are lost once the python
  script finishes executing.
slug: connectors/memory
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/memory.md
    title: Existing connector documentation
---

# Memory

The memory connector allows saving dataframes and variables in memory for communication between successive wrangles and recipes. All contents of the memory connector are lost once the python script finishes executing.

### Read
### Recipe
```yaml
read:
  - memory:
      id: '1234'
```

### Function
```python
from wrangles.connectors import memory
df = memory.read(id='1234')
```

### Write
### Recipe
```yaml
write:
  - memory:
      id: '1234'
```

### Function
```python
from wrangles.connectors import memory
import pandas as pd

df = pd.read_csv('example.csv')
memory.write(df=df, id='1234')
```

### Clear
Clear and reset any existing data stored in the connector.

### Function
```python
from wrangles.connectors import memory
import pandas as pd

df = pd.read_csv('example.csv')
memory.write(df=df, id='1234')
memory.clear()
```
