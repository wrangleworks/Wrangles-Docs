---
title: "New Standardize"
slug: /excel/new-standardize
---

- [Basics *Unsure how to start? Learn how.*](/excel)
\{.links-list\}

---

The Standardize Wrangle can be used to replace words or patterns with their "standardized" form. You can think of this Wrangle as a smart find-and-replace feature. In addition to our Standardize Stock Wrangles, you can customize Standardize Wrangles so that they are much more unique to your use case.


# Stock
- Spaces
- Phone Number
- Fraction to Decimal 
- Remove Characters
- Significant Figures
- Replace 

Stock Wrangles are available out of the box and can be used in the following ways:

## Spaces
Standardize text by eliminating extra spaces and converting special space characters to a single space.

![standardize-spaces-wrangle.gif](/gifs/spaces.gif)
### Tabset \{.tabset\}
#### Example 

 
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr> In the case of zero width space in a URL
<tr><td>

| Before |
| --- |
| wrangles.io |
| wrangleworks.com |

</td><td>
→ 
</td><td>

| After |
| --- |
| wrangle s.io |
| wrangle works.com |
  
</td></tr>
</table>
</div>


## Phone Numbers
Standardize phone numbers to a consistent format by choosing from predefined format options or customizing your own. 
**Note:** This Wrangle reformats phone numbers starting from the last digit and cuts off any excess digits outside the specified format. It performs the reformatting from right to left.

### Tabset \{.tabset\}
#### Options
| Option | Example |
| :---------------- | :---- |
| (XXX) XXX XXXX | (123) 456 7890 |
| (XXX)-XXX-XXXX | (123)-456-7890 |
| XXX XXX XXXX | 123 456 7890 |
| Custom format example: XXX-XXX | 567-890  |


## Fraction to Decimal
Standardize each fraction into its decimal equivalent.

### Tabset \{.tabset\}
#### Example

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr> Decimal Places = 2
<tr><td>

| Before |
| --- |
| 1/2 |
| 1/3 |
| 1/4 |


</td><td>
→ 
</td><td>

| After |
| --- |
| .50 |
| .33 |
| .25 |
  
</td></tr>
</table>
</div>

## Remove Characters
Standardize your data by removing specific characters.

![standardizeremove.gif](/gifs/remove_bar_and_brackets.gif)

### Tabset \{.tabset\}
#### Example
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr> Character to Remove: !
<tr><td>

| Before |
| --- |
| I would love to tell you about Wrangle works! It's so cool.|
| Wrangle Works is the BEST! |
  
</td><td>
→ 
</td><td>

| After |
| --- |
| I would love to tell you about Wrangle works It's so cool.|  
| Wrangle Works is the BEST |

</td></tr>
</table>
</div>

## Significant Figures
Standardize the precision of your numerical data by specifying the desired number of significant figures.

### Tabset \{.tabset\}
#### Example
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr> Significant Figures: 3
<tr><td>

| Before |
| --- |
| 0.0544859 |
| 0.75849 |

</td><td>
→ 
</td><td>

| After |
| --- |
| 0.0545 |
| 0.758 |
  
</td></tr>
</table>
</div>

## Replace
Standardize data with our find and replace functionality; optionally utilize regular expressions for advanced matching. 

### Tabset \{.tabset\}
#### Example
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>
  
| Before |
| --- |
| Wrangle works is 4 years old |
| Wrangle works is 4 years old |

</td><td>
→ 
</td><td>

| Regex |
| --- |
| Off - Find: young , Replace: old|
| On - Find: \d , Replace: # |

</td><td>
→ 
</td><td>

| After |
| --- |
| Wrangle works is 4 years young |
| Wrangle works is # years old |
  
</td></tr>
</table>
</div>

# Custom
Custom Wrangles must be trained before they can be used. Once trained, DIY or bespoke Wrangles (created by WrangleWorks) will be available here.

To train a DIY Standardize Wrangle in Excel see [here](https://wrangles.io/en/excel/my_wrangles).

![standardize.gif](/gifs/standardize.gif)

## Words

Keywords can be identified and replaced in batch.

Replace abbreviations, change alternative phrasing to be consistent, or remove unwanted information.

- Single or multiple words can be matched.
- Matches are not case sensitive.
- Matches will be made against whole words only, partial matches within words will not be affected.

### Samples
| Find | Replace |
| ---- | ------- |
| ave | Avenue |
| USA | United States of America |
| United Kingdom | UK |

## Regular Expressions

For more advanced use, [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) (regex) can be used. To apply regex, prefix with *regex:*

> [Regex Cheat Sheet](https://www.debuggex.com/cheatsheet/regex/python): A useful reference of regex terms.
> [Regex Testing](https://regex101.com/): A useful tool to test regex
\{.is-info\}

### Samples
| Find | Replace | *Effect* |
| ---- | ------- | -------- |
| regex: (\d\{2\})\/(\d\{2\})\/(\d\{4\}) | DATE | *Replace dates with the word DATE* |
| regex: \^[\^0-9]\*(\d\{3\})[\^0-9]\*(\d\{3\})[\^0-9]*(\d\{4\})$ | (\1) \2-\3 | *Format US phone numbers (123) 456-7890* |
| regex: (\w+)\s(\w+) | \2 \1 | *Group two words and return the second group first followed by first. e.g. Sherlock Holmes -> Holmes Sherlock* |

## Multiple Variants
Standardizing data when variants exists can be done in two ways:
### Multiple Rows
Write each variant on a separate row
![multiple-row-standardize-sample.png](/images/multiple-row-standardize-sample.png)

### Same Row
Write each variation on the same row, separated by a bar (|)
![same-row-standardize-sample.png](/images/same-row-standardize-sample.png)
