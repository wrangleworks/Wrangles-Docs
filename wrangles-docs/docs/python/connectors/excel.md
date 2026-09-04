---
title: "Excel"
slug: /python/connectors/excel
---

> Note: The Excel connector is only to be used in recipes within WranglesXL and will not function properly otherwise.
\{.is-warning\}

The Excel connector allows users to define which sheet and where to write the output, write to multiple sheets, write to sheets dynamically or return data at different stages of the recipe. More configuration options will be added over time.


## Write
### Tabset \{.tabset\}
#### Recipe
```yml
write:
  - excel.sheet:
      name: NewSheet
      cell: C3
```

#### Function
The Excel connector can be utilized in a custom function but please remember that it was built only to function within WranglesXL and will function properly otherwise.

```python
from wrangles.connectors import excel
excel.write(df=my_dataframe, name='NewSheet', cell = 'C3')  
```

#### Parameters

<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| name | | str | Name of the sheet to write to. If omitted, will default to the name of the recipe. |
| columns | | list | Subset of the columns to be written. If not provided, all columns will be output. |
| not_columns | | list | Subset of the columns to be left out. |
| cell | | str | The top left cell to write the data from. Default A1. |
| action | | str | Action (append, increment, or overwrite) to take when writing the data if the sheet already exists. Default append. Append: add to the existing sheet. Increment: add a new sheet with an incrementing number. Overwrite: replace existing sheet. |
| freezepanes | | bool | If true, will freeze the first row. Default false. |
| as_table | | bool | If true, will write the data as an Excel table. Default true. |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

</div>