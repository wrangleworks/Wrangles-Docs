## Jinja

Makes use of a Jinja template to create a description, title, or summary based on your data.

:::info
Jinja templates do not allow variables with spaces. This wrangle automatically replaces spaces in column headers with underscores, so use underscores instead of spaces when referencing columns in the template.
:::

### Examples

#### Creating a Jinja Description

##### Recipe

```yaml
wrangles:
  - create.jinja:
      output: Description
      template:
      	string: |
        	This is a {{ Brand }} {{ Item_Type }} that is {{ Size }}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Size | Brand | Item Type |
| --- | --- | --- |
| 10mm | SKF | ball bearing |
| 15mm | Timken | bearing seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Size | Brand | Item Type | Description |
| --- | --- | --- | --- |
| 10mm | SKF | ball bearing | This is a SKF ball bearing that is 10mm |
| 15mm | Timken | bearing seal | This is a Timken bearing seal that is 15mm |

</div>

</div>

Using `|` in YAML denotes a multi-line string that preserves line breaks. Use `>` for a multi-line string when line breaks should not be preserved.

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | text | No | Name of input column containing a dictionary. Defaults to a dictionary of all columns. |  | "Column A" |
| output | Output | text | Yes | Name of the column to output to. |  | "Jinja Output" |
| template | Template | json | Yes | Jinja template to use. Can be represented as a YAML string, a column in the data, or a separate file. |  | "\{\}" |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": "Column A",
  "output": "Jinja Output",
  "template": "{}"
}
```

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-backed | No |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Source</summary>

| Field | Value |
| --- | --- |
| Docs Path | docs/python/recipes/wrangles/create.md |
| Docs URL | /python/recipes/wrangles/create |
| Legacy Path | docs/python/recipes/wrangles/create.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 10fc6709-16d4-4eab-8f56-6cb5d170ea66 |
| Wrangle Key | `create.jinja` |
| Type | create |
| Subtype | jinja |
| Variant | stock |
| Status | active |
| Tags | Create, create, jinja |

</details>
