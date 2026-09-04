---
title: "Step 1: Extract Properties"
slug: /excel/in-depth-examples/example-1/step-1
---

## Step 1: Extract Properties 

To reformat our data, we will start by creating the "Materials" column. To achieve this, we'll extract all materials from the text using the "Materials" wrangle located under the "Properties" section.

> You can run a Wrangle on the whole column or just a few cells, [click here for more info](https://wrangles.io/en/excel/basics). \{.is-info\}

1. To do this, highlight all the cells containing your data or simply highlight the entire column. 
2. Navigate to the Data Wrangles Task Pane and click on the Properties button. 
3. A dropdown menu will appear; select **Materials** from the options.

![extractmaterials.gif](/gifs/materials.gif)

By doing this, a new column will be generated with the extracted materials.

![properties-materials.png](/images/properties-materials.png) 

Blank cells indicate that the materials were not found or may not be present in the predefined training data. In this case, there was no material in the data to extract.

Extract Wrangles can be trained to identify specific keywords of your choice, but we'll cover that later when we introduce Custom Extract Wrangles.

**Next, follow the same steps to extract information for Colors and Shapes.**

After extracting materials, colors, and shapes, your spreadsheet will look something like this: 

![properties_output.png](/images/properties_output.png)
