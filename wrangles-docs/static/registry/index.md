---
okf_version: "0.2"
type: collection
title: Wrangles Registry
description: Public pilot bundle for Wrangles recipe primitives.
status: pilot
registry_version: 0.1.0-pilot
---

# Wrangles Registry

This is the public, agent-readable pilot bundle. Use `manifest.json` for
structured discovery.

- [`accordion`](wrangles/_root/accordion.md): Apply a series of wrangles to column(s) containing lists. The wrangles will be applied to each element in the list and the results will be returned back as a list.
- [`batch`](wrangles/_root/batch.md): Split the data into batches for executing a list of wrangles. Use this in situations such as where the intermediate data is too large to fit in memory.
- [`classify`](wrangles/_root/classify.md): Run classify wrangles on the specified columns. Requires WrangleWorks Account and Subscription.
- [`clean_whitespaces`](wrangles/_root/clean-whitespaces.md): Condense multiple spaces to a single space and convert special space characters to a standard space.
- [`compare.lists`](wrangles/compare/lists.md): Compare multiple lists and return the intersection, difference, or union.
- [`compare.text`](wrangles/compare/text.md): Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score.
- [`compute.case_when`](wrangles/compute/case-when.md): Assign values to a column based on conditional logic.
- [`compute.score_search_results`](wrangles/compute/score-search-results.md): Scores and filters search results based on progressive partial/exact matching. Can return dictionaries or a parallel list of formatted strings.
- [`concurrent`](wrangles/_root/concurrent.md): Run multiple wrangles concurrently rather than sequentially. Wrangles must specify output columns to be used concurrently. When using concurrent, Wrangles may not complete in a predictable order and it is not recommended to update overlapping columns with different wrangles.
- [`convert.case`](wrangles/convert/case.md): Change the letter case of text values.
- [`convert.data_type`](wrangles/convert/data-type.md): Convert values to strings, numbers, booleans, or datetimes.
- [`convert.fraction_to_decimal`](wrangles/convert/fraction-to-decimal.md): Convert fractions to decimals.
- [`convert.from_json`](wrangles/convert/from-json.md): Parse JSON text into lists, objects, scalars, booleans, or null values.
- [`convert.from_yaml`](wrangles/convert/from-yaml.md): Convert a YAML representation into an object.
- [`convert.to_json`](wrangles/convert/to-json.md): Convert an object to a JSON representation.
- [`convert.to_yaml`](wrangles/convert/to-yaml.md): Convert an object to a YAML representation.
- [`copy`](wrangles/_root/copy.md): Make a copy of a column or a list of columns.
- [`create.bins`](wrangles/create/bins.md): Create a column that groups data into bins.
- [`create.column`](wrangles/create/column.md): Create column(s) with a user defined value. Defaults to None (empty).
- [`create.embeddings`](wrangles/create/embeddings.md): Create an embedding based on text input.
- [`create.guid`](wrangles/create/guid.md): Create column(s) with a GUID.
- [`create.hash`](wrangles/create/hash.md): Create a hash of a column.
- [`create.index`](wrangles/create/index.md): Create column(s) with an incremental index. e.g. 1,2,3...
- [`create.jinja`](wrangles/create/jinja.md): Output text using a jinja template.
- [`create.uuid`](wrangles/create/uuid.md): Create column(s) with a UUID.
- [`date_calculator`](wrangles/_root/date-calculator.md): Add or Subtract time from a date.
- [`drop`](wrangles/_root/drop.md): Drop (Delete) selected column(s).
- [`explode`](wrangles/_root/explode.md): Explode a column of lists into rows.
- [`extract.address`](wrangles/extract/address.md): Extract parts of addresses. Requires WrangleWorks Account.
- [`extract.ai`](wrangles/extract/ai.md): Extract structured data from each input row using an AI model. Define the desired fields with output, or reuse a saved definition with model_id.
- [`extract.attributes`](wrangles/extract/attributes.md): Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks Account.
- [`extract.brackets`](wrangles/extract/brackets.md): Extract text properties in brackets from the input.
- [`extract.codes`](wrangles/extract/codes.md): Extract alphanumeric codes from the input. Requires WrangleWorks Account.
- [`extract.custom`](wrangles/extract/custom.md): Extract data from the input using a DIY or bespoke extraction wrangle. Requires WrangleWorks Account and Subscription.
- [`extract.date_properties`](wrangles/extract/date-properties.md): Extract date properties from a date (day, month, year, etc...).
- [`extract.date_range`](wrangles/extract/date-range.md): Extract date range frequency from two dates.
- [`extract.html`](wrangles/extract/html.md): Extract elements from strings containing html. Requires WrangleWorks Account.
- [`extract.properties`](wrangles/extract/properties.md): Extract text properties from the input. Requires WrangleWorks Account.
- [`extract.regex`](wrangles/extract/regex.md): Extract matches or specific capture groups using regex.
- [`filter`](wrangles/_root/filter.md): Filter the dataframe based on the contents. If multiple filters are specified, all must be correct. For complex filters, use the where parameter.
- [`format.dates`](wrangles/format/dates.md): Format a date.
- [`format.pad`](wrangles/format/pad.md): Pad a string to a fixed length.
- [`format.prefix`](wrangles/format/prefix.md): Add a prefix to a column.
- [`format.price_breaks`](wrangles/format/price-breaks.md): Expand non-empty price-break cells into paired category and value columns.
- [`format.remove_duplicates`](wrangles/format/remove-duplicates.md): Remove duplicates from a list. Preserves input order.
- [`format.significant_figures`](wrangles/format/significant-figures.md): Format a value to a specific number of significant figures.
- [`format.suffix`](wrangles/format/suffix.md): Add a suffix to a column.
- [`format.trim`](wrangles/format/trim.md): Remove excess whitespace at the start and end of text.
- [`generate.ai`](wrangles/generate/ai.md): Generate structured AI output for each recipe row.
- [`huggingface`](wrangles/_root/huggingface.md): Use a model from huggingface.
- [`log`](wrangles/_root/log.md): Log the current status of the dataframe.
- [`lookup`](wrangles/_root/lookup.md): Lookup values from a saved lookup wrangle.
- [`math`](wrangles/_root/math.md): Apply a mathematical calculation.
- [`maths`](wrangles/_root/maths.md): Deprecated alias for `math`; evaluate an expression and write its result to an output column.
- [`matrix`](wrangles/_root/matrix.md): Apply a matrix of wrangles to the dataframe. This will run the wrangles for each combination of the variables.
- [`merge.coalesce`](wrangles/merge/coalesce.md): Take the first non-empty value from a series of columns or lists.
- [`merge.concatenate`](wrangles/merge/concatenate.md): Concatenate a list of columns or a list within a single column.
- [`merge.dictionaries`](wrangles/merge/dictionaries.md): Take dictionaries in multiple columns and merge them to a single dictionary.
- [`merge.key_value_pairs`](wrangles/merge/key-value-pairs.md): Create a dictionary from keys and values in paired columns e.g. COLUMN_NAME_1, COLUMN_VALUE_1, COLUMN_NAME_2, COLUMN_VALUE_2 ...
- [`merge.lists`](wrangles/merge/lists.md): Take lists in multiple columns and merge them to a single list.
- [`merge.to_dict`](wrangles/merge/to-dict.md): Take multiple columns and merge them to a dictionary (aka object) using the column headers as keys.
- [`merge.to_list`](wrangles/merge/to-list.md): Take multiple columns and merge them to a list.
- [`python`](wrangles/_root/python.md): Apply a simple single-line python command. For more complex python use a custom function. Note, this evaluates the python command - be especially cautious including variables from untrusted sources within the command string. The python command will be evaluated once for each row and the result returned. Reference column values by using their name. Non-alphanumeric characters within column names are replaced by underscores (_) Additionally, all columns are available as a dict named kwargs. Additional parameters set for the wrangle will also be available to the command.
- [`recipe`](wrangles/_root/recipe.md): Run another recipe as a wrangle against the current dataframe.
- [`reindex`](wrangles/_root/reindex.md): Changes the row labels and column labels of a DataFrame.
- [`remove_words`](wrangles/_root/remove-words.md): Remove all the elements that occur in one list from another.
- [`rename`](wrangles/_root/rename.md): Rename a column or list of columns.
- [`replace`](wrangles/_root/replace.md): Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field.
- [`round`](wrangles/_root/round.md): Round column(s) to the specified decimals.
- [`search.find_links`](wrangles/search/find-links.md): Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing.
- [`search.retrieve_link_content`](wrangles/search/retrieve-link-content.md): Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data.
- [`select.columns`](wrangles/select/columns.md): Select columns from the dataframe.
- [`select.dictionary_element`](wrangles/select/dictionary-element.md): Select one or more element of a dictionary.
- [`select.element`](wrangles/select/element.md): Select elements of lists or dicts using python syntax like col[0]['key'].
- [`select.group_by`](wrangles/select/group-by.md): Group and aggregate the data.
- [`select.head`](wrangles/select/head.md): Return the first n rows.
- [`select.highest_confidence`](wrangles/select/highest-confidence.md): Select the option with the highest confidence from multiple columns. Inputs are expected to be of the form [<<value>>, <<confidence_score>>].
- [`select.left`](wrangles/select/left.md): Return characters from the left of text. Strings shorter than the length defined will be unaffected.
- [`select.length`](wrangles/select/length.md): Calculate the lengths of data in a column. The length depends on the data type e.g. text will be the length of the text, lists will be the number of elements in the list.
- [`select.list_element`](wrangles/select/list-element.md): Select a numbered element of a list (zero indexed).
- [`select.right`](wrangles/select/right.md): Return characters from the right of text. Strings shorter than the length defined will be unaffected.
- [`select.sample`](wrangles/select/sample.md): Return a random sample of the rows.
- [`select.substring`](wrangles/select/substring.md): Return characters from the middle of text.
- [`select.tail`](wrangles/select/tail.md): Return the last n rows.
- [`select.threshold`](wrangles/select/threshold.md): Select the first option if it exceeds a given threshold, else the second option.
- [`similarity`](wrangles/_root/similarity.md): Calculate the cosine similarity of two vectors.
- [`sort`](wrangles/_root/sort.md): Sort the data.
- [`split.dictionary`](wrangles/split/dictionary.md): Split one or more dictionaries into columns. The dictionary keys will be returned as the new column headers. If the dictionaries contain overlapping values, the last value will be returned.
- [`split.list`](wrangles/split/list.md): Split a list in a single column to multiple columns.
- [`split.text`](wrangles/split/text.md): Split a string to multiple columns or a list.
- [`split.tokenize`](wrangles/split/tokenize.md): Split text into tokens. A variety of methods are available. The default method is to split on spaces.
- [`sql`](wrangles/_root/sql.md): Apply a SQL command to the current dataframe. Only SELECT statements are supported - the result will be the output.
- [`standardize`](wrangles/_root/standardize.md): Deprecated compatibility key for `standardize.custom`, which standardizes data using a trained DIY or bespoke model.
- [`standardize.clean`](wrangles/standardize/clean.md): Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally.
- [`standardize.custom`](wrangles/standardize/custom.md): Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription.
- [`translate`](wrangles/_root/translate.md): Translate the input to a different language. Requires WrangleWorks Account and DeepL API Key (A free account for up to 500,000 characters per month is available).
- [`transpose`](wrangles/_root/transpose.md): Transpose the DataFrame (swap columns to rows).
- [`try`](wrangles/_root/try.md): Try a list of wrangles and catch any errors that occur.
