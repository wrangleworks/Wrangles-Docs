---
title: "Memory"
slug: /python/connectors/memory
---

The memory connector allows saving dataframes and variables in memory for communication between successive wrangles and recipes. All contents of the memory connector are lost once the python script finishes executing.

# Tabset \{.tabset\}
## Read
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

### Parameters

<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| id | | str | A unique ID to identify the data. If not specified, will read the last dataframe saved in memory |
| orient | | str | Set the arrangement of the data. See [pandas.DataFrame.to_dict](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_dict.html) method for options. Defaults to tight. |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

</div>

## Write
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

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | pandas dataframe | Dataframe to be exported |
| id | | str | A unique ID to identify the data. If not specified, will read the last dataframe saved in memory |
| orient | | str | Set the arrangement of the data. See [pandas.DataFrame.to_dict](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_dict.html) method for options. Defaults to tight. |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

## Clear
Clear and reset any existing data stored in the connector.

### Function
```python
from wrangles.connectors import memory
import pandas as pd

df = pd.read_csv('example.csv')
memory.write(df=df, id='1234')
memory.clear()
```