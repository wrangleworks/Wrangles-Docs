---
title: "Sqlite"
slug: /python/connectors/sqlite
---

The sqlite connector supports read and writing to/from a sqlite database.


# Tabset \{.tabset\}
## Read
Import data from a SQLite Database

### Recipe
```yaml
read:
  - sqlite:
      database: './tests/test.db'
      command: SELECT * from my_table
```

### Function
```python
from wrangles.connectors import sqlite
df = sqlite.read(
    database = './tests/test.db',
    command = 'SELECT * from my_table'
)
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| database | ✓ | str | The database to connect to including the file path. e.g. directory/database.db |
| command | ✓ | str | Table name or SQL command to select data. Note - using variables here can make your recipe vulnerable to sql injection. Use params if using variables from untrusted sources. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>

## Write
Export data to a SQLite Database

### Recipe
```yaml
write:
  - sqlite:
      database: './sample/fake.db'
      table: my_table
```

### Function
```python
from wrangles.connectors import sqlite
sqlite.write(
    df = df,
    database = './sample/fake.db',
    table = 'my_table'
)
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame | Function only. DataFrame of contents to write to the database. Columns must match the target schema. By default, if the target table doesn't exist, it will be created. |
| database | ✓ | str | The database to connect to including the file path. e.g. directory/database.db |
| table | ✓ | str | The table to write to |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>

## Run
Run a command on a SQLite Database.

### Recipe
```yaml
run:
  on_start:
    - sqlite:
        database: './sample/my_db.db'
        command: CREATE TABLE test_table_copy AS SELECT * FROM test_table
```

### Function
```python
from wrangles.connectors import sqlite
sqlite.run(
    database = './temp/fake.db',
    command = 'CREATE TABLE test_table_copy AS SELECT * FROM test_table'
)
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| database | ✓ | str | The database to connect to including the file path. e.g. directory/database.db |
| command | ✓ | str, list | SQL command or a list of SQL commands to execute |
| params | | list, obj | Variables to pass to a parameterized query. This may use %s or %(name)s syntax |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>