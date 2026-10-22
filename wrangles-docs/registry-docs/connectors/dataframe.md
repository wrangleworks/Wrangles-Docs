---
title: "Dataframe"
description: "Define the dataframe returned from recipe.run(). Retains its generic Python return-value behavior. In Excel this is also legacy columns-mode syntax; prefer excel.columns for an explicit spreadsheet write mode."
slug: /connectors/dataframe
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Dataframe <CopyableCode value="dataframe" />

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

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Write

Define the dataframe returned from recipe.run(). Retains its generic Python return-value behavior. In Excel this is also legacy columns-mode syntax; prefer excel.columns for an explicit spreadsheet write mode.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
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
  "description": "Define the dataframe returned from recipe.run(). Retains its generic Python return-value behavior. In Excel this is also legacy columns-mode syntax; prefer excel.columns for an explicit spreadsheet write mode.",
  "properties": {
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

[Machine-readable contract](/registry/connectors/dataframe.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
