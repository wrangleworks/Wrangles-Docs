---
title: Wrangles Registry Pilot
description: Pilot of the versioned Wrangles recipe knowledge registry.
slug: /
---

# Wrangles Registry Pilot

This preview contains the first Registry records compiled from the new
Markdown contract. These pages are not yet the production replacement for the
existing wrangle reference.

| Wrangle | Description | Runtime contract |
| --- | --- | --- |
| [`accordion`](/wrangles/accordion) | Apply a series of wrangles to column(s) containing lists. The wrangles will be applied to each element in the list and the results will be returned back as a list. | `verified` |
| [`batch`](/wrangles/batch) | Split the data into batches for executing a list of wrangles. Use this in situations such as where the intermediate data is too large to fit in memory. | `verified` |
| [`classify`](/wrangles/classify) | Run classify wrangles on the specified columns. Requires WrangleWorks Account and Subscription. | `verified` |
| [`clean_whitespaces`](/wrangles/clean-whitespaces) | Condense multiple spaces to a single space and convert special space characters to a standard space. | `verified` |
| [`compare.lists`](/wrangles/compare/lists) | Compare multiple lists and return the intersection, difference, or union. | `verified` |
| [`compare.text`](/wrangles/compare/text) | Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score. | `verified` |
| [`compute.case_when`](/wrangles/compute/case-when) | Assign values to a column based on conditional logic. | `verified` |
| [`compute.score_search_results`](/wrangles/compute/score-search-results) | Scores and filters search results based on progressive partial/exact matching. Can return dictionaries or a parallel list of formatted strings. | `verified` |
| [`concurrent`](/wrangles/concurrent) | Run multiple wrangles concurrently rather than sequentially. Wrangles must specify output columns to be used concurrently. When using concurrent, Wrangles may not complete in a predictable order and it is not recommended to update overlapping columns with different wrangles. | `verified` |
| [`convert.case`](/wrangles/convert/case) | Change the letter case of text values. | `verified` |
| [`convert.data_type`](/wrangles/convert/data-type) | Convert values to strings, numbers, booleans, or datetimes. | `verified` |
| [`convert.fraction_to_decimal`](/wrangles/convert/fraction-to-decimal) | Convert fractions to decimals. | `verified` |
| [`convert.from_json`](/wrangles/convert/from-json) | Parse JSON text into lists, objects, scalars, booleans, or null values. | `verified` |
| [`convert.from_yaml`](/wrangles/convert/from-yaml) | Convert a YAML representation into an object. | `verified` |
| [`convert.to_json`](/wrangles/convert/to-json) | Convert an object to a JSON representation. | `verified` |
| [`convert.to_yaml`](/wrangles/convert/to-yaml) | Convert an object to a YAML representation. | `verified` |
| [`copy`](/wrangles/copy) | Make a copy of a column or a list of columns. | `verified` |
| [`create.bins`](/wrangles/create/bins) | Create a column that groups data into bins. | `verified` |
| [`create.column`](/wrangles/create/column) | Create column(s) with a user defined value. Defaults to None (empty). | `verified` |
| [`create.embeddings`](/wrangles/create/embeddings) | Create an embedding based on text input. | `verified` |
| [`create.guid`](/wrangles/create/guid) | Create column(s) with a GUID. | `verified` |
| [`create.hash`](/wrangles/create/hash) | Create a hash of a column. | `verified` |
| [`create.index`](/wrangles/create/index) | Create column(s) with an incremental index. e.g. 1,2,3... | `verified` |
| [`create.jinja`](/wrangles/create/jinja) | Output text using a jinja template. | `verified` |
| [`create.uuid`](/wrangles/create/uuid) | Create column(s) with a UUID. | `verified` |
| [`date_calculator`](/wrangles/date-calculator) | Add or Subtract time from a date. | `verified` |
| [`drop`](/wrangles/drop) | Drop (Delete) selected column(s). | `verified` |
| [`explode`](/wrangles/explode) | Explode a column of lists into rows. | `verified` |
| [`extract.address`](/wrangles/extract/address) | Extract parts of addresses. Requires WrangleWorks Account. | `verified` |
| [`extract.ai`](/wrangles/extract/ai) | Extract structured data from each input row using an AI model. Define the desired fields with output, or reuse a saved definition with model_id. | `verified` |
| [`extract.attributes`](/wrangles/extract/attributes) | Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks Account. | `verified` |
| [`extract.brackets`](/wrangles/extract/brackets) | Extract text properties in brackets from the input. | `verified` |
| [`extract.codes`](/wrangles/extract/codes) | Extract alphanumeric codes from the input. Requires WrangleWorks Account. | `verified` |
| [`extract.custom`](/wrangles/extract/custom) | Extract data from the input using a DIY or bespoke extraction wrangle. Requires WrangleWorks Account and Subscription. | `verified` |
| [`extract.date_properties`](/wrangles/extract/date-properties) | Extract date properties from a date (day, month, year, etc...). | `verified` |
| [`extract.date_range`](/wrangles/extract/date-range) | Extract date range frequency from two dates. | `verified` |
| [`extract.html`](/wrangles/extract/html) | Extract elements from strings containing html. Requires WrangleWorks Account. | `verified` |
| [`extract.properties`](/wrangles/extract/properties) | Extract text properties from the input. Requires WrangleWorks Account. | `verified` |
| [`extract.regex`](/wrangles/extract/regex) | Extract matches or specific capture groups using regex. | `verified` |
| [`filter`](/wrangles/filter) | Filter the dataframe based on the contents. If multiple filters are specified, all must be correct. For complex filters, use the where parameter. | `verified` |
| [`format.dates`](/wrangles/format/dates) | Format a date. | `verified` |
| [`format.pad`](/wrangles/format/pad) | Pad a string to a fixed length. | `verified` |
| [`format.prefix`](/wrangles/format/prefix) | Add a prefix to a column. | `verified` |
| [`format.price_breaks`](/wrangles/format/price-breaks) | Expand non-empty price-break cells into paired category and value columns. | `verified` |
| [`format.remove_duplicates`](/wrangles/format/remove-duplicates) | Remove duplicates from a list. Preserves input order. | `verified` |
| [`format.significant_figures`](/wrangles/format/significant-figures) | Format a value to a specific number of significant figures. | `verified` |
| [`format.suffix`](/wrangles/format/suffix) | Add a suffix to a column. | `verified` |
| [`format.trim`](/wrangles/format/trim) | Remove excess whitespace at the start and end of text. | `verified` |
| [`generate.ai`](/wrangles/generate/ai) | Generate structured AI output for each recipe row. | `verified` |
| [`huggingface`](/wrangles/huggingface) | Use a model from huggingface. | `verified` |
| [`log`](/wrangles/log) | Log the current status of the dataframe. | `verified` |
| [`lookup`](/wrangles/lookup) | Lookup values from a saved lookup wrangle. | `verified` |
| [`math`](/wrangles/math) | Apply a mathematical calculation. | `verified` |
| [`maths`](/wrangles/maths) | Deprecated alias for `math`; evaluate an expression and write its result to an output column. | `verified` |
| [`matrix`](/wrangles/matrix) | Apply a matrix of wrangles to the dataframe. This will run the wrangles for each combination of the variables. | `verified` |
| [`merge.coalesce`](/wrangles/merge/coalesce) | Take the first non-empty value from a series of columns or lists. | `verified` |
| [`merge.concatenate`](/wrangles/merge/concatenate) | Concatenate a list of columns or a list within a single column. | `verified` |
| [`merge.dictionaries`](/wrangles/merge/dictionaries) | Take dictionaries in multiple columns and merge them to a single dictionary. | `verified` |
| [`merge.key_value_pairs`](/wrangles/merge/key-value-pairs) | Create a dictionary from keys and values in paired columns e.g. COLUMN_NAME_1, COLUMN_VALUE_1, COLUMN_NAME_2, COLUMN_VALUE_2 ... | `verified` |
| [`merge.lists`](/wrangles/merge/lists) | Take lists in multiple columns and merge them to a single list. | `verified` |
| [`merge.to_dict`](/wrangles/merge/to-dict) | Take multiple columns and merge them to a dictionary (aka object) using the column headers as keys. | `verified` |
| [`merge.to_list`](/wrangles/merge/to-list) | Take multiple columns and merge them to a list. | `verified` |
| [`python`](/wrangles/python) | Apply a simple single-line python command. For more complex python use a custom function. Note, this evaluates the python command - be especially cautious including variables from untrusted sources within the command string. The python command will be evaluated once for each row and the result returned. Reference column values by using their name. Non-alphanumeric characters within column names are replaced by underscores (_) Additionally, all columns are available as a dict named kwargs. Additional parameters set for the wrangle will also be available to the command. | `verified` |
| [`recipe`](/wrangles/recipe) | Run another recipe as a wrangle against the current dataframe. | `verified` |
| [`reindex`](/wrangles/reindex) | Changes the row labels and column labels of a DataFrame. | `verified` |
| [`remove_words`](/wrangles/remove-words) | Remove all the elements that occur in one list from another. | `verified` |
| [`rename`](/wrangles/rename) | Rename a column or list of columns. | `verified` |
| [`replace`](/wrangles/replace) | Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field. | `verified` |
| [`round`](/wrangles/round) | Round column(s) to the specified decimals. | `verified` |
| [`search.find_links`](/wrangles/search/find-links) | Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing. | `verified` |
| [`search.retrieve_link_content`](/wrangles/search/retrieve-link-content) | Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data. | `verified` |
| [`select.columns`](/wrangles/select/columns) | Select columns from the dataframe. | `verified` |
| [`select.dictionary_element`](/wrangles/select/dictionary-element) | Select one or more element of a dictionary. | `verified` |
| [`select.element`](/wrangles/select/element) | Select elements of lists or dicts using python syntax like col[0]['key']. | `verified` |
| [`select.group_by`](/wrangles/select/group-by) | Group and aggregate the data. | `verified` |
| [`select.head`](/wrangles/select/head) | Return the first n rows. | `verified` |
| [`select.highest_confidence`](/wrangles/select/highest-confidence) | Select the option with the highest confidence from multiple columns. Inputs are expected to be of the form [&lt;&lt;value&gt;&gt;, &lt;&lt;confidence_score&gt;&gt;]. | `verified` |
| [`select.left`](/wrangles/select/left) | Return characters from the left of text. Strings shorter than the length defined will be unaffected. | `verified` |
| [`select.length`](/wrangles/select/length) | Calculate the lengths of data in a column. The length depends on the data type e.g. text will be the length of the text, lists will be the number of elements in the list. | `verified` |
| [`select.list_element`](/wrangles/select/list-element) | Select a numbered element of a list (zero indexed). | `verified` |
| [`select.right`](/wrangles/select/right) | Return characters from the right of text. Strings shorter than the length defined will be unaffected. | `verified` |
| [`select.sample`](/wrangles/select/sample) | Return a random sample of the rows. | `verified` |
| [`select.substring`](/wrangles/select/substring) | Return characters from the middle of text. | `verified` |
| [`select.tail`](/wrangles/select/tail) | Return the last n rows. | `verified` |
| [`select.threshold`](/wrangles/select/threshold) | Select the first option if it exceeds a given threshold, else the second option. | `verified` |
| [`similarity`](/wrangles/similarity) | Calculate the cosine similarity of two vectors. | `verified` |
| [`sort`](/wrangles/sort) | Sort the data. | `verified` |
| [`split.dictionary`](/wrangles/split/dictionary) | Split one or more dictionaries into columns. The dictionary keys will be returned as the new column headers. If the dictionaries contain overlapping values, the last value will be returned. | `verified` |
| [`split.list`](/wrangles/split/list) | Split a list in a single column to multiple columns. | `verified` |
| [`split.text`](/wrangles/split/text) | Split a string to multiple columns or a list. | `verified` |
| [`split.tokenize`](/wrangles/split/tokenize) | Split text into tokens. A variety of methods are available. The default method is to split on spaces. | `verified` |
| [`sql`](/wrangles/sql) | Apply a SQL command to the current dataframe. Only SELECT statements are supported - the result will be the output. | `verified` |
| [`standardize`](/wrangles/standardize) | Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription. | `verified` |
| [`standardize.clean`](/wrangles/standardize/clean) | Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally. | `verified` |
| [`standardize.custom`](/wrangles/standardize/custom) | Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription. | `verified` |
| [`translate`](/wrangles/translate) | Translate the input to a different language. Requires WrangleWorks Account and DeepL API Key (A free account for up to 500,000 characters per month is available). | `verified` |
| [`transpose`](/wrangles/transpose) | Transpose the DataFrame (swap columns to rows). | `verified` |
| [`try`](/wrangles/try) | Try a list of wrangles and catch any errors that occur. | `verified` |
