---
title: "Test"
description: "Create a test dataframe"
slug: /connectors/test
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Test <CopyableCode value="test" />

> Added v0.4

A useful connector to create test data. Either fixed values can be set or data can be randomly generated.

### Read
### Recipe
```yaml
read:
  - test:
      rows: 2
      values:
        fixed value: example string
        code: <code(10)>
        boolean: <boolean>
        number: <number(2.718-3.141)>
        int: <int(0-100)>
        char: <char>
        word: <word>
        sentence: <sentence>
        random_choice: <random(["apple","strawberry","pear"])>
```
#### Output

<div className="table-scroll">

| fixed value | code | boolean | number | int | char | word | sentence | random_choice |
| :--------- | :--- | :------ | :----- | :-- | :--- | :--- | :------- | :--- |
| example string | E4CO2KRBG2 | True | 2.767 | 23 | m | neque | Adipisci dolor quisquam labore dolorem dolor | apple |
| example string | 8G7DT4H7AB | False | 2.873 | 69 | r | tempora | Amet numquam quiquia numquam adipisci labore | pear |

</div>

### Function
```python
from wrangles.connectors import test
df = test.read(rows=2, values={'header1':'a','header2':'b'})
```
#### Output
| header1 | header2 |
| :------ | :------ |
| a | b |
| a | b |

### Special Inputs
- **\&lt;code>** or **&lt;code(8)>** : Random alphanumeric codes - *(8)* sets the length. *e.g. J1RSB7X9*
- **\&lt;char>** : Random letters
- **\&lt;word>** : Random nonsense words
- **\&lt;sentence>** : Random nonsense sentences
- **\&lt;boolean>** : Randomly True or False
- **\&lt;number(2.718-3.141)>** : Random numbers - *(2.718-3.141)* sets the range and decimal places. Default 0.00-1.00.
- **\&lt;int(1-10)>** : Random integers - *(1-10)* sets the range. Default 1-100.
- **&lt;random(["a","b","c"])>** : Randomly selected from the list.

## Parameters

### Read

Create a test dataframe

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `rows` | Yes | integer | Number of rows to include in the generated dataframe |
| `values` | Yes | object | Dictionary of columns and values |
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
  "description": "Create a test dataframe",
  "required": [
    "rows",
    "values"
  ],
  "properties": {
    "rows": {
      "type": "integer",
      "description": "Number of rows to include in the generated dataframe",
      "minimum": 1
    },
    "values": {
      "type": "object",
      "description": "Dictionary of columns and values",
      "patternProperties": {
        ".*": {
          "type": [
            "object",
            "string",
            "array"
          ],
          "description": "Dictionary of headers and data type to randomly generate",
          "additionProperties": true
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

[Machine-readable contract](/registry/connectors/test.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
