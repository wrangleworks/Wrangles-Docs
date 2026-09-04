---
title: "Merge Lists With Strings"
slug: /excel/Let's-Get-Ready-To-Wrangle/Merge-Lists-With-Strings
---

# Merging a List With a String
Merging a list with a string is something that comes up often when working with [extract wrangles](/wrangle/extract) as they can output both a list or a string. For custom extract wrangles, when first_element is set to true, a string is output. Otherwise, the output is returned as a list. This can be troublesome when extracting data from multiple inputs or when trying to merge extracted data with existing data.

For example, if a given dataset has a "Manufacturer" column and a "Description" column which also contains the manufacturer. In many cases, the "Manufacturer" column is not filled in in entirety, so an extract wrangle can be used to extract manufacturer from the "Description" column. 

![list_string_data.png](/images/list_string_data.png)

To solve this issue, we will use a [custom extract wrangle](/excel/extract#custom) along with merge.lists to create a recipe.

Below, you'll find our training data for our extract:

![extract_brands_training.png](/images/merging-list-with-string/extract_brands_training.png)

Our recipe will be as follows:

```yaml
wrangles:
  - extract.custom:
      input: Description
      output: Manufacturers Extracted
      model_id: xxxxxxxx-xxxx-xxxx

  - merge.lists:
      input:
        - Manufacturer
        - Manufacturers Extracted
      output: Manufacturer (All Possible)
      remove_duplicates: true
```

With the recipe above our output is as follows:

![output1.png](/images/merging-list-with-string/output1.png)

Lets add a custom function to get rid of the empty string at the beginning of some of our lists (see rows 3, 7, 12, 16, 21 and 24).

```python 
def drop_empty_string(df, input):
  for i in range(len(df)):
    for j in range(len(df[input][i]) - 1):
        if len(df[input][i][j]) == 0 :
          df[input][i] = df[input][i][1:]

  return df
```

Now, our updated recipe is as follows:

```yaml 
wrangles:
  - extract.custom:
      input: Description
      output: Manufacturers Extracted
      model_id: bb5f74c0-d228-41ff

  - merge.lists:
      input:
        - Manufacturer
        - Manufacturers Extracted
      output: Manufacturer (All Possible)
      remove_duplicates: true

  - custom.drop_empty_string:
      input: Manufacturer (All Possible)
```

And our final output is shown below:

![final_output.png](/images/merging-list-with-string/final_output.png)

## Notes
You might ask why we didn't use merge.coalesce or merge.concatenate? Stick around and we'll show you.

[Coalesce](/wrangle/merge#coalesce) only keeps data from subsequent columns if there are any empty cells in the previous columns. The recipe below generated the following screen capture.

```yaml
wrangles:
  - extract.custom:
      input: Description
      output: Manufacturers Extracted
      model_id: bb5f74c0-d228-41ff

  - merge.coalesce:
      input:
        - Manufacturer
        - Manufacturers Extracted
      output: Manufacturer (All Possible)

  - custom.drop_empty_string:
      input: Manufacturer (All Possible)

```

![coalesce_output.png](/images/merging-list-with-string/coalesce_output.png)

You can see that valuable data from the extract was left out from the coalesce.

[Concatenate](/wrangle/merge#concatenate) merges everything from all columns. Let's see how the output would look using concatenate.

```yaml
wrangles:
  - extract.custom:
      input: Description
      output: Manufacturers Extracted
      model_id: bb5f74c0-d228-41ff

  - merge.concatenate:
      input:
        - Manufacturer
        - Manufacturers Extracted
      output: Manufacturer (All Possible)
      char: ' '

  - custom.drop_empty_string:
      input: Manufacturer (All Possible)
```

![concatenate_output.png](/images/merging-list-with-string/concatenate_output.png)

As you can see, the "Manufacturer (All Possible)" column contains strings and lists instead of just a list as intended.