---
title: "Removing Words"
slug: /excel/Let's-Get-Ready-To-Wrangle/Removing-Words
---

# How to Remove Words

Removing words is a common issue that Wranglers face. Sometimes it is as easy as using the built in [Replace](/excel/standardize#replace) Wrangle, but other times our list of words to remove is too long, or we just want to build something that is reusable. This tutorial will teach you how to both use the stock Wrangle as well as how to write a small recipe to remove words.

## Stock Remove Words Wrangle

The stock remove words Wrangle works great for making quick, easy, changes to your data. Let's use the data set shown below, and walk through using the stock [Replace](/excel/standardize#replace) Wrangle to remove url's.

![original_data.png](/images/remove-words/original_data.png)

It is worth noting that this tutorial uses the stock Replace Wrangle instead of the Remove Words Wrangle because Remove Word is built to remove a list of words in one column from another. 

You'll notice that all of our url's are each unique, so we do not want to waste time copying and pasting each one or trying to type them out exactly in the  will need to write a regular expression (regex for short) to match them. Before opening the WranglesXL add-in, it is wise to head over to [Regex101](https://regex101.com/) to build and test your pattern. If you are unfamiliar with writing regular expressions, there are lots of great sources online such as [this one](https://www.geeksforgeeks.org/write-regular-expressions/)

Since all of our url's are wrapped in parenthesis, we will want our pattern to match the following example:

	(https://www.grainger.com/product/DAYTON-Lathe-Metal-Turning-53UH18)

By utilizing the regex tools mentioned, we have come up with the following pattern:

	\(https:.+\)

Now, we can plug our regex pattern into the Replace Wrangle and run it.

![stock_replace.gif](/in-depth-examples/remove-words/stock_replace.gif)

> **Note:** When using a regular expression in the Replace Wrangle, the Use Regex toggle must be turned on.
\{.is-info\}

## Removing Words in a Recipe

Removing words isn't always as simple as using the [remove_words](/wrangle/format#remove-words) wrangle. There are many cases where an extract wrangle will find a match but the remove wrangle will not. This is because extracts are allowed variants (listed int he "Find" column of the training data). By using an extract wrangle in conjunction with our remove_words wrangle, we can achieve the desired output.

This portion of the tutorial will show you how to build a short recipe that uses both extract and remove_words to remove brand names from our data. 

Let’s use the data below to demonstrate this:

![remove_words_data.png](/in-depth-examples/remove-words/remove_words_data.png)

In this case, we will implement an extract wrangle that was built with the intention of extracting brands that may or may not be abbreviated. Here is the training data for our extract wrangle:

![demo_brands.png](/in-depth-examples/remove-words/demo_brands.png)

If you are not familiar with extract wrangles, see [here](/wrangle/extract). The particular extract wrangle we are using is Custom.

Now, let’s add this to a recipe and see what our output is.

```yaml 
wrangles:
  - extract.custom:
      input: Short Description
      output: Brand
      model_id: xxxxxxxx-xxxx-xxxx
```

![recipe_step1.png](/in-depth-examples/remove-words/recipe_step1.png)

With the recipe as is, we will not be able to remove the brand names. This is because the brand names are being output in their unabbreviated form. Let’s use the extract_raw parameter to output the brand names as they are shown in our data.

```yaml 
wrangles:
  - extract.custom:
      input: Short Description
      output: Brand
      model_id: xxxxxxxx-xxxx-xxxx
      extract_raw: true
```

![recipe_step2.png](/in-depth-examples/remove-words/recipe_step2.png)

Now, we are ready to add the remove_words wrangle to our recipe.

```yaml 
wrangles:
  - extract.custom:
      input: Short Description
      output: Brand
      model_id: xxxxxxxx-xxxx-xxxx
      extract_raw: true

  - remove_words:
      input: Short Description
      to_remove:
        - Brand
      output: Short Description (No Brand)
      ignore_case: true
```

![recipe_step3.png](/in-depth-examples/remove-words/recipe_step3.png)

As you see, we now have three columns with the last column being our goal. If you do not desire to output all columns, you can list the ones you want to output in the "columns" parameter of the [Excel Connector](/python/connectors/excel).