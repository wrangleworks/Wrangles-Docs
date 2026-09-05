## Batch

Execute a series of wrangles in batches. Batches can run in parallel with `threads` and can provide fallback output when an error occurs.

### Examples

#### Batch an Extract AI Wrangle

This example processes product descriptions in batches of two rows.

##### Recipe

```yaml
wrangles:
  - batch:
      batch_size: 2
      threads: 1
      wrangles:
        - extract.ai:
            api_key: Your OpenAI API key
            input: Product Description
            output:
              Title:
                type: string
                description: Title of the product
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Description |
| --- |
| Sleep better with our Memory Foam Pillow, designed to contour to your head and neck. |
| Stay comfortable and stylish with our Organic Cotton T-Shirt, made from soft, breathable fabric. |
| Keep drinks hot or cold with our Stainless Steel Water Bottle, featuring durable insulation. |
| Enjoy crisp sound and long battery life with our Wireless Bluetooth Earbuds. |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Description | Title |
| --- | --- |
| Sleep better with our Memory Foam Pillow, designed to contour to your head and neck. | Memory Foam Pillow |
| Stay comfortable and stylish with our Organic Cotton T-Shirt, made from soft, breathable fabric. | Organic Cotton T-Shirt |
| Keep drinks hot or cold with our Stainless Steel Water Bottle, featuring durable insulation. | Stainless Steel Water Bottle |
| Enjoy crisp sound and long battery life with our Wireless Bluetooth Earbuds. | Wireless Bluetooth Earbuds |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| batch_size | Batch Size | number | Yes | Number of rows in each batch. |  |  |
| wrangles | Wrangles | json | Yes | Wrangles to apply to each batch as a nested recipe. |  |  |
| threads | Threads | number | No | Number of batches to run in parallel. |  |  |
| on_error | On Error | json | No | Default output to use when an error occurs within a batch. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

_No defaults are documented in the legacy source._

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-backed | No |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | No |

:::note
Nested wrangles can have their own access or API-key requirements. The example uses `extract.ai`, which requires an API key.
:::

</details>

<details className="ww-field-disclosure">

<summary>Source</summary>

| Field | Value |
| --- | --- |
| Docs Path | docs/python/recipes/wrangles/utilities.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/utilities#batch |
| Legacy Path | docs/python/recipes/wrangles/utilities.md |
| Catalog Source | Not present in generated catalog |
| Mapping Source | Not present in generated mappings |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | Not available in generated catalog |
| Wrangle Key | `batch` |
| Type | utility |
| Subtype |  |
| Variant | stock |
| Status | active (legacy documentation) |
| Tags | Utility, batch |

</details>
