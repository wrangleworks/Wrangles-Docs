---
schema_version: '0.2'
type: connector
catalog_id: '142'
catalog_key: connector.train.lookup
catalog_kind: connector
runtime_key: train.lookup
status: active
title: Train Lookup
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Read the training data for a Lookup Wrangle
    additionalProperties: false
    required:
      - model_id
    properties:
      model_id:
        type: string
        description: Specific model to read
  write:
    type: object
    description: Train a new or existing Lookup Wrangle
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
      variant:
        type: string
        description: Variant of the Lookup Wrangle that will be created
        enum:
          - key
          - semantic
    action:
      type: string
      description: Action to take when training the lookup wrangle
      enum:
        - insert
        - update
        - upsert
        - overwrite
description: Read the training data for a Lookup Wrangle
slug: connectors/train.lookup
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/train.md#lookup
    title: Existing connector documentation
---

# Train Lookup

### Read
#### Recipe
```yaml
read:
  - train.lookup:
      model_id: xxxxxxxx-xxxx-xxxx
```

##### Output

<div className="table-scroll">

| Key | Value1 | Value2 |
| :--- | :------ | :---- |
| Pizza | Thin Crust | Deep Dish |
| Hamburger | Single | Double |
| Salad | Garden | Ceasar |
| Taco | Soft | Crispy |

</div>

#### Function
```python
from wrangles.connectors import train
df = train.lookup.read(model_id = 'xxxxxxxx-xxxx-xxxx')
```

##### Output

<div className="table-scroll">

| Key | Value1 | Value2 |
| :--- | :------ | :---- |
| Pizza | Thin Crust | Deep Dish |
| Hamburger | Single | Double |
| Salad | Garden | Ceasar |
| Taco | Soft | Crispy |

</div>

### Write
#### Recipe
Update the training data for an existing lookup wrangle.

```yaml
write:
  - train.lookup:
      model_id: xxxxxxxx-xxxx-xxxx
```

#### Function
Create a new lookup wrangle.
```python
from wrangles.connectors import train
import pandas as pd

df = pd.DataFrame({
		'Key': ['Pizza', 'Hamburger', 'Salad', 'Taco'],
    'Value1': ['Thin Crust', 'Single', 'Garden', 'Soft'],
    'Value2': ['Deep Dish', 'Double', 'Ceasar', 'Crispy']
})

train.lookup.write(df = df, name = 'Menu Updates', settings = {'variant': 'key'})
```

> Note both name and model_id **cannot** be used together. Name is used when creating models and model_id is used when updating an existing model.
