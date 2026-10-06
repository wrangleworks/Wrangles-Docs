---
title: "Mongodb"
slug: /python/connectors/mongodb
---

The MongoDB connector supports read and writing to/from a collection.



# Tabset \{.tabset\}
## Read
### Recipe
```yaml
read:
  - mongodb:
      user: user
      password: password
      database: database
      collection: collection
      host: host			# mongoDB cluster-url
      query: query
      
      # Optional
      projection: projection
```

### Function
```python
from wrangles.connectors import mongodb
df = mongodb.read(
      user='user',
      password='password',
      database='db', 
      host='cluster123.mongodb.net',
      query='{"name": "WrWx"}',
      projection='{"_id": 0, "name": 1}'
)
```

### Parameters
<div className="table-scroll">
  
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| user | ✓ | str | User with access to the database |
| password | ✓ | str | Password of user |
| database | ✓ | str | Database to be queried |
| collection | ✓ | str | Collection to be queried |
| host |✓| str | mongoDB cluster-url |
| query |✓| str | mongoDB query |
| projection | | str | Select which fields to include |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>

## Write
### Recipe
```yaml
write:
  - mongodb:
      user: user
      password: password
      database: database_write
      collection: collection_write
      host: host    # mongoDB cluster-url
      action: action
      
      # Optional
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import mongodb
mongodb.write(
      df,
      user='user'
      password='password'
      database='db'
      host='cluster123.mongodb.net'
      action: 'INSERT'
)
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame | Function only. DataFrame of contents to write to the database. Columns must match the target schema. By default, if the target collection doesn't exist, it will be created. DataFrame orient is set to 'records'. |
| user | ✓ | str | User with access to the database |
| password | ✓ | str | Password of user |
| database | ✓ | str | Database to be queried |
| collection | ✓ | str | Collection to be queried |
| host | ✓ | str | mongobd cluster-url |
| action | ✓ | str | actions supported INSERT, UPDATE |
| query | | str | mongoDB query to search for value to update, only valid when using UPDATE |
| update | | str | mongoDB query value to update, only valid when using UPDATE |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |
</div>