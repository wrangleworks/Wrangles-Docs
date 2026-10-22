---
title: "HTTP"
description: "Get data from a HTTP(S) endpoint."
slug: /connectors/http
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# HTTP <CopyableCode value="http" />

The http connector allows users to issue http(s) requests.

### Read
Get data from a HTTP(S) endpoint.

### Recipe
```yaml
read:
  - http:
      url: https://data.example.com
      method: GET
```

### Function
```python
from wrangles.connectors import http
df = http.read(
    url='https://data.example.com',
    method='GET'
)
```

### Write
Write data to a HTTP(S) endpoint.

### Recipe
```yaml
read:
  - http:
      url: https://data.example.com
      method: POST
```

### Function
```python
from wrangles.connectors import http
df = http.read(
    url='https://data.example.com',
    method='POST'
)
```

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Get data from a HTTP(S) endpoint.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL to make the request to |
| `method` | No | string | The http method to use. Default GET. |
| `headers` | No | object | Headers to pass as part of the request |
| `params` | No | object | Pass URL encoded parameters |
| `json` | No | object | Pass data as a JSON encoded request body. |
| `json_key` | No | string | Select sub-elements from the response JSON. Multiple levels can be specified with e.g. key1.key2.key3 |
| `orient` | No | string | The format of the JSON to be converted to a dataframe. Default records. |
| `oauth` | No | object | Make a request to get an OAuth token prior to sending the main request |
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
  "description": "Get data from a HTTP(S) endpoint.",
  "required": [
    "url"
  ],
  "properties": {
    "url": {
      "type": "string",
      "description": "The URL to make the request to"
    },
    "method": {
      "type": "string",
      "description": "The http method to use. Default GET.",
      "enum": [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS"
      ]
    },
    "headers": {
      "type": "object",
      "description": "Headers to pass as part of the request"
    },
    "params": {
      "type": "object",
      "description": "Pass URL encoded parameters"
    },
    "json": {
      "type": "object",
      "description": "Pass data as a JSON encoded request body."
    },
    "json_key": {
      "type": "string",
      "description": "Select sub-elements from the response JSON. Multiple levels can be specified with e.g. key1.key2.key3"
    },
    "orient": {
      "type": "string",
      "description": "The format of the JSON to be converted to a dataframe. Default records.",
      "enum": [
        "records",
        "columns",
        "tight"
      ]
    },
    "oauth": {
      "type": "object",
      "required": [
        "url"
      ],
      "description": "Make a request to get an OAuth token prior to sending the main request",
      "properties": {
        "url": {
          "type": "string",
          "description": "The URL to make the request to"
        },
        "method": {
          "type": "string",
          "description": "The http method to use. Default POST.",
          "enum": [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "HEAD",
            "OPTIONS"
          ]
        },
        "headers": {
          "type": "object",
          "description": "Headers to pass as part of the request"
        },
        "params": {
          "type": "object",
          "description": "Pass URL encoded parameters"
        },
        "json": {
          "type": "object",
          "description": "Pass data as a JSON encoded request body."
        }
      }
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

### Run

Issue a HTTP(S) request e.g. issue a request to a webhook on success or failure.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL to make the request to |
| `method` | No | string | The http method to use. Default GET. |
| `headers` | No | object | Headers to pass as part of the request |
| `params` | No | object | Pass URL encoded parameters |
| `json` | No | object | Pass data as a JSON encoded request body. |
| `oauth` | No | object | Make a request to get an OAuth token prior to sending the main request |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Issue a HTTP(S) request e.g. issue a request to a webhook on success or failure.",
  "required": [
    "url"
  ],
  "properties": {
    "url": {
      "type": "string",
      "description": "The URL to make the request to"
    },
    "method": {
      "type": "string",
      "description": "The http method to use. Default GET.",
      "enum": [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS"
      ]
    },
    "headers": {
      "type": "object",
      "description": "Headers to pass as part of the request"
    },
    "params": {
      "type": "object",
      "description": "Pass URL encoded parameters"
    },
    "json": {
      "type": "object",
      "description": "Pass data as a JSON encoded request body."
    },
    "oauth": {
      "type": "object",
      "required": [
        "url"
      ],
      "description": "Make a request to get an OAuth token prior to sending the main request",
      "properties": {
        "url": {
          "type": "string",
          "description": "The URL to make the request to"
        },
        "method": {
          "type": "string",
          "description": "The http method to use. Default POST.",
          "enum": [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "HEAD",
            "OPTIONS"
          ]
        },
        "headers": {
          "type": "object",
          "description": "Headers to pass as part of the request"
        },
        "params": {
          "type": "object",
          "description": "Pass URL encoded parameters"
        },
        "json": {
          "type": "object",
          "description": "Pass data as a JSON encoded request body."
        }
      }
    },
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

### Write

Write data to a HTTP endpoint.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `url` | Yes | string | The URL to make the request to |
| `method` | No | string | The http method to use. Default POST. |
| `headers` | No | object | Headers to pass as part of the request |
| `params` | No | object | Pass URL encoded parameters |
| `orient` | No | string | The format of the JSON to send. Default records. For allowed values see: https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_json.html#pandas.DataFrame.to_json |
| `batch` | No | boolean / integer | If True, send the entire DataFrame as a single request. If False, send each row as a separate request. If an integer, send the DataFrame in batches of that size. default: True |
| `oauth` | No | object | Make a request to get an OAuth token prior to sending the main request |
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
  "description": "Write data to a HTTP endpoint.",
  "required": [
    "url"
  ],
  "properties": {
    "url": {
      "type": "string",
      "description": "The URL to make the request to"
    },
    "method": {
      "type": "string",
      "description": "The http method to use. Default POST.",
      "enum": [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "HEAD",
        "OPTIONS"
      ]
    },
    "headers": {
      "type": "object",
      "description": "Headers to pass as part of the request"
    },
    "params": {
      "type": "object",
      "description": "Pass URL encoded parameters"
    },
    "orient": {
      "type": "string",
      "description": "The format of the JSON to send. Default records.\nFor allowed values see:\nhttps://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_json.html#pandas.DataFrame.to_json",
      "enum": [
        "records",
        "split",
        "index",
        "columns",
        "values",
        "table"
      ]
    },
    "batch": {
      "type": [
        "boolean",
        "integer"
      ],
      "description": "If True, send the entire DataFrame as a single request. If False, send each row as a separate request. If an integer, send the DataFrame in batches of that size. default: True"
    },
    "oauth": {
      "type": "object",
      "required": [
        "url"
      ],
      "description": "Make a request to get an OAuth token prior to sending the main request",
      "properties": {
        "url": {
          "type": "string",
          "description": "The URL to make the request to"
        },
        "method": {
          "type": "string",
          "description": "The http method to use. Default POST.",
          "enum": [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "HEAD",
            "OPTIONS"
          ]
        },
        "headers": {
          "type": "object",
          "description": "Headers to pass as part of the request"
        },
        "params": {
          "type": "object",
          "description": "Pass URL encoded parameters"
        },
        "json": {
          "type": "object",
          "description": "Pass data as a JSON encoded request body."
        }
      }
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

[Machine-readable contract](/registry/connectors/http.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
