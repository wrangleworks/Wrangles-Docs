---
title: "My Wrangles"
slug: /excel/my_wrangles
---

-   [Basics *Unsure how to start? Learn how.*](/excel)

* * *

The My Wrangles page of the Data Wrangles add-in is where Data Wranglers spend most of their time, it is where all of their DIY and Bespoke Wrangles can be found. DIY Wrangles are made by the user and can be edited. Bespoke Wrangles are custom Wrangles made by the Wrangle Works team which cannot be edited by the user. Both can be shared using permissions. Both can be Classify, Extract, or Standardize Wrangles.

![My Wrangles](/ui_2/screen_shots/my_wrangles/my_wrangles.png)

## Types of Custom Wrangles

-   [Classify *Predict which categories items belong to*](/excel/classify)
-   [Extract *Identify and extract meaningful information from unstructured text*](/excel/my_wrangles/extract)
-   [Standardize *Wrangles to Standardize text data*](/excel/my_wrangles/standardize)
-   [Lookup *Save data to be looked up later as a Wrangle or in a recipe*](/excel/Lookup)
-   [Map *Map columns from one table/sheet to another where the columns names have been standardized*](/excel/map)
-   [Recipe *A workflow of multiple wrangles*](/excel/recipes)

## Creating DIY Wrangles

The Data Wrangles Excel add-in makes it very easy to create your own Wrangle. Simply open the Data Wrangles tool bar and click on the "My Wrangles" button, this will open the Wrangles Task Pane. From here, click the button which pertains to the type of Wrangle (Classify, Extract or Standardize) you wish to create then click the **+** sign at the top right corner of the Task Pane. This will create a new sheet where the training data will need to be placed. Once the training data is all filled in and the model has been named, click the submit button to train your custom DIY Wrangle. Your DIY Wrangle is now ready for use from the Wrangles Task Pane.

> **Note:** If there are spaces before or after the text to find, the wrangle will not return an output. If a front/back space is needed in the extraction, the best approach is to use regex.

![Create a Standardize Wrangle](/ui_2/gifs/my_wrangles/create_standardize.gif)

Do not be worried if you have made an error and wish to change your training data, DIY Wrangles can always be retrained by clicking the edit button in the Wrangles Task Pane.

See the [WranglesXL tutorials](/excel/Let's-Get-Ready-To-Wrangle) for complete examples of building and using Wrangles.

### Referencing Your Wrangle in a Recipe

In order to use your wrangle in recipe, you will need to reference it using its model id. You can copy your wrangle's model id to your clipboard by either double clicking on the wrangle in the task pane, hovering over the wrangle then clicking the copy button in the pop-up window or by opening the "Edit Wrangle Details" panel (which is accessed with a single click of the wrangle) then clicking the copy button next to the model id at the top.

![Referencing a wrangle](/ui_2/gifs/my_wrangles/model_id1.gif)
![Referencing a wrangle](/ui_2/gifs/my_wrangles/model_id2.gif)

## Permissions

With permissions, you can allow others access to your Wrangles. There are three levels of permissions, see below for more information.

![Adding a user as an admin](/ui_2/gifs/my_wrangles/permissions.gif)

The search bar can be used to search those with permission to a wrangle. Additionaly, users will be suggested who do not currently have permission for the wrangle.

![suggested_permissions.png](/images/wranglesxl-v2-9-0/suggested_permissions.png)

### Available Roles

| Role | Access |
| --- | --- |
| **User** | The User tier allows others access to use the Wrangle but they cannot access the training data or grant others access to the Wrangle. |
| **Viewer** | Can view contents of a wrangle, but cannot make edits. Viewers can also clone wrangles and view who has permission to a wrangle. |
| **Editor** | In addition to being able to run a wrangle, Editors can also view and update the training data. Editors do not have access to a Wrangle's permission and therefore cannot grant others access. |
| **Admin** | Admins have full control over a Wrangle. They can edit meta and training data as well as access permissions to grant or restrict access from others. |

Roles can be searched on by including "role:" before the role in the search bar. (ie "role:admin")

#### Removing Users From a Wrangle

Admins can remove users (actual users, not just the user role) from wrangles by clicking the "Remove User" button next to the user's name in permissions. Admins can remove all users, including other admins.

![Remove a user](/gifs/remove_user.gif)

### Organizations

Organizations allow users that belong to an organization to see other users belonging to the same organization and to share wrangles/recipes with them by name or with the organization as a whole.

![303102082-ff7b20fd-b395-43f0-aaeb-24f30452a321.png](/images/releases/xl_2_3_0/303102082-ff7b20fd-b395-43f0-aaeb-24f30452a321.png)

Users who wish to share a wrangle with an organization which they are not a part of themselves can do so by typing orgname@org. It is not case sensitive, but users do need to know the organization's name which is typically a single word abbreviated version. For example, wrangleworks@org.

![org_sharing.png](/images/org_sharing.png)

Like roles, organizations can also be used to search by including "org:" before the organization in the search bar. (ie "org:wrangleworks")

### Setting Recipe Permissions

Recipes can be a little more complicated to set permissions because not only will permission need to be set for the recipe, but it will also need to be set for all of the diy wrangles used within the recipe. The easiest way to do this is to open a second Excel window with the WranglesXL add in open. In one window, search "model\_id" in the recipe's edit mode using control+f. This will show all of the diy wrangles within the recipe. In the second window, search for each model id and set permissions accordingly for each wrangle.

The gif below shows the process of searching for model id's and adding permission to the individual wrangles:
![recipe_permissions.gif](/ui_2/gifs/my_wrangles/recipe_permissions.gif)

## Versions

Versions allow users to restore previous versions of the wrangle. Versions store the last 30 iterations, or every iteration for the prior week. So, for instance, a wrangle has had 40 iterations in one week those 40 will be store for one week then the first 10 (oldest versions) will be dropped leaving the 30 most current iterations.

To access versions, simply click on the reverse clock icon in the Update panel. Below shows an example of versions in a classify wrangle.

![classify_versions.png](/images/classify_versions.png)

## Organizing Wrangles

Wrangles can be organized by adding (searchable) tags or by hiding them from view

### Tags and Notes

Tags and Notes can be added to each wrangle by either clicking on the wrangle itself or by clicking Details in the wrangle's menu.

Tags are searchable (by clicking the tag itself or by using the search bar) and appear below the name of the wrangle. These can be used to group wrangles by project or task.

Notes are not searchable and will appear in a pop-up if you hover your cursor over the wrangle. Notes also support html and markdown for customization. Click on the eye icon to show a preview of your notes. The magic wand is used to generate notes using AI, but will only work for users who havean OpenAI api key in their user, team or organization secrets.

The gif below shows how to add tags and notes:

![Adding tags and notes](/ui_2/gifs/my_wrangles/tags_and_notes.gif)

### Hide

Wrangles can be hidden from your task pane by using the Hide setting. To show hidden wrangles, toggle the setting on in the main settings.

![hide.gif](/ui_2/gifs/my_wrangles/hide.gif)

## Tool Tips

Tool Tips are the pop-up message that appears when hovering over a wrangle with your cursor. They show when a wrangle was last used, modified and created as well as the tags, notes and the model id.

![tool_tip.png](/ui_2/screen_shots/my_wrangles/tool_tip.png "Tool tip example using markdown.")

## Search, Filter, and Sort Wrangles

The wrangles search bar can be used to search for wrangles based on names, model ids, tags, roles, and even organizations. The Filter button can be used to quickly add common search queries to the search bar.

![filter.png](/ui_2/screen_shots/my_wrangles/filter.png)

Wrangles can also be sorted by name, last used, last modified and date created.

![sort.png](/ui_2/screen_shots/my_wrangles/sort.png)

Search terms can also be left out of the search by placing a dash in front of them. Ie "-negative". Note: this must be done for individual words.

## Cloning

Wrangles and Recipes can be cloned to create a copy by clicking the menu on the wrangle or recipe then clicking the Clone button.

![clone.gif](/ui_2/gifs/my_wrangles/clone.gif)

> **Note:** Cloning a recipe does not include cloning secrets saved with that recipe.

## Settings

Settings that allow the user to taylor the output to their specific use case. Settings are found by clicking the gear (next to the New Wrangle button) on the extract tab. See below for a description of these settings.

![settings.png](/ui_2/screen_shots/my_wrangles/extract/settings.png)

### General Settings

Settings that are applied accross all wrangles, not just extract wrangles.

#### Show Hidden

A toggle to show wrangles that have been hidden by the user.

#### Hide Stock Wrangles

A toggle that hides all stock wrangles from the My Wrangles list.

### Extract Settings

Settings that are specific to extract wrangles.

#### Pattern Settings

Settings specific to pattern based extract wrangles.

##### Output Format

This allows users to determine how the extract will output data. There are four different options; First Element Only, Columns, JSON, and Delimited.

###### First Element Only

Return only the first result.

> **Note**: This outputs matches it finds in the input based on the order they are listed in the training data.

###### Columns

The Columns settings allows you to output multiple results from extract in individual columns rather than as a delimited string or JSON array. This will create as many columns as are needed for each result to end up in it's own column. Keep in mind, that some rows will have more matches than others, so there will likely be many empty cells when using this setting.

###### JSON

Return the results as a JSON array e.g. \["result1", "result2", ...\].

###### Delimited

Return the results separated by a delimiter of your choice. e.g. with commas: result1, result2.

##### Case Sensitive

Extract only values that match the Wrangle data case.

##### Use Labels

Extract values in the format of an object: `{category: value}`.

If multiple "values" are found, the value will become an array:

Wrangle data must be in the form of **category: value**.

See [here](/excel/Let's-Get-Ready-To-Wrangle/Use-Labels) for a more in depth look at use\_labels.

##### Use Spellcheck

Use spellcheck to also find minor mispellings compared to the wrangle data.

##### Extract Raw

The Extract Raw setting allows users to return the raw value of the match found. That is, it extracts matches without standardizing their output.

#### AI Settings

##### Output Format

Set how the output is formatted for AI Extracts

###### Columns

Return the results into separated columns.

###### JSON

Return the results as a JSON object e.g.
