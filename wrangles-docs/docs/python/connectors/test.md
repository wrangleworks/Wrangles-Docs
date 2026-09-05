---
title: "Test"
slug: /python/connectors/test
---

> Added v0.4
\{.is-info\}

A useful connector to create test data. Either fixed values can be set or data can be randomly generated.


# Tabset \{.tabset\}
## Read
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


### Parameters

<div className="table-scroll">
  
| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| rows | ✓ | int | Number of rows to generate. |
| values | ✓ | dict | Dictionary of header/values defining the table. See special inputs for special codes to create random data. |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

</div>

### Special Inputs
- **\&lt;code>** or **&lt;code(8)>** : Random alphanumeric codes - *(8)* sets the length. *e.g. J1RSB7X9*
- **\&lt;char>** : Random letters
- **\&lt;word>** : Random nonsense words
- **\&lt;sentence>** : Random nonsense sentences
- **\&lt;boolean>** : Randomly True or False
- **\&lt;number(2.718-3.141)>** : Random numbers - *(2.718-3.141)* sets the range and decimal places. Default 0.00-1.00.
- **\&lt;int(1-10)>** : Random integers - *(1-10)* sets the range. Default 1-100.
- **&lt;random(["a","b","c"])>** : Randomly selected from the list.