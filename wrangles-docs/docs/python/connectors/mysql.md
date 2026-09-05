---
title: "Mysql"
slug: /python/connectors/mysql
---

The mysql connector supports read and writing to/from a MySQL Server.

# Tabset \{.tabset\}
## Read
### Recipe
```yaml
read:
  - mysql:
      host: sql.domain
      user: user
      password: password
      command: |
        SELECT *
        FROM table
      
      # Optional
      port: 3306
      database: database
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import mysql
df = mysql.read(
      host = 'sql.domain',
      user = 'user',
      password = 'password',
      command = 'SELECT * FROM table'
)
```

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| host | ✓ | str | Hostname or IP address of the server. |
| user | ✓ | str | The user to connect to the database with. |
| password | ✓ | str | Password for the specified user. |
| command | ✓ | str | Table name or SQL command to select data. |
| port | | int | The Port to connect to. Defaults to 3306. |
| database | | str | The database to connect to. |
| columns | | list | A list with a subset of the columns to import. This is less efficient than specifying in the command. |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

## Write
### Recipe
```yaml
write:
  - mysql:
      host: sql.domain
      database: database
      table: table
      user: user
      password: password
    
      # Optional
      port: 3306
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import mysql
mysql.write(
    df,
    host = 'sql.domain',
    database = 'database',
    table = 'table',
    user = 'user',
    password = 'password'
)
```

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame | Function only. DataFrame of contents to write to the database. Columns must match the target schema. By default, if the target table doesn't exist, it will be created. |
| host | ✓ | str | Hostname or IP address of the server. |
| database | ✓ | str | Database to be exported to. |
| table | ✓ | str | Table to be exported to. |
| user | ✓ | str | User with access to the database. |
| password | ✓ | str | Password for the specified user. |
| port | | int | The Port to connect to. Defaults to 3306. |
| columns | | list | Subset of the columns to be written. If not provided, all columns will be output. |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |