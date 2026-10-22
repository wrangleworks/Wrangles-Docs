---
title: "Concatenate"
description: "Combine two or more data sets together, stacked horizontally."
slug: /connectors/concatenate
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Concatenate <CopyableCode value="concatenate" />

Combine data from multiple sources, stacked horizontally.

```yaml
read:
  - concatenate:
      sources:
        - file:
            name: file1.xlsx
        - file:
            name: file2.xlsx
```
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th><th></th><th></th></tr>
<tr><td>

| column |
| :-----: |
| a |

</td><td>

\+

</td><td>

| column |
| :-----: |
| b |

</td><td>

→
</td><td>

| column | column |
| :-----: | :---: |
| a | b |

</td></tr>
</table>
</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Read

Combine two or more data sets together, stacked horizontally.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `sources` | Yes | array | The data sources to be combined |
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
  "description": "Combine two or more data sets together, stacked horizontally.",
  "required": [
    "sources"
  ],
  "properties": {
    "sources": {
      "type": "array",
      "description": "The data sources to be combined",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/read/items"
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

[Machine-readable contract](/registry/connectors/concatenate.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
