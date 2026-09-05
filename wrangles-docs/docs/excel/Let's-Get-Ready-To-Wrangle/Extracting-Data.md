---
title: "Extracting Data"
slug: /excel/Let's-Get-Ready-To-Wrangle/Extracting-Data
---

# Extracting Meaningful Data With a Recipe

This tutorial will show you how to extract meaningful data from a set of dirty data using a recipe. The manual version of this tutorial can be found [here](/excel/Let's-Get-Ready-To-Wrangle/Extracting-From-Dirty-Data). Let's get ready to wrangle!

> Recipes are a premium feature of the Data Wrangles add-in. [Contact Us](https://www.wrangleworks.com/contact.html) to get access to this feature.
\{.is-info\}

## Introduction

[Recipes](/excel/recipes) allow a series of wrangles to be defined and run as an automated sequence. I this tutorial, we will go over how to take [this](/excel/Let's-Get-Ready-To-Wrangle/Extracting-From-Dirty-Data) series of wrangles and automate the process so that users can accomplish the same thing with just the click of a button.

If you recall from the manual excersize, our data is dirty and riddled with noise. This is what we have to start off with:

![demo_-_products.png](/images/demo_-_products.png)

The wrangles we will be working with can be found here:
- [extract.properties](/wrangle/extract#properties)
- [select.list_element](/wrangle/select#list-element)
- [extract.attributes](/wrangle/extract#attributes)
- [extract.codes](/wrangle/extract#codes)
- [replace](/wrangle/format#replace)
- [extract.address](/wrangle/extract#address)
- [extract.brackets](/wrangle/extract#brackets)
- [extract.custom](/wrangle/extract#custom)
- [merge.concatenate](/wrangle/merge#concatenate)

Here is the recipe we will be using, but keep reading to go over it step by step.

```yaml
wrangles:
  - extract.properties:
      input: Products
      output: Materials
      property_type: Materials

  - select.list_element:
      input: Materials
      element: 0

  - extract.attributes:
      input: Products
      output: Weight
      attribute_type: mass

  - select.list_element:
      input: Weight
      element: 0

  - extract.codes:
      input: Products
      output: Part Number

  - select.list_element:
      input: Part Number
      element: 0

  - replace:
      input: Part Number
      find: 0000
      replace: ''

  - extract.address:
      input: Products
      output: Country of Origin
      dataType: countries

  - select.list_element:
      input: Country of Origin
      element: 0

  - extract.brackets:
      input: Products
      output: Storage

  - extract.custom:
      input: Products
      output: Brand
      model_id: xxxxxxxx-xxxx-xxxx
      first_element: true

  - extract.custom:
      input: Products
      output: Product Type
      model_id: xxxxxxxx-xxxx-xxxx
      first_element: true

  - extract.custom:
      input: Products
      output: Price
      model_id: xxxxxxxx-xxxx-xxxx
			first_element: true

  - merge.concatenate:
      input:
        - Brand
        - Product Type
        - Storage
        - Price
        - Country of Origin
        - Part Number
      output: Description
      char: ' '
```

## Extracting Materials

```yaml
wrangles:
  - extract.properties:
      input: Products
      output: Materials
      property_type: Materials

  - select.list_element:
      input: Materials
      element: 0
```

The above code snippet shows the two wrangles used to extract materials. The first wrangle is straight forward, just a simple extract wrangle with a named property_type. Extract wrangles output a list of all matches, therefore we need to select the first match using select.list_element. In the near future, users will be able to specify this in the parameters of stock extract wrangles but for now a simple select.list_element will work. 

## Extracting Weight

```yaml
  - extract.attributes:
      input: Products
      output: Weight
      attribute_type: mass

  - select.list_element:
      input: Weight
      element: 0
```

Similar to extracting materials above, extracting weight uses a stock extract (extract.attributes) with a names attribute_type (mass) then utilizes select.list_element to select only the first match.

## Extracting Part Number

```yaml
  - extract.codes:
      input: Products
      output: Part Number

  - select.list_element:
      input: Part Number
      element: 0

  - replace:
      input: Part Number
      find: 0000
      replace: ''
```

Like done before, extracting part numbers utilizes a stock extract wrangle (extract.codes) with select.list_element but then we go an extra step. The replace wrangle is used to drop leading zeros from our part number.

## Extracting Country of Origin

```yaml
  - extract.address:
      input: Products
      output: Country of Origin
      dataType: countries

  - select.list_element:
      input: Country of Origin
      element: 0
```

I'm sure you are catching on to the process by now but again we a using a stock extract wrangle (extract.address) with a named dataType along with select.list_element.

## Extracting Storage

```yaml
  - extract.brackets:
      input: Products
      output: Storage
```

Storage is wrapped in curly brackets in our data so the extract.brackets stock wrangles is utilized to extract storage capacity. Here, we do not need to use a select wrangle, because we only have one set of brackets (if any) in each row. 

## Extracting Brand

```yaml
  - extract.custom:
      input: Products
      output: Brand
      model_id: xxxxxxxx-xxxx-xxxx
      first_element: true
```

In order to extract brand, we have utilized a custom extract wrangle. You'll notice that extract.custom has a first_element parameter that allows users to specify the first element only when running the wrangle. This gets rid of the need for an additional select wrangle. See [extract.custom](/wrangle/extract#custom) to learn how to train your own custom extract wrangle.

Our model is as follows:

![demo_brands.png](/images/demo_brands.png)

There are only three brands listed and two variations but that is just because we are working with a small set of data. Larger sets of data will likely require more training data.

## Extracting Product Type

```yaml
  - extract.custom:
      input: Products
      output: Product Type
      model_id: xxxxxxxx-xxxx-xxxx
      first_element: true
```

Just as before with brand, a custom extract wrangle is used to extract product type.

![demo_product_type.png](/images/demo_product_type.png)

One thing to note about the training data above is the seperation of variations with a " | ". This allows multiple variations to be utilized while keeping the training data clean and concise.

## Extracting Price

```yaml
  - extract.custom:
      input: Products
      output: Price
      model_id: e7ee8379-dd00-456d
			first_element: true
```

Again, we use a custom extract wrangle to extract price. This time though, we utilized the power of regular expressions (regex) to match on a pattern in order to extract price.

![demo_price.png](/images/demo_price.png)

In this regex pattern we are matching a dollar sign (\$) followed by one or more digit (\d+), possibly followed by a period (\.?) and lastly followed by zero or more digits (\d*).

> [Regex Cheat Sheet](https://www.debuggex.com/cheatsheet/regex/python): A useful reference of regex terms.
> [Regex101](https://regex101.com/): A useful tool to test regex
\{.is-info\}

## Creating a Description

```yaml
  - merge.concatenate:
      input:
        - Brand
        - Product Type
        - Storage
        - Price
        - Country of Origin
        - Part Number
      output: Description
      char: ' '
```

In order to creat a description, merge.concatenate was used to combine Brand, Product Type, Storage, Price, Country of Origin, and Part Number into one column. Creating a description can be tricky because you don't always want to include too much data but you also don't want to not include enough. This is why only these columns were included in our description, it keeps it short and clean while still being descriptive.

## Final Output

![extracting_data_recipe.gif](/gifs/extracting_data_recipe.gif)

The gif above shows how to run our recipe and get the desired output. I will admit, there was some gif making trickery behind the scenes that involved column resizing. Wrangles always preserve the width of columns when ran, so all of the output columns were as wide as our original column which does not play well in demonstrations.