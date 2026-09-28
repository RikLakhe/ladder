# Engineering Constitution — Ladder

> Human-maintained. No frontmatter baseline — update when conventions change, review when onboarding.

## Stack

- Runtime: Node.js ≥ 20
- Language: TypeScript (strict mode — `noImplicitAny: true`, `strictNullChecks: true`)
- Framework: Next.js 15 App Router
- Styling: Tailwind CSS + shadcn/ui
- State: Zustand + localStorage (v1); Supabase / AWS (v2)
- Test runner: Vitest + React Testing Library (unit/component); Playwright (E2E — manual before release PRs)
- Deploy: Vercel (CI/CD from GitHub main + develop branches)

## Conventions

1. **No `any` types anywhere** — NOT: `const x: any = ...` or implicit any via missing types
2. **Store hydration always deferred** — NOT: calling `useStore.persist.rehydrate()` at module level; ONLY call it inside `useEffect` in client components
3. **Static TypeScript content only** — NOT: runtime markdown parsing or CMS calls in v1; all competency content is static TS at `src/content/tracks.ts`
4. **Content access through utilities** — NOT: importing `src/content/tracks.ts` directly in components; always use `src/lib/content.ts` functions
5. **Assessment key format is `{trackId}/{domainId}/{competencyId}`** — NOT: any other delimiter or ordering
6. **Criterion ID format is `{shared|dev|qa|data|ai}/{domainId}/{competencyId}/{level}/{index}`** — NOT: omitting the track prefix or using 1-based index; universal domains use `shared` prefix
7. **`getNextLevel('p7')` returns `null`** — NOT: accessing `LEVELS[6]` or any index beyond P7
8. **Coming-soon domains always render placeholder** — NOT: attempting to iterate over `competencies` on a `comingSoon: true` domain
9. **Commit format: `{type}: {short description}`** where type is `feat|fix|chore|docs|test|refactor` — NOT: free-form commit messages
10. **Squash-merge only** to `develop` and `main` — NOT: regular merge commits on protected branches

## Hard Rules

- Never commit directly to `main` or `develop` — all changes via feature branch PR
- Never force-push any branch
- Never bump `package.json` version manually — only cut release branches and bump there
- Never use Jest — test runner is Vitest + React Testing Library only
- Never parse markdown at runtime in v1 — content is static TypeScript
- Never store `any` — TypeScript strict mode is non-negotiable
- Always use `skipHydration: true` in Zustand persist config — never omit it
- Always use `aria-pressed` on toggle buttons (track/level pickers) for accessibility
- Never access evidence files directly — signed URLs only (v2)
- Never store live client data in test fixtures — always synthetic or masked data

## File Organization

- `src/lib/types.ts` → all TypeScript interfaces and type aliases (`Track`, `Domain`, `Competency`, `LevelDescriptor`, `Criterion`, `AssessmentStore`, `LevelId`, `TrackId`, `SelfRating`, `LEVELS`)
- `src/lib/store.ts` → Zustand assessment store (single store, persist middleware)
- `src/lib/content.ts` → pure content utility functions (no side effects, no store access)
- `src/content/tracks.ts` → static competency data as `tracks: Track[]`
- `src/app/` → Next.js App Router pages (server components by default; `'use client'` only where store access required)
- `src/components/` → shared UI components (`ProgressRing`, `TrackDomainList`, etc.)
- `src/__tests__/` → sanity and cross-cutting tests
- `src/lib/__tests__/` → unit tests for store and content utilities
- `src/app/**/__tests__/` → component/page tests co-located with pages
- `src/components/__tests__/` → component unit tests
- `e2e/` → Playwright end-to-end tests (run manually before release PRs; not in CI)
- `competencies/` → source markdown for competency content (used to author `src/content/tracks.ts`)
- `docs/` → LANE artifacts (specs, tasks, context, ADRs, roadmap)
- `.lane/` → LANE config, templates, assists

## Git Workflow

- Branches: `main` (protected, production), `develop` (integration), `feature/T{n}-{slug}`, `release/v{semver}`, `hotfix/v{semver}`
- Always cut feature branches from `develop`; PR back to `develop`; squash-merge only
- CI runs `npm test` + `npm run build` on every PR to `main` and `develop`
- E2E tests (Playwright) run manually before release PRs; not in CI
- Release process: cut `release/v{semver}` from `develop`, bump version in `package.json`, PR to `main`, tag, GitHub release, sync `develop`

## Release Milestones (v1)

| Milestone | Version | What ships |
|---|---|---|
| M1 — Foundation | v0.1.0 | Repo scaffolded, types, store, all content data, schema tests pass |
| M2 — Navigation Shell | v0.2.0 | Home page, track domain overview, routing |
| M3 — Browse | v0.3.0 | Domain detail, competency detail, all levels browseable |
| M4 — Self-Assessment | v0.4.0 | Criteria checkboxes, self-rating, progress rings, focused view — all wired to store |
| M5 — Polish | v0.5.0 | Coming-soon placeholders, P7 edge case, accessibility pass, Lighthouse ≥ 90 |
| M6 — v1.0 | v1.0.0 | Full v1 stable release, production deploy tagged |
