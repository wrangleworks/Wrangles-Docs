---
title: Lookup
slug: /excel/Lookup
---

The Lookup Wrangle can be used to store data to be looked up later. They come in two variants: key and semantic. Key lookups find data using an exact match, such as looking up IDs or names. Semantic lookups find data using a semantic search (aka vector search), such as finding similar descriptions.

> Note: Semantic Lookup wrangles are a premium feature. [Contact Us](https://www.wrangleworks.com/contact.html) to get access to this feature.
\{.is-info\}

![mywrangleslookup.png](/images/lookup/mywrangleslookup.png)

# Key Lookup Wrangles
<!-- wrangle: {"type":"lookup","model_id":"b3339193-d1cc-4c89-8ed6-901efa6d81be"} -->
Key Lookup Wrangles return columns based on the keys from the cells highlighted. These keys can be words, numbers, characters or a combination of the previous. Read below to learn more about Key Lookup Wrangles!

![lookup_abbreviations.gif](/images/lookup/lookup_abbreviations.gif)

## Creating Key Lookup Wrangles

To create a Key Lookup Wrangle, first go to the Lookup tab (under the My Wrangles section of the Wrangles task pane) and click on the + icon, then select the Key option. A new sheet (named Train-Lookup) will open, this is where your Key data and Value data will be stored. 

![trainkeylookup.png](/images/lookup/trainkeylookup.png)

Two columns will be in the Train-Lookup sheet by default: Key and Value.

#### Key
This is the input data that the Lookup will find. **It is important to note that the first column in a lookup's training data must remain being named Key**.

#### Value
This is the data that the Lookup will return when the corresponding Key is found. The name of the column can be changed, and more Value columns can be added using the "+ Add Column" button or by simply adding new columns by hand. This allows for multiple columns to be returned when the Key is found.

> **Note:** Values are limited to 10 values per lookup.
\{.is-info\}

# Semantic Lookup Wrangles
Semantic Lookup Wrangles are a premium feature that allow users to find data similar to the key's value, using a semantic search. Contact us by email or at this [link](https://www.wrangleworks.com/contact.html) to have Semantic Lookup Wrangles enabled for your account.

## Creating Semantic Lookup Wrangles
Creating Semantic Lookup Wrangles is very similar to creating Key Lookup Wrangles.

Like Key Lookups, a new sheet will appear (entitled "Train-Lookup") when you create a new Semantic Lookup Wrangle. 

![train_lookup.gif](/images/wranglesxl-v2-9-0/train_lookup.gif)

#### Columns to Match
When training a Semantic Lookup wrangle, you have the option to choose which columns you like to match against. Multiple columns can be selected to match on multiple fields. Any columns that are not selecting to match against will be output as the lookup's value or values.

With the drop down menu, columns can be named whatever user's prefer.

#### Value/Output Columns
Semantic Lookup values work just the same as Key Lookup values, they are the data that the Lookup will return when the corresponding Key is found. The name of the column can be changed, and more Value columns can be added using the "+ Add Column" button or by simply adding new columns by hand. This allows for multiple columns to be returned when the Key is found.

### Updating Lookup Wrangles
To update your Lookup Wrangle, first click on the three dots next to the play button then click Edit.

![editlookup.png](/images/lookup/editlookup.png)

From here, simply update your Wrangle as needed then click submit. Once your Wrangle has been saved, it will be ready for use.

> **Note**: When you retrain your Wrangle, the training sheet is now named after the Wrangle.
\{.is-info\}

## Running Semantic Lookups
When running a semantic lookup, users are prompted to select the Number of Results and the columns to be returned. If only one result is selected, the result columns are output as their own individual columns. If more than one result is output, the results will be output as a YAML dictionary in their respective columns. See the gifs below for examples of each.

### Single Result
![semantic_lookup_1_result.gif](/images/wranglesxl-v2-9-0/semantic_lookup_1_result.gif)

### Multiple Results
![semantic_lookup_3_results.gif](/images/wranglesxl-v2-9-0/semantic_lookup_3_results.gif)

# Semantic Lookup Example
In this example, we store items with a single attribute and their pricing in the lookup. Matches are found based on the Item and Attribute, then all columns are returned.

![semantic_example.gif](/gifs/lookup/semantic_example.gif)

As you can see in the gif above, multiple columns can be selected for output from the lookup.

## Score
When running a Semantic Lookup Wrangle, you have the option to output the similarity score between the Key and the input value. A cosine similarity calculation is done to find the Score value.