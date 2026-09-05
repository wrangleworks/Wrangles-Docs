---
title: "Use Labels"
slug: /excel/Let's-Get-Ready-To-Wrangle/Use-Labels
---

# Use Labels

The use_labels parameter (python/recipes) or setting (in Excel) can be very powerful when used properly, but using them is not always straightforward. This tutorial aims to take a deeper dive into implementing use_labels into your custom Extract Wrangle.

In Excel:
![excel_setting.png](/in-depth-examples/excel_setting.png)

In a recipe:
```yaml
wrangles:
	- extract.custom:
  		input: Description
      output: Attributes
      model_id: xxxxxxxx-xxxx-xxxx
      use_labels: true
```

## The Basics

When the use_labels parameter/setting is set to true, the output of the extract is returned as an object. This can be useful for returning things like product attributes where you can now store all of your attributes in one single Extract Wrangle. Without the use of use_labels, an Extract Wrangle would have to be created for each attribute, which can be cumbersome, especially when being used in a recipe. So, use_labels cuts down on the amount of Wrangles needed, streamlines recipes, and allows users to assign a label to a value.

## Training

Extract Wrangles that are meant to be used in conjunction with the use_labels parameter must be trained with this in mind in order for use_labels to function properly.

These Extract Wrangles are trained in the exact same way as normal, but instead users are to add a label in front of the output parameter which is separated with a colon. This allows the Wrangle to split up the output into key: value pairs. 

Here is an example of training data for an Extract Wrangle that is built to be used with use_labels.

<div className="table-scroll">
  
| Find | Output(Optional) | Notes |
|:----:|:----------------:|:-----:|
| chrome | Finish: Chrome | |
| bronze | Finish: Bronze | |
| pvc | Material: PVC | |
| copper | Material: Copper | |

</div>

## In Use

With the use_labels parameter/setting set to true, the output of this will look like the following:

<div className="table-scroll">
  
| Description | Extracted Attributes |
|:-----------:|:--------------------:|
| Chrome plated copper ball bearing | `{"Finish": "Chrome", "Material": "Copper"}` |
| First ever chrome plated pvc pipe | `{"Finish": "Chrome", "Material": "PVC"}` |
| Bronze colored copper faucet | `{"Finish": "Bronze", "Material": "Copper"}` |

</div>

This is just a small example that uses 2 attributes that have 2 values each, but this method can be implemented on a much larger scale.

**So what good does it do us to have the output as an object?** 

This is where we implement a second wrangle that will really show the advantage of using the use_labels parameter. In Excel, this Wrangle is the [Format Expand JSON Wrangle](https://wrangles.io/excel/format#expand-json), but in a recipe it is [split.dictionary](/wrangle/split#dictionary). Although they have different names, the outcome is still the same.

After running the previously mentioned Wrangle, our data now looks as follows:

<div className="table-scroll">
  
| Description | Extracted Attributes | Finish | Material |
|:-----------:|:--------------------:|:------:|:--------:|
| Chrome plated copper ball bearing | `{"Finish": "Chrome", "Material": "Copper"}` | Chrome | Copper |
| First ever chrome plated pvc pipe | `{"Finish": "Chrome", "Material": "PVC"}` | Chrome | PVC |
| Bronze colored copper faucet | `{"Finish": "Bronze", "Material": "Copper"}` | Bronze | Copper |

</div>

In just two steps, we have extracted attributes and listed them into their own columns. You'll notice that the new columns have been named after the keys from the "Extracted Attributes" column.

## Examples

```yaml
wrangles:
	- extract.custom:
  		input: Description
      output: Attributes
      model_id: xxxxxxxx-xxxx-xxxx
      use_labels: true
      
	- split.dictionary:
  		input: Attributes
```

![use_labels_example.gif](/in-depth-examples/use_labels_example.gif)