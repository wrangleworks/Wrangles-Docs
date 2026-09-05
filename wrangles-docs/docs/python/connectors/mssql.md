---
title: "Mssql"
slug: /python/connectors/mssql
---

The mssql connector supports read and writing to/from a Microsoft SQL Server.


# Tabset \{.tabset\}
## Read
### Recipe
```yaml
read:
  - mssql:
      host: sql.domain
      user: user
      password: password
      command: |
        SELECT *
        FROM table
      
      # Optional
      port: 1433
      database: database
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import mssql
df = mssql.read(
      host = 'sql.domain',
      user = 'user',
      password = 'password',
      command = 'SELECT * FROM table'
)
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| host | ✓ | str | Hostname or IP address of the server. |
| user | ✓ | str | The user to connect to the database with. |
| password | ✓ | str | Password for the specified user. |
| command | ✓ | str | Table name or SQL command to select data. |
| port | | int | The Port to connect to. Defaults to 1433. |
| database | | str | The database to connect to. |
| columns | | list | A list with a subset of the columns to import. This is less efficient than specifying in the command. |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>

## Write
### Recipe
```yaml
write:
  - mssql:
      host: sql.domain
      database: database
      table: table
      user: user
      password: password
    
      # Optional
      port: 1433
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import mssql
mssql.write(
    df,
    host = 'sql.domain',
    database = 'database',
    table = 'table',
    user = 'user',
    password = 'password'
)
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame | Function only. DataFrame of contents to write to the database. Columns must match the target schema. By default, if the target table doesn't exist, it will be created. |
| host | ✓ | str | Hostname or IP address of the server. |
| database | ✓ | str | Database to be exported to. |
| table | ✓ | str | Table to be exported to. |
| user | ✓ | str | User with access to the database. |
| password | ✓ | str | Password for the specified user. |
| port | | int | The Port to connect to. Defaults to 1433. |
| columns | | list | Subset of the columns to be written. If not provided, all columns will be output. |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>

## Run

> Added **v0.5**
\{.is-info\}


Run a SQL command. For example, this can be used to trigger a stored procedure or move/transform data before or after the recipe is executed.

### Recipe
```yaml
run:
  on_start:
    - mssql:
        host: sql.domain
        user: user
        password: password
        command: EXEC [StoredProc]
        
        # Optional
        database: database
        port: 1433
```

### Function
```python
from wrangles.connectors import mssql
mssql.run(
    host = 'sql.domain',
    user = 'user',
    password = 'password',
    command = 'EXEC [StoredProc]',
    database = 'database'
)
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| host | ✓ | str | Hostname or IP address of the server. |
| user | ✓ | str | User with access to the database. |
| password | ✓ | str | Password for the specified user. |
| command | ✓ | str | Command to execute such as a SQL query or stored procedure. |
| port | | int | The Port to connect to. Defaults to 1433. |
| database |  | str | Database to execute the command against. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>