---
title: "Train"
slug: /python/connectors/train
---

> Added v1.0
\{.is-info\}

A connector that can read and write training data to and from wrangles. Useful for updating wrangles training data without having to open Excel.

# Tabset \{.tabset\}
## Classify
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

##### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| model_id | ✓ | str | Model id of wrangle to be read from |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

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

##### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| model_id | ✓ | str | Model id of wrangle to be read from |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

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
##### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| columns | | list | List of columns to use for update/wrangle creation, defaults to none |
| model_id | | str | Model id of wrangle to update. Only use for existing wrangles, defaults to none |
| name | | str | Name of wrangle that is being created, defaults to none |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

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
##### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | Pandas DataFrame | Dataframe consisting of training data to be used |
| columns | | list | List of columns to use for update/wrangle creation, defaults to none |
| model_id | | str | Model id of wrangle to update. Only use for existing wrangles, defaults to none |
| name | | str | Name of wrangle that is being created, defaults to none |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

> Note both name and model_id **cannot** be used together. Name is used when creating models and model_id is used when updating an existing model.
\{.is-note\}

## Extract
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
##### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| columns | | list | List of columns to use for update/wrangle creation, defaults to none |
| model_id | | str | Model id of wrangle to update. Only use for existing wrangles, defaults to none |
| name | | str | Name of wrangle that is being created, defaults to none |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

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
##### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | Pandas DataFrame | Dataframe consisting of training data to be used |
| columns | | list | List of columns to use for update/wrangle creation, defaults to none |
| model_id | | str | Model id of wrangle to update. Only use for existing wrangles, defaults to none |
| name | | str | Name of wrangle that is being created, defaults to none |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

> Note both name and model_id **cannot** be used together. Name is used when creating models and model_id is used when updating an existing model.
\{.is-note\}

## Lookup
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
##### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| settings | | dict | Specific settings to apply to the wrangle. Settings include variant which can be key or semantic. **Settings must be used when creating a new lookup**. |
| model_id | | str | Model id of wrangle to update. Only use for existing wrangles, defaults to none |
| name | | str | Name of wrangle that is being created, defaults to none |
| columns | | str, list | The columns you wish to write to the Wrangle. **Note**: Columns must include one column named Key which will be used for the value to be looked up. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

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

##### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | Pandas DataFrame | Dataframe consisting of training data to be used |
| settings | | dict | Specific settings to apply to the wrangle. Settings include variant which can be key or semantic. **Settings must be used when creating a new lookup**. |
| model_id | | str | Model id of wrangle to update. Only use for existing wrangles, defaults to none |
| name | | str | Name of wrangle that is being created, defaults to none |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

> Note both name and model_id **cannot** be used together. Name is used when creating models and model_id is used when updating an existing model.
\{.is-note\}

## Standardize
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
##### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| columns | | list | List of columns to use for update/wrangle creation, defaults to none |
| model_id | | str | Model id of wrangle to update. Only use for existing wrangles, defaults to none |
| name | | str | Name of wrangle that is being created, defaults to none |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

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
##### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | Pandas DataFrame | Dataframe consisting of training data to be used |
| columns | | list | List of columns to use for update/wrangle creation, defaults to none |
| model_id | | str | Model id of wrangle to update. Only use for existing wrangles, defaults to none |
| name | | str | Name of wrangle that is being created, defaults to none |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

> Note both name and model_id **cannot** be used together. Name is used when creating models and model_id is used when updating an existing model.
\{.is-note\}