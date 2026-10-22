---
schema_version: '0.2'
type: connector
catalog_id: '140'
catalog_key: connector.train.classify
catalog_kind: connector
runtime_key: train.classify
status: active
title: Train Classify
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Read the training data for a Classify Wrangle
    additionalProperties: false
    required:
      - model_id
    properties:
      model_id:
        type: string
        description: Specific model to read
  write:
    type: object
    description: Train a new or existing Classify Wrangle
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
description: Read the training data for a Classify Wrangle
slug: connectors/train.classify
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/train.md#classify
    title: Existing connector documentation
---

# Train Classify

### Read
#### Recipe
```yaml
read:
  - train.classify:
      model_id: xxxxxxxx-xxxx-xxxx
```

##### Output

<div className="table-scroll">

| Example | Category | Notes |
| :------ | :------- | :---- |
| Apple | Fruit | |
| Broccoli | Vegetable | |
| Pear | Fruit | |
| Aperagus | Vegetable | |

</div>

#### Function
```python
from wrangles.connectors import train
df = train.classify.read(model_id = 'xxxxxxxx-xxxx-xxxx')
```

##### Output

<div className="table-scroll">

| Example | Category | Notes |
| :------ | :------- | :---- |
| Apple | Fruit | |
| Broccoli | Vegetable | |
| Pear | Fruit | |
| Asperagus | Vegetable | |

</div>

### Write
#### Recipe
Update the training data for an existing classify wrangle.

```yaml
write:
  - train.classify:
      columns:
        - Example
        - Category
        - Notes
      model_id: xxxxxxxx-xxxx-xxxx
```

#### Function
Create a new classify wrangle.
```python
from wrangles.connectors import train
import pandas as pd

df = pd.DataFrame({
		'Example': ['Apple', 'Broccoli', 'Pear', 'Asperagus'],
    'Category': ['Fruit', 'Vegitable', 'Fruit', 'Vegitable'],
    'Notes': ['', '', '', '']
})

train.classify.write(df = df, name = 'Fruits and Veggies')
```

> Note both name and model_id **cannot** be used together. Name is used when creating models and model_id is used when updating an existing model.
