---
approved_by: "Rikesh"
approved_at: "2026-08-11"
approved_sha256: "db52eb3da74847b7483346e4c50bc3c19c7460215314716294711e2757e16868"
---
## Verification — Task T-training-viewer-b6oxqw — 2026-08-11
> Critic anchored to TSD (external spec), NOT to the code. ★GATE: owner confirms/dismisses every flag.

✅ **Conformant:** items matching spec
- `GET /competencies/[id]/training?level=X` page created at `src/app/competencies/[id]/training/page.tsx` — Server Component, no auth, public.
- Data fetched via `getTrainingUnitsForCompetencyAndLevel` (lib function) called directly in Server Component — equivalent to "reuses the API data layer" per exec-plan resolution.
- Units rendered in fixed type order (concept_notes → guided_exercise → autonomous_project → onboarding → reference_card) then `sequence_order` — implemented in `TrainingListView`.
- `<PrereqStepper>` rendered for `guided_exercise` and `autonomous_project` rows with `prereqIds.length > 0` — uses existing component, not re-defined.
- Forward-prereq units with `hasSequencingIssue: true` render "⚠ sequencing issue" warning — not a crash, not silent.
- P6/P7 with no guided_exercise/autonomous_project rows → `<EmptyState variant="no-simulated-training">` rendered — exact copy delegated to EmptyState component (variant already tested in prior tasks).
- P6/P7 with rows present → EmptyState absent — confirmed by unit test.
- `<PrereqStepper>` defined exactly once (pre-existing in `src/components/PrereqStepper.tsx`) — invariant assertion in B-1 test file.
- No session/auth check on the page.

⚠️ **Divergent:** deviation + severity
- **Shallow:** `unitsById` Map declared at line 29 of `TrainingListView.tsx` but never read — dead code. `prereqUnits` lookup uses `units.find()` inline instead. No behavior impact, but indicates a refactor pass was skipped. Severity: shallow.
- **Shallow:** TSD says "Reuses `GET /api/competencies/:competencyId/training?level=X`" — implementation calls lib function directly (Server Component pattern), not the HTTP endpoint. Exec-plan resolves this as equivalent. Severity: shallow (resolved by exec-plan).
- **Shallow:** `showStepper` condition: if a prereq ID resolves to a unit not in the current level's result set (cross-level prereq), `prereqUnits.length` would be 0 despite `prereqIds` being non-empty, hiding the stepper silently. TSD says forward-prereq → warning rendered, not silent. However, `hasSequencingIssue` on the unit row would still show "⚠ sequencing issue" — so the warning is NOT silent, just the stepper is absent. Severity: shallow — warning path still covered.

🚨 **Suspected hallucination:** flag for human (false positives expected — do NOT reject PR on this alone)
- None.

❌ **Missing:** acceptance criteria not addressed
- None — all ACs addressed.

**TDD cycle log:**
| Behavior | RED ✅ | GREEN ✅ | Test = behavior not impl | Public interface only | Mocks @ boundary only |
|----------|--------|---------|--------------------------|----------------------|----------------------|
| B-1: TrainingListView type ordering, EmptyState, sequencing warning | ✅ | ✅ | ✅ | ✅ | ✅ (no DB) |
| B-2: PrereqStepper step position | regression guard (pre-existing) | regression guard | ✅ | ✅ | ✅ |
| B-5: e2e full page via seeded DB | ✅ | ✅ | ✅ | ✅ | ✅ (real DB, no mocks) |

**Critic checklist:**
- [x] Mocks only at boundaries — no asserts on internal collaborators / call-counts
- [x] Each AC verified per its tag (behavior→interface · invariant→property · non-functional→harness)
- [x] Boundary contract asserted richly (args/content), not bare "was called"
- [x] ≥1 `e2e` AC present and GREEN (reachable through the running system) — B-5 e2e passes
- [x] Boundaries non-empty ⇒ a smoke AC exists (real boundary, staging) — TSD says boundaries: none; N/A

**Human verdict:** each item confirmed/dismissed — signed by __ (Path R: + SA)
**Outcome:** clean → merge | divergence → Amendment (.lane/templates/AMENDMENT.md) → re-spec → re-run
