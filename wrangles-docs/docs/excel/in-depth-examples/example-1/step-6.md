---
title: "Step 6: DIY Extract Wrangle Example 1"
slug: /excel/in-depth-examples/example-1/step-6
---

## Step 6: DIY Extract Wrangle Example 1

Since there isn't an existing stock wrangle specifically designed to extract the brands in our product data, we can develop a DIY or Custom Wrangle to create the "Brand" column. This custom wrangle will allow us to define and retrieve the brands we specify. We  will call this wrangle our Demo Brand Wrangle.

**What does it mean to create a custom extract wrangle?** Creating a custom extract wrangle involves training the extract model to find specific keywords. In this case, the keywords we are going to find are Brands: Google, Samsung, and Apple.

To create the custom wrangle and train the model, follow these steps:

1. Click on "My Wrangles" in the ribbon.
2. In the Wrangles Task Pane, click "Extract." This will open the Wrangles Task Pane, where DIY Wrangles can be used and created.

![extracttaskpane.png](/images/extracttaskpane.png)

In the Wrangles task pane you will see a search bar (used to search this wrangle type), a plus sign (to add a new wrangle), a gear (settings) and a question mark (help link). We need to create an Extract Wrangle, so click on the **+** button.

![extraactoptions.png](/images/extraactoptions.png)

Once you click on the **+** button, a new side window and sheet will appear. The sheet will have the title **Train an Extract Wrangle** and will have three columns, **Entity to Find** , **Variation (Optional)** and **Notes**. Here, we can add data to our Demo Brand Wrangle.

**Note:** Extract wrangles have the option to use regular expressions (regex) to search for patterns.
> [Regex Cheat Sheet](https://www.debuggex.com/cheatsheet/regex/python): A useful reference of regex terms.
> [Regex Testing](https://regex101.com/): A useful tool to test regex
\{.is-info\} 

Enter the brand names data (Samsung, Apple, Google) in the "Entity to Find" column as shown in the example below. Any variations (misspellings, abbreviations etc.) of the data you wish to extract can be put in the "Variation (Optional)" column. We do not have any variations in our data so we will leave this column blank. On the Data Wrangles task pane you'll see text box labeled "Name:", name the Wrangle "Demo Brands" and click **Submit**.

![demo-brands-custom.png](/images/demo-brands-custom.png)

When the model is ready, it will appear in My Wrangles window.

![demo-serp.png](/images/demo-serp.png)

*After clicking submit the Train-Extract sheet will be automatically deleted.*

Now we are ready to run our Wrangle! Highlight the cells (or column) you want to run the model on, once highlighted, go to the Wrangles Task Pane and click on the **▷** button. This will create a new column with the extracted data. If no data is found the cell will be blank.

Here is our output: 

![customoneoutput.png](/images/customoneoutput.png)

As we can see, some of the brand names were not found. Upon closer inspection, it appears that "Google" is abbreviated as "GGL," and "Samsung" is misspelled as "Smsung."

To address this, let's update the Wrangle data and include some variations for the brand names.

1. On the Wrangle Task Pane, click the ⁝ options button, and then select 📄 "Edit."
2. In the Samsung row, we will add "Smsung" to the "Variations (Optional)" column and "GGL" to the variaton for Google. 
3. Click submit once again and the wrangle will be retrained with the new variations.

Now, when we run the Wrangle again, Google and Samsung will be extracted as a match for GGL and Smsung.

![updatecustomextract.gif](/gifs/updatecustomextract.gif)

The wrangles training data is saved on our database and can be accessed again by pressing the 📄 edit button.

In the next custom wrangle example we will create a Custom Wrangle that extracts data using regex.