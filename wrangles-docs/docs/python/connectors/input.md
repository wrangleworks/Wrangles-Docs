---
title: "Input"
slug: /python/connectors/input
---

The input connector allows users to read in the default dataframe that was pass through to the recipe. This connector can only be used to read.

# Recipe
```yml
read:
  - input:
      columns:
      	- Col1
        - Col2
        - Col3
```


#### Parameters

<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| columns | | str, list | Subset of the columns to be read. If not provided, all columns will be input. |
| where | | str | Filter the data to only apply the wrangle to certain rows using an equivalent to a SQL where criteria, such as column1 = 123 OR column2 = 'abc' |

</div>