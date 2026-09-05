---
title: "Extract Materials"
slug: /excel/in-depth-example/extract-materials
---

## Using Stock Wrangles

### Extract

To use Stock Wrangles, Go to the **Data Wrangles** Menu at the top, once here, a new tool menu will appear. Click on **Extract**, this will open the Wrangles Task Pane where Stock Wrangles can be used.

![tool_menu_2022_6_23_extract.png](/in-depth-examples/tool_menu_2022_6_23_extract.png)


Let’s say we want to extract all materials from the Products column. You can run a Wrangle on the whole column or just a few cells, [click here for more info](https://wrangles.io/en/excel/basics).

To do this, highlight the cells you want (or column), once highlighted, go to the Data Wrangles window and click on the Properties button. This will bring up a dropdown menu, Click **Materials**.

![data_wrangles_window_pupup.png](/in-depth-examples/data_wrangles_window_pupup.png)
![properties_materials.png](/in-depth-examples/properties_materials.png)

This will create a new column with materials extracted. If the cells are blank, it means that the materials were not found or are not in the list.

![materials_output.png](/in-depth-examples/materials_output.png)

Repeat the same steps for shapes and codes.