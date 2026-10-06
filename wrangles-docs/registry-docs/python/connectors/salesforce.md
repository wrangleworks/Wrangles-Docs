---
title: "Salesforce"
slug: /python/connectors/salesforce
---

> Added **v0.5**
\{.is-info\}

The salesforce connector supports reading and writing to/from Salesforce using [SOQL](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm).


# Tabset \{.tabset\}
## Read
### Recipe
```yaml
read:
  - salesforce:
      instance: sf.domain
      user: user
      password: password
      token: token
      object: Contact
      command: |
        SELECT Id, Email, Name
        FROM Contact
```

### Function
```python
from wrangles.connectors import salesforce
df = salesforce.read(
    instance='sf.domain',
    object='object',
    user='user',
    password='password',
    token='token',
    command='SELECT Id, Name FROM Contact'
)
```

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| instance | ✓ | str | The salesforce instance to read from. e.g. \&lt;custom>.my.salesforce.com |
| user | ✓ | str | User with read permission. |
| password | ✓ | str | Password for the specified user. |
| token | ✓ | str | Security token for the user. |
| object | ✓ | str | Object to read data from e.g. Contact |
| command | ✓ | str | SOQL query. |
| columns | | list | A list with a subset of the columns to import. ID field must be included. This is less efficient than specifying in the command. |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |


## Write

### Recipe
```yaml
write:
  - salesforce:
      instance: sf.domain
      user: user
      password: password
      token: token
      object: Contact
      id: Id
```

### Function
```python
from wrangles.connectors import salesforce
salesforce.write(
    df,
    instance='sf.domain',
    user='user',
    password='password',
    token='token'
    object='Contact',
    id='Id'
)
```

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame | **Function only.** DataFrame of contents to write to the database. Columns must match the target schema. |
| instance | ✓ | str | The salesforce instance to write to e.g. \&lt;custom>.my.salesforce.com |
| user | ✓ | str | User with write permission. |
| password | ✓ | str | Password for the user. |
| token | ✓ | str | Security token for the user. |
| object | ✓ | str | Object to write the data to e.g. Contact. |
| id | ✓ | str | Indicate the Id field. If the Id exists and is provided, the record will be updated, otherwise inserted. |
| columns | | list | Subset of the columns to be written. ID field must be included. If not provided, all columns will be output. |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |