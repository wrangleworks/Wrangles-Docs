---
title: "Format"
slug: /excel/format
---

- [Basics *Unsure how to start? Learn how.*](/excel)
\{.links-list\}

---

Formatting Wrangles are convenient for transforming data in terms of case, padding, and merge/split.

> Click [here](/wrangle/format) to learn how to use Format Wrangles in a recipe.

# Case

Change the case of the input.

 ## Tabset \{.tabset\}
### Example 

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| |
| --- |
| CONVERT TO LOWER CASE |
  

</td><td>
→ 
</td><td>

| |
| --- |
| convert to lower case |
  
</td></tr>
</table>
</div>

![lower_case.gif](/gifs/lower_case.gif)

### Options
| Option | Example |
| :----- | :------ |
| Upper | UPPER CASE |
| Lower | lower case |
| Title | Title Case |
| Sentence | Sentence case |


# Coalesce

Merges multiple columns into one, only merging the first non-empty values in the column; "first" being from left to right.
Useful if you have multiple columns with similar data but only need one column.

> Click [here](/wrangle/merge#coalesce) to learn how to use Coalesce Wrangles in a recipe.

 ## Tabset \{.tabset\}
### Example

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| header1 | header2 | header 3
|---|---|---|
| a |   | hello |
|   | 2 | hi |
|  |  | hey |
  

</td><td>
→ 
</td><td>

| new column|
| --- |
| a |
| 2 |
| hey |
  
</td></tr>
</table>
</div>


# Collapse to JSON

Merge multiple columns into JSON strings.

 ## Tabset \{.tabset\}
### Example

#### To Array
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| header1 | header2 |
|---|---|
| a | 1 |
| b | 2 |
| c | 3 |

</td><td>
→ 
</td><td>

| ["header1","header2"] |
| --- |
| ["a",1] |
| ["b",2] |
| ["c",3] |
  
</td></tr>
</table>
</div>

#### To Object
For objects the column headers will be used as the keys and must be unique.

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| header1 | header2 |
|---|---|
| a | 1 |
| b | 2 |
| c | 3 |

</td><td>
→ 
</td><td>

| &nbsp; |
| --- |
| &nbsp;\{"header1":"a","header2":1\}&nbsp; |
| &nbsp;\{"header1":"b","header2":2\}&nbsp; |
| &nbsp;\{"header1":"c","header2":3\}&nbsp; |
  
</td></tr>
</table>
</div>

### Options

| Option | Description |
| :----- | :---------- |
| To Array | Create an array e.g. ["value1", "value2"] |
| To Object | Create an object. This requires column headers, which will be used as the keys. e.g. \{"header1": "value1", "header2": "value2"\}. |


# Concatenate

Merges multiple columns into one. All columns are combined together sequentially.

> Click [here](/wrangle/merge#concatenate) to learn how to use Concatenate Wrangles in a recipe.

 ## Tabset \{.tabset\}
### Example
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| | | |
| --- | --- | --- |
| a | b | c |

</td><td>
→ 
</td><td>

| |
| --- |
| abc |
  
</td></tr>
</table>
</div>

### Options

| Option | Description |
| :----- | :---------- |
| Delimiter | Optional character(s) to be added between the input columns |


# Expand JSON

Expand JSON strings into multiple columns.

 ## Tabset \{.tabset\}
### Example

#### From Array
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| ["header1","header2"] |
| --- |
| ["a",1] |
| ["b",2] |
| ["c",3] |

</td><td>
→ 
</td><td>

| header1 | header2 |
|---|---|
| a | 1 |
| b | 2 |
| c | 3 |
  
</td></tr>
</table>
</div>

#### From Object
For objects, the keys will be used as the new column headers.

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| &nbsp; |
| --- |
| &nbsp;\{"header1":"a","header2":1\}&nbsp; |
| &nbsp;\{"header1":"b","header2":2\}&nbsp; |
| &nbsp;\{"header1":"c","header2":3\}&nbsp; |

</td><td>
→ 
</td><td>
  
| header1 | header2 |
|---|---|
| a | 1 |
| b | 2 |
| c | 3 |
  
</td></tr>
</table>
</div>


# Merge JSON

Merge multiple JSON objects or arrays together into one object or array.

 ## Tabset \{.tabset\}
### Example

#### Merge Array
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Array 1 | Array 2 |
| :-----: | :-----: |
| ["a", "b"] | [1, 2] |
| ["c", "d"] | [3, 4] |
| ["e", "f"] | [5, 6] |

</td><td>
→ 
</td><td>

| Merge Array |
| :---------: |
| ["a", "b", 1, 2] |
| ["c", "d", 3, 4] |
| ["e", "f", 5, 6] |
  
</td></tr>
</table>
</div>

#### Merge Object


<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Object 1 | Object 2 |
| :------: | :------: |
| &nbsp;\{"Key1": "a","Key2": 1\}&nbsp; | &nbsp;\{"Key3": "d", "Key4": 4\}&nbsp; |
| &nbsp;\{"Key1": "b","Key2": 2\}&nbsp; | &nbsp;\{"Key3": "e", "Key4": 5\}&nbsp; |
| &nbsp;\{"Key1": "c","Key2": 3\}&nbsp; | &nbsp;\{"Key3": "f", "Key4": 6\}&nbsp; |

</td><td>
→ 
</td><td>

| Merge Object |
| :----------: |
| &nbsp;\{"Key1": "a","Key2": 1, "Key3": "d", "Key4": 4\}&nbsp; |
| &nbsp;\{"Key1": "b","Key2": 2, "Key3": "e", "Key4": 5\}&nbsp; |
| &nbsp;\{"Key1": "c","Key2": 3, "Key3": "f", "Key4": 6\}&nbsp; |
  
</td></tr>
</table>
</div>

### Options

| Option | Description |
| :----: | :---------: |
| Merge Array | Merge JSON arrays into one array e.g. ["value1"], ["value2"] -> ["value1", "value2"] |
| To Object | Merge JSON objects into one. e.g. \{"header1": "value1"\}, \{"header2", "value2"\} -> \{"header1": "value1", "header2", "value2"\}. |


# Pad

Pad text to a fixed length. Useful for IDs that must follow a specific format. You can choose between two options, Leading and Trailing and also have the option of character and length.

![format_pad.gif](/gifs/format_pad.gif)

 ## Tabset \{.tabset\}
### Example
#### Length = 10 | Char = 0 | Pad = Leading

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>
  
| |
| --- |
| 12345 |

</td><td>
→ 
</td><td>

| |
| --- |
| 0000012345 |
  
</td></tr>
</table>
</div>

### Options
| Option | Description |
| :----- | :---------- |
| Leading / Trailing | Whether to append the characters to the start or end of the input |
| Length | The fixed length of the output text |
| Char | The character(s) to be appended to pad up to the total length |


# Prefix/Suffix
Adds a prefix or suffix to selected columns.

![prefix.gif](/gifs/prefix.gif)

 ## Tabset \{.tabset\}
### Example
#### Value = DEMO-

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>
  
| Part Number |
| --- |
| 12345 |
| 54321 |
| 67890 | 
| 09876 | 

</td><td>
→ 
</td><td>

| Part Number | Prefix |
|:-----------:|:------:|
| 12345 | DEMO-12345 |
| 54321 | DEMO-54321 |
| 67890 | DEMO-67890 |
| 09876 | DEMO-09876 |
  
</td></tr>
</table>
</div>

### Options
| Option | Description |
| :----- | :---------- |
| Prefix/Suffix | Whether to add a prefix or a suffix to the input |
| Value | The value of the prefix or suffix |


# Split

Splits an input into multiple columns.

> Click [here](/wrangle/split) to learn how to use Split Wrangles in a recipe.

## Tabset \{.tabset\}
### Example

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| |
| --- |
| a,b,c |

</td><td>
→ 
</td><td>

|   |   |   |
|---|---|---|
| a | b | c |
  
</td></tr>
</table>
</div>

![split.gif](/gifs/split.gif)
### Options

| Option | Description |
| :----- | :---------- |
| Delimiter | The character(s) that the input will be split on |


# Trim
Removes excess whitespace from the start and end of text.

 ## Tabset \{.tabset\}
### Example

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| |
| --- |
| ' &nbsp;&nbsp;&nbsp;trim me&nbsp;&nbsp;&nbsp; ' |

</td><td>
→ 
</td><td>

| |
| --- |
| 'trim me' |
  
</td></tr>
</table>
</div>


# Truncate
Truncate text to take a snippet from longer text.

## Tabset \{.tabset\}
### Example

#### Length = 3 | Trunc = Right
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Data |
| --- |
| abcdefghi |
  
</td><td>
→ 
</td><td>

| Right |
| --- |
| ghi |
  
</td></tr>
</table>
</div>

### Options

| Option | Description |
| :----- | :---------- |
| Length | The desired length of the snippet you want to extract |
| Left | Keep the characters starting from the beginning of the text  |
| Right | Keep the characters starting from the end of the text  |

> Note: Negative numbers can be used to truncate the opposite of the selected direction (Left/Right).
\{.is-info\}