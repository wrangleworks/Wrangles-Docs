---
title: "Trimming Company Names"
slug: /excel/Let's-Get-Ready-To-Wrangle/Trimming-Company-Names
---

# How to Trim Company Names

Many company names are inherently noisy. They tend to not only have suffixes (LLC, Incorporated etc), which are unrelated or not useful to your data, but they also tend to include generic words that add to the noise (systems, technology, manufacturing etc). We find it to be best practice to utilize a standardize wrangle to trim these company names down to their root, unique, name.

## Utilizing a Standardize Wrangle

For this task, we will walk you through creating a standardize wrangle that uses regular expressions (regex) to match suffixes and return nothing in their place. If you are unfamiliar with creating a standardize wrangle, click [here](/excel/my_wrangles/standardize).

Below is an example set of typical company names. We will use this as a base for creating our standardize wrangle.

| Brand |
|:-----:|
| Tool Guys International LLC |
| Alpha Technology Corp. |
| T & V Coring Co. |
| BWR Manufacturing Inc |
| Max Power, GMBH |
| SolTech Energy, Ltd |
| General Generic Stuff, LLC |

As you can see, these company names can be trimmed down to their core title and still be unique from one another. I will note that many company names can be very generic and therefore become overly generic after cleaning them up. For this reason, it is very important that this is taken only as an example. Discretion should be used based on your data and your results.

### Creating Our Regex Pattern

First, let’s start by creating a regex pattern to match all of our suffixes. We can use a single pattern to match all of our cases. This will help keep our wrangle nice and short. 

,?\s?(LLC|Corp|Co|Inc|GMBH|Ltd)\.?

While this pattern may look complicated and intimidating, it is actually a very simple regex pattern with only four pieces. 

The first piece (,?) is looking for a comma but the question mark allows a match zero or one times. This means that the match does not necessarily have to have a comma, but if it does, then it will be included. 

The second piece (\s?) is looking for any whitespace character (\s) zero or one times. This means that it will match any space, tab, or new line character zero or one times. In regex, backslashes are used as escape characters. This means that the character proceeding the backslash is not to be interpreted as its normal self. In this case, it converts a simple "s" to any whitespace character.

The third piece ("(LLC|Corp|Co|Inc|GMBH|Ltd)") is simply a list of our suffixes, each separated by a |. These do not have to match in case as standardize wrangles are built to be case insensitive.

And the last piece (\.?) matches a period zero or one times. Periods are special characters in regex and therefore must be escaped (allowing it to be interpreted as a simple period).

For more on regular expressions, or if you'd like to see more on how our pattern works, go to [regex101.com](https://regex101.com/). It is always best practice to start your pattern there and test it with examples from your data before implementing it into your wrangle.

Now, we can add our regex pattern to our standardize wrangle. 

| Find | Replace | Notes |
|:----:|:-------:|:-----:|
| regex: ,?\s?(LLC\|Corp\|Co\|Inc\|GMBH\|Ltd)\.? | | Replaces suffixes in parenthesis (lead by ", " or followed by ".") with nothing. |

I you recall from the [regex](/excel/my_wrangles/standardize#regular-expressions), regex patterns must be lead with "regex:" so that the wrangle knows that it is a regex pattern.

### Adding Noisy Words

Now that the regex pattern has been created, we can add the words we'd like to drop. These will be common words that add little to no value to the company name. Keep in mind that sometimes this can go too far, so it is always best to test on your own data to make sure company names aren't left too generic once wrangled.

| Find | Replace | Notes |
|:----:|:-------:|:-----:|
| regex: ,?\s?(LLC\|Corp\|Co\|Inc\|GMBH\|Ltd)\.? | | Replaces suffixes in parenthesis (lead by ", " or followed by ".") with nothing. |
| International | | | 
| Technology | | |
| Coring | | |
| Manufacturing | | |
| Energy | | |
| Stuff | | |

While these could have been added to the same line (separated by "|"), I chose to place them on their own line to make the training data easier to read. This also applies to our regex pattern. Sometimes it is easier to read and interpret training data all in one line and sometimes it is easier to interpret on separate lines.

### Results

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| Brand |
|:-----:|
| Tool Guys International LLC |
| Alpha Technology Corp. |
| T & V Coring Co. |
| BWR Manufacturing Inc |
| Max Power, GMBH |
| SolTech Energy, Ltd |
| General Generic Stuff, LLC |

</td><td>
→ 
</td><td>

| Brand | Brand Wrangled |
|:-----:|:--------------:|
| Tool Guys International LLC | Tool Guys |
| Alpha Technology Corp. | Alpha |
| T & V Coring Co. | T & V |
| BWR Manufacturing Inc | BWR |
| Max Power, GMBH | Max Power |
| SolTech Energy, Ltd | SolTech |
| General Generic Stuff, LLC | General Generic |
  
</td></tr>
</table>
</div>

> Note: It is always a good idea to run a trim wrangle on your data after running a standardize wrangle like this to drop extra spaces that came about because of the wrangle.
\{.is-info\}