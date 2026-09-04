---
title: "Standardizing Lists"
slug: /excel/Let's-Get-Ready-To-Wrangle/Standardizing-Lists
---

# How to Remove Words 

Removing words isn't always as simple as using the [remove_words](/wrangle/format#remove-words) wrangle. There are many cases where an extract wrangle will find a match but the remove wrangle will not. For example, an extract wrangle can use regex to match patterns whereas the remove_words wrangle removes elements of one list from another (requiring an exact match).

Let's start with a dataset that contains a description column that has url's wrapped in parenthesis. The goal is to extract the url and remove it from the description. 

![original_data.png](/images/remove-words/original_data.png)

First, we will create a [custom extract](/excel/extract#custom) wrangle that utilizes a single regex pattern:

![extract_training_data.png](/images/remove-words/extract_training_data.png)

What this regex pattern is doing is looking for any string that has "https:", and is followed by anything else up to ")". It then returns everything matched up to the closing parenthesis.

Now for our recipe. To start, we will use our extract wrangle to extract the url then try to remove them using remove_words.

```yaml 
wrangles:
  - extract.custom:
      input: Description
      output: URL
      model_id: xxxxxxxx-xxxx-xxxx

  - remove_words:
      input: Description
      to_remove:
        - URL
      output: Description (No URL)
      ignore_case: true
```

The recipe above produces the following output:

![description_with_url.png](/images/remove-words/description_with_url.png)

As you can see, the remove_words wrangle did not remove url's. Let's create a [custom standardize](/excel/standardize#custom) wrangle that removes the parenthesis. This wrangle's training data is as follows:

![standardize_training_data.png](/images/remove-words/standardize_training_data.png)

With the addition of our standardize wrangle, our recipe is now:

```yaml
wrangles:
  - extract.custom:
      input: Description
      output: URL
      model_id: xxxxxxxx-xxxx-xxxx

  - standardize:
      input: Description
      model_id: xxxxxxxx-xxxx-xxxx

  - remove_words:
      input: Description
      to_remove:
        - URL
      output: Description (No URL)
      ignore_case: true
```

Now our output looks like this:

![url_list_desc_no_url.png](/images/remove-words/url_list_desc_no_url.png)

This is just what we had expected.Our "URL" column is still a list, which is messy. Let's go ahead and clean that up too.

We'll add a [select.list_element](/wrangle/select#list-element) wrangle to select the first url from our url extract. Since these are all a list of one, we don't have to worry about choosing the correct url.

```yaml
wrangles:
  - extract.custom:
      input: Description
      output: URL
      model_id: xxxxxxxx-xxxx-xxxx

  - standardize:
      input: Description
      model_id: xxxxxxxx-xxxx-xxxx

  - remove_words:
      input: Description
      to_remove:
        - URL
      output: Description (No URL)
      ignore_case: true

  - select.list_element:
      input: URL
      element: 0
```

Now we have the nice clean output:

![url_string_desc_no_url.png](/images/remove-words/url_string_desc_no_url.png)

## Notes

You might ask **why not just use first_element: true in the url extract?** Remove_words expects a list of strings to be removed and therefore will not work with just a string.