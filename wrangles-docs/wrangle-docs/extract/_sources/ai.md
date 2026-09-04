## AI

Use AI to extract meaningful structured data. `extract.ai` can be used recipe-first, where the output schema is defined in the recipe, or model-first, where a saved extract.ai model is called by `model_id`.

:::info
For saved extract.ai models, this is the preferred calling pattern compared with using `extract.custom`.
:::

### Examples

#### Making Use of Output Parameters

##### Recipe

```yaml
wrangles:
  - extract.ai:
      api_key: Your OpenAI api key
      input: Product Specs
      output:
        Blade Diameter:
          type: number
          description: The diameter of the blade used, reported in inches.
          default: N/A
          examples:
            - 4.5"
            - 8 inch
        Max. RPM:
          type: number
          description: The maximum rotations per minute (rpm).
          default: 3600
          examples:
            - 3600 max. rpm
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Specs |
| --- |
| 18V Cordless 4.5in angle grinder |
| 120V 12in chop saw 3600 max. rpm |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Blade Diameter | Max. RPM |
| --- | --- |
| 4.5 inches |  |
| 12 inches | 3600 |

</div>

</div>

#### Description Only

##### Recipe

```yaml
wrangles:
  - extract.ai:
      api_key: Your OpenAI api key
      input: Product Specs
      output:
        Blade Diameter: The diameter of the blade used, reported in inches.
        Max. RPM: The maximum rotations per minute (rpm).
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Specs |
| --- |
| 18V Cordless 4.5in angle grinder |
| 120V 12in chop saw 3600 max. rpm |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Blade Diameter | Max. RPM |
| --- | --- |
| 4.5 inches |  |
| 12 inches | 3600 |

</div>

</div>

#### Model Based Column Output by Name

##### Recipe

```yaml
wrangles:
  - extract.ai:
      api_key: Your OpenAI api key
      model_id: xxxx-xxxx-xxxxxxxx
      output:
        - Colors
        - Sizes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Items |
| --- |
| Large yellow square |
| Medium orange triangle |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Colors | Sizes |
| --- | --- |
| [yellow] | Large |
| [orange] | Medium |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | No | Name or list of input columns. Defaults to the entire dataframe. |  | ["Column A", "Column B"] |
| output | Output | json | Yes | List and description of the output you want. |  | "{}" |
| api_key | Api Key | text | Yes | OpenAI API key for the model. |  | "" |
| model | Model | text | No | Model name, such as `gpt-4o-mini`. |  | "" |
| model_id | Model Id | text | No | Saved extract.ai model ID containing a trained definition. |  | "" |
| messages | Messages | list | No | Optional additional instructions for the AI. |  | [] |
| threads | Threads | number | No | Number of requests to send in parallel. |  | "" |
| timeout | Timeout | number | No | Seconds to wait for a response before timing out. |  | "" |
| retries | Retries | number | No | Number of retry attempts. Applies exponential backoff for rate limiting. |  | "" |
| url | Url | text | No | Override the default AI endpoint. Must use the OpenAI chat completions API. |  | "" |
| strict | Strict | boolean | No | Enable strict mode. If true, the function must match the schema but may be more limited. |  | false |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Output Parameters

| Key | Required | Data Type | Description |
| --- | --- | --- | --- |
| type | No | string | JSON schema data type: `string`, `number`, `integer`, `object`, `array`, `boolean`, or `null`. |
| description | No | string | Description of the value to extract. |
| default | No | any | Default value to return. |
| examples | No | array | Examples of typical values to return. |
| enum | No | array | Allowed values for the output. |

### Defaults

```json
{
  "url": "",
  "input": [
    "Column A",
    "Column B"
  ],
  "model": "",
  "output": "{}",
  "strict": false,
  "api_key": "",
  "retries": "",
  "threads": "",
  "timeout": "",
  "messages": [],
  "model_id": ""
}
```

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-backed | Yes |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | Yes |

</details>

<details className="ww-field-disclosure">

<summary>Source</summary>

| Field | Value |
| --- | --- |
| Docs Path | docs/python/recipes/wrangles/extract.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/extract |
| Legacy Path | docs/python/recipes/wrangles/extract.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | d9f89b00-fda3-4f4c-826c-6417b9390607 |
| Wrangle Key | `extract.ai` |
| Type | ai |
| Subtype | ai |
| Variant | stock |
| Status | active |
| Tags | AI, extract, ai |

</details>
