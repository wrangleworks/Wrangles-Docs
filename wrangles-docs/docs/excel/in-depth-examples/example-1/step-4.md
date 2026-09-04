---
title: "Step 4"
slug: /excel/in-depth-examples/example-1/step-4
---

## Step 4: Extract Countries


Next, we will create our "Countries" column. To do this, follow these steps:

1. Highlight the data in the "Products" column.
2. Click on the "Address" option.
3. From the available options, select "Countries."

![extractcountries.gif](/gifs/extractcountries.gif)

As we can see, the model did not pick up "South Korea" as a country. 

![address-countries-output.png](/images/address-countries-output.png)

The tool does recognize that South Korea is a country and does work properly when ran on data containing it, my hunch here is that something has caused it to break. If South Korea is seperated by a non-breaking space (nbsp) or hasa leading/trailing nbsp then the model will not pick it up.