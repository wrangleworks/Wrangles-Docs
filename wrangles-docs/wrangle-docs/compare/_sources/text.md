## Text

Compare two strings and return the intersection or difference, or use overlap to find the matching characters between the two strings.

### Examples

#### Comparing the difference between two columns of text

##### Recipe

```yaml
wrangles:
  - compare.text:
      input:
        - col1
        - col2
      output: Difference
      method: difference
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| Large Oak Wood White Marble Top Bookshelf | Large Pine Wood Black Marble Bottom Bookshelf |
| Medium Oak Wood White Marble Top Coffee Table | Medium Maple Wood Orange Steel Top Coffee Table |
| Small Oak Wood White Marble Top Console Table | Small Normal Wood Blue Plastic Top Console Table |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Difference |
| --- |
| Pine Black Bottom |
| Maple Orange Steel |
| Normal Blue Plastic |

</div>

</div>

#### Comparing the intersection of two columns of text

##### Recipe

```yaml
wrangles:
  - compare.text:
      input:
        - col1
        - col2
      output: Intersection
      method: intersection
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| Large Oak Wood White Marble Top Bookshelf | Large Pine Wood Black Marble Bottom Bookshelf |
| Medium Oak Wood White Marble Top Coffee Table | Medium Maple Wood Orange Steel Top Coffee Table |
| Small Oak Wood White Marble Top Console Table | Small Normal Wood Blue Plastic Top Console Table |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Intersection |
| --- |
| Large Wood Marble Bookshelf |
| Medium Wood Top Coffee Table |
| Small Wood Top Console Table |

</div>

</div>

#### Comparing the overlap of two columns of text

##### Recipe

```yaml
wrangles:
  - compare.text:
      input:
        - Part Code1
        - Part Code2
      output: Overlap
      method: overlap
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Part Code1 | Part Code2 |
| --- | --- |
| SKF6202 | TMKN6202 |
| X06-02-000 | X06-81-000 |
| 7100E15-V-230/3 | 7100E15-V-120/1 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Overlap |
| --- |
| ****6202 |
| X06-**-000 |
| 7100E15-V-\**0/\* |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | The columns to compare. First column is the base column |  | ["Column A", "Column B"] |
| output | Output | text | Yes | The column to output the results to |  | "Text Output" |
| method | Method | select | No | The type of comparison to perform. Defaults to difference. | difference, intersection, overlap | "difference" |
| char | Char | text | No | Character to split strings on for difference and intersection. Defaults to a space. |  |  |
| non_match_char | Non Match Char | text | No | Character to use for non-matching characters when using overlap. |  |  |
| include_ratio | Include Ratio | boolean | No | Include the ratio of matching characters when using overlap. |  |  |
| decimal_places | Decimal Places | number | No | Number of decimal places to round the overlap ratio to. |  |  |
| exact_match | Exact Match | text | No | Value to use for exact matches when using overlap. |  |  |
| empty_a | Empty A | text | No | Value to use when input A is empty when using overlap. |  |  |
| empty_b | Empty B | text | No | Value to use when input B is empty when using overlap. |  |  |
| all_empty | All Empty | text | No | Value to use when both inputs are empty when using overlap. |  |  |
| case_sensitive | Case Sensitive | boolean | No | Whether the comparison is case sensitive. Defaults to true. |  |  |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "method": "difference",
  "output": "Text Output"
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
| Docs Path | docs/python/recipes/wrangles/compare.md |
| Docs URL | /python/recipes/wrangles/compare |
| Legacy Path | docs/python/recipes/wrangles/compare.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 31905b74-ce58-45cd-8add-821cc04ab946 |
| Wrangle Key | `compare.text` |
| Type | compare |
| Subtype | text |
| Variant | stock |
| Status | active |
| Tags | Compare, compare, text |

</details>
