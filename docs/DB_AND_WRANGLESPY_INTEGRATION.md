# Changing WranglesPY, the catalog, and the docs

Use this guide when you change a wrangle name, add a wrangle, keep an old name,
or move a page in the docs.

**Choose the change first. Then edit the place that owns that change.**
You do not need a Codespace to edit page text on GitHub.

## 1. What do you want to change?

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

| I want to… | Change this | Then do this |
| --- | --- | --- |
| Change a function name or its code | WranglesPY | Run **Sync catalog identity and history from WranglesPY**. |
| Add or change a parameter | The Python function and its schema in WranglesPY | Run **Sync**. |
| Add a new wrangle | WranglesPY, with an unused `catalog_id` | Run **Sync**, then review its new docs. |
| Keep an old name as legacy | The old and new functions in WranglesPY | Run **Sync**. |
| Remove an old function | WranglesPY | Run **Sync** and review the removed docs. |
| Move the current wrangle in the docs | Its DB row's `catalog_key` | Run **Sync**. |
| Move a legacy wrangle in the docs | Its own `catalog_key` inside DB `history` | Run **Sync**. |
| Change page text, a title, or an example | Markdown in this Docs repo | Commit the edit. **Compile Registry content** runs on push. |

In this guide, **Sync** means the workflow named
**Sync catalog identity and history from WranglesPY**.
See section 12 for its exact steps.

## 2. The three places

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

### WranglesPY: the function and its rules

WranglesPY holds the Python code. Its docstring also holds the schema.
A **docstring** is the text inside `"""` below a Python function.
A **schema** lists the allowed parameters, types, and required values.

We add two fields at the top of that schema:

```yaml
type: object
catalog_id: "63"
status: active
```

Put `catalog_id` and `status` beside `type`, **not inside `properties`**.
They describe the wrangle. This is metadata: information about the wrangle.
They are not parameters for users to enter in a recipe.

Do not add `history`, `catalog_key`, or `wranglesPY_key` to this docstring.
The sync gets the recipe name from WranglesPY. It builds history in the DB.

### Database: the shared ID and page placement

The table is `public.wrangles_catalog` in API-Core's database.
Here, **DB** means this database.

| Field | Easy meaning | Example |
| --- | --- | --- |
| `catalog_id` | The number used to match the wrangle across the systems | `63` |
| `wranglesPY_key` | The current name used in recipes | `structure.split_dictionary` |
| `catalog_key` | The current wrangle's place in the docs | `structure.split_dictionary` |
| `catalog_kind` | Whether this row is a wrangle or a connector | `wrangle` |
| `status` | The state of this catalog row | `active` |
| `history` | Old names, their states, and their own doc places | See below. |

A current name and its legacy names can share **one DB row and one ID**.
They still have separate documentation pages.

Example: row `63` now has these values. Other DB fields are not shown:

```json
{
  "catalog_id": "63",
  "wranglesPY_key": "structure.split_dictionary",
  "catalog_key": "structure.split_dictionary",
  "status": "active",
  "history": {
    "split.dictionary": {
      "status": "legacy",
      "catalog_key": "split.dictionary"
    }
  }
}
```

### Docs repo: the words and examples

This repo holds the hand-edited Markdown and the tools that build the website.

- Edit wrangle pages in `registry/input_wrangles/`.
- Edit connector pages in `registry/input_connectors/`.
- The saved DB copy is `registry/catalog/api-core.json`. Sync updates it.
- The saved WranglesPY schemas are in `registry/runtime/`. Refresh updates them.
- The website pages and contracts are generated from these inputs.

**Do not edit a saved JSON copy to change the live DB.** Change the real DB row,
then run Sync. Do not hand-edit generated pages to change page text.

## 3. Which value wins? The priority rules

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

### Matching a wrangle to a DB row

The sync uses these rules in this order:

1. **An explicit `catalog_id` in WranglesPY wins.** Match the DB row with that ID.
2. **If there is no ID**, use an exact, unique `wranglesPY_key` match in the DB.
   Use that existing row's ID.
3. **If there is no ID and no match**, report the wrangle as `unregistered`.
   Do not create a DB row for it.
4. **An explicit unused ID can create a row**, if the schema is valid.
   For a normal new wrangle, use `status: active`.
5. **Two active names cannot claim the same ID.** Keep the affected rows unchanged
   and report a conflict. Other valid rows can still sync.

One active name and one or more legacy names **can** share an ID.
The workflow does not choose a new ID for you. Check the DB and other planned
WranglesPY changes, and agree on an unused number with the team.
Do not copy an ID from an unrelated active wrangle.

### Keeping the page placement

- For an existing row, its DB `catalog_key` wins. A runtime rename does not replace it.
- For a new row, `catalog_key` starts as the new `wranglesPY_key`.
- For a legacy page, that name's `history.catalog_key` wins.
- If there is no catalog placement, the page keeps its previous placement rules.

### Keeping the words on the page

- Existing Markdown explanations win. Refresh does not replace them with schema text.
- Existing page titles, summaries, and notes about their source are kept during refresh.
- If an introduction is missing, refresh can add one. It first uses existing editorial
  metadata, then the schema description.
- Parameter rules come from the schema. Do not change generated tables by hand.
- A schema's `required` list wins over a Python default value.

### Keeping the state

An explicit WranglesPY `status` controls that name's state during sync.
A manual DB state can be replaced by this explicit value.
If a single existing name has no schema `status`, the sync keeps its DB state.

Existing `wrangle_type`, `okf_path`, and notes are kept during normal updates.
New rows can have null `wrangle_type` and `okf_path`. A null value means no value
has been set; it does not mean that sync clears old values.

## 4. Want to change a function name?

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

First choose: **must old recipes still work?**

### Yes: keep the old name

Use the legacy steps in section 5. Keep the old function available.
The new name is active; the old name is legacy; both use the same ID.

### No: remove the old name

1. Change the exposed recipe function name in WranglesPY.
2. Keep the same `catalog_id` for its replacement.
3. Give the replacement `status: active`.
4. Remove the old exposed function and update the Python imports/tests as needed.
5. Push the WranglesPY change. Run Sync: preview, then apply.

The DB row keeps its ID and `catalog_key`. Its `wranglesPY_key` changes to the
new runtime name. The old name goes into history with `status: "not active"`.
Refresh removes the old name's docs.

**Old recipes using a removed name can fail.** Sync does not rewrite users' recipes.
Changing only a page title does not rename a function.

## 5. Want a new name and a legacy old name?

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

This is how we keep old recipes working while offering a new name.

### Real example: dictionary splitting

These are real schema lines from the WranglesPY version used by this repo.
The rest of each schema is left out here; do not remove it from the real code.

In [`wrangles/recipe_wrangles/split.py`](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/split.py),
function `dictionary` has:

```yaml
type: object
catalog_id: "63"
status: legacy
```

Its recipe name is `split.dictionary`.

In [`wrangles/recipe_wrangles/structure.py`](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/structure.py),
function `split_dictionary` has:

```yaml
type: object
catalog_id: "63"
status: active
```

Its recipe name is `structure.split_dictionary`. The current function calls the
old implementation with this real line:

```python
return _split.dictionary(df=df, input=input, output=output, default=default, output_format=output_format)
```

This shows why **legacy does not mean broken or unused**. The old function still
works. The new function can even use its code.

### Steps for your own rename

1. Keep the old function and its behavior.
2. Set the old function's schema to `status: legacy`.
3. Add the new function with `status: active` and the same `catalog_id`.
4. Keep a separate docstring for each exposed name.
5. Test old recipes and new recipes in WranglesPY.
6. Push the change and run Sync: preview, then apply.
7. Merge the generated Docs branch.

Do not use one Python function object for both names if they need different
statuses. That object has only one docstring. Our `structure.py` uses small
wrapper functions, so each name has its own docstring.

### How does the legacy path stay in place?

If the old name already has a history entry, Sync keeps its `catalog_key`.
If the old current name becomes legacy for the first time, Sync copies the old
row's `catalog_key` into that name's history entry.

The current row also keeps its existing `catalog_key`. **A rename alone does
not move either page to a new group.** Change the current row's key separately
if the new name should move.

For example, our current row `90` has:

```json
{
  "catalog_id": "90",
  "wranglesPY_key": "standardize.replace",
  "catalog_key": "standardize.replace",
  "history": {
    "replace": {
      "status": "legacy",
      "catalog_key": "format.replace"
    }
  }
}
```

So `replace` stays under **Format**. `standardize.replace` is under **Standardize**.
The two keys are independent. Future syncs keep both.

If both names use the exact same placement key, the generated legacy section
gets a separate `legacy-…` anchor. An anchor is the part of a page address after `#`. The two pages do not become one page.

## 6. What does the Legacy pill mean?

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

The old page gets a **Legacy** pill beside its heading. The sidebar also marks
legacy pages. The pill has dark text on a pale yellow warning background.
You do not add it to Markdown by hand.

Hover over the page pill, or focus it with the keyboard. The message says:

> This wrangle is planned for deprecation. Your existing recipes will continue to work. For new recipes, use structure.split_dictionary.

The replacement name is a link to the current wrangle's docs. The builder gets
that replacement from the current runtime name on the shared DB row.
Its link follows the replacement's catalog placement.

- The legacy page stays available while the old function is available.
- Its examples keep the old recipe name.
- Legacy status alone does not turn off its Run button. The normal Run rules still apply.
- The pill does not set a removal date and does not update users' recipes.
- The old function must remain compatible for the old recipes to keep working.
- If no separate current replacement page exists, the pill has no replacement link.
- Once the old function is removed and Sync runs, its page is removed too.

## 7. Want to add a completely new wrangle?

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

1. Add the function in WranglesPY. Make sure recipes can find its exposed name.
2. Write its schema docstring, including its parameters and required fields.
3. Set an unused `catalog_id` and `status: active` at the schema root.
4. Test the function and schema in WranglesPY. Push the change.
5. Run Sync: preview, then apply.
6. Review the generated documentation branch before you merge it.

The new DB row starts with:

- The ID from WranglesPY.
- `catalog_kind: wrangle`.
- The function's recipe name as `wranglesPY_key` and `catalog_key`.
- `status: active` and empty `history: {}`.

Do not use the IDs in this guide for a new, unrelated function. They are already used.

A new page is not automatically a finished example page. Add clear Markdown text,
a working YAML example, and its input/output data in `registry/input_wrangles/`.
Review execution needs before enabling Run. New entries start with execution off.
Unknown access needs stay unreviewed.

A documentation refresh can create a page before DB registration, with a null
catalog ID and `pending-registration`. That does **not** mean Sync created a DB row.
A new function with no ID and no DB match still appears under `unregistered`.

## 8. Want to split one wrangle into two different wrangles?

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

**Only one active result can keep the old ID. The other needs its own ID.**

Our lookup functions show this:

| Recipe name | ID | Status | Python file |
| --- | --- | --- | --- |
| `lookup` | `81` | `legacy` | `wrangles/recipe_wrangles/main.py` |
| `lookup.semantic` | `81` | `active` | `wrangles/recipe_wrangles/lookup.py` |
| `lookup.key` | `101` | `active` | `wrangles/recipe_wrangles/lookup.py` |

The real `semantic` schema starts with:

```yaml
type: object
catalog_id: "81"
status: active
```

The real `key` schema starts with:

```yaml
type: object
catalog_id: "101"
status: active
```

See the pinned [`lookup.py`](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/lookup.py)
and [`main.py`](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/main.py).
The numbers above are existing IDs, not new IDs to reuse.

For another split:

1. Choose which new function is the main replacement. Give it the old ID and `active`.
2. Give the other new function its own unused ID and `active`.
3. Keep the old function with the old ID and `legacy` if old recipes must work.
4. Keep and test the old behavior. Metadata alone cannot do this.
5. Run Sync and check each row in the preview.

The legacy pill links to the one current name on its row. In this example it links
to `lookup.semantic`, not to both lookup functions. Explain both choices in the
old page's Markdown when users need help choosing.

### What if the replacement already has a different DB ID?

This happened with `lookup.semantic`: it had row `102`, then its schema moved it to `81`.
Sync can delete the old row `102` and use row `81`. The preview shows a `delete`
with `replacement_catalog_id: "81"`.

Before deleting that old row, Sync moves its `public.models.catalog_id` references
to the replacement ID. It keeps the model records and their content.
Other DB rules still apply. A rejected DB write rolls back the transaction.

If a different active function already claims the destination ID in the selected
WranglesPY schema, Sync reports the conflict and keeps the affected rows.
Do not use ID changes just to move a page. Use `catalog_key` for that.

## 9. Want to move a wrangle in the docs?

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

Change the real DB row. Find it by **`catalog_id`**.

### Move the current name

Edit the row's top-level `catalog_key`.
For example, row `77` currently uses `split.explode`:

| `catalog_key` | Group in the docs | Section |
| --- | --- | --- |
| `split.explode` | Split | Explode |
| `transform.explode` | Transform | Explode |
| `explode` | Other | Explode |

Changing it to `transform.explode` moves the page to Transform after Sync and merge.
It does not change the recipe name `explode`.

Use lower-case names and dots, such as `transform.explode`. Underscores are allowed.
The part before the last dot is the group. The last part is the section.
If the group does not exist, the docs builder creates it.
Pages within Wrangles and Connectors are sorted alphabetically.

### Move only a legacy name

Edit that name's `catalog_key` inside `history`. Keep its name and status.

For example, to move legacy `replace` from Format to Utility, change only this value:

```json
{
  "replace": {
    "status": "legacy",
    "catalog_key": "utility.replace"
  }
}
```

Do not change row `90`'s main key if `standardize.replace` should stay where it is.
Do not remove other history entries when editing this JSON.

Then run Sync: preview, then apply. A placement-only change can show
`changes: []` because you already saved it in the DB. **Apply is still needed**
to import that DB copy and generate the docs.

You do not need to rename an input Markdown file, change its `namespace`, or edit
the sidebar by hand. The catalog placement wins. Titles, recipe names, and the
individual page URLs stay separate from group placement.
The docs also keep redirects for the original namespace bookmarks they record.
Do not give two unrelated pages the same group and section; checks can reject collisions.

## 10. Want to remove a wrangle?

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

Remove its exposed function in WranglesPY, then run Sync.
The workflow checks the full function list from the same upstream version as the schema.

For a removed legacy name, history changes to:

```json
{
  "split.dictionary": {
    "status": "not active",
    "catalog_key": "split.dictionary"
  }
}
```

Its placement is kept as history. Refresh removes its input Markdown page,
generated page, contract, navigation entry, and Playground entry.
Review these deletions in the generated Docs branch before merging.

A function deleted without first becoming legacy also becomes `not active` in history.
If an ID has no remaining names, its DB row stays with `status: "not active"`.
An ID move is different: an obsolete row can be deleted, as explained in section 8.

Do not set `status: not active` in a WranglesPY docstring. The supported docstring
states are `active` and `legacy`. Sync detects removal from the function list.
A function that exists but has no schema is not treated as deleted.

## 11. Want to change parameters or page text?

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

### Change a parameter or its allowed values

Edit the function and its schema in WranglesPY. Keep the same ID if it is the same
wrangle. Test the function, push the change, and run Sync.

For example, the real `convert.case` schema has:

```yaml
type: object
catalog_id: "5"
status: active
required:
  - input
  - case
```

Its Python signature has `case='lower'`, but the schema still requires `case`.
The Registry follows the schema's required fields.
See [`convert.py`](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/convert.py).
The snippet above leaves out the other schema fields.

Refresh updates the contracts (files that hold the parameter rules) and generated
tables. Existing page text is kept. Check your examples when parameters change; old examples may need edits.
A Python code-only change may produce no schema or page change.

### Change only the page words, title, or example

Edit the Markdown in `registry/input_wrangles/` or `registry/input_connectors/`.
Click **Commit changes** in GitHub. That saves the edit and starts the push workflows.
There is no second manual push step in the GitHub editor.

**Compile Registry content** generates the pages from saved inputs, checks them,
and commits changed outputs back to that branch. It does not change the live DB
or fetch a new WranglesPY schema. No Sync is needed for a wording-only edit.

For the exact fields you can edit, see
[Editing wrangles and connectors](EDITING_WRANGLES_AND_CONNECTORS.md).

## 12. How to run Sync, from start to finish

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

### Before you run it

- Push your WranglesPY changes to the branch you want to read.
- Or save your placement edits in the live DB.
- Use a complete WranglesPY branch. Sync checks its full function list, including removals.
- Do not run schema refresh and catalog sync at the same time. Finish and merge one result first.

### Preview

1. In **Wrangles-Docs**, open **Actions**.
2. Open **Sync catalog identity and history from WranglesPY**.
3. Click **Run workflow**.
4. Choose **main** as the workflow branch. This workflow only runs from Docs `main`.
5. Set **upstream_ref** to the WranglesPY branch, tag, or commit you want.
   Use `main` after the WranglesPY change is merged there.
6. Leave **apply_changes** off. Start the run.
7. Read the **Reconcile catalog over VPN** step.

These are two different choices: the workflow branch is in **Wrangles-Docs**;
`upstream_ref` is in **WranglesPY**.

The schema job generates the schema and full function list. It records the exact
WranglesPY commit. The sync job uses that same commit.
The configured `api-core-validation` environment supplies the VPN and DB secrets.
You do not add a VPN file or password to the repo.

### Read the preview

| Output | Meaning |
| --- | --- |
| `applied: false` | This was a preview. It did not write to the DB. |
| `changes` | DB creates, updates, and deletes that Sync plans to make. |
| `changes: []` | No DB changes are needed. Docs may still need a refresh. |
| `unregistered` | Names with no ID and no usable DB match. No new DB rows are made for them. |
| `warnings` | Entries that need attention. Read the reason and action. |
| `delete` with `replacement_catalog_id` | An old ID is being moved into a different ID. Review it carefully. |

Preview does not run the full documentation refresh. A clean DB preview does not
prove the later docs build will pass.

### Apply and merge

1. Run the workflow again from Docs `main`.
2. Use the same WranglesPY version. For an exact repeat, copy the recorded commit
   into `upstream_ref`; a branch may have changed since your preview.
3. Turn **apply_changes** on.
4. Sync writes valid DB changes, imports the live catalog, refreshes docs, checks
   the Registry, and builds the site.
5. Open the workflow summary. Use the comparison link for
   `catalog-sync/<run-id>-<attempt>`.
6. Create a pull request and review the generated changes.
7. Merge that branch into Docs `main`.

The workflow creates a branch and a comparison link. **It does not open the PR for you.**
If there are no file changes, there is no new branch to merge.

The DB update happens before the documentation build. If the build fails, the DB
may already be updated, but no documentation commit is pushed. Fix the reported
problem and start a new run. You do not need to repeat the one-time migration.
A transaction is one group of DB writes. If a DB write fails inside that group,
none of that group's changes are saved.

### Publish

After the merge, check **Validate Registry** and **Publish Latest**.
Wait for Publish Latest to succeed for the merged commit.
It publishes the container image. Pull that image and restart the hosting deployment
to show the new site. A PR branch alone does not update the deployed website.

## 13. What are the other workflows for?

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

| Workflow | What it does | Changes the DB? |
| --- | --- | --- |
| **Sync catalog identity and history from WranglesPY** | Reads upstream, syncs IDs/history, imports the catalog, and refreshes docs | Only with `apply_changes` on |
| **Refresh Registry from WranglesPY** | Refreshes schemas/docs using the saved catalog | No |
| **Compile Registry content** | Builds outputs from saved Markdown, schemas, and catalog; runs on push | No |
| **Validate Registry** | Generates and checks the Registry in CI | No |
| **Validate Registry against live API-Core** | Reads the live catalog and compares it with the Registry and saved schema | No |
| **Publish Latest** | Checks, builds, and publishes the container image | No |

For a normal WranglesPY or DB update, use **Sync**. It already does the documentation
refresh; do not run Refresh again just to repeat that work.

Use **Refresh Registry from WranglesPY** when you only want to refresh documentation
against the saved catalog. Its preview has `commit_changes` and `publish` off.
Its committing mode writes to `main`, so repository protection can reject that push.
It is not the Sync review-branch flow.

After a completed merge, you can run **Validate Registry against live API-Core**
for an extra read-only check. If its source says `direct-database`, it used the DB
fallback. That checks the catalog data; it does not prove the HTTP API works.

## 14. What if something fails?

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

| Problem | What happens | What you do |
| --- | --- | --- |
| A present function has no schema | Keep its existing identity; skip it if it is new | Add/fix its structured schema in WranglesPY. Other valid rows can continue. |
| A new function has no ID and no match | Report `unregistered`; no DB insert | Give it an unused ID in WranglesPY. |
| Two active names ask for one ID | Keep affected rows and report the conflict | Give different active functions different IDs. |
| A parameter schema or example is invalid during refresh | Keep an existing entry's last valid version, or skip a new entry | Read the refresh report and fix the source. |
| A shared Registry check or site build fails | Do not apply/push the staged documentation result | Fix the reported error, then start a new Sync run. |
| A DB constraint rejects a write | Roll back the DB transaction | Read the named constraint and fix the data/ID problem. |
| The workflow cannot push its output branch | No review branch is published | Check repository permissions with a maintainer. |

A green run can still have retained entries and warnings. Read the report, not
only the green icon. Registry checks and a site build do not run every recipe or
prove that every function gives the right answer.

Known examples: `maths` and `format.price_breaks` have missing upstream schemas.
Their existing catalog identities are retained. The docs use recorded fallbacks.
`map` (ID `99`) is the catalog-only Excel Map feature, not a recipe callable.
The schema audit also records a correction for `convert.data_type`.

This lifecycle sync handles recipe wrangles. It does not automatically add,
rename, or retire connector catalog rows. Connector documentation and schemas
still have their own validation during refresh.

## 15. Where these examples come from

In this section, **Sync** means **Sync catalog identity and history from WranglesPY**.

The real Python examples above use the WranglesPY revision saved in this repo:
`bb47671ab023b3d3eb76fc42f07da4aaed056e2e` (version `1.20.5`).
They are small extracts, not complete replacement functions.
DB examples use the catalog saved after the placement migration.

Useful files in this repo:

- [Saved live catalog](../registry/catalog/api-core.json)
- [Saved WranglesPY source/schema](../registry/runtime/wranglespy-source-schema.json)
- [Sync workflow](../.github/workflows/sync-catalog-history.yml)
- [Sync rules](../scripts/sync_catalog_history.py)
- [Documentation refresh](../scripts/refresh_registry.py)
- [Simple page-editing guide](EDITING_WRANGLES_AND_CONNECTORS.md)
