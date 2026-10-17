---
schema_version: '0.2'
type: connector
catalog_id: '144'
catalog_key: connector.train.standardize
catalog_kind: connector
runtime_key: train.standardize
status: active
title: Train Standardize
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Read the training data for a Standardize Wrangle
    additionalProperties: false
    required:
      - model_id
    properties:
      model_id:
        type: string
        description: Specific model to read
  write:
    type: object
    description: Train a new or existing Standardize Wrangle
    additionalProperties: false
    properties:
      name:
        type: string
        description: Name to give to a new Wrangle that will be created
      model_id:
        type: string
        description: Model to be updated. Either this or a name must be provided
      columns:
        type: array
        description: Columns to submit
description: Read the training data for a Standardize Wrangle
slug: connectors/train.standardize
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/train.md#standardize
    title: Existing connector documentation
---

# Train Standardize

### Read
#### Recipe
```yaml
read:
  - train.standardize:
      model_id: xxxxxxxx-xxxx-xxxx
```

##### Output

<div className="table-scroll">

| Find | Replace | Notes |
| :--- | :------ | :---- |
| Pizza | Hamburger | |
| Beef | Chicken | |
| Bagel | Donut | |
| Taco | Burrito | |

</div>

#### Function
```python
from wrangles.connectors import train
df = train.standardize.read(model_id = 'xxxxxxxx-xxxx-xxxx')
```

##### Output

<div className="table-scroll">

| Find | Replace | Notes |
| :--- | :------ | :---- |
| Pizza | Hamburger | |
| Beef | Chicken | |
| Bagel | Donut | |
| Taco | Burrito | |

</div>

### Write
#### Recipe
Update the training data for an existing standardize wrangle.

```yaml
write:
  - train.standardize:
      columns:
        - Find
        - Replace
        - Notes
      model_id: xxxxxxxx-xxxx-xxxx
```

#### Function
Create a new standardize wrangle.
```python
from wrangles.connectors import train
import pandas as pd

df = pd.DataFrame({
		'Find': ['Pizza', 'Beef', 'Bagel', 'Taco'],
    'Replace': ['Hamburger', 'Chicken', 'Donut', 'Burrito'],
    'Notes': ['', '', '', '']
})

train.standardize.write(df = df, name = 'Menu Updates')
```

> Note both name and model_id **cannot** be used together. Name is used when creating models and model_id is used when updating an existing model.
