---
title: Standardize
slug: /excel/standardize
---

- [Basics *Unsure how to start? Learn how.*](/excel)
- [DIY Standardize Wrangles *Build your own customized standardize wrangles*](/excel/my_wrangles/standardize)
\{.links-list\}

---
This is a testing env
The Standardize Wrangle can be used to replace words or patterns with their "standardized" form. You can think of this Wrangle as a smart find-and-replace feature. In addition to our Standardize Stock Wrangles, you can customize Standardize Wrangles so that they are much more unique to your use case.

> Click [here](/wrangle/format#standardize) to learn how to use Standardize Wrangles in a recipe.


# Convert Attributes
Convert units or standardize if Convert To is set to Standard.

## Tabset \{.tabset\}
### Example

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr> Decimal Places = 2
<tr><td>

| Before |
| --- |
| 1/2 inch |
| 1/3 foot |
| 1/4 yard |


</td><td>
→ 
</td><td>

| After |
| --- |
| .50 in |
| 4 in |
| 9 in |
  
</td></tr>
</table>
</div>

### Options
| Option | Notes |
| :----: | :---: |
| Attrbute | The attribute to be extracted. |
| Convert to | The desired unit for the output (an attribute must be selected for this option). All units will be converted if not already represented in desired unit. |
| Significant Figures | The number of digits to report the value. |

### Attributes
| Attribute | Description |
| :---------------- | :---- |
| All | Extracts all attributes found as a JSON object |
| Angle | Angles in degrees or radians |
| Area | 2D areas such as m&lt;sup>2&lt;/sup> or ft&lt;sup>2&lt;/sup> |
| Capacitance | The amount of charge that can be stored at a given voltage by an electrical component called a capacitor. |
| Charge | Electric charge (measured in coulombs). |
| Current | Electrical current. |
| Data Transfer Rate | The speed at which data moves from one device to another or within a network. |
| Electric Potential | The difference in potential energy per unit charge between two locations in an electric field (ie the **voltage**). |
| Electrical Conductance | The measure of how easily an electrical current passes through a material. |
| Electrical Resistance | The measure of the opposition to the flow of current in an electrical circuit. |
| Energy | Power derived from the utilization of physical or chemical resources, especially to provide light and heat or to work machines. |
| Force | Forces such as newtons. |
| Frequency | The measure of how often something happens or repeats within a unit of time. |
| Inductance | The tendency of an electrical conductor to oppose a change in the electric current flowing through it. |
| Instance Frequency | The frequency of a signal at a specific point in time (ie rotations per minute or rpm). |
| Length | Lengths such as mm or inches |
| Luminous Flux | A measure of the perceived power of light emitted from a light source. |
| Mass | The measure of the amount of matter in a body. |
| Power | Power such as watts or hp |
| Pressure | Pressure such as psi or bar |
| Speed | The rate at which someone or something is able to move or operate. |
| Temperature | The average kinetic energy of the vibrating and colliding atoms making up a substance. |
| Volume | 3D volumes such as m&lt;sup>3&lt;/sup> or ft&lt;sup>3&lt;/sup> |
| Volumetric Flow | Also known as volume flow rate, or volume velocity, is the volume of fluid which passes per unit time. |


# Fraction to Decimal
Standardize each fraction into its decimal equivalent.

## Tabset \{.tabset\}
### Example

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

# Phone Numbers
Standardize phone numbers to a consistent format by choosing from predefined format options or customizing your own. 
**Note:** This Wrangle reformats phone numbers starting from the last digit and cuts off any excess digits outside the specified format. It performs the reformatting from right to left.

## Tabset \{.tabset\}
### Options
| Option | Example |
| :---------------- | :---- |
| (XXX) XXX XXXX | (123) 456 7890 |
| (XXX)-XXX-XXXX | (123)-456-7890 |
| XXX XXX XXXX | 123 456 7890 |
| Custom format example: XXX-XXX | 567-890  |



# Remove Attributes
Remove attributes from the selected range

## Tabset \{.tabset\}
### Example
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr> Character to Remove: !
<tr><td>

| Before |
| --- |
| It's a 13ft shark! |
| 13mm Ratchet Wrench |
| 3lb Hammer |
  
</td><td>
→ 
</td><td>

| After |
| --- |
| It's a shark! |  
| Ratchet Wrench |
| Hammer |

</td></tr>
</table>
</div>


# Remove Characters
Standardize your data by removing specific characters.

![remove_brackets.gif](/gifs/remove_brackets.gif)

## Tabset \{.tabset\}
### Example
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

# Remove Words
Standardize your data by removing specific words. The Remove Words wrangle will remove words **found in** subsequent columns **from** the leftmost column. This can be done in entirety (where ordering of the words matters) with the "Tokenize to remove" parameter set to False, or word for word with "Tokenize to remove" set to True. The "Ignore Case" parameter can also be used to account for or ignore case when set to True or False (respectively).

![remove_words.gif](/gifs/remove_words.gif)

## Tabset \{.tabset\}
### Example
<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr> Removing Part Numbers From Description
<tr><td>

| Description | Part Number |
|:-----------:|:-----------:|
| Sartwatch Apple 0000ADKEJN88ENK Red $600 | 0000ADKEJN88ENK |
| Voluptatem Samsung 2lb Blue 0000AHYR898RFHUI $100 | 0000AHYR898RFHUI |
| 0000HHGT7TR97H GGL Steel TV AAA $100 | 0000HHGT7TR97H |
  
</td><td>
→ 
</td><td>

| Description - Remove Words |
|:-----------:|
| Sartwatch Apple Red $600 |
| Voluptatem Samsung 2lb Blue $100 |
| 0000HHGT7TR97H GGL Steel TV AAA $100 |

</td></tr>
</table>
</div>

# Replace
Standardize data with our find and replace functionality; optionally utilize regular expressions for advanced matching.

> Click [here](/wrangle/format#replace) to learn how to use Replace Wrangles in a recipe.

## Tabset \{.tabset\}
### Example
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

# Round
Round to a set number of decimal places. Number of decimal places to round to can be set by the user. The example below shows rounding to two decimal places.

> Click [here](/wrangle/format#round) to learn how to use Round Wrangles in a recipe.

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>
  
| Before |
| --- |
| 3.14159265359 |
|  2.718281828459045 |
| 6.02214076 × 10^23 |

</td><td>
→ 
</td><td>

| After |
| --- |
| 3.14 |
| 2.72 |
| 6.02 x 10^23 |
  
</td></tr>
</table>
</div>

# Significant Figures
Standardize the precision of your numerical data by specifying the desired number of significant figures.

## Tabset \{.tabset\}
### Example
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

# Spaces
<!-- wrangle: {"type":"clean_whitespaces","model_id":"e36e15c4-f0ad-43f8-8555-ef683a8ab892"} -->
Standardize text by eliminating extra spaces and converting special space characters to a single space.

![extra_spaces.gif](/gifs/extra_spaces.gif)
## Tabset \{.tabset\}
### Example 

 
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