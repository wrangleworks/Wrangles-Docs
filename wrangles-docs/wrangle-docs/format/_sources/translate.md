## Translate

Translate the input column to another language. Powered by DeepL.

### Examples

#### Translating Spanish to English

##### Recipe

```yaml
wrangles:
  - translate:
      input: Español
      output: English
      source_language: Spanish
      target_language: English (British)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Español |
| --- |
| ¡Hola Mundo! |

</div>

<div className="ww-sample-panel">

##### Output Sample

| English |
| --- |
| Hello World! |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the column to translate |  | ["Column A", "Column B"] |
| output | Output | list | Yes | Name of the output column |  | ["Translate Output"] |
| target_language | Target Language | select | Yes | Code of the language to translate to | Bulgarian, Chinese, Czech, Danish, Dutch, English (American), English (British), Estonian, Finnish, French, German, Greek, Hungarian, Italian, Japanese, Latvian, Lithuanian, Polish, Portuguese, Portuguese (Brazilian), Romanian, Russian, Slovak, Slovenian, Spanish, Swedish | "Bulgarian" |
| source_language | Source Language | select | No | Code of the language to translate from. If omitted, automatically detects the input language | Auto, Bulgarian, Chinese, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Greek, Hungarian, Italian, Japanese, Latvian, Lithuanian, Polish, Portuguese, Romanian, Russian, Slovak, Slovenian, Spanish, Swedish | "" |
| case | Case | select | No | Allow changing the case of the input prior to translation. | lower, upper, title, sentence | "" |
| where | Where | text | No | Filter the data to only apply the wrangle to certain rows using SQL-style criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` so the query can be parameterized. Uses SQLite syntax (`?` or `:name`). |  |  |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "Translate Output"
  ],
  "case": "",
  "source_language": "",
  "target_language": "Bulgarian"
}
```

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-backed | No |
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | Yes |

</details>

<details className="ww-field-disclosure">

<summary>Source</summary>

| Field | Value |
| --- | --- |
| Docs Path | docs/python/recipes/wrangles/standalone.md |
| Docs URL | https://wrangles.io/en/python/recipes/wrangles/standalone |
| Legacy Path | docs/python/recipes/wrangles/standalone.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 73c3ceb6-ffd8-4d74-8389-c83b99d33bb0 |
| Wrangle Key | `translate` |
| Type | format |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Format, translate |

</details>
