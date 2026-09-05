## Attributes

Extract numeric attributes from unstructured text such as lengths, voltages, weights, or temperatures. Requires WrangleWorks Account.

### Examples

#### Extracting All Attributes

##### Recipe

```yaml
wrangles:
  - extract.attributes:
      input: tools
      output: attributes
      responseContent: span
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Tools (input) | Attributes (span )(output) |
| --- | --- |
| hammer 5kg, 0.5m | \{'length': ['0.5m'], 'mass': ['5kg']\} |

</div>

</div>

#### Extracting All Attributes

##### Recipe

```yaml
wrangles:
  - extract.attributes:
      input: tools
      output: attributes
      responseContent: object
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Tools (input) | Attributes (Object) (output) |
| --- | --- |
| hammer 5kg, 0.5m | \{'length': [\{'unit': 'metre', 'value': 0.5\}], 'mass': [\{'unit': 'kilogram', 'value': 5.0\}]\} |

</div>

</div>

#### Extracting Specific Attributes

##### Recipe

```yaml
wrangles:
  - extract.attributes:
      input: Tools
      output: attributes
      responseContent: span
      attribute_type: mass			# Specific attributes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

_No sample available._

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column. |  | ["Column A", "Column B"] |
| output | Output | list | Yes | Name of the output column. |  | ["Attributes Output"] |
| attribute_type | Attribute Type | select | No | Specify which attributes to return. If omitted, returns all attributes. | angle, area, capacitance, charge, current, data transfer rate, electrical conductance, electrical resistance, energy, force, frequency, inductance, instance frequency, length, luminous flux, weight, power, pressure, speed, velocity, temperature, time, voltage, volume, volumetric flow | "" |
| bound | Bound | select | No | When returning an object, if the input is a range (e.g. 10-20mm) set the value to return. min, mid or max. Default mid. | min, mid, max | "" |
| desired_unit | Desired Unit | text | No | Convert the extracted unit to the desired unit |  | "" |
| first_element | First Element | boolean | No | Get the first element from results |  | false |
| responseContent | ResponseContent | select | No | `span` returns the text found. `object` returns an object with value and unit. | span, object | "" |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "bound": "",
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "Attributes Output"
  ],
  "desired_unit": "",
  "first_element": false,
  "attribute_type": "",
  "responseContent": ""
}
```

### Attribute Types

- `angle`
- `area`
- `capacitance`
- `charge`
- `current`
- `data transfer rate`
- `electrical conductance`
- `electrical resistance`
- `energy`
- `force`
- `frequency`
- `inductance`
- `instance frequency`
- `length`
- `luminous flux`
- `weight`
- `power`
- `pressure`
- `speed`
- `velocity`
- `temperature`
- `time`
- `voltage`
- `volume`
- `volumetric flow`

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-backed | No |
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

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
| ID | 03ccedef-c938-41f1-8980-280f1a91542e |
| Wrangle Key | `extract.attributes` |
| Type | extract |
| Subtype | attributes |
| Variant | stock |
| Status | active |
| Tags | Extract, extract, attributes |

</details>
