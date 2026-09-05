---
title: "Map"
slug: /excel/map
---

> Map is a premium feature of the Data Wrangles add-in. [Contact Us](https://www.wrangleworks.com/contact.html) to get access to this feature.
\{.is-info\}

---

Map Wrangles can be thought of as the standardize for column names and tables. That is, they take selected columns from one table and create a new table with standardized column names. Map Wrangles are all DIY or bespoke due to their specificity. See below to learn how to use and build Map Wrangles.

![mywranglesmap.png](/images/mywranglesmap.png "Map wrangles")

# Using Map Wrangles
Map Wrangles are used to map columns from one table to another. To use a Map Wrangle, just click the run button then assign your columns.

If you would like a column to be filled in a uniform value, simply highlight a cell containing the value you wish to use then *right click* the appropriate check box for your column.

![general_map.gif](/gifs/map/general_map.gif "General use of a map wrangle")

## Tools

When running a Map Wrangle, you will notice a vertical ellipsis where you can access tools. If you click on this ellipsis, you'll see the three map tools: Magic Button, Collapse, and Copy Down. Keep reading to learn about how each one works.

### Magic Button

The magic wand icon under the tools button represents the Magic Button. The Magic Button attempts to automatically map columns for you. If the column names are an exact match, the Magic Button can easily map the columns. Columns which have no exact match will have a pop-up menu of suggested matches. To select one of the suggested matches, simply hover over the check box to access the menu then click on the column name of your choosing.

The real magic occurs after the Magic Button has been trained by mapping the columns manually. With each use of the Map Wrangle, the Magic Button is trained. Once it is confident, it will automatically map columns based on how they have been mapped in the past. The magic button will not map columns which it has not been properly trained on.

![magic_button.gif](/gifs/map/magic_button.gif "Using the map button")

Learned data can be deleted by editing the map wrangle, clicking on settings then clicking the "Delete Learned Data" button shown below.

![map_settings.png](/images/map/map_settings.png "Map settings")
![delete_magic_data.png](/images/map/delete_magic_data.png "Deleting learned data")

### Flatten

The Flatten tool (highlighted in red below) allows users to collapse multi-column headers into one. This is especially useful in cases where there is a table that has headers that are both single and multi-column. Text from each row is separated by a period.

![map_flatten.png](/images/map/map_flatten.png "Flatten tool")

![map_flatten.gif](/gifs/map/map_flatten.gif "Flatten tool example")

The gif above shows the Collapse tool in action. Now, the data is ready to be mapped.

### Fill

The Fill Down tool (shown below in red) copies useful data down into all selected rows below. This is useful when adding a description or some other useful data to rows in a table. 

![map_copy_down.png](/images/map/map_copy_down.png "The Fill Down Tool")
![map_copy_down.gif](/gifs/map/map_copy_down.gif "Fill Down tool example")

The gif above shows an example use case of how to use the Fill Down tool. Now the descriptions are included in our table, which is ready to map.

Additionally, the Fill tool can be used to fill up, left, and right.
![map_fill_left_right_up.png](/images/map/map_fill_left_right_up.png "Fill up, left, and right")

### Gather

The Gather tool can be used to merge selected cells into one column. This is not to be confused with the concatenate wrangle as the Gather tool works at the cell lever and expects one cell per row maximum.

![map_gather.png](/images/map/map_gather.png "The Gather tool")
![map_gather.gif](/gifs/map/map_gather.gif "Gather Tool example")

The Gather tool can also be used to gather data down, instead of to the right, by selecting your data, clicking the dropdown next to the Gather Tool, then selecting Gather Row.

![gather_down.png](/images/map/gather_down.png "Gather Down tool")

### Unmerge

The Unmerge tool allows users to unmerge cells that have been merged with the Excel Merge Cells tool. While the Excel unmerge only puts the data in the top leftmost cell, the Map Unmerge fills all cells with the same data.

![map_unmerge.png](/images/map/map_unmerge.png "Unmgere ool")
![map_unmerge.gif](/gifs/map/map_unmerge.gif "Unmerge tool example")

## Filtering Map Columns

Map columns can be filtered within the Wrangles Task Pane by clicking the filter icon at the top of the check box column. There are two toggle buttons to filter your columns, "Hide Matched" and "Required Only". Hide Matched will hide the columns that have already been mapped, and Required Only will show only the required columns.

![map_filters.png](/images/map/map_filters.png "Filter map columns")

Mapped columns can also be cleared by clicking the Clear Mapping button, highlighted below in red.

![clear_mapping.png](/images/map/clear_mapping.png "Clear current mapping")

## Using Map With a Recipe

Recipes can be attached to the end of a map wrangle and will run once the data is mapped. In order to attach a recipe to a map wrangle, simply go to the settings tab, click to enable a post map recipe then enter in the recipe's model id in the text box.

![post_map_recipe.png](/images/map/post_map_recipe.png "Adding a post map recipe")

## Adding Columns

User can add columns when running a map by turning on Allow Dynamic Columns (the default setting). 

![allow_dynamic_columns.png](/images/map/allow_dynamic_columns.png "Allowing dynamic columns to be added")

With this turned on, columns can be added using the button shown below.

![add_new_column.png](/images/map/add_new_column.png "Add a new column")

# Building a Map Wrangle

Map Wrangles take in two columns of training data: Name and Data Type (with an optional column for notes).

![maptraining.png](/images/maptraining.png "Training a map wrangle")

## Name

The Name column of the training data corresponds to the *standardized* column names which data will be mapped to. Each column does not have to be filled in with data for the Wrangle to work so feel free to add as many as needed but note that empty columns will appear in the output table for any unassigned column names.