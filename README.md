# Wrangles Docs

Documentation and Registry compilation for the Wrangles platform. The planned
Registry brings together catalog identities, executable contracts and editorial
content to produce complete, versioned reference material for people and tools.

## Planned Registry design

**Status: design in review.** [Issue #32](https://github.com/wrangleworks/Wrangles-Docs/issues/32)
tracks the redesign. The architecture below describes the intended direction;
it does not indicate that database changes, new APIs or consumer cutover have
been implemented or deployed.

Each fact has one authoring owner. API Core supplies catalog information,
WranglesPY supplies the executable contract, and Docs supplies explanations and
examples. The compiler joins pinned inputs and reports conflicts instead of
silently choosing between competing definitions.

```mermaid
flowchart TB
    subgraph sources[Authoritative sources]
        catalog["API Core catalog<br/>Identities, kinds, names, classifications and bindings"]
        runtime["WranglesPY<br/>Executable contracts and shared controls"]
        editorial["Wrangles Docs<br/>Compact Markdown, guidance and example fixtures"]
    end

    subgraph publication[Public publication pipeline]
        approved["Approved public catalog snapshot"]
        compiler["Registry compiler<br/>Pinned revisions, reconciliation and checksums"]
        bundle["Versioned public Registry artifacts"]
        reference["Grouped reference pages<br/>Parameter tables, metadata and examples"]
        schemas["Recipe schemas and complete machine contracts"]
    end

    subgraph authorized[Authorized model access]
        metadata["Live saved-model metadata<br/>Model access required"]
        preview["Versioned training/reference preview<br/>Content-read permission required"]
    end

    rai["Rai / WranglesAgent<br/>Combines pinned capabilities with authorized model context"]

    catalog -->|Publication allowlist| approved
    approved --> compiler
    runtime -->|Pinned contract export| compiler
    editorial --> compiler
    compiler --> bundle
    bundle --> reference
    bundle --> schemas
    bundle -->|Pinned bundle| rai
    catalog --> metadata
    catalog -->|Derived from exact saved content| preview
    metadata --> rai
    preview --> rai
```

Private model metadata and training/reference previews do not enter the public
compiler inputs or published bundle. Rai combines them with the public Registry
at request time under the caller's authorization.

### Ownership and authoring

| Owner | Authored or generated responsibility |
| --- | --- |
| API Core | Central `catalog_id`, existing model identities, names, catalog tags, normalized classifications, explicit catalog-to-contract bindings, model notes/status, publication policy and access. The shared-catalog proposal adds `kind` and typed relationships here. |
| WranglesPY | One structured executable contract maintained with the implementation: callable keys, parameters, defaults, enums, nested and conditional constraints, supported forwarded arguments, output semantics, runtime prerequisites and shared controls. |
| Wrangles Docs | Small catalog references, capability descriptions, explanatory prose, parameter-help supplements, curated recipes and input/output fixtures. |
| Registry compiler | Reconciled reference pages, recipe schemas, complete machine contracts and discovery artifacts, with source revisions and checksums. These are generated projections, not additional authoring sources. |
| Rai / WranglesAgent | Consumer compatibility and eligibility checks, authorized model selection and explicit execution binding. |

Mechanical signature facts are derived from Python; constraints that signatures
cannot express remain explicit in the structured contract. Python documentation
stays concise and useful to Python callers. Docs imports the contract rather
than maintaining another full parameter schema in Markdown frontmatter.

The contract must cover recipe wrangles, connector read/write/run operations,
the recipe envelope and shared controls. WranglesPY does not depend on Docs to
generate its own contract. Physical contract format and remaining lifecycle
ownership details are design decisions tracked in #32.

### One catalog, explicit kinds and bindings

The API Core `models` table is the complete wrangle identity catalog, including
Stock and Recipe Wrangles. The preferred proposal extends the same identity
namespace to connectors, run capabilities and selected reusable concepts.
Whether this uses the existing table directly or a small catalog core linked
to model-specific data remains open.

- **Catalog identity:** centrally allocate immutable positive 64-bit integer
  `catalog_id` values. Backfill existing entries, never reuse IDs, allow gaps,
  and preserve identities across imports and environments. The proposed wire
  format is a canonical decimal string so JavaScript cannot round a BIGINT.
  Other environments must use the central allocator rather than independent
  overlapping counters.
- **Existing behavior:** retain `models.id`, execution `model_id`, saved recipes
  and legacy APIs. A catalog selection resolves to an explicit callable binding
  and, where applicable, the selected saved-model ID. A generic `.custom`
  wrapper's identity must never become the selected model's ID.
- **Customer terminology:** Type primarily projects database `purpose`
  (Extract, Classify, Map for `schema`, and so on). Variant combines family
  (DIY, Stock, Bespoke) with an applicable AI subtype. Technical implementation
  tags such as `v2`, Registry `kind` and model readiness remain separate.
- **Identity granularity:** the proposal gives a connector family and its
  independently documented read/write/run operations distinct entries, joined
  by a typed relationship such as `belongs_to`. A recipe concept, an executable
  recipe callable and a saved recipe instance are also distinct. Concepts may
  have no execution binding; not every documentation heading needs an identity.
- **Kind-aware compatibility:** backfill verified kinds on existing rows and
  deploy explicit eligibility filters before adding non-model records. Legacy
  model listing, detail, training and execution paths must not treat connectors
  or concepts as trainable saved models, apply model defaults to them or hydrate
  nonexistent content versions. Type/Variant, readiness and training/content
  fields apply only to appropriate kinds; other entries need no invented model
  values.

The proposed typed relationships are authored once in API Core and use catalog
IDs at both ends. Public exports must validate target existence, compatible
versions and publication eligibility without exposing private targets.

### Saved-model previews and version boundaries

API Core derives a small preview from each applicable saved model's original
training/reference content. It includes ordered original column names, up to
five representative rows, the total row count and the exact content version.
Positional rows preserve column order and duplicate names; blanks and value
types must also be preserved.

Generation must be deterministic and bounded, with explicit empty and
unavailable states. Associate the original input with the finalized content
version, refresh on content changes, and resolve latest, production or historic
selection to that exact version. Deletion and permission revocation must also
invalidate access to cached previews. Sampling and payload limits remain part
of the preview contract review.

Preview access requires permission to inspect the underlying content; model
listing alone is insufficient. Keep previews behind a separate authorized API
response and exclude settings, credentials and private routing information.
Reference columns describe the saved model's data, not the customer's recipe
input/output columns.

A preview version is evidence about the displayed content, **not an execution
pin**. Execution-version behavior needs separate verification. Runtime package
versions, Registry releases, contract schema versions, saved-content versions
and implementation tags must remain distinct.

### Generated output and adoption

Preserve the grouped Extract reference with its parameter tables, metadata and
examples. Generate sample tables from curated fixtures. Machine consumers must
receive complete constraints and useful examples; bounded discovery summaries
must not silently replace full contract retrieval.

Adopt the redesign in focused stages:

1. **API Core:** settle entity kinds and storage, validate legacy filters, add
   identity allocation/backfill, normalized projections and versioned previews.
2. **WranglesPY:** introduce the shared executable contract and verify parity
   across wrangles, connectors, run operations and recipe structures.
3. **Docs:** simplify authoring inputs and compile pinned sources into the
   familiar reference and complete consumer artifacts.
4. **WranglesAgent:** introduce versioned readers, explicit catalog bindings
   and authorized previews, with compatibility and permission checks.
5. **Migration and cutover:** validate old recipes, lossless IDs, permission
   isolation, version changes, artifact completeness and rollback. Retain
   compatible readers/bundles during transition; allocated IDs remain stable.

Raw Stock Extract, Recipe Wrangle and current DIY/AI mappings still require
representative sanitized records. The supplied database sample established
Bespoke/Classify with technical `v2` only. The training-finalization integration,
entity taxonomy and physical catalog storage also need review before
implementation. Temporary database transition scripts are not workflow or
authoring authorities.

## Current repository and related work

The existing Registry tooling remains pre-production. See
[registry/README.md](registry/README.md) for current directories and commands,
and [registry/CONTRACT.md](registry/CONTRACT.md) for the current 0.2 contract.
Those documents retain earlier UUID and schema-ownership migration assumptions;
they do not describe the revised ownership proposed above. Updating those
contracts and generators belongs to the implementation stages.

- [#32 - Registry redesign](https://github.com/wrangleworks/Wrangles-Docs/issues/32):
  design decisions, evidence gaps and review.
- [#30 - Content work](https://github.com/wrangleworks/Wrangles-Docs/issues/30):
  remains paused pending design alignment.
- [#31 - Optional guides](https://github.com/wrangleworks/Wrangles-Docs/issues/31):
  future additions that complement the grouped reference.
- [#27 - Production cutover](https://github.com/wrangleworks/Wrangles-Docs/issues/27):
  separate migration and deployment gates.
