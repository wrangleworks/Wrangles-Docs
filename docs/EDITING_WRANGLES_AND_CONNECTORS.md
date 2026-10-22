# Editing wrangles and connectors on GitHub

No Codespace or terminal is needed. Open the file on GitHub, click **Edit**
(the pencil), change the content, then click **Commit changes**. GitHub commits
the change to the selected branch. There is no separate push step.

## Which file do I edit?

| Content | Folder / file | Example |
| --- | --- | --- |
| Wrangle explanations and examples | `registry/input_wrangles/` | Edit `convert/case.md` for `convert.case`. |
| Connector explanations and examples | `registry/input_connectors/` | Edit `file.md` for the file connector. |
| Custom Python functions used by examples | `wrangles-docs/customFunctions.py` | Add or update the function referenced as `custom.your_function` in a recipe. |

## What can I edit?

In a Markdown file, the section between the first two `---` lines is metadata.
**Below the second `---` is the visible page content.**

- Edit explanations, notes, links and examples in that lower section. Existing
  manual explanations are preserved during schema refresh.
- To change a title, update the top-level `title` and Markdown heading together.
- The top-level `description` is a short search/machine summary, not another
  introduction displayed above your explanation.
- Keep example YAML, input and expected output consistent. For example,
  `case: upper` with input `hammer` should produce `HAMMER`.
- If an example uses `input_fixture` or `output_fixture`, edit the referenced
  files under `registry/fixtures/` instead of adding duplicate tables.

Do not hand-edit generated parameter tables, parameter rules,
`configuration_schema`, or connector `operations` schemas. They come from
WranglesPY. Do not change IDs, recipe keys, URLs, source revisions or execution
permissions as a wording edit.

Do not edit generated wrangle/connector copies in
`wrangles-docs/registry-docs/` or `wrangles-docs/static/registry/`.
Always use the source locations in the table.

Custom functions are executable Python, not page text. Keep function names and
arguments consistent with the examples, and have a developer review and test
changes. Registry checks alone do not test execution.

## After saving: the Registry compiles automatically

Click **Commit changes** on GitHub. That is all you need to start compilation.

Every branch push starts **Actions → Compile Registry content**. It:

1. Reads the saved Markdown, catalog and schema snapshots.
2. Generates the pages, contracts and Playground catalog.
3. Runs Registry checks and builds the site.
4. Commits changed generated files back to the same branch.

It does not fetch a newer WranglesPY schema or change the database. If the outputs
are already current, it creates no extra commit. The bot commit does not create
an endless workflow loop.

This also works for branches in this repository used by pull requests; it is not
a privileged write-back to someone else's fork. Wait for compilation to finish
before merging. If required checks do not appear on the bot's new commit, a
maintainer must handle the repository's check policy; do not bypass protection.

**Validate Registry** and **Publish Latest** also generate their own fresh
outputs before checking, so they do not race with the compilation bot or fail
merely because your source-only edit left old generated files.

Check **Actions → Compile Registry content** for the result. If a schema or build
error occurs, no generated commit is made. Fix the source and commit again.
If branch protection rejects the bot push, ask a maintainer to allow the intended
automation or apply the outputs through the required review process. If someone
edited the branch during compilation, a rejected push never overwrites their edit;
the newer push starts another run. You can also use **Run workflow** on the chosen
branch to retry manually. This requires the workflow to be available on main.

## Check against the latest WranglesPY schema

Use this when you want schema updates, not just a content change:

1. Open **Actions → Refresh Registry from WranglesPY → Run workflow**.
2. Select **main** and set **upstream_ref** to `main`, or the intended upstream
   tag/commit.
3. Leave **commit_changes** and **publish** off for a preview.
4. Download **registry-refresh-<run-id>** from the run's **Artifacts** and read
   the report.
5. To apply the reviewed changes, run again using that exact upstream commit
   with **commit_changes** enabled.

Read the accepted/rejected/retained entries: a successful run can still retain
an older valid entry. Manual explanations are preserved.

## Check against the live API-Core catalog

1. Open **Actions → Validate Registry against live API-Core → Run workflow**.
2. Select **main** and start it.
3. If approval is requested, an authorized reviewer must approve it.
4. Read the run summary and the **api-core-validation-<run-id>** artifact.

This uses the configured VPN secrets and checks the live catalog against the
Registry and saved WranglesPY schema. It does not change the database, commit
files or publish anything. You do not need it for every wording edit.

If the source says **direct-database**, the API request failed and the database
fallback was used. That does not prove the API works. The configured API host
currently routes to dev, not a verified production API.

## Publish and check the result

An ordinary editor push to **main** already starts **Publish Latest** automatically;
there is no extra publish click for that edit. A push to another branch does not
publish the website. To retry publishing, use **Actions → Publish Latest → Run
workflow → main**. When deliberately refreshing upstream schemas, enable
**publish** with **commit_changes**, because bot commits do not automatically
trigger push workflows.

Publish Latest validates, builds and publishes the container image. The hosting
deployment must consume that image before the live website changes.

On the updated website, inspect the edited page and use **Run** for runnable
examples. Compare the actual result with the expected table. For custom-function
changes, also have a developer run `npm run test:runner`; a successful website
build does not prove the function works.
