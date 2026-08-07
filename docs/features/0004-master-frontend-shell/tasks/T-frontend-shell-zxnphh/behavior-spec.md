# Behavior Spec — T-frontend-shell-zxnphh: Badges list and detail (mock-backed)
> Source: task card ACs + docs/features/0004-master-frontend-shell/tasks/T-frontend-shell-zxnphh/snapshot-TSD.md
> One test at a time. B-1 = tracer bullet. Never write B-N+1 before B-N is GREEN.
> Fill a behavior's Given/When/Then JUST BEFORE you `lane red` it — `lane red` checks
> only the behavior it's about to prove, so later B-N may stay stubs until their turn.
> B-N below seed from the card's drivable ACs (behavior / e2e) — a starting point, not
> final. One AC may be several behaviors (split it); the Critic may surface more (add
> them). B-numbering is the Coordinator's, not fixed by AC count. Invariant /
> non-functional ACs are not RED→GREEN cycles — any are listed in their own section.

## B-1 (tracer bullet): AC-1 [behavior]: Badges page lists badge cards (scope/competency/level filters) with code, name, tier, certifies snippet — from a mock data service.
- Given: `src/lib/mock/badges.ts` exports `getBadges(filters?: { level?: string })` and contains at least two fixtures: `{ id: "demo-p3", competencyId: "demo", level: "P3", badge_code: "DEMO-P3", name: "P3 Demo Badge", tier: "Bronze", certifies: "Demonstrates P3 core skills." }` and `{ id: "demo-p4", competencyId: "demo", level: "P4", badge_code: "DEMO-P4", name: "P4 Demo Badge", tier: "Silver", certifies: "Demonstrates P4 core skills." }`
- When: `BadgesPage` (async server component) rendered with `searchParams={}` AND with `searchParams={{ level: "P3" }}`
- Then: unfiltered — both "DEMO-P3" and "DEMO-P4" visible; `?level=P3` — "DEMO-P3" visible, "DEMO-P4" absent; each card shows badge_code, name, tier, and certifies text

## B-2: AC-2 [behavior]: Opening a badge card shows full detail (certifies, completion bar, verifier/co-signer, evidence refs resolved-or-broken-link, status legend).
- Given:
- When:
- Then:

## B-3: AC-3 [e2e]: Clicking a badge card on the Badges page or a competency's Assessment tab navigates to that badge's detail page.
- Given:
- When:
- Then:

