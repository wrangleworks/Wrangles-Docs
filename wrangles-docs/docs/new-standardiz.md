---
title: "New Standardiz"
slug: /new-standardiz
---

- [Basics *Unsure how to start? Learn how.*](/excel)
\{.links-list\}

---

The standardize Wrangle can be used to replace words or patterns with their "standardized" form. Currently we do not have a general use for Standardize Wrangles, so all are custom Wrangles ([DIY](https://wrangles.io/en/excel/my_wrangles) and [Bespoke](https://wrangles.io/en/waas/bespoke)) which are not included with the stock package. This is not to say that Standardize Wrangles are not as useful as the others, but that they are much more unique to each use case.

![standardize.gif](/gifs/standardize.gif)

# Words

Keywords can be identified and replaced in batch.

Replace abbreviations, change alternative phrasing to be consistent or remove unwanted information.

- Single or multiple words can be matched.
- Matches are not case sensitive.
- Matches will be made against whole words only, partial matches within words will not be affected.

## Samples
| Find | Replace |
| ---- | ------- |
| ave | Avenue |
| USA | United States of America |
| United Kingdom | UK |

# Regular Expressions

For more advanced use, [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) (regex) can be used. To apply regex, prefix with *regex:*

> [Regex Cheat Sheet](https://www.debuggex.com/cheatsheet/regex/python): A useful reference of regex terms.
> [Regex Testing](https://regex101.com/): A useful tool to test regex
\{.is-info\}

## Samples
| Find | Replace | *Effect* |
| ---- | ------- | -------- |
| regex: (\d\{2\})\/(\d\{2\})\/(\d\{4\}) | DATE | *Replace dates with the word DATE* |
| regex: \^[\^0-9]\*(\d\{3\})[\^0-9]\*(\d\{3\})[\^0-9]*(\d\{4\})$ | (\1) \2-\3 | *Format US phone numbers (123) 456-7890* |
| regex: (\w+)\s(\w+) | \2 \1 | *Group two words and return the second group first followed by first. e.g. Sherlock Holmes -> Holmes Sherlock* |

# Multiple Variants
Standardizing data when variants exists can be done in two ways:
### Multiple Rows
Write each variant on a separate row
![multiple-row-standardize-sample.png](/images/multiple-row-standardize-sample.png)

### Same Row
Write each variation on the same row, separated by a bar (|)
![same-row-standardize-sample.png](/images/same-row-standardize-sample.png)