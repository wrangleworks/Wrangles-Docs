---
title: "Conditions"
slug: /python/recipes/conditions
---

# If

If can be used with all wrangles and connectors for read, write or run. If can be used to set a condition to determine if a wrangle or connector will execute or not.

If uses python syntax and will evaluate to True or False based on whether python considers the result to be 'truthy'.

Recipe variables $\{variable\} are parameterized and may be used within the statement.

```yml
wrangles:
  - convert.case:
      input: a column
      case: upper
      if: ${variable}
      # Set the case to upper only if the value of ${variable} is true
```

For Wrangles, and Write, the additional variables 'columns', 'row_count' and 'column_count' are available.

```yml

write:
  - file:
      name: file1.csv
      if: row_count > 0
      # Write a file only if there's at least one row
      
  - file:
      name: file2.csv
      if: '"specific_column" in columns'
      # Write a file if a certain column exists. Note the quotes needed
      # to prevent "spec... being interpreted as a YAML string.
```



> Environment variables are always strings. When using variable sourced from an environment variable, False may become 'False', which Python evaluates as a non-zero length string and therefore as True. Consider using an alternative such as: `if: str(${variable}).upper() == 'TRUE'`
\{.is-warning\}


# Where

Where can be used to filter the rows used by a read, wrangle or write. Unlike if, which either executes or not, where will execute with a subset of the data.

Where uses SQL syntax (specifically the sqlite dialect) and should be written as the where clause of a sql select query.

```yml
# Write only the rows where the column
# named category contains the value 'example'
write:
  - file:
      name: file.csv
      where: category = 'example'
```

> Column names that contain spaces can be referenced using square brackets (*[example column]*), double quotes (*"example column"*) or backticks (*\`example column\`*).
\{.is-info\}

## where_params

Recipe variables that are included in a where clause are vulnerable to sql injection. Values can be parameterized with where_params, to be correctly treated as a value. Parameters can be included in the where condition with ? as a position based variable or :name as a named variable.

```yml
# Write only the rows where the column named
# category matches the value passed in as
# the variable ${category_variable}
write:
  - file:
      name: file.csv
      where: category = ?
      where_params:
        - ${category_variable}
      # set value based on position
        
  - file:
      name: file.csv
      where: category = :namedparameter
      where_params:
        namedparameter: ${category_variable}
      # set a named value
```