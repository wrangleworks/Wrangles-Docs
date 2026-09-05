## Concurrent

Run multiple wrangles concurrently instead of sequentially. Concurrent wrangles must declare output columns, may finish in any order, and should not update overlapping columns.

See the [Concurrent connector](/python/connectors/concurrent) for the connector equivalent.

### Examples

#### Run Extraction Wrangles Concurrently

##### Recipe

```yaml
wrangles:
  - concurrent:
      wrangles:
        - extract.codes:
            input: Products
            output: Part Codes
        - extract.attributes:
            input: Products
            output: Attributes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products |
| --- |
| SKF ball brg 2" od 6202 |
| brg seal 1" id 5493 |
| 3lb hammer 87102 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products | Part Codes | Attributes |
| --- | --- | --- |
| SKF ball brg 2" od 6202 | 6202 | `{"length":["2in"]}` |
| brg seal 1" id 5493 | 5493 | `{"length":["1in"]}` |
| 3lb hammer 87102 | 87102 | `{"weight":["3lb"]}` |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| wrangles | Wrangles | json | Yes | Wrangles to execute concurrently. |  |  |
| max_concurrency | Max Concurrency | number | No | Maximum number of wrangles to execute in parallel. |  |  |

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
Nested wrangles can have their own access requirements.
:::

</details>

<details className="ww-field-disclosure">

<summary>Source</summary>

| Field | Value |
| --- | --- |
| Docs Path | docs/python/recipes/wrangles/utilities.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/utilities#concurrent |
| Legacy Path | docs/python/recipes/wrangles/utilities.md |
| Catalog Source | Not present in generated catalog |
| Mapping Source | Not present in generated mappings |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | Not available in generated catalog |
| Wrangle Key | `concurrent` |
| Type | utility |
| Subtype |  |
| Variant | stock |
| Status | active (legacy documentation) |
| Tags | Utility, concurrent |

</details>
