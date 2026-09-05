# Wrangles Registry Contract

Status: pilot

Contract version: 0.1

## Purpose

The Registry is the shared, versioned knowledge contract for Wrangles. It is
designed to be readable by people, consumable by agents, renderable by the
documentation site, and compilable into machine-facing artifacts without a
database or live website dependency.

The format is aligned with the Open Knowledge Format pattern: small Markdown
concept files, YAML frontmatter, stable identifiers, provenance, and explicit
lifecycle information. Wrangles-specific fields are defined by
`schema/wrangle-entry.schema.json`.

## Authority boundaries

Each fact has one authoring authority:

| Information                                             | Authoring authority                 |
| ------------------------------------------------------- | ----------------------------------- |
| Canonical wrangle UUID                                  | Wrangles catalog database           |
| Accepted runtime parameter names                        | WranglesPY function signature       |
| Runtime required/optional status and defaults           | WranglesPY function signature       |
| Runtime behavior                                        | WranglesPY implementation and tests |
| Purpose, guidance, parameter meaning, and relationships | Registry Markdown                   |
| Curated examples and expected outcomes                  | Registry Markdown and fixtures      |
| Lifecycle, visibility, access, and provenance           | Registry Markdown                   |
| Recipe JSON Schema                                      | Generated output                    |
| Docusaurus pages                                        | Generated output                    |
| Database/search records                                 | Generated projection                |

The compiled Registry Markdown is the complete consumption source for people
and agents. Runtime-owned facts are supplied by the pinned WranglesPY contract
manifest at `runtime/wranglespy.json` and reconciled with the Markdown by the
compiler. The manifest is a versioned input, not another authoring source.

The existing per-wrangle Markdown under
`wrangles-docs/wrangle-docs/**/_sources/*.md` is the migration quasi-registry.
Every file is inventoried, content-hashed, and compared with the runtime
manifest and any normalized Registry entry. Aggregate category pages, the
index, and the template are inventoried separately as supporting Markdown;
they are not treated as one-to-one wrangle records.

For the first migration pass, conflicting or incomplete source content is
resolved in this order:

1. WranglesPY callable signature, implementation, and tests
2. the callable's embedded Python schema docstring
3. the matching `_sources/*.md` quasi-registry record

Code determines executable names, accepted explicit parameters, required
status, defaults, and behavior. The embedded schema supplies public
`**kwargs`, constraints, and prose that code does not express mechanically.
The quasi-registry then contributes UUIDs, examples, access metadata, tags,
and additional guidance. The reconciliation report retains disagreements as
migration evidence without asking reviewers to adjudicate them one by one.

The database allocates `id` using the same UUID mechanism as custom wrangles.
The assigned UUID is then recorded in the Registry and reused everywhere; the
Registry compiler must never generate a second identity. Existing records must
be resolved by their current database ID before a new ID is allocated. During
this first pass, `id: null` explicitly means that database reconciliation is
still pending; it is not a generated or temporary identity.

## Parameter contract

The callable recipe surface is the authority boundary. WranglesPY must emit a
versioned runtime manifest by enumerating `wrangles.recipe._recipe_wrangles`
directly. That manifest supplies the mechanical runtime facts: callable recipe
keys, Python symbols, signature parameters, required/optional status, defaults,
and common-control capabilities. During migration it also exports the current
embedded Python schema docstring so CI can prove that no existing coverage was
lost.

This rule applies whether a recipe wrangle delegates to a lower-level Wrangles
function, implements the behavior directly, composes other wrangles, or calls a
service. A lower-level function is an implementation detail and is never
required for Registry inclusion. Its signature and tests may be used for parity
checks, but the Registry pipeline must not depend on finding one.

Registry Markdown keeps the full parameter records, including descriptions,
roles, accepted-value constraints that cannot be inferred reliably from Python
annotations, and examples. The compiler merges those records with the runtime
manifest, rejects name/required/default drift, and generates the recipe JSON
Schema from the merged result.

The current embedded JSON Schema docstrings in `recipe_wrangles` are migration
input, not a second permanent authoring source. Their complete overview and
parameter coverage must first be migrated into Registry records and verified
by parity tests. They can then be generated as a compatibility view from the
compiled contract, or removed once no supported consumer reads them directly.

The runtime-owned parts of `parameters` are checked automatically against the
manifest. Entries that agree are marked `verified`. The compiled Markdown and
per-entry JSON remain the comprehensive consumption artifacts.

## Source layout

```text
registry/
  index.md
  CONTRACT.md
  schema/
    wrangle-entry.schema.json
  common/
    wrangle-controls.yaml
  runtime/
    wranglespy.json
  reports/
    runtime-reconciliation.json
    runtime-reconciliation.md
  wrangles/
    _root/
      lookup.md
    convert/
      case.md
      data-type.md
  fixtures/
    convert.data_type/
      integer-with-fallback.input.json
      integer-with-fallback.output.json
```

Other namespaces repeat the same pattern. Current root-level recipe keys are
stored under `_root/` with `namespace: null`. This preserves the executable
syntax reported by WranglesPY and avoids inventing the future dotted key before
that migration is implemented. Source paths are descriptive and do not define
identity.

## Naming conventions

Structured field names use `snake_case`, such as `wrangle_key` and
`output_fixture`, because the same names flow through YAML, JSON, Python, and
database projections. Literal recipe keys preserve runtime syntax, such as
`convert.case` and `convert.data_type`.

Human-facing URL and file slugs use `kebab-case`, such as `data-type` and
`uppercase-output`.

One public recipe key maps to one Markdown file. The file path is descriptive
and may move without changing the entry's identity.

Each entry separates identity, executable naming, compatibility, and routing:

- `id` is the immutable database identity once assigned. It does not encode
  taxonomy, syntax, or URL; it may be `null` only during migration.
- `namespace` is the executable prefix, such as `convert` in `convert.case`,
  or `null` for a current root-level key.
- `wrangle_name` is the callable name within that namespace, such as `case`.
- `wrangle_key` is the canonical executable recipe key. It is composed from
  `namespace` and `wrangle_name` for dotted keys and equals `wrangle_name` for
  root-level keys.
- `slug` is the public documentation path below `/wrangles/`. Changing it
  requires a redirect.

`aliases` contains still-supported legacy recipe keys. The first-pass Registry
keeps `classify`, `lookup`, and other ungrouped keys exactly as the current code
exposes them. When the dotted migration is implemented, the new key can become
canonical without changing `id`, and the former key can move to `aliases` for
the documented compatibility period.

Planned canonical naming includes:

| `wrangle_key`       | `namespace` | `wrangle_name` |
| ------------------- | ----------- | -------------- |
| `classify.custom`   | `classify`  | `custom`       |
| `classify.bespoke`  | `classify`  | `bespoke`      |
| `lookup.key`        | `lookup`    | `key`          |
| `lookup.semantic`   | `lookup`    | `semantic`     |

The corresponding `aliases` will be populated from the actual legacy runtime
keys during migration rather than inferred from the new names.

## Entry requirements

Every wrangle entry must declare:

- `schema_version`
- `type: wrangle`, the OKF concept kind
- database `id` (or explicit `null` while pending), executable `namespace`
  (or `null` for a root key), specific `wrangle_name`, callable `wrangle_key`,
  public `slug`, and compatibility `aliases`
- `title` and `description`
- `status` and `visibility`
- `tags`
- a runtime package and Python symbol
- access flags
- supported common-control capabilities
- parameter definitions
- at least one provenance source

Parameter records contain human guidance plus a JSON Schema fragment. Every
runtime-owned parameter fact must reconcile with the pinned manifest and be
traceable to the named runtime symbol.

`runtime_default` means the value used when the argument is omitted. It is not
a playground placeholder. Example or UI starter values belong in examples,
not in `runtime_default`.

Undocumented `**kwargs` are implementation escape hatches and are not public
recipe parameters. A named property in the embedded Python schema docstring is
treated as an existing deliberate promotion and is migrated into the Registry.

## Common controls

The shared `if`, `where`, and `where_params` definitions live in
`common/wrangle-controls.yaml`. Entries opt into them through `capabilities`.
They must not duplicate the common definitions in each wrangle file.

## Examples and verification

Each example has a stable ID, recipe YAML, input fixture, output fixture, and
verification level:

- `static`: syntax, schema, and fixture shape are checked.
- `offline`: the recipe is executed without external services and output is
  compared with the output fixture.
- `live`: a separate controlled job executes an external service.
- `manual`: the example requires a documented human check.

The pilot compiler implements `static` verification. The entries remain
`static` until an automated WranglesPY execution check is added; output
fixtures do not by themselves constitute execution evidence.

Examples must use sanitized, minimal data. Credentials, customer data, and
private model identifiers are prohibited.

## Generated artifacts

The compiler produces:

- first-class Docusaurus pages under `wrangles-docs/registry-docs/`
- an agent-readable bundle under `wrangles-docs/static/registry/`
- public copies of the Registry entry and WranglesPY runtime-manifest schemas
  under `wrangles-docs/static/registry/schema/`
- `manifest.json`, containing lightweight discovery metadata and links
- one comprehensive JSON contract per wrangle under
  `wrangles-docs/static/registry/contracts/`, including all parameters
- raw source Markdown and sanitized example fixtures
- a pilot recipe JSON Schema under
  `wrangles-docs/static/schemas/recipes/pilot/schema.json`
- deterministic JSON and Markdown reconciliation reports under
  `registry/reports/`

Only entries with `visibility: public` may enter public artifacts. Publication
is an allowlisted compiler decision, not a consequence of repository
visibility.

Generated artifacts are deterministic: timestamps, local paths, credentials,
and environment-specific values are excluded. A clean compile followed by
`check:registry` must produce no Git diff.

## Versioning and lifecycle

The pilot Registry version is `0.1.0-pilot`. A production release will contain:

- an immutable Registry version
- the compatible WranglesPY version or version range
- the source commit
- immutable recipe-schema and Registry URLs
- a convenience `latest` alias that is not used for reproducible execution

Wrangles progress through `draft`, `active`, `deprecated`, and `removed`.
Deprecated records stay discoverable and identify their replacement. Removed
records remain in versioned artifacts needed to understand historical recipes.

## Change workflow

A Registry pull request must update the authoritative source, regenerate
artifacts, and pass the Registry checks. Direct edits to generated artifacts or
the database projection are invalid.

The current wiki and database extraction scripts are migration inputs. Once
the cutover is complete, they must not remain ongoing authoring paths.

## Pilot exit criteria

The pilot is complete when:

1. All callable recipe wrangles compile into deterministic Markdown, manifest,
   and recipe-schema artifacts; curated entries are preserved during bootstrap.
2. Invalid frontmatter, duplicate keys, invalid recipes, missing fixtures, and
   stale generated outputs fail CI.
3. The pages build successfully in Docusaurus at stable per-wrangle routes.
4. A pinned WranglesPY contract manifest is reconciled with all existing
   per-wrangle quasi-registry Markdown and the normalized pilot entries. The
   report distinguishes records awaiting normalization from runtime wrangles
   that genuinely lack Markdown, and preserves embedded-schema differences.
5. An offline example runner is designed for the next implementation slice.
