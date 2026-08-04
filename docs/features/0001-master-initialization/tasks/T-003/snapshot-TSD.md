## TSD S-0001.03 — Seed data for local development (PRD §S-0001.03)
| Aspect | Spec |
|--------|------|
| Interfaces | A single seed operation, invoked with no runtime arguments, run against an already-migrated database. |
| Data / State | Populates: one competency and its primary functions; at least one standard per applicable level; at least one badge whose evidence reference resolves to a real row in a real instrument; at least one training-unit sequence whose prerequisites only ever point to earlier-sequenced units. Includes at minimum one primary-function/level pair with no standard row (an inapplicable-at-level gap) and one competency/level with no guided-exercise or autonomous-project training units (the P6/P7 gap). |
| Behavior | After running against a freshly migrated, empty database, querying the seeded competency returns matching rows across every table from S-0001.01; the seeded badge's evidence reference resolves to real instrument row content; the seeded training sequence's prerequisites all point backward; the two intentional gap cases are present and queryable. |
| Access | Development/test tooling only — not reachable through any application-facing route or by an unauthenticated/non-admin caller. |
| Boundaries | The database service (external) — seeding requires a live connection to a migrated instance. |
| Tests | Integration: run the seed operation against a fresh migrated database, then assert row presence and shape for the full vertical slice and both intentional gap cases. Smoke: fresh database → migrate → seed → one manual read of the seeded competency, end to end. |
