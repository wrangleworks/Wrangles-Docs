---
title: "Cleaning Data"
slug: /excel/Let's-Get-Ready-To-Wrangle/Cleaning-Data
---

# Cleaning Data
With wrangles, cleaning data sets is made quick and easy. This tutorial will walk you through cleaning a data set with the power of wrangles.

Before we start, let's get familiar with our data.

![demo_-_products.png](/images/demo_-_products.png)

At first glance, you'll notice exessive spaces, mispellings, leading zeros and just general noise. Let's see how we can utilize Data Wrangles to clean this data set.

## Removing Unwanted Characters/Words

Next, we will use the "Remove Characters" standardize wrangle to remove any unwanted words or characters. In our case, we will be removing "|", "\{", "\}", "AAA" and "0000". 

To start, we will use Remove Characters to remove "|", "\{", "\}" as it is removes single characters, not words. Remove Characters removes any the character you give it no matter it's position. Replace will be used to remove any multi-character strings.

![remove_bar_and_brackets.gif](/gifs/remove_bar_and_brackets.gif)

Now, let's use Replace to remove "AAA" and "0000". Replace takes two arguments "Find" and "Replace" but in our case we want to replace these with nothing so that field will just be left blank.

![remove_aaa_0000.gif](/gifs/remove_aaa_0000.gif)

## Standardizing Spaces

The standardize "Spaces" wrangle is used to collapse excessive spaces down to a single space while also replacing special space characters (such as non-breaking spaces) with a regular space. The gif below shows how to use this wrangle to reduce our excessive spaces down to a single space.

![spaces.gif](/images/spaces.gif)![spaces.gif](/gifs/spaces.gif)

## Mispellings & Abbreviations

Instead of using Replace to correct mispellings and abbreviations, lets build a custom standardize wrangle to do this. By creating a custom wrangle, we are building something that we can reuse in the future. 

Our mispellings to correct are "Sartwatch", and "Smsung" and the abbreviation is "GGL". Now, there are several words that look to be of another language but I do not what langauge, if any, it is. There is also not enough context to be able to tell what is meant here, whereas is our three examples there is.

![standardize_abbrevs.gif](/gifs/standardize_abbrevs.gif)

## Final Product

![data_cleanup.png](/images/data_cleanup.png)

With just a few quick and easy steps we have a much cleaner, easier to read data set. There are a few more things we could clean up (like the unkown words) but without the proper context or more information it is best to not get rid of data that may be important.

Let's see this entire process all together:

![cleaning_data.gif](/gifs/cleaning_data.gif)

In just over one minute we have gone from dirty to clean data.