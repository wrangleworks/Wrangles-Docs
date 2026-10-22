---
title: "Akeneo"
description: "Read data from an Akeneo PIM"
slug: /connectors/akeneo
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Akeneo <CopyableCode value="akeneo" />

> Added **v0.6**

The Akeneo connector supports write to a PIM product list

### Write
### Recipe
```yaml
write:
  - akeneo:
      host: https://akeneo.example.com
      user: user
      password: password
      client_id: client_id
      client_secret: client_secret
      source: products
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import akeneo
akeneo.write(
      df,
      user='user',
      password='password',
      host='https://akeneo.example.com',
      client_id='client_id',
      client_secret='client_secret',
      source='products',
)
```

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Read data from an Akeneo PIM

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | Hostname of the Akeneo PIM instance e.g. https://akeneo.example.com  |
| `user` | Yes | string | User with access to read the data |
| `password` | Yes | string | Password for the user |
| `client_id` | Yes | string | Client ID. These need to be generated in the PIM. See https://api.akeneo.com/documentation/authentication.html  |
| `client_secret` | Yes | string | Client Secret |
| `source` | Yes | string | Type of data to return |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
| `parameters` | No | object | Set parameters for the query such as filtering the results. See the Akeneo query parameters for specifics. e.g. https://api.akeneo.com/api-reference.html#get_products for products.  |
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
  "description": "Read data from an Akeneo PIM",
  "required": [
    "host",
    "user",
    "password",
    "client_id",
    "client_secret",
    "source"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "Hostname of the Akeneo PIM instance\ne.g. https://akeneo.example.com\n"
    },
    "user": {
      "type": "string",
      "description": "User with access to read the data"
    },
    "password": {
      "type": "string",
      "description": "Password for the user"
    },
    "client_id": {
      "type": "string",
      "description": "Client ID. These need to be generated in the PIM.\nSee https://api.akeneo.com/documentation/authentication.html\n"
    },
    "client_secret": {
      "type": "string",
      "description": "Client Secret"
    },
    "source": {
      "type": "string",
      "description": "Type of data to return",
      "enum": [
        "products",
        "products-uuid",
        "product-models",
        "media-files",
        "published-products",
        "families",
        "attributes",
        "attribute-groups",
        "association-types",
        "categories",
        "channels",
        "locales",
        "currencies",
        "measure-families",
        "measurement-families",
        "reference-entities",
        "reference-entities-media-files",
        "asset-families",
        "asset-media-files"
      ]
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
    },
    "parameters": {
      "type": "object",
      "description": "Set parameters for the query such as filtering the results.\nSee the Akeneo query parameters for specifics.\ne.g. https://api.akeneo.com/api-reference.html#get_products for products.\n"
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

Write data into an Akeneo PIM

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | Hostname of the Akeneo PIM instance e.g. https://akeneo.example.com  |
| `user` | Yes | string | User with access to write the data |
| `password` | Yes | string | Password for the user |
| `client_id` | Yes | string | Client ID. These need to be generated in the PIM. See https://api.akeneo.com/documentation/authentication.html  |
| `client_secret` | Yes | string | Client Secret |
| `source` | Yes | string | Type of data to write |
| `columns` | No | array / integer / string | Specify a subset of the columns to include. Accepts wildcards using * or prefix with 'regex:' to use a regex pattern. Indicate a column is optional with column_name? If not provided, all columns will be included |
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
  "description": "Write data into an Akeneo PIM",
  "required": [
    "host",
    "user",
    "password",
    "client_id",
    "client_secret",
    "source"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "Hostname of the Akeneo PIM instance\ne.g. https://akeneo.example.com\n"
    },
    "user": {
      "type": "string",
      "description": "User with access to write the data"
    },
    "password": {
      "type": "string",
      "description": "Password for the user"
    },
    "client_id": {
      "type": "string",
      "description": "Client ID. These need to be generated in the PIM.\nSee https://api.akeneo.com/documentation/authentication.html\n"
    },
    "client_secret": {
      "type": "string",
      "description": "Client Secret"
    },
    "source": {
      "type": "string",
      "description": "Type of data to write",
      "enum": [
        "products",
        "products-uuid",
        "product-models",
        "families",
        "attributes",
        "attribute-groups",
        "association-types",
        "categories",
        "channels",
        "measurement-families"
      ]
    },
    "columns": {
      "$ref": "#/$defs/write/commonProperties/columns"
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

[Machine-readable contract](/registry/connectors/akeneo.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
