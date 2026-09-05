---
title: "Write"
slug: /python/recipes/write
---

- [Connectors *Learn about the available connectors*](/python/connectors)
\{.links-list\}

# Data Frame
By default, the output data can be returned as a Pandas Dataframe for further manipulation.

```python
df = wrangles.recipe.run('recipe.wrgl.yml')
```

It is possible to define the returned dataframe within the `write` section. If omitted, all columns will be included.

```yaml
# Return a Dataframe with specified columns
write:
  - dataframe:
      columns:
        - ID Number
        - Product Properties
        - Product Name in French
```

# External Writes

A variety of connectors are available to write the Wrangled data out to different targets such as files or databases.

Multiple write targets can be specified.

```yaml
write:
  # To an Excel file
  - file:
      name: file.xlsx
      sheet_name: sheet_name
      columns:
        - ID Number
        - Product Properties
        - Product Name in French
	
  # To a Microsoft SQL Server
  - mssql:
      host: sql.domain
      database: database
      table: table
      user: user
      password: password
```

# Where

It is possible to include a where condition within any write to filter the data. This uses SQL syntax to specify the condition for the rows.

```yaml
# Save only the rows where the value
# in my_column is greater than 10
write:
  - file:
      name: output.xlsx
      where: my_column > 10
```