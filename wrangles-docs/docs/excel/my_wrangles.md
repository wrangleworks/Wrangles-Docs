---
title: "My_Wrangles"
slug: /excel/my_wrangles
---

- [Basics *Unsure how to start? Learn how.*](/excel/basics)
\{.links-list\}

---

The My Wrangles page of the Data Wrangles add-in is where Data Wranglers spend most of their time, it is where all of their DIY and Bespoke Wrangles can be found. DIY Wrangles are made by the user and can be edited. Bespoke Wrangles are custom Wrangles made by the Wrangle Works team which cannot be edited by the user. Both can be shared using permissions. Both can be Classify, Extract, or Standardize Wrangles.

![mywrangles.png](/images/mywrangles.png) 

# Types of Custom Wrangles

- [Classify *Predict which categories items belong to*](/excel/classify)
- [Extract *Identify and extract meaningful information from unstructured text*](/excel/my_wrangles/extract)
- [Standardize *Wrangles to Standardize text data*](/excel/my_wrangles/standardize)
- [Map *Map columns from one table/sheet to another where the columns names have been standardized*](/excel/map)
- [Lookup *Save data to be looked up later as a Wrangle or in a recipe*](/excel/Lookup)
\{.links-list\}

# Creating DIY Wrangles
The Data Wrangles Excel add-in makes it very easy to create your own Wrangle. Simply open the Data Wrangles tool bar and click on the "My Wrangles" button, this will open the Wrangles Task Pane. From here, click the button which pertains to the type of Wrangle (Classify, Extract or Standardize) you wish to create then click the **+** sign at the top right corner of the Task Pane. This will create a new sheet where the training data will need to be placed. Once the training data is all filled in and the model has been named, click the submit button to train your custom DIY Wrangle. Your DIY Wrangle is now ready for use from the Wrangles Task Pane.

> **Note:** If there are spaces before or after the text to find, the wrangle will not return an output. If a front/back space is needed in the extraction, the best approach is to use regex. 
\{.is-info\}

![create_standardize.gif](/gifs/create_standardize.gif)

Do not be worried if you have made an error and wish to change your training data, DIY Wrangles can always be retrained by clicking the edit button in the Wrangles Task Pane.

See [Wrangles In Depth Example (Excel)](/excel/in-depth-examples) for another look at how to build a DIY Wrangle.

## Referencing Your Wrangle in a Recipe
In order to use your wrangle in recipe, you will need to reference it using its model id. You can copy your wrangle's model id to your clipboard by either double clicking on the wrangle in the task pane, hovering over the wrangle then clicking the copy button in the pop-up window or by opening the "Edit Wrangle Details" panel (which is accessed with a single click of the wrangle) then clicking the copy button next to the model id at the top.

![model_id_1.gif](/images/releases/xl_2_3_0/model_id_1.gif)
![model_id_2.png](/images/releases/xl_2_3_0/model_id_2.png)
![model_id_3.png](/images/releases/xl_2_3_0/model_id_3.png =500x)

# Permissions
With permissions, you can allow others access to your Wrangles. There are three levels of permissions, see below for more information.

![permissions.gif](/gifs/permissions.gif)

The search bar can be used to search those with permission to a wrangle. Additionaly, users will be suggested who do not currently have permission for the wrangle.

![suggested_permissions.png](/images/wranglesxl-v2-9-0/suggested_permissions.png)

## Available Roles

| Role | Access |
| :-- | :-- |
| **User** | The User tier allows others access to use the Wrangle but they cannot access the training data or grant others access to the Wrangle. |
| **Editor** | In addition to being able to run a wrangle, Editors can also view and update the training data. Editors do not have access to a Wrangle's permission and therefore cannot grant others access. |
| **Admin** | Admins have full control over a Wrangle. They can edit meta and training data as well as access permissions to grant or restrict access from others. |

Roles can be searched on by including "role:" before the role in the search bar. (ie "role:admin")

### Removing Users From a Wrangle

Admins can remove users (actual users, not just the user role) from wrangles by clicking the "Remove User" button next to the user's name in permissions. Admins can remove all users, including other admins.

![remove_user.gif](/gifs/remove_user.gif)

## Organizations
Organizations allow users that belong to an organization to see other users belonging to the same organization and to share wrangles/recipes with them by name or with the organization as a whole.

![303102082-ff7b20fd-b395-43f0-aaeb-24f30452a321.png](/images/releases/xl_2_3_0/303102082-ff7b20fd-b395-43f0-aaeb-24f30452a321.png)

Users who wish to share a wrangle with an organization which they are not a part of themselves can do so by typing orgname@org. It is not case sensitive, but users do need to know the organization's name which is typically a single word abbreviated version. For example, wrangleworks@org.

![org_sharing.png](/images/org_sharing.png)

Like roles, organizations can also be used to search by including "org:" before the organization in the search bar. (ie "org:wrangleworks") 

# Versions

Versions allow users to restore previous versions of the wrangle. Versions store the last 30 iterations, or every iteration for the prior week. So, for instance, a wrangle has had 40 iterations in one week those 40 will be store for one week then the first 10 (oldest versions) will be dropped leaving the 30 most current iterations.

To access versions, simply click on the reverse clock icon in the Update panel. Below shows an example of versions in a classify wrangle.

![classify_versions.png](/images/classify_versions.png)

# Organizing Wrangles
Wrangles can be organized by adding (searchable) tags or by hiding them from view

## Tags and Notes
Tags and Notes can be added to each wrangle by either clicking on the wrangle itself or by clicking Details in the wrangle's menu.

Tags are searchable (by clicking the tag itself or by using the search bar) and appear below the name of the wrangle. These can be used to group wrangles by project or task.

Notes are not searchable and will appear in a pop-up if you hover your cursor over the wrangle. Notes also support html and markdown for customization. Click on the eye icon to show a preview of your notes. The magic wand is used to generate notes using AI, but will only work for users who havean OpenAI api key in their user, team or organization secrets.

The gif below shows how to add tags and notes:

![tags_and_notes.gif](/images/wranglesxl-v2-9-0/tags_and_notes.gif)

## Hide

Wrangles can be hidden from your task pane by using the Hide setting. To show hidden wrangles, toggle the setting on in the main settings.

![hide.gif](/gifs/hide.gif =500x)

# Tool Tips
Tool Tips are the pop-up message that appears when hovering over a wrangle with your cursor. They show when a wrangle was last used, modified and created as well as the tags, notes and the model id.

![tool_tip.png](/images/wranglesxl-v2-9-0/tool_tip.png)

# Searching For/Filtering Wrangles
The wrangles search bar can be used to search for wrangles based on names, model ids, tags, roles, and even organizations. The Filter button can be used to quickly add common search queries to the search bar.

![search_filters.png](/images/wranglesxl-v2-9-0/search_filters.png)

Search terms can also be left out of the search by placing a dash in front of them. Ie "-negative". Note: this must be done for individual words.

# Cloning
Wrangles and Recipes can be cloned to create a copy by clicking the menu on the wrangle or recipe then clicking the Clone button. 

![clone.gif](/gifs/my-wrangles/clone.gif)

> **Note:** Cloning a recipe does not include cloning secrets saved with that recipe.
\{.is-info\}