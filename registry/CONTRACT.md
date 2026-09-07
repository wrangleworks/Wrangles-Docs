# Wrangles Registry Contract

Status: pre-production

Contract version: 0.2

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
| Recipe Writer eligibility and exclusion reason          | Registry Markdown                   |
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

During the initial migration, conflicting or incomplete source content is
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
presentation groups, accepted-value constraints that cannot be inferred
reliably from Python annotations, and examples. The compiler merges those
records with the runtime manifest, rejects name/required/default drift, and
generates the recipe JSON Schema from the merged result.

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

`aliases` contains still-supported legacy recipe keys. The initial Registry
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
- an explicit `recipe_writer.eligible` decision; ineligible entries also
  require a concise `recipe_writer.reason`
- `tags`
- a runtime package and Python symbol
- access flags
- supported common-control capabilities
- parameter definitions
- at least one provenance source

Parameter records contain human guidance plus a JSON Schema fragment. Every
runtime-owned parameter fact must reconcile with the pinned manifest and be
traceable to the named runtime symbol.

Parameters whose values directly identify dataframe columns may also declare
optional `column_semantics`. Its `role` is `reference` when the value selects a
column that must exist before the step and `destination` when the value names a
column where the step writes results. Its `cardinality` is `scalar`, `list`, or
`scalar_or_list`, matching the accepted JSON Schema shape; nullability remains
part of the parameter's `schema` and does not change cardinality. The compiler
copies this object into each per-wrangle contract and emits it as the
`x-wrangles-column` annotation on the corresponding generated recipe-schema
property.

Column semantics are valid only when every non-null value shape exposes column
identifiers directly: a scalar is a string or integer, and a list is an array
whose `items` schema accepts only strings or integers. Unconstrained arrays,
nested arrays, objects, mappings, and `$ref`/`allOf` shapes are not annotated.
Those forms require a future locator vocabulary that can say where within the
value the column identifier appears (for example, in a mapping key).

This metadata describes column-name syntax, not dataframe state transitions. A
destination may create, overwrite, or conditionally reuse a column. The current
Registry has no validated effect vocabulary for add, rename, or remove, so
consumers must not infer those effects from `role` or parameter names.

Every parameter also declares one `param_group` from a small shared vocabulary:

- `I/O` identifies input and output columns or structures.
- `Options` contains wrangle-specific settings users need to achieve the
  desired behavior.
- `Formatting` controls the shape or presentation of results.
- `Conditions` contains the shared `if`, `where`, and `where_params` controls.
- `Execution` controls batching, concurrency, time limits, and nested execution.
- `Errors` controls fallbacks, retries, and failure handling.
- `Details` contains model, provider, connection, credential, cache, and other
  supporting technical settings.

The groups are intentionally fixed rather than specialized by wrangle. They
organize the human documentation and remain available to agent and product
consumers in the compiled JSON contracts.

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

## Recipe Writer eligibility

Recipe Writer discovery is a consumer-specific, fail-closed Registry view.
Every entry must declare `recipe_writer.eligible`; omission is invalid rather
than an implicit opt-in. Eligible entries must be public, active, and reconciled
to a verified runtime contract. Ineligible entries must state a concise reason,
and that reason is emitted in the manifest and compiled contract so clients do
not need an Agent-owned exception list.

The initial view preserves the existing 88-key Recipe Writer baseline. The
compiler verifies both the count and a checksum of the sorted eligible keys, so
changing which wrangles are available requires an explicit reviewed update.
This initial schema is stock-only: it omits the full recipe schema's permissive
`custom.*` and `pandas.*` extension patterns. An extension wrangle therefore
cannot enter Recipe Writer merely because its name matches a broad pattern; it
needs a future explicit Registry-backed eligibility contract.

## Examples and verification

Each example has a stable ID, recipe YAML, input fixture, output fixture, and
verification level:

- `static`: syntax, schema, and fixture shape are checked.
- `offline`: the recipe is executed without external services and output is
  compared with the output fixture.
- `live`: a separate controlled job executes an external service.
- `manual`: the example requires a documented human check.

The compiler currently implements `static` verification. The entries remain
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
- a JSON Schema for those compiled contracts under
  `wrangles-docs/static/registry/schema/wrangle-contract.schema.json`
- raw source Markdown and sanitized example fixtures
- a pre-production recipe JSON Schema under
  `wrangles-docs/static/schemas/recipes/registry/schema.json`
- a Recipe Writer-specific schema containing only explicitly eligible entries
  under `wrangles-docs/static/schemas/recipes/registry/recipe-writer.schema.json`
- a compact runtime-reconciliation summary under
  `wrangles-docs/static/registry/runtime/reconciliation.json`
- deterministic JSON and Markdown reconciliation reports under
  `registry/reports/`

Only entries with `visibility: public` may enter public artifacts. Publication
is an allowlisted compiler decision, not a consequence of repository
visibility.

Generated artifacts are deterministic: timestamps, local paths, credentials,
and environment-specific values are excluded. A clean compile followed by
`check:registry` must produce no Git diff.

The manifest records SHA-256 for every machine-facing bundle member and a
bundle checksum. Bundle members are ordered by their public path and framed as
the UTF-8 path, a NUL byte, the exact generated UTF-8 content, and a final NUL
byte. `manifest.json` is deliberately excluded from the bundle digest because
it contains the digest; a deployment can pin the manifest itself by source
commit or an external lock-file checksum without circular hashing.

The Recipe Writer eligible-key checksum uses the framing named by
`recipe_writer.eligible_keys_framing`: sorted keys encoded as UTF-8, each
terminated by one newline (`utf8-newline-separated-sorted-v1`).

## Versioning and lifecycle

The pre-production Registry version is `0.2.1`. Version `0.2.0` makes the
fail-closed Recipe Writer eligibility decision required for every entry and
adds the compiled-contract and integrity metadata consumed by Registry clients.
Version `0.2.1` introduces optional column-role and cardinality metadata plus
explicit direct-item schemas for its representative list parameters, while
retaining the `0.2` entry schema compatibility series.
A production release will
contain:

- an immutable Registry version
- the compatible WranglesPY version or version range
- the source commit
- immutable recipe-schema and Registry URLs
- a convenience `latest` alias that is not used for reproducible execution

The current runtime manifest records both the exact WranglesPY package version
and the pinned source revision used for reconciliation. The public manifest
exposes that evidence plus an exact compatible-version specifier so consumers
can fail closed before loading an incompatible runtime.

Wrangles progress through `draft`, `active`, `deprecated`, and `removed`.
Deprecated records stay discoverable and must identify their canonical
replacement with `replaced_by`. The compiler rejects a missing, self-referential,
or unknown replacement key and generates a visible migration notice in the
human documentation. Deprecated entries sort after active entries within their
documentation group. Removed records remain in versioned artifacts needed to
understand historical recipes.

## Change workflow

A Registry pull request must update the authoritative source, regenerate
artifacts, and pass the Registry checks. Direct edits to generated artifacts or
the database projection are invalid.

The current wiki and database extraction scripts are migration inputs. Once
the cutover is complete, they must not remain ongoing authoring paths.

## Production readiness

The contract remains `pre-production`. The detailed migration sequence is in
[README.md](README.md#migration-plan), and production requires all of the
following outcomes:

1. Every callable recipe wrangle and public parameter reconciles with a pinned
   WranglesPY runtime manifest, with no unexplained key, required-state,
   default, common-control, or accepted-value conflicts.
2. Registry records contain reviewed descriptions, constraints, examples,
   access and lifecycle metadata, provenance, and canonical database UUIDs.
3. The entry schema, compiled contract, recipe-schema URLs, compatibility
   policy, and change-management rules are stable and versioned.
4. Recipe JSON Schema and any temporary WranglesPY `_schema` compatibility view
   are generated from the Registry and protected by deterministic parity checks.
5. WranglesXL, VS Code, APIs, the docs site, and Recipe Writer clients consume
   the Registry-generated contracts instead of hand-maintained schema copies.
6. Hand-maintained `_schema` docstrings have been removed, or only a generated
   compatibility view remains for explicitly supported legacy readers.
7. Local examples have offline execution verification, and service-backed
   examples have controlled live verification.
8. Invalid source, duplicate keys, invalid recipes, missing fixtures, runtime
   drift, and stale generated outputs fail CI.
9. Registry pages build at stable routes, and immutable public artifacts have
   been deployed and verified at canonical URLs.
10. Ownership, release, rollback, and deprecation procedures are documented;
    the first production Registry version is tagged before this status changes
    to `production`.
