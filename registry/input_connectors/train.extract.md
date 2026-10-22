---
schema_version: '0.2'
type: connector
catalog_id: '141'
catalog_key: connector.train.extract
catalog_kind: connector
runtime_key: train.extract
status: active
title: Train Extract
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Read the training data for an Extract Wrangle
    additionalProperties: false
    required:
      - model_id
    properties:
      model_id:
        type: string
        description: Specific model to read
  write:
    type: object
    description: Train a new or existing Extract Wrangle
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
        enum:
          - pattern
          - ai
        description: Variant for a new model; inferred from model_id on updates
      settings:
        type: object
        description: Extract-AI content settings; supplied keys override existing settings on updates
        properties:
          GeneralInstructions:
            title: General Instructions
            type:
              - string
              - array
              - 'null'
            items:
              type: string
            description: >-
              Guidance applied to every extraction. Use an empty string, null, or an empty list to
              clear saved instructions. AdditionalMessages remains a supported legacy alias.
description: Read the training data for an Extract Wrangle
slug: connectors/train.extract
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/train.md#extract
    title: Existing connector documentation
---

# Train Extract

### Read
#### Recipe
```yaml
read:
  - train.extract:
      model_id: xxxxxxxx-xxxx-xxxx
```

##### Output

<div className="table-scroll">

| Entity to Find | Variation (Optional) | Notes |
| :------------- | :------------------- | :---- |
| Ball Bearing | bearing, ball | |
| Needle Bearing | needle, bearing | |
| Roller Bearing | roller, bearing | |

</div>

#### Function
```python
from wrangles.connectors import train
df = train.extract.read(model_id = 'xxxxxxxx-xxxx-xxxx')
```

##### Output

<div className="table-scroll">

| Entity to Find | Variation (Optional) | Notes |
| :------------- | :------------------- | :---- |
| Ball Bearing | bearing, ball | |
| Needle Bearing | needle, bearing | |
| Roller Bearing | roller, bearing | |

</div>

### Write
#### Recipe
Update the training data for an existing extract wrangle.

```yaml
write:
  - train.extract:
      columns:
        - Entity to Find
        - Variation (Optional)
        - Notes
      model_id: xxxxxxxx-xxxx-xxxx
```

#### Function
Create a new classify wrangle.
```python
from wrangles.connectors import train
import pandas as pd

df = pd.DataFrame({
		'Entity to Find': ['Ball Bearing', 'Needle Bearing', 'Roller Bearing'],
    'Variation': ['bearing, ball', 'needle, bearing', 'roller, bearing'],
    'Notes': ['', '', '', '']
})

train.extract.write(df = df, name = 'Bearing Types')
```

> Note both name and model_id **cannot** be used together. Name is used when creating models and model_id is used when updating an existing model.
