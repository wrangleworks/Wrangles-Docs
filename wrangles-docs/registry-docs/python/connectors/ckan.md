---
title: "Ckan"
slug: /python/connectors/ckan
---

The CKAN connector allows users to read and write data to/from CKAN servers.

# Tabset \{.tabset\}
## Read
### Recipe
```yaml
read:
  - ckan:
      host: https://data.example.com
      dataset: my-dataset
      file: example.csv
      api_key: my_key
```

### Function
```python
from wrangles.connectors import ckan
df = ckan.read(
    host='https://data.example.com',
    dataset='my-dataset',
    file='example.csv',
    api_key='my_key'
)
```

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| host | ✓ | str | The host name of the CKAN site. e.g. https://data.example.com |
| dataset | ✓ | str | The name of the dataset. This should be the url version e.g. my-dataset |
| file | ✓ | str | The name of the specific file within the dataset. e.g. example.csv |
| api_key | | str | API Key for the CKAN site |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |


## Write

### Recipe
```yaml
write:
  - ckan:
      host: https://data.example.com
      api_key: my_key
      dataset: my-dataset
      file: example.csv
```

### Function
```python
from wrangles.connectors import ckan
ckan.write(
    df,
    host='https://data.example.com',
    api_key='my_key',
    dataset='my-dataset',
    file='example.csv'
)
```

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame | **Function only.** DataFrame of contents to write to the database. Columns must match the target schema. |
| host | ✓ | str | The host name of the CKAN site. e.g. https://data.example.com |
| api_key | ✓ | str | API Key for the CKAN site |
| dataset | ✓ | str | The name of the dataset. This should be the url version e.g. my-dataset |
| file | ✓ | str | The name of the specific file within the dataset. e.g. example.csv |
| columns | | list | Subset of the columns to be written. If not provided, all columns will be output. |
| not_columns | ✓ | str | Subset of the columns to NOT be written. If not provided, all columns will be output. |
| where | ✓ | str | Filter the data to only apply the wrangle to certain rows using an equivalent to a SQL where criteria, such as column1 = 123 OR column2 = 'abc' |
| where_params | | str | Variables to use in conjunctions with where. This allows the query to be parameterized. This uses sqlite syntax (? or :name) |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |