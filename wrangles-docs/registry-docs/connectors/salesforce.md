---
title: "Salesforce"
description: "Import data from Salesforce"
slug: /connectors/salesforce
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Salesforce <CopyableCode value="salesforce" />

> Added **v0.5**

The salesforce connector supports reading and writing to/from Salesforce using [SOQL](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm).

### Read
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

### Write

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
    token='token',
    object='Contact',
    id='Id'
)
```

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Import data from Salesforce

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `instance` | Yes | string | The salesforce instance to read from. e.g. &lt;custom&gt;.my.salesforce.com |
| `user` | Yes | string | User with read permission |
| `password` | Yes | string | Password for the user |
| `token` | Yes | string | Security token for the user |
| `object` | Yes | string | Object to read data from e.g. Contact |
| `command` | Yes | string | SOQL query |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `params` | No | object | (Optional) Parameters to be used in the SOQL query Use &#123;my_key&#125; in the command to insert a parameter. |
| `domain` | No | string | (Optional) Use test to connect to a sandbox instance. |
| `not_columns` | No | array / integer / string | Specify a subset of the columns to ignore. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `order_by` | No | string | Order the data by one or more columns. Use a comma to separate multiple columns. Use DESC to sort in descending order. Example: column1 DESC, column2 Columns with spaces should be enclosed in double quotes. |
| `where` | No | string | Filter the data to include using an equivalent to a SQL where criteria, such as column1 = 123 OR column2 = 'a' |
| `where_params` | No | array / object | Variables to use in conjunctions with where. This allows the query to be parameterized. This uses sqlite syntax (? or :name) |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. Additional variables 'columns', 'row_count', 'column_count' and 'df' (the entire dataframe) are available. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Import data from Salesforce",
  "required": [
    "instance",
    "user",
    "password",
    "token",
    "object",
    "command"
  ],
  "properties": {
    "instance": {
      "type": "string",
      "description": "The salesforce instance to read from. e.g. <custom>.my.salesforce.com"
    },
    "user": {
      "type": "string",
      "description": "User with read permission"
    },
    "password": {
      "type": "string",
      "description": "Password for the user"
    },
    "token": {
      "type": "string",
      "description": "Security token for the user"
    },
    "object": {
      "type": "string",
      "description": "Object to read data from e.g. Contact"
    },
    "command": {
      "type": "string",
      "description": "SOQL query"
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
    },
    "params": {
      "type": "object",
      "description": "(Optional) Parameters to be used in the SOQL query Use {my_key} in the command to insert a parameter."
    },
    "domain": {
      "type": "string",
      "description": "(Optional) Use test to connect to a sandbox instance."
    },
    "not_columns": {
      "$ref": "#/$defs/write/commonProperties/not_columns"
    },
    "where": {
      "$ref": "#/$defs/write/commonProperties/where"
    },
    "where_params": {
      "$ref": "#/$defs/write/commonProperties/where_params"
    },
    "order_by": {
      "$ref": "#/$defs/write/commonProperties/order_by"
    },
    "if": {
      "$ref": "#/$defs/write/commonProperties/if"
    }
  }
}
```

</details>

### Write

Write data to Salesforce

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `instance` | Yes | string | The salesforce instance to write to e.g. &lt;custom&gt;.my.salesforce.com |
| `user` | Yes | string | User with write permission |
| `password` | Yes | string | Password for the user |
| `token` | Yes | string | Security token for the user |
| `object` | Yes | string | Object to write the data to e.g. Contact |
| `id` | Yes | string | Indicate the Id field. If the Id exists and is provided, the record will be updated, otherwise inserted. |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `domain` | No | string | (Optional) Use test to connect to a sandbox instance |
| `not_columns` | No | array / integer / string | Specify a subset of the columns to ignore. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `order_by` | No | string | Order the data by one or more columns. Use a comma to separate multiple columns. Use DESC to sort in descending order. Example: column1 DESC, column2 Columns with spaces should be enclosed in double quotes. |
| `where` | No | string | Filter the data to include using an equivalent to a SQL where criteria, such as column1 = 123 OR column2 = 'a' |
| `where_params` | No | array / object | Variables to use in conjunctions with where. This allows the query to be parameterized. This uses sqlite syntax (? or :name) |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. Additional variables 'columns', 'row_count', 'column_count' and 'df' (the entire dataframe) are available. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Write data to Salesforce",
  "required": [
    "instance",
    "user",
    "password",
    "token",
    "object",
    "id"
  ],
  "properties": {
    "instance": {
      "type": "string",
      "description": "The salesforce instance to write to e.g. <custom>.my.salesforce.com"
    },
    "user": {
      "type": "string",
      "description": "User with write permission"
    },
    "password": {
      "type": "string",
      "description": "Password for the user"
    },
    "token": {
      "type": "string",
      "description": "Security token for the user"
    },
    "object": {
      "type": "string",
      "description": "Object to write the data to e.g. Contact"
    },
    "id": {
      "type": "string",
      "description": "Indicate the Id field. If the Id exists and is provided, the record will be updated, otherwise inserted."
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
    },
    "domain": {
      "type": "string",
      "description": "(Optional) Use test to connect to a sandbox instance"
    },
    "not_columns": {
      "$ref": "#/$defs/write/commonProperties/not_columns"
    },
    "where": {
      "$ref": "#/$defs/write/commonProperties/where"
    },
    "where_params": {
      "$ref": "#/$defs/write/commonProperties/where_params"
    },
    "order_by": {
      "$ref": "#/$defs/write/commonProperties/order_by"
    },
    "if": {
      "$ref": "#/$defs/write/commonProperties/if"
    }
  }
}
```

</details>

</details>

[Machine-readable contract](/registry/connectors/salesforce.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
