---
title: "Extract2"
slug: /excel/extract2
---

- [Basics *Unsure how to start? Learn how.*](/excel)
- [DIY Extract Wrangles *Build your own customized extract wrangles*](/excel/my_wrangles/extract)
\{.links-list\}

---

Wrangles in the Extract category pull specific information out of an input column and, in some instances, standardize the values.

If the extract wrangle finds multiple values, it returns them as a comma-separated list.

![extract.png](/images/stock-extract/extract.png)


# Address \{#address\}

Addresses are an example of data that often gets lumped together into a single field.  
Most target systems require address parts (street, city, state, etc.) to be mapped  
to separate columns when importing. The **Address** extractor can wrangle that for you!


## Example \{#address-example\}

![Animated demo of Address wrangle](/gifs/address-2-wrangles.gif)

## Options \{#address-options\}

| Option   | Notes                                                                                     |
|----------|-------------------------------------------------------------------------------------------|
| Streets  |                                                                                           |
| Cities   |                                                                                           |
| Regions  | The exact area extracted varies between countries; equivalent to *states* in the USA.     |
| Countries|                                                                                           |

  
# Attributes \{#attributes\}

Extract numeric attributes such as lengths, weights, current, pressure and much more.

Attributes can be output as a Span (10-12" for example), Standard (a single value, averaged if a span is input), or an Object (key: value pairs of the span, standard, symbol, unit and value).

Desired units can be chosen for any given attribute (as long as there is more than one unit of measure for that attribute), and significant figures can be chosen as well.

![extract_attributes.gif](/gifs/extract_attributes.gif)


## Tabset \{.tabset\} \{#attributes-tabset\}
### Example \{#attributes-example\}

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| |
| --- |
| the length is 15mm |

</td><td>
→ 
</td><td>

| |
| --- |
| 15mm |
  
</td></tr>
</table>
</div>

### Options \{#attributes-options\}
| Option | Notes |
| :----: | :---: |
| Attribute | The attribute to be extracted. |
| Response Content | The desired output. Span, Standard or Object |
| Desired Unit | The desired unit for the output (an attribute must be selected for this option). All units will be converted if not already represented in desired unit. |
| Significant Figures | The number of digits to report the value. |


### Attributes \{#attributes-attributes\}
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

# Brackets \{#brackets\}
Extract the contents of any brackets from the input.

![extract_brackets.png](/images/extract_brackets.png)

## Tabset \{.tabset\} \{#brackets-tabset\}
### Example \{#brackets-example\}

<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| |
| --- |
| An (example) description |

</td><td>
→ 
</td><td>

| |
| --- |
| example | 
  
</td></tr>
</table>
</div>

### Options \{#brackets-options\}
| Option | Notes |
| :---------------- | :---- |
| All | Extracts the contents of any brackets. |
| Curly | \{\} |
| Square | [] |
| Round | () |
| Angled | &lt;> |
| Include Brackets | Allows brackets to be included or excluded in the output. |


# Codes \{#codes\}
Extract alphanumeric codes such as part codes or order numbers.

## Tabset \{.tabset\} \{#codes-tabset\}
### Example \{#codes-example\}


<div className="table-scroll">
<table>
<tr><th></th><th></th><th></th></tr>
<tr><td>

| |
| --- |
| product ABCD1234 |

</td><td>
→ 
</td><td>

| |
| --- |
| ABCD1234 |
  
</td></tr>
</table>
</div>
  
# Find \{#find\}

The Find extract wrangle allows users to extract text using strings or regular expressions.

![find_wrangle.png](/images/find_wrangle.png)
![finding_numbers.gif](/gifs/finding_numbers.gif)

# Properties \{#properties\}
Extract categorical properties such as colors.

## Tabset \{.tabset\} \{#properties-tabset\}
### Options \{#properties-options\}

![colors-extract.gif](/gifs/colors-extract.gif)

### Options \{#properties-options\}
| Option | Notes |
| :---------------- | :---- |
| All | Extracts all properties found as a JSON object. |
| Colours | |
| Materials | |
| Shapes | |
| Standards | |

  
# Quotes \{#quotes\}
Extract the content of single or double quotes from text.

![extract_quotes.png](/images/extract_quotes.png "Extract quotes wrangle")

![extract_quotes.gif](/gifs/extract_quotes.gif "Extract quotes example")

# SQL \{#sql\}
The SQL wrangle allows user to execute SQL queries in Excel against any table. The output of the query will be generated on a new sheet titled "Results".

![sql.gif](/images/stock-extract/sql.gif)

# Settings \{#settings\}
In the stock extract menu, you can change how the results are formatted if multiple results are returned with the settings button in the top right. 

![extractsettingsbutton.png](/images/releases/xl2_5_0/extractsettingsbutton.png)

![extractsettings.png](/images/releases/xl2_5_0/extractsettings.png)
## Tabset \{.tabset\} \{#settings-tabset\}
### \{#settings-options\}

| Option | Description |
| :---------------- | :---- |
| First Element Only  | Select only the first element to be returned from the extract Wrangle. |
| Columns  | Return every result from the extract in a different column.|
| JSON | Return the results as a JSON array. e.g. [result1, result2, ...]|
| Delimited | Return the results seperated by a delimiter, this will be the character in the text box. e.g. result1, result2, ...|