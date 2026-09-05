---
title: "Functions"
slug: /python/functions
---

> Some Wrangles require authentication to the WrangleWorks servers to function. See [the installation instructions](/python/install#authentication)
\{.is-warning\}


Wrangles can be used as functions, directly incorporated into python code.

```python
>>> import wrangles
>>> wrangles.extract.attributes('it is 15mm long')

{'length': ['15mm']}
```

Wrangles broadly accept a single input string, or a list of strings. If a list is provided, the results will be returned in an equivalent list in the same order and length as the original.

# Classify
Predict which categories items belong to. A classification wrangle must be created to be able to use this.

## Tabset \{.tabset\}
### Samples 
```python
>>> wrangles.classify('ball bearing', '<model id>')
MechPT

>>> wrangles.classify(['ball bearing', 'spanner'], '<model id>')
['MechPT', 'Tools']
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | The text(s) to be classified. |
| model_id | ✓ | str | ID of the model to run. |
</div>

# Extract

## Address

### Tabset \{.tabset\}
#### Samples 
Extract features from addresses such as streets or countries.
```python
>>> wrangles.extract.address('1100 Congress Ave, Austin, TX 78701, USA', 'streets')
['1100 Congress Ave']

>>> wrangles.extract.address(['1100 Congress Ave, Austin, TX 78701, USA'], 'streets')
[['1100 Congress Ave']]
```
#### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | The text(s) to be searched for attributes. |
| dataType | ✓ | streets / cities / regions / countries | The type of information to return. |
</div>

## Ai

### Tabset \{.tabset\}
#### Samples 
Use the power of AI (OpenAI's chatGPT in particular) to extract meaningful data
```python
>>> wrangles.extract.ai('Yellow Submarine', api_key='<api key>', output='The names of any colors found in the input)
'Yellow'

>>> wrangles.extract.ai('Yellow Submarine', api_key='<api key>', output={'type': 'string', 'description': 'The names of any colors found in the input'})
'Yellow'
```
#### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | A single value or list of values to extract information from. If a list is provided, each element will be analyzed individually and a list of equal length will be returned. |
| api_key | ✓ | str | An OpenAI API key. |
| output | | str, dict | This can be a string prompting the output, a JSON schema definition of the output requested or a dict of JSON schema definitions. |
| model_id | | str | An extract.ai model ID containing a saved definition. Use this or output. If both are provided, output that precedence over the definition from the model_id. |
| model | | str | The model to use for the extraction.  Current default is set to gpt-4o-mini. |
| threads | | int | Number of threads to use for parallel processing. |
| timeout | | int | Timeout in seconds for each API call. |
| retries | | int | Number of retries to attempt on failure. |
| messages | | list | Overall prompts to pass additional instructions. |
| url | | str | Override the endpoint. Must implement the OpenAI chat completions API schema with function calling. |

</div>

## Attributes
Extract numeric attributes such as lengths or voltages.

### Tabset \{.tabset\}
#### Samples 
```python
>>> wrangles.extract.attributes('it is 15mm long')
{'length': ['15mm']}

>>> wrangles.extract.attributes(['it is 15mm long', 'the voltage is 15V'])
[{'length': ['15mm']}, {'electric potential': ['15V']}]
```
#### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | The text(s) to be searched for attributes. |
| responseContent |  | span / object | Default span. If span, returns original text, if object returns an object of value and dimension. |
| type |  | angle / area / current / force / length / power / pressure / electric potential / volume / mass | Specify which types of attributes to find. If omitted, a dictionary of all attributes types is returned |
</div>

## Codes
Extract alphanumeric codes.

### Tabset \{.tabset\}
#### Samples 
```python
>>> wrangles.extract.codes('test ABCD1234ZZ test')
['ABCD1234ZZ']

>>> wrangles.extract.codes(['test ABCD1234ZZ test', 'NNN555BBB this one has two XYZ789'])
[['ABCD1234ZZ'], ['NNN555BBB', 'XYZ789']]
```
#### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | The text(s) to be searched for codes. |
</div>

## Custom
Extract entities using a custom model. An extraction wrangle must be created to be able to use this.

### Tabset \{.tabset\}
#### Samples 
```python
>>> wrangles.extract.custom('test skf test', '<model id>')
['SKF']

>>> wrangles.extract.custom(['test skf test', 'festo is hidden in here'], '<model id>')
[['SKF'], ['FESTO']]
```
#### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | The text(s) to be searched for custom entities. |
| model_id | ✓ | str | ID of the model to run. |
</div>

## Properties
Extract categorical properties such as colours or materials.

### Tabset \{.tabset\}
#### Samples 
```python
>>> wrangles.extract.properties('yellow submarine')
{'Colours': ['Yellow']}

>>> wrangles.extract.properties(['yellow submarine', 'the green mile'])
[{'Colours': ['Yellow']}, {'Colours': ['Green']}]
```
#### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | The text(s) to be searched for properties. |
| type |  | colours / materials / shapes / standards | The type of property to return. If omitted, a dictionary with all results will be returned. |
</div>

# Lookup
Lookups can be used to look up data from a saved lookup wrangle. They can either be key (exact) or semantic (most similar meaning) based matches.

## Exact Lookups
Exact lookups look up exact matches (from your list of values) in a saved lookup wrangle.

### Tabset \{.tabset\}
#### Samples 
```python
>>> wrangles.lookup(["Key1", "Key2"], "<model id>", "Value1")
["Key1's Value1", "Key2's Value1"]

>>> wrangles.lookup("Key1", "<model id>")
{"Value1": "Key1's Value1", "Value2": "Key1's Value2"}
```
#### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | The text(s) to be searched for properties. |
| model_id | ✓ | str | ID of the model to run. |
| columns |  | str, list | The columns to be returned. If not provided, all columns will be returned as a dict. |
</div>
  
## Semantic Lookups
Semantic lookups look up the most similar matches (from your list of values) in a saved lookup wrangle.

### Tabset \{.tabset\}
#### Samples 
```python
>>> wrangles.lookup(["KeyOne", "KeyTwo"], "<model id>", "Value1")
["Key1's Value1", "Key2's Value1"]

>>> wrangles.lookup("KeyOne", "<model id>")
{"Value1": "Key1's Value1", "Value2": "Key1's Value2"}
```
#### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | The text(s) to be searched for properties. |
| model_id | ✓ | str | ID of the model to run. |
| columns |  | str, list | The columns to be returned. If not provided, all columns will be returned as a dict. |
</div>

# Standardize
Standardize text data, such as replacing abbreviations. A standardization wrangle must be created to be able to use this.

## Tabset \{.tabset\}
### Samples 
```python
>>> wrangles.standardize('It will arrive asap.', '<model id>')
'It will arrive as soon as possible.'

>>> wrangles.standardize(['It will arrive asap.', 'I live in the USA'])
['It will arrive as soon as possible.', 'I live in the United States']
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | The text(s) to be standardized. |
| model_id | ✓ | str | ID of the model to run. |
</div>

# Translate
Translate text between languages.

Requires a WrangleWorks Account and DeepL API Key (A free account for up to 500,000 characters per month is available).

## Tabset \{.tabset\}
### Samples 
```python
>>> wrangles.translate('My name is Chris', 'ES')
Mi nombre es Chris

>>> wrangles.translate(['My name is Chris', 'I live in Austin'], 'DE')
['Mein Name ist Chris', 'Ich wohne in Austin']
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| input | ✓ | str, list | The text(s) to be classified. |
| target_language | ✓ | str | A code for the target language. [Available Codes](https://www.deepl.com/docs-api/translating-text/) |
| source_language |  | str | A code for the source language. If omitted, the language will be inferred from the contents. |
| case |  | lower / upper / title | Allow changing the case of the input prior to translation. |
</div>