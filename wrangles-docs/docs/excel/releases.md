---
title: "WranglesXL Release Notes"
slug: /excel/releases
---

## v2.14.2 Highlights (2026-08-30)

-   **Reliable, Formatted Excel output:** Batched recipe, map, and wrangle results now stay aligned by column name when schemas change, and repeated map batches append to the intended worksheet. `excel.sheet` can also apply per-column alignment, number formats, bold, text wrapping, and supported checkbox controls.
-   **Stronger `extract.ai` authoring:** The `extract.ai` saved-model editor supports the full 14-column schema for the revised `extract.ai` model, order-independent columns, safer structured-value validation, as well as adding gpt-5.6-luna and reasoning-effort to settings.
-   **Safer production and version workflows:** Runs launched from the Wrangles List use the designated production version; tagged versions retain notes and expose stable `model:tag` copy IDs.
-   **Improved recipe editing and secrets:** Recipe editor breakpoints and search persist across tab changes, while secrets now have a clearer table and dedicated insertion menu.

### ✨ Features & Enhancements

-   Expanded the [extract.ai](http://extract.ai) saved-model worksheet contract and validation while preserving legacy 7- and 8-column models and additional user columns. Added *gpt-5.6-luna* and *none* & *low* reasoning options.
-   Added declarative formatting for `excel.sheet` output: *alignment*, Excel *number formats*, *bold*, *text wrapping*, and *checkboxes*, including streamed output. Unsupported checkbox controls warn without preventing data writes.
-   Reworked recipe secrets around key, redacted version, description, and scope, and separated Variables and Secrets in the recipe editor menus.
-   Added the `applied_permission_group` system variable, which resolves the current user's highest recipe access role. Unsaved models fall back to Missing instead of erroring.
-   Standardized edit worksheet names with short purpose labels so the wrangle name retains more of Excel's sheet-name limit.

### 🐛 Fixes

-   Fixed `extract.stock.codes` settings and response handling so results remain aligned to input rows and write consistently in JSON-array or multi-column form.
-   Fixed recipe editor breakpoints disappearing and Wrangles search becoming unavailable after switching tabs.
-   Fixed recipe batch-size loading to use the current model metadata field.
-   Fixed externally batched map output so later batches append to the original worksheet instead of creating extra sheets.
-   Aligned dynamic columns by exact header name for streamed recipe and wrangle results, preserving first-seen order and adding new columns without shifting values.
-   Fixed tagged-version notes, Version Details saving, stable version-ID copying, and production-version execution from the Wrangles List.

* * *

## v2.14.0 Highlights (2026-06-11)

-   **Major focus on versioning and version UX**: multiple fixes and enhancements to version tags, version lists, version comments, updates, and permissions.
-   **Recipe and map workflows improved**: map accepts multiple recipes, date formatting, and editor usability.
-   **Wrangles list and navigation got more polished**: better filters/search, tooltips, tag sizing, modal behavior, and panel interactions.
-   **Variables experience upgraded**: dropdown visibility, drag-and-drop ordering, schema hints, and a new keyboard shortcut (`Ctrl + I`) for recipe updates.
-   **New capabilities introduced**: created-by-me & versioned filtering, merge recipes, hide stock wrangles, and purpose rename mapping.
-   **Security and maintenance updates**: broad dependency refresh across parsing, auth, server, build, and utility packages.
-   **Auth/platform updates**: agent Keycloak auth enabled, plus targeted cleanup (including Marvin disablement).

### ✨ Features & Enhancements

-   Feature/990 map dynamic recipes in [https://github.com/wrangleworks/WranglesXL/pull/1007](https://github.com/wrangleworks/WranglesXL/pull/1007)
-   Add default vertical alignment to top in [https://github.com/wrangleworks/WranglesXL/pull/1022](https://github.com/wrangleworks/WranglesXL/pull/1022)
-   Feature/active wrangles avatar in [https://github.com/wrangleworks/WranglesXL/pull/1040](https://github.com/wrangleworks/WranglesXL/pull/1040)
-   add created by me filter in [https://github.com/wrangleworks/WranglesXL/pull/1047](https://github.com/wrangleworks/WranglesXL/pull/1047)
-   increase max tag size on wrangle list item in [https://github.com/wrangleworks/WranglesXL/pull/1073](https://github.com/wrangleworks/WranglesXL/pull/1073)
-   increase recipe editors height in [https://github.com/wrangleworks/WranglesXL/pull/1075](https://github.com/wrangleworks/WranglesXL/pull/1075)
-   show dropdown options in variables list in [https://github.com/wrangleworks/WranglesXL/pull/1077](https://github.com/wrangleworks/WranglesXL/pull/1077)
-   show schema hint even if full name was provided in [https://github.com/wrangleworks/WranglesXL/pull/1078](https://github.com/wrangleworks/WranglesXL/pull/1078)
-   add drag and drop to variables options in [https://github.com/wrangleworks/WranglesXL/pull/1079](https://github.com/wrangleworks/WranglesXL/pull/1079)
-   add hide stock wrangles in [https://github.com/wrangleworks/WranglesXL/pull/1081](https://github.com/wrangleworks/WranglesXL/pull/1081)
-   add control + i as hotkey to update recipe in [https://github.com/wrangleworks/WranglesXL/pull/1086](https://github.com/wrangleworks/WranglesXL/pull/1086)
-   Feature/copy version in [https://github.com/wrangleworks/WranglesXL/pull/1090](https://github.com/wrangleworks/WranglesXL/pull/1090)
-   Feature/wrangle agent in [https://github.com/wrangleworks/WranglesXL/pull/1097](https://github.com/wrangleworks/WranglesXL/pull/1097)
-   add version list updates in [https://github.com/wrangleworks/WranglesXL/pull/1116](https://github.com/wrangleworks/WranglesXL/pull/1116)
-   add latest versions changes in [https://github.com/wrangleworks/WranglesXL/pull/1119](https://github.com/wrangleworks/WranglesXL/pull/1119)
-   add permissions to prod versions in [https://github.com/wrangleworks/WranglesXL/pull/1121](https://github.com/wrangleworks/WranglesXL/pull/1121)
-   versions changes in [https://github.com/wrangleworks/WranglesXL/pull/1128](https://github.com/wrangleworks/WranglesXL/pull/1128)
-   add purpose rename mapping in [https://github.com/wrangleworks/WranglesXL/pull/1140](https://github.com/wrangleworks/WranglesXL/pull/1140)

### 🐛 Fixes

-   Fix/992 lookup crash in [https://github.com/wrangleworks/WranglesXL/pull/1003](https://github.com/wrangleworks/WranglesXL/pull/1003)
-   Fix/versioning in [https://github.com/wrangleworks/WranglesXL/pull/1016](https://github.com/wrangleworks/WranglesXL/pull/1016)
-   fix search wrangles on recipe editor panel in [https://github.com/wrangleworks/WranglesXL/pull/1020](https://github.com/wrangleworks/WranglesXL/pull/1020)
-   put focus on search after add button clicked in [https://github.com/wrangleworks/WranglesXL/pull/1013](https://github.com/wrangleworks/WranglesXL/pull/1013)
-   remove settings button for regular users in [https://github.com/wrangleworks/WranglesXL/pull/1011](https://github.com/wrangleworks/WranglesXL/pull/1011)
-   fix hidden list message for the new filters in [https://github.com/wrangleworks/WranglesXL/pull/1012](https://github.com/wrangleworks/WranglesXL/pull/1012)
-   Fix/small bugs in [https://github.com/wrangleworks/WranglesXL/pull/1033](https://github.com/wrangleworks/WranglesXL/pull/1033)
-   fix map dates formats in [https://github.com/wrangleworks/WranglesXL/pull/1035](https://github.com/wrangleworks/WranglesXL/pull/1035)
-   use filters array instead string in [https://github.com/wrangleworks/WranglesXL/pull/1041](https://github.com/wrangleworks/WranglesXL/pull/1041)
-   fix versions dates format to US in [https://github.com/wrangleworks/WranglesXL/pull/1043](https://github.com/wrangleworks/WranglesXL/pull/1043)
-   fix date formats only for the Map wrangle in [https://github.com/wrangleworks/WranglesXL/pull/1044](https://github.com/wrangleworks/WranglesXL/pull/1044)
-   Fix/list new changes in [https://github.com/wrangleworks/WranglesXL/pull/1046](https://github.com/wrangleworks/WranglesXL/pull/1046)
-   fix lookup columns picker in [https://github.com/wrangleworks/WranglesXL/pull/1058](https://github.com/wrangleworks/WranglesXL/pull/1058)
-   open wrangle edit modal only on name click in [https://github.com/wrangleworks/WranglesXL/pull/1071](https://github.com/wrangleworks/WranglesXL/pull/1071)
-   show permissions tooltip for everyone in [https://github.com/wrangleworks/WranglesXL/pull/1072](https://github.com/wrangleworks/WranglesXL/pull/1072)
-   fix recipe hint in [https://github.com/wrangleworks/WranglesXL/pull/1082](https://github.com/wrangleworks/WranglesXL/pull/1082)
-   Fix/1036 version tags in [https://github.com/wrangleworks/WranglesXL/pull/1084](https://github.com/wrangleworks/WranglesXL/pull/1084)
-   variables list fixes in [https://github.com/wrangleworks/WranglesXL/pull/1085](https://github.com/wrangleworks/WranglesXL/pull/1085)
-   change extract AI models and add warning message in [https://github.com/wrangleworks/WranglesXL/pull/1094](https://github.com/wrangleworks/WranglesXL/pull/1094)
-   change warning message and reorder options in [https://github.com/wrangleworks/WranglesXL/pull/1095](https://github.com/wrangleworks/WranglesXL/pull/1095)
-   Fix/version tag bugs in [https://github.com/wrangleworks/WranglesXL/pull/1115](https://github.com/wrangleworks/WranglesXL/pull/1115)
-   fix version dialog comments in [https://github.com/wrangleworks/WranglesXL/pull/1118](https://github.com/wrangleworks/WranglesXL/pull/1118)
-   fix version lists in [https://github.com/wrangleworks/WranglesXL/pull/1120](https://github.com/wrangleworks/WranglesXL/pull/1120)
-   Fix/versions changes in [https://github.com/wrangleworks/WranglesXL/pull/1123](https://github.com/wrangleworks/WranglesXL/pull/1123)
-   Fix/versions updates in [https://github.com/wrangleworks/WranglesXL/pull/1124](https://github.com/wrangleworks/WranglesXL/pull/1124)
-   disable marvin in [https://github.com/wrangleworks/WranglesXL/pull/1131](https://github.com/wrangleworks/WranglesXL/pull/1131)
-   close panels on outside clicks in [https://github.com/wrangleworks/WranglesXL/pull/1132](https://github.com/wrangleworks/WranglesXL/pull/1132)
-   Fix/small issues in [https://github.com/wrangleworks/WranglesXL/pull/1134](https://github.com/wrangleworks/WranglesXL/pull/1134)
-   try to fix markdowns for windows in [https://github.com/wrangleworks/WranglesXL/pull/1135](https://github.com/wrangleworks/WranglesXL/pull/1135)
-   fix markdowns for Chrome in [https://github.com/wrangleworks/WranglesXL/pull/1136](https://github.com/wrangleworks/WranglesXL/pull/1136)
-   Fix/1137 map recipes in [https://github.com/wrangleworks/WranglesXL/pull/1138](https://github.com/wrangleworks/WranglesXL/pull/1138)

## v2.13.0 (2026-1-9)

### New Features

-   Add viewer role for read-only access to wrangles and recipes
-   Add ability to specify custom sheet/table names for map wrangles
-   Improved admin panel with Monaco editor for settings configuration
-   New filters UI with enhanced functionality
-   Added hover tooltips with improved information display
-   Enhanced variable UI with better editing experience
-   Added name field to edit variables dialog for improved clarity

### Bug Fixes

-   Fix recipe run issues preventing proper execution
-   Simplified sort options to show only 4 options with ASC/DESC hints
-   Fix note display for map Data Type column
-   Fix text case handling to allow uppercase letters in edit view
-   Fix wrangle tooltip notes height with scrollable max height
-   Fix list virtualization performance issues
-   Scroll to top automatically when searching in wrangles list
-   Close run map dialog panel properly when recipe is connected
-   Ensure recipes and map wrangles are only accessible to beta role users
-   Fix wrangle card icons tooltip
-   Fix map validation from data type column

### Security Updates

-   Update node-forge to 1.3.3 addressing critical vulnerabilities:
    -   HIGH: CVE-2025-12816 - ASN.1 Validator Desynchronization
    -   HIGH: CVE-2025-66031 - ASN.1 Unbounded Recursion (DoS)
    -   MODERATE: CVE-2025-66030 - ASN.1 OID Integer Truncation
-   Update jws to 3.2.3 fixing HMAC security issue
-   Update js-yaml to fix prototype pollution vulnerability
-   Update glob to 10.5.0 preventing filename exposure to shell
-   Update qs to 6.14.1 and express to 4.22.1

### Technical Improvements

-   Introduced react-query library for improved API call management
-   Fixed code formatting with prettier
-   Improved list performance with virtualization fixes
-   Enhanced UX with various UI refinements

### Dependencies Updated

-   node-forge: 1.3.1 → 1.3.3
-   jws: 3.2.2 → 3.2.3
-   js-yaml: 3.14.1 → 3.14.2 (and 4.1.0 → 4.1.1)
-   validator: 13.15.20 → 13.15.23
-   glob: 10.4.5 → 10.5.0
-   qs: 6.13.0 → 6.14.1
-   express: 4.21.2 → 4.22.1

## v2.12.0 (2025-11-3)

-   Merge all of the Wrangles (Classify, Extract, Standardize, Lookup, Map, and Recipes) into one list
-   Added a Wrangles Icon to help identify the wrangle purpose
-   Added Extract settings to the main Wrangles list
-   Moved all Train buttons to a dropdown menu
-   Added new GPT models - 5, 5 mini and 5 nano to Wrangles Extract AI
-   Make the Wrangles title Bold
-   Solve bug in Filter organization not working
-   Updated Extract Pattern instructions
-   Update react-monaco-editor to the latest version
-   Add an Announcement dialog button to Nav menu
-   Update Run Recipe button to highlight on hover

## v2.11.0 (2025-9-19)

-   Remove `Address` Wrangle from Extack Stock
-   Allow Periods in recipe tags
-   Fix bug where recipe tags dialog closed before displaying error message
-   Fix Bug in recipe functions that prevented functions with typing from being detected
-   Update vulnerability regarding sha package
-   Reorder the toolitp and edit wrangle components
-   Refactor Wrangles List component code.
-   Dismiss the Map panel when the Map Wrangle is applied
-   Show an error message in Map Wrangle if the user does not have permission to the attached recipe
-   Display the default value set for Recipe Variable if it exists
-   Fix bug in organization teams not found
-   Fix bug in Recipe panel that caused recipe to always run in debug mode
-   Consolidate Play button in Recipe panel so that Debug Run Mode is hidden as a sub menu

## v2.10.0 (2025-8-15)

-   Large internal restructure of files.
-   Update to React 18
-   SQL code Completions for Extract SQL Wrangle
-   Updated the tooltip for Wrangles in the My Wrangles list to use Fluent v9, and changed the trigger area to only include the name and tags
-   Fixed a bug in variable Dropdown where the labels were not being displayed correctly. Added a trim to the titles to avoid trailing spaces
-   Moved the conditional rendering for refresh button in columns variable to the parent component. This is to avoid two edit places where the label is rendered.
-   Improved the label name/title logic to trim spaces to avoid an empty label using " " as title
-   Restricted recipe version tags to only include letters, numbers, and underscores
-   Fixed case where clone extract does not copy the extra columns
-   Added a "Saved Settings" banner to Wrangle settings that is triggered when changing settings
-   Fixed bug in Wrangles Search Dialog where the window would resized when scrolling
-   Updated labels in Wrangle permissions dialog
-   Disabled ellipsis Details button if the user does not have permission to edit the Wrangle
-   Fixed a bug that displayed a "0" if the user did not have any Wrangles or the search returned no matching Wrangles
-   Updated npm packages to address security vulnerabilities
-   Fixed a bug in Extract Settings that caused the combination settings of `useLabels` and `Columns` to return actual columns as opposed to a JSON object in one columns. This is only for Pattern based Extract.
-   Add ability to use JSON schema in Bespoke Classify Wrangles via Admin menu. This will result in a popup dialog that prompts the user to choose pre-selected variables
-   Fixed bug in Map that caused mapped data to not be saved
-   Updated `react-monaco-editor` to version 0.56.1. This will use unified view in narrow panels and a split view for larger panel widths.

## v2.9.0 (2025-5-18)

### Recipes

Improved editor experience.

-   Use the edit recipe panel when creating a new recipe. Until the recipe is saved, secrets and versions won't be available.
-   Added debug mode to show logs.
-   Added ability to set breakpoints for the recipe. This will stop and return at that point.
-   Save cursor position when navigating between recipes and functions.
-   Fixed a bug where the edit panel run button did not work with non-batched recipes using an external read.
-   Don't toggle diff editor when changing to a different version.
-   Add compare to versions to set the reference in the diff editor.
-   Various styling improvements for the edit recipe panel.

### Recipe Variables

-   Add an optional title for variables to display instead of the name.
-   Limit variable names to A-Za-z0-9\_ to better align with python variables. Use titles (above) instead for full text support when displayed.
-   Added a toggle to enable/disable variables temporarily without having to delete them.
-   Allow the Item List input for dropdowns to be resized.
-   Added a file variable. That can be used to give the user an option to choose a local file.

### Extract.AI

-   Always show all columns rather than hiding advanced.
-   Add object type and Properties column.
-   Add new available models for 4.1.
-   Add general instructions input.
-   Split pattern extract and AI extract settings.
-   Fixed a bug where the name of the column was the first heading if using JSON mode.

### Wrangles Search Bar

-   Support -word as not and "word" as exact word match for search syntax.
-   Add filter/sort menu
    -   Search by role or organization.
    -   Sort by name, date used, date modified and date created.
-   Add a warning when searching if there are wrangles hidden from your search.

### Other Changes

-   Show group icon for Wrangles that belong to Teams.
-   Allow setting an Owner when creating recipes and wrangles.
-   Show column notes within the worksheet as comments on the headings.
-   Stop progress if a map is closed while running it.
-   Fixed a bug where remove words failed with numbers.
-   Add support for HTML when rendering markdown. The HTML is santized to be safe, equivalent to Github.
-   Use different split button for stock wrangles with settings dialogs.
-   Add option for setting the number of results for Semantic Lookups.
-   Match dimensions of markdown and textfield for Notes.
-   Allow notes field to be made wider.
-   Virtualize the models list for better performance, especially with larger lists.
-   Add button to open to the models dropdown menu that will open the metadata dialog, equivalent to clicking on the name.
-   Use delayForCellEdit mode to delay writing to the sheet instead of failing totally when user enters cell edit mode, and add a specific error message if that causes a failure.
-   Add AI generated notes and version notes. Requires AI role.
-   Suggest other users that don't currently have access when searching in the permissions panel
-   Support user avatars in the permissions panel.
-   Restyling of wrangle tooltips + added dates used, modified and created.
-   Fixed a bug where running a lookup required two clicks if the dialog wasn't needed.
-   Fixed a bug where Extract SQL didn't work due to an issue with the sql.js dependency.

## v2.8.0 (2025-1-29)

-   Enhancements to lookup.
    -   New semantic lookup architecture. This uses a two-pass fast approximate search, followed by a more precise re-ranking. This significantly raises the max row limit, while maintaining accuracy.
    -   Increased row limit to 100,000.
    -   Removed the key field from Semantic lookup. Added a multi-select dropdown to choose which columns will be used when matching.
-   Data exchanged with the backend now uses gzip for compression. This increases the data that can be processed in a single batch, particularly for updating wrangles and when using recipes. The exact level of compression varies depending on the data, but typical values can be 4-10x more data is now allowed.
-   Memoize the wrangles list component to improve performance by reducing re-rendering needed.
-   Add a note to count the number of spaces for Format -> Concat.
-   Hide edge personal info suggestions box.
-   Bugfix: system variables didn't always work correctly when running a recipe triggered by a map.
-   Bugfix: fixed an issue where map could fail when there were duplicate sheet names with difference cases.
-   Bugfix: fixed an issue where extract -> find would always use regex even if turned off.
-   Improved text wrapping for dialogs.
-   Show confidence scores for classifier v2 models.
-   Show available user and organization secrets in the recipe secrets tab.
-   Recipe Versions:
    -   Add ability to delete versions.
    -   Add ability to add tags to versions.
    -   Show a star icon for the current and active versions.
-   Added an extract -> SQL wrangle. This allows writing SQL to query the current workbook. Excel tables, worksheets and the current selection can be queried as SQL tables.
-   Add an option to clone wrangles and recipes. This will not clone secrets for recipes.

## v2.7.1 (2024-11-12)

-   Fixed a bug where function variables weren't being passed through to recipes correctly.

## v2.7.0 (2024-11-11)

### Map

-   Map now uses the new wrangles logic. This means Map now fully supports all features such as batching and being able to cancel with escape.
-   Map now supports all recipe features when a recipe is set to run after the map, including multiple outputs.
-   Added tools for fill up, left and right in addition to fill down.
-   Added gather tool. Select multiple cells and move them into the same column or row.
-   Added an unmerge tool that unmerges and fills the values in all cells rather than just the top left as Excel does.
-   Added the ability to dynamically add columns when using the map. This can be enabled or disabled in the settings for the map. Default enabled.
-   Added the ability to set a default value for a column in the schema definition. This is not yet included in the base columns, but can be added as a fourth column named 'Default'.
-   **Due to incompatibility with the new logic, this update removes the old data type and validation tied to Excel.**

### Other Updates

-   Show tags and modified by for recipe versions. The ability to add tags will be added in a future update.
-   Added a message bar to suggest the user share with their organization if they are a member of 1 organization.
-   Added a stock extract to extract strings or regex patterns.
-   General optimization by reducing rendering of components not displayed and reducing re-rendering when the list of models is unmodified.
-   Optimized app startup and resource use.
-   Added Office.onReady() check to reduce issues with office failing to load correctly.
-   Updated tests due to backend changes.
-   Fixed a bug where the edit wrangle panel didn't clear the state properly when dismissed.
-   Added additional options for Extract/Attributes. Choose span, standard or object response and for specific attribute types, choose the desired unit.
-   Added lookup as a suggested option in the wrangles search dialog.
-   Added standardize / convert attributes & remove attributes. To convert attribute units and remove them in place.
-   Execute metadata request sequentially rather than in parallel when updating recipes.
-   Cancel recipe execution if the panel it is run from is closed.
-   Fixed a bug with lookup validation where it considered the heading as a value when determining uniqueness.
-   Made the progress bar more prominent.
-   Enabled useLabels = true with resultFormat = json to work correctly for AI extracts.
-   Removed the placeholder comma from the format / split delimiter textbox.
-   Recipe Variables:
    -   Allow empty values for text, dropdown and column types.
    -   Fixed a bug where constants used old cached values when edited.
    -   Added a system `${row_count}` variable.
    -   Fixed a bug where defaults for Number variables were stored as strings.
    -   Add a select all option to multi-select column and dropdown combo boxes.

## v2.6.1 (2024-9-13)

-   Fixed max unique categories validation for new classifier for v2 to 500.

## v2.6.0 (2024-9-12)

-   Display an error if user tries to add a non-recipe to a map.
-   Add a toggle to include or exclude the brackets from extract brackets.
-   Fixed a bug where sheets failed to output from recipes if the name was too long.
-   Updated classify to support classify v2 models.

## v2.5.3 (2024-8-26)

-   Streamline [extract.ai](http://extract.ai) model options to gpt-4o and gpt-4o-mini. Existing wrangles using other models can still be used and saved with the same model.
-   Set default [extract.ai](http://extract.ai) model as gpt-4o-mini.

## v2.5.2 (2024-7-12)

-   Fixed a bug where dates using non-US format could cause an issue with the date variable component.
-   Fixed a bug when using the date variable component where react component refreshes caused the component to jump back to today's date.
-   Fixed a CSS issue where the pivot menu on the edit recipe panel was not the full width of the screen.
-   Fixed a bug where writing to Excel could fail if a range was filtered to a single cell.
-   Fixed a bug where the search bar could move slightly depending on the user's screen resolution and scaling.
-   Give a clearer error message if the user tries to run a wrangle on a multi-range selection.

## v2.5.1 (2024-6-22)

-   Show a clear error message that extract migration is required for pattern-based extracts using the old format.
-   Fix an issue where wrangles with names that couldn't be used as Excel sheet names couldn't be saved.
-   Fix caching issue for stock wrangle settings.
-   Fix search bar moving a few pixels when scrolling on My Wrangles tabs.

## v2.5.0 (2024-6-16)

### Refactored Interactions with Excel

The interactions with Excel have been refactored and improved. The code to interact with Excel has abstracted to a single class, and in the process streamlined and simplified. Wrangles should generally behave more consistently with one another.

-   All wrangles should ignore filtered rows and hidden rows/columns.
-   All wrangles can be cancelled using escape.
-   Improved the handling of different data formats.
-   Allow multiple outputs for all wrangles, and handle changes in columns between batches better.
-   Change all wrangles to expect that more than 1 row includes a heading. Allow recipes to work with a single row by adding generic column headings.
-   Changed to map are not finished and are not included in this release. Map will be updated to use the new code in a future release.

### Lookup

Lookup is a new type of wrangle that can be used to save data to be looked up later as a wrangle or in a recipe. Lookup has two variants, key and semantic.

-   Key allows finding data using an exact match, such as looking up IDs or names.
-   (Premium Feature) Semantic allows finding data using a semantic search (aka vector search), such as finding similar descriptions.

### Others

-   Added output settings for stock Extract wrangles.
-   Allow setting the role on the same dialog when sharing with a new user.
-   Added org:none and org: search syntax.
-   Added variant: search syntax.
-   Make searches case insensitive and tolerant of a space after the colon e.g. org: any.
-   Added additional GPT models as options for [extract.ai](http://extract.ai).
-   Bugfix: removed duplicated error messages on the edit recipe panel.
-   Improved the presentation of the recipe error dialog.
-   Fixed various panel headings that sometimes contained out of date references due to caching.
-   Updated package dependencies.
-   Expanded test coverage.
-   Show a progress bar, even for wrangles that only execute as single batch.
-   Change the map run icon to be the play button consistent with other wrangles.
-   Save additional columns when creating a wrangle in addition to when editing.
-   Prevent top level re-rendering causing the application to flash white due to lazy loading components.

## v2.4.0 (2024-4-12)

### Highlights

#### Extract AI

Added a new type of extract using AI. This allows using text prompts to describe the type of content to extract from an input. This is a premium feature and must be enabled by WrangleWorks for an account or organization.

![extract_pattern_ai.png](/images/releases/xl2.4.0/extract_pattern_ai.png)

#### Wrangle Search Dialog

Added a dialog to search for wrangles. This is available from the right click context menu in the recipe editor and in the map settings panel to search for available recipes.

![purpose_search.png](/images/releases/xl2.4.0/purpose_search.png)

#### Recipe Batch Setting

Added a batch size setting for recipes. This replaces the temporay *batch\_size: n* mechanism within the recipe to set the number of rows that each recipe execution will be broken into.

![batch_size_setting.png](/images/releases/xl2.4.0/batch_size_setting.png)

#### Hide Wrangles

-   Added the ability to hide wrangles and recipes from within the user's list.

![hide_option.png](/images/releases/xl2.4.0/hide_option.png)

#### Marvin

Added a chatGPT powered chatbot named Marvin. Marvin can answer questions about the wrangles application. Marvin is being trialed and access granted on a limited basis.

![marvin.png](/images/releases/xl2.4.0/marvin.png)

### Other Changes

-   Added a backend setting to override and make bespoke wrangles editable.
-   Added a toggle to allow returning the raw value from custom extract wrangles i.e the value as found within the input text, rather than any standardized version.
-   Removed tooltips for deprecated functionality - sharing a model by ID.
-   Improved the recipe error dialog to scroll the detail rather than the whole dialog.
-   Improved the presentation of error messages on the train panels.
-   Fixed a bug where old column names persisted when changing the selected columns for recipe variables.
-   Added a prefix/suffix stock wrangle on Format.
-   Updated dev dependencies for security notices.
-   Refactored auth/api to a single class. Updated keycloak dependencies and dropped react-keycloak/web depedency as it is no longer maintained.
-   Added `${batch_number}` and `${batch_total}` default recipe variables. These give the current batch number and total number of batches respectively.
-   Allow classify, extract and standardize to output multiple columns.
-   Added a columns setting to output multiple results from extract in individual columns rather than as a delimited string or JSON array.
-   Show organization name on the tooltip for wrangles associated with an organization.
-   Cache the results of organization queries on first use.

## v2.3.0 (2023-2-19)

### Highlights

-   Added organization support. Users that belong to an organization will now see other users belonging to the same organization and can share wrangles/recipes with them by name or with the organization as a whole.
    ![303102082-ff7b20fd-b395-43f0-aaeb-24f30452a321.png](/images/releases/xl_2_3_0/303102082-ff7b20fd-b395-43f0-aaeb-24f30452a321.png)

### Other

-   Improved searching. Searches no longer require the found text to be continuous, but instead search for each word individually. Also supports '*role:user*' or '*org:any*' searches.
-   Allow stopping a running recipe by using the escape key.
-   Show the model ID on the metadata edit dialog, and allow copying with a double click on the name.
-   Added the test run button to the functions panel.
-   Added secrets to the variables list within the recipe context menu.
-   Added custom functions to the recipe context menu.
-   Added new variable type *constant*. Set a fixed value for a variable. Alternative to secrets for non-sensitive data.
-   Added new variable type *function*. Use a python function to define the value of a variable.
-   Fixed a bug with the magic button wrapping while running.
-   Fixed a bug where expanding JSON objects didn't return the keys as headings in all cases.

## v2.2.0 (2023-1-16)

### Recipes

-   Allow toggling between multi/single select for dropdowns and columns.
    ![single_multiple_dropdown.png](/images/releases/single_multiple_dropdown.png)

-   Allow rearranging user created variables by dragging.
    ![rearrange_variables.gif](/gifs/rearrange_variables.gif)

-   Added an option to define the default for text, boolean, number and dropdown variables.

-   Added a refresh button for column variables to refresh the selected columns.

-   Added a message bar to the recipe page.

-   \[Preview\] Cleaned up the Monaco right click menu, and added a submenu to quickly insert variables.

-   Refactored variables code to reduce duplication and improve state management.

-   Improved behaviour for the excel.sheet connector. Increment is now restored as the default action.

-   \[Bugfix\] Recipes failed with batch\_size set to 1.

-   Added an error message component to the recipe editor.

### Other

-   \[Bugfix\] Remove words. Sometimes incorrectly dropped characters and had issues with non-string values.
-   Added an clearer error message if trying to translate without a DeepL key. (Pending back-end update)

## v2.1.0 (2023-11-30)

### Highlights

#### Test Recipes

In the edit recipe panel, a new button has been added to run and test changes to the current recipe without having to save it first.

![2.1.0_play_button.png](/images/releases/2.1.0_play_button.png)

#### Excel Sheet Connector

```yml
write:
  - excel.sheet:
      name: NewSheet
      cell: C3
```

An excel.sheet connector has been added. This opens up many new possibilities, such as defining which sheet and where to write the output, writing multiple sheets, writing sheets dynamically or returning data at different stages of a recipe. More configuration options will be added over time.

### Recipes

-   Added a confirmation before closing if the user has unsaved changes when editing a recipe.
-   Added a button to display system variables on the variables panel.
-   Maintain variable state when re-running the same recipe.
-   Bugfix: Saving a recipe didn't work from the secrets panel.
-   Display a clear error if the user doesn't appear to have included headings.
-   Added `${user_name}` and `${user_email}` variables.
-   If a selection has duplicate headings, append .1, .2, etc. to ensure uniqueness.
-   Default date picker for variables to today's date.
-   Use user's local date format for Date Picker.
-   Make variables dialog dismissable by clicking outside the boundary.

### Map

-   Added a button to clear saved data from a sheet on the filter menu.
-   Added a tool to collapse multi-row headings to a single row.
-   Added a tool to fill out gaps between subheadings.
-   Group magic button + new tools under a dropdown menu.
-   Persist manual override values beyond the present state.
-   Persist magic button suggestions beyond the present state.
-   Make magic button suggestion tooltip more persistent and easier to hover to.

### Misc

-   Added a shiny loading animation.
-   Improved generic Excel read/write logic. Deployed for Format wrangles, pending wider roll-out.
-   More specific help links around the application.
-   Added automated unit tests.
-   Autofocus a variety of elements around the app such as search bars.
-   Bugfix: remove words didn't work with JSON arrays correctly.
-   Bugfix: stock wrangles had an unnecessary horizontal scroll bar.

## v2.0.1 (2023-10-2)

### Map

-   Bugfix: fix inconsistency with last row of data depending on selection.

## v2.0.0 (2023-10-2)

### Highlights

#### Simplified Ribbon and Nav Menu.

![release2.0.0-2.png](/images/releases/release2.0.0-2.png)

All application functions are available behind My Wrangles. My Wrangles will remember your last active page when you reload it. The application currently supports both the old and new menu, pending distribution of the new manifest via Microsoft. The old menu will be retired once it is no longer in use.

#### New Extract Data Format

Support the new data structure for Extract wrangles. Old data is still supported and will present the user with a notice to migrate to the new format.

| Find | Output (Optional) | Notes |
| --- | --- | --- |
| asap | As soon as possible |  |

#### Versions

Users can now view and restore old versions of wrangles. This feature was already available for recipes but is now also available for wrangles. The most recent 30 versions are saved.

![release2.0.0-1.png](/images/releases/release2.0.0-1.png)

### Map

-   Allow maps with a recipe to use recipe variables.
-   For maps with a recipe, show the recipe error detail if the recipe fails.
-   Added a setting to clear learned data from the magic button.
-   If the sheet if filtered, only include the visible data.
-   Bugfix: deleting a post-map recipe wasn't always cleared correctly.

### Recipes

-   Added a columns variable type.
-   Show `${}` syntax and quick copy button for recipe secrets.
-   Updated colours for variable type tags.
-   Enable recipe returned outputs to allow array or object format.
-   Enable recipe returned outputs to allow columns as a separate key.
-   Move functions to be the second tab.

### Misc

-   New WrangleWorks icon.
-   Make wrangle name black and less prominent on tooltips.
-   Point first 3 tooltips down for wrangles to not cover the search bar and buttons.
-   Show highlight colour on tags to indicate they can be clicked.
-   Add tag displaying wrangle type to edit panels.
-   Improved styling and spacing for Stock Format and Standardize tabs.
-   Indicate the active version for old versions of recipes and wrangles.
-   Show info for each type of wrangle explaining what columns are and what data should be provided.
-   Improved output selection logic.
-   Bugfix: name state wasn't cleared correctly for creating new wrangles.
-   Bugfix: format phone numbers left last character.
-   Bugfix: Fix background colour for some browsers.
-   Bugfix: Fix webpack issue for dev server.

## v1.12.0 (2023-8-4)

### Misc

-   Improve wrapping for various pages when the task pane changes width.
-   Allow clicking on tags to quickly filter in the model lists.
-   Improve formatting when scrolling on panels.
-   Save the last tab selected for My Wrangles when navigating around or closing the taskpane.
-   Allow dynamic input/output columns in addition to the required columns for each wrangle's contents.

### Recipes

-   Add the ability to view and restore old versions.
-   Add a date type for variables.
-   Make the monaco editor fill the screen height.
-   Collapse tab headings except the selected tab to save space.

### Extract

-   Bugfix: Make use labels work with the different list output formats.
-   Add ability to extract the contents of quotes.
-   Make extract wrangles work with filters.

### Standardize

-   Add a stock wrangle to round numbers.

### Translate

-   Disable the translate button while it is running.

### Format

-   Use the new styling for individual wrangle settings as for standardize.

## v1.11.1 (2023-8-1)

-   Fix a bug with the magic button when a heading contained only numbers.

## v1.11.0 (2023-7-30)

### Misc

-   Added an overall settings config mechanism for DIY wrangles.

### Map

-   Added the ability to set a recipe to run automatically after a map is executed.
-   Added the ability to set manual override values in addition to referencing worksheet cells.
-   Prevent the map being executed when required fields are not completed and added a tooltip to explain this to the user.
-   Increased the trigger area for the magic button suggestions tooltip to make easier to hover to.
-   Added a spinner while the map is running.
-   Changed the filter icon for the map table, and renamed the generate button to submit.
-   Added more user error messages.
-   Improved table layout and formatting.

## v1.10.1 (2023-7-25)

-   Enable Extract / Custom Use Spellcheck button

## v1.10.0 (2023-7-17)

### Recipes

-   Show overall notes on recipe variable entry screen
-   Show a more informative error message when submitting data above the size limit.
-   Show a more informative error message when the output shape is inconsistent in range mode.
-   Add a dropdown variable type.
-   Add a multiline text variable type.
-   Display dropdowns below the dropdown field rather than as a side panel.
-   Show tooltips on variable labels.
-   Show a message when there are no variables.
-   Fixed a bug when changing recipe variable types

### Extract

-   Add case sensitive, use labels and spellcheck options for custom wrangles. Spellcheck is temporarily disabled pending finishing backend work.

### Standardize

-   Fixed a bug with phone numbers.
-   Fixed a bug where converting fractions to decimals would show NaN.

### Map

-   Save mapped columns when generating an output sheet to enable learning new relationships.
-   Indicate a required field with \* at the start of the data type e.g. \*text.
-   Add a required only toggle.
-   Show red for the required field checkboxes.
-   Move the table hide toggles to a dropdown on the top left corner of the table.
-   Add a magic button tooltip.
-   Add a placeholder tooltip for column suggestions before the magic button is run.

## v1.9.2 (2023-6-29)

-   *Bugfix:* Force styles for map panel footer to fix fluent transparency bug.
-   *Bugfix:* Only interpret dates if explicitly set as a date format when reading/writing data from the spreadsheet. This previously also worked for custom data formats (which may include dates), but had too many side effects.

## v1.9.1 (2023-6-21)

-   Fixed a bug where Standardize Phone number would fail if text/empty.
-   Fixed a bug where the magic button wouldn't finish where there were conflicts with previous comments.

## v1.9.0 (2023-6-16)

### Recipes

-   Allow writing the results of a recipe to the same sheet next to the input, similar to the mechanism for other wrangles.
-   ***BREAKING CHANGE*** the default output is now as above rather than writing to a new sheet.
    -   Use *output: sheet* in the recipe to restore the original behaviour.
-   Added an optional parameter *batch\_size: 10* to limit the batch size submitted per individual recipe request. Default 100. This has no effect if *output: sheet* is set, which always uses the entire selection.
-   Secrets now allow multiline text.
-   Additional default variables are available:
    -   `${sheet_name}` - name of the active sheet.
    -   `${file_name}` - name of the active file.
    -   `${selection_0}`, `${selection_1}`, ... position-based variables containing column headings.
    -   `${date}` - the current date (in the local timezone) as yyyy-mm-dd format.
    -   `${now}` - the current UTC date and time.
-   Bugfix: addressed an issue where repeatedly clicking submit could save nothing for the recipe/functions.
-   Runtime Variables: Define variables that can be used for a recipe. These will prompt the user for input when the recipe is run, allowing for dynamic recipe behaviour.
    ![release1.9.0-1.png](/images/releases/release1.9.0-1.png)

### Map

-   Make the magic button more magical - add a semantic comparison between available columns and schema. Suggests up to 3 similar columns.
    ![release1.9.0-2.png](/images/releases/release1.9.0-2.png)
-   Allow selecting ranges to restrict the data used to generate the output mapped data.
-   Right click to set a reference to the value of a cell rather than as a column heading.

### Format

-   New Wrangles to merge columns each containing JSON arrays/objects to a single array/object.

### Standardize

New Stock Wrangles available:

-   Spaces: remove double and unusual spaces (e.g. nbsp).
-   Phone Numbers: convert numbers to specific phone number formats.
-   Fraction to Decimal: convert fractions to decimals.
-   Remove Characters: remove any listed characters from the input.
-   Significant Figures: Round to a specified number of significant figures.
-   Replace: find & replace, allows regex.

### Misc

-   Increased progress bar height to make more pronounced.
-   Begin to centralize strings for future dev/maintainability e.g. localization.
-   Bugfix: addressed an issue that prevented the app loading correctly in older versions of Excel Desktop that use Edge-Legacy.

## v1.8.2 (2023-4-25)

-   Remove ability to add Wrangles using the code.
-   Clear state properly when dismissing add wrangle panels.
-   Allow searching for Wrangles by model ID.

## v1.8.1 (2023-4-21)

-   Enabled including custom python functions for Recipes.
-   Finished consolidating api calls together.
-   Tidied API endpoints.

## v1.8.0 (2023-4-14)

### Highlights

#### Permissions

There is now a permissions system for sharing Wrangles. This replaces the old code-based method to share wrangles or recipes.

Wrangles can be shared as either a user (use the wrangle), an editor (change the contents) or an admin (manage permissions and metadata).

![release1.8.0-1.png](/images/releases/release1.8.0-1.png)

### Other Changes

#### Recipes

-   Maintain Monaco Editor state when changing tabs.
-   Increased height of Monaco Editor.
-   Limit the min/mix size of output columns when autofitting.
-   Bugfix: submit didn't work on secrets tab. Now moves back to recipe.

#### Extract

-   Added settings to control the behaviour when returning multiple results. First result only, as JSON or delimited.

#### Format

-   Move JSON buttons to bottom of Format page
-   Bugfix: Improved behaviour when expanding/collapsing nested JSON.
-   Add key/value option for paired columns to JSON.

#### Map

-   Add a search bar for Maps.
-   Add an unmatched toggle for Maps.

#### Misc

-   Add new sheets after the current sheet rather than last.
-   Persist search text when navigation between tabs/pages.
-   Show model\_id on tooltip
-   Delete sheet when cancelling or closing an edit panel, if no changes are detected.

## v1.7.1 (2023-4-3)

-   Allow defining the output of a recipe into Excel using write: dataframe. e.g.

```yaml
write:
  - dataframe:
      columns:
        - column1
        - column2
```

## v1.7 (2023-3-18)

-   Wrangle: Map \[BETA\]
    -   Create a pre-defined schema to quickly map data into a consistent structure.
    -   Add data types and restrictions for data validation.
-   Recipes \[BETA\]
    -   Recipes can now be managed, shared and run from Excel.
-   Secrets management.
    -   Secrets are stored encrypted.
    -   Can be associated with an 'owner' - a recipe, a user. Future: an organization.
    -   Can be managed on the edit panel for recipes and used as variables `${variable}`.
-   Headings are now sticky and only the contents scroll.
-   Data such as training data is now inserted as an Excel table.
-   Bugfix: share code toggle didn't work with newer versions of fluent/edge.
-   Bugfix: occasional strange movement when using touchpads.
-   Wrangles buttons are consolidated to run + a dropdown menu, to create more space.
-   Various delete confirmation dialogs indicate the name of what will be deleted.
-   Misc background dependency upgrades.
-   Significant background code refactoring and improvements.

## v1.6 (2022-12-8)

Changes

-   Classify Wrangles Notes column
-   Stock Extract Brackets Options -> Curly, Round, Square, Angled, or All
-   Format Page Headings Centered
-   Navigation Menu at the top left that points to all Wrangles pages
-   Centered Extract Stock Wrangles Buttons

## v1.5 (2022-11-4)

### Features

#### My Wrangles

-   Added a notes field for each Wrangle. This allows markdown for formatting and appears on the Tooltip.
-   Added a tags field for each Wrangle for organization. These are searchable. Max 2 will appear on the list view, but all will appear on the tooltip/edit components.
-   Increased row limit for Extract from 50,000 to 200,000.
-   When updating a wrangle, the sheet added will now be the next sheet rather than at the end, and it will be deleted once submitted.
-   Added a polling decay. This causes the polling frequency to reduce exponentially if the user is inactive to reduce server load.
-   Use My Wrangles version of the page for Classify taskpane and Extract / Custom tab, rather than the old simplified version.

#### Format

-   Truncate now allows negative numbers to define a number of characters to remove from the left or right in addition to how many to keep (positive numbers).
-   More headers implemented when running Wrangles.

### Bugs

-   Name is validated as required when updating in addition to when creating a DIY wrangle.
-   Fixed split wrangle failing for large data sets.
-   Updating Wrangles failed if the name didn't match due to restrictions on Excel sheet names such as certain special characters.

## v1.4.1 (2022-10-18)

-   Added more column headers to results
-   Deal with My Wrangles that have long names or special characters not allowed as the worksheet name.

## v1.4 (2022-9-2)

### My Wrangles

-   Add a search bar.
-   Make progress bar taller to be more prominent.
-   Add a tooltip showing the full name of each Wrangle as they are often too long.
-   Display the name of Wrangle on the update panel.
-   Validate that the current active sheet matches the name of the Wrangle to be updated.
-   Validate - require Category is provided for classify.

### Other

-   Add a favicon.
-   Add format / truncate. To take the left/right n characters.

## v1.3.3 (2022-7-1)

-   Added ability to save notes with Extract Wrangles.

## v1.3.2 (2022-6-17)

-   Added ability to save notes with Standardize Wrangles.

## v1.3.1 (2022-5-11)

-   Bug fix: only add header when running the first batch for Extract / Stock Wrangles.

## v1.3 (2022-5-11)

-   New Custom Wrangle: Standardize
-   New Format Wrangle: Collapse/Expand JSON
-   Enable renaming Wrangles
-   Allow updating custom wrangles
-   Allow running custom wrangles from My Wrangles taskpane
-   Change share wrangle key to password field
-   Add help links to My Wrangles
-   Fix scrolling with longer lists of custom wrangles
-   Don't display translate settings panel once user has submitted a key across machines
-   Bump dependency versions
-   Misc CSS and tooltip updates

## v1.2.2 (2022-3-18)

-   Add overriding batch size from DB for custom Extract wrangles.

## v1.2.1 (2022-2-23)

-   Add help links to documentation.
-   Use batch size from db rather than hardcoded.

## v1.2.0 (2022-1-21)

-   Added *Extract -> Attributes -> All* option
-   Added *Extract -> Properties -> All* option

## v1.1.0 (2021-12-20)

-   User must provide their own DeepL key for translation.
    -   Keys cannot be read by the user, and are stored encrypted.
-   Add error status for failed wrangle training.
-   Remember settings between sessions for translate and format task panes.
-   More validation for classification wrangles, including restricting to max 50 categories.
-   Additional validation for translation.

## v1.0.0 (2021-12-8)

### First Production Version!!!

-   As published to Excel add-in store
