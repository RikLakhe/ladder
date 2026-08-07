---
approved_by: "unknown"
approved_at: "2026-08-07"
approved_sha256: "189454256b2b72d3d1bf59546913dda7191552ff2473992b9befbbdaf04f2d79"
---
## Verification — T-frontend-shell-gku47o — 2026-08-07
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- Mock service (`src/lib/mock/training.ts`) returns training items by all 5 TSD subtypes (concept_notes, guided_exercise, autonomous_project, onboarding, learning_path) via `getTrainingUnitsForCompetency` / `getTrainingUnitById`; fixtures use `competencyId: "demo"` — mock-only, no DB
- `TrainingUnitView` renders subtype-specific layout: `learning_path` → ordered prereq list with level labels; `guided_exercise` / `autonomous_project` → content + `PrereqStepper`; all others → content text
- `PrereqStepper` flags forward-ref prereqs (`sequenceOrder >= current`) with "⚠ sequencing issue" warning
- `EmptyState` `no-simulated-training` variant renders exact TSD copy
- Detail route (`/competencies/[id]/training/[unitId]/page.tsx`) is a public async server component; mock lookup → `TrainingUnitView`; 404-style fallback for unknown units
- Unit tests (B-1, B-2) cover concept_notes, guided_exercise (valid + forward-ref prereq), learning_path, EmptyState variant — all GREEN
- E2E tests (B-3) cover detail route render for concept_notes — GREEN
- Access: no auth gating on any new route — matches TSD "Public"

⚠️ **Divergent:** deviation + severity
- **[shallow]** Integration test scope narrowed: TSD integration requirement is "Training tab → item detail navigation renders the matching subtype view." The B-3 test exercises the detail route component in isolation, not a full tab-listing → link → route navigation flow. `/competencies/[id]/page.tsx` Training tab still renders `getTrainingForCompetency` summary text, not a list of items with links. End-to-end click-navigation path is untested. Exec-plan scoped B-3 to the detail route only; if that scoping was intentional, this is accepted — owner to confirm.
- **[shallow]** `reference_card` appears in `TrainingUnitType` union but has no TSD basis, no fixture, and no test. The spec lists 5 subtypes; `reference_card` is a 6th that was never spec'd. It renders as plain content (falls through the non-learning_path branch) so no runtime breakage, but it's dead type surface.
- **[shallow]** `onboarding` subtype has a fixture (`tu-on-5`) but no dedicated unit test. It renders as plain content (same branch as concept_notes), so behaviour is correct, but the TSD's "each of the 5 subtypes renders its required fields" unit-test requirement is not met for onboarding.

🚨 **Suspected hallucination:** flag for human
- None.

❌ **Missing:** acceptance criteria not addressed
- None beyond the divergences noted above.

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: concept_notes renders content; no PrereqStepper | ✅ | ✅ | ✅ | ✅ | ✅ |
| B-2: guided_exercise/learning_path/EmptyState variant | ✅ | ✅ | ✅ | ✅ | ✅ |
| B-3: training detail route renders correct unit view | ✅ | ✅ | ✅ | ✅ | ✅ |

**Critic checklist:**
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts (inline fixture objects used; no spy/mock of collaborators)
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness)
- [x] Boundary contract asserted richly (args/content), not bare "was called" (text content + testid presence/absence)
- [x] ≥1 `e2e` AC present and GREEN (`training-nav.e2e.test.tsx` + `training-detail.test.tsx` both GREEN)
- [x] Boundaries non-empty ⇒ a smoke AC exists — N/A (no external boundaries; mock-only)

**Human verdict:** each item confirmed/dismissed — signed by __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
