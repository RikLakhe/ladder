# Ladder v1 — TDD Implementation Plan

**Date:** 2026-09-26
**Status:** active
**Owner:** Rikesh Shrestha

---

## Git Workflow Standing Rules

See `docs/CONTRIBUTING.md` — rules are binding and apply to every task.

Summary:
- Branches: `main` (protected), `develop` (integration), `feature/T{n}-{slug}`, `release/v{semver}`, `hotfix/v{semver}`
- Always cut feature branches from `develop`. PR back to `develop`. Squash-merge only.
- Never commit directly to `main` or `develop`. Never force-push. Never skip milestones. Never bump version manually.
- Commit format: `{type}: {short description}` where type is `feat|fix|chore|docs|test|refactor`
- CI runs `npm test` + `npm run build` on every PR to `main` and `develop`

---

## Release Milestones

| Milestone | Version | Tasks | What ships |
|---|---|---|---|
| M1 — Foundation | v0.1.0 | T1–T3 | Repo scaffolded, types defined, all content data in TypeScript, schema tests pass |
| M2 — Navigation Shell | v0.2.0 | T4–T5 | Home page (track + level picker), track domain overview page, routing works |
| M3 — Browse | v0.3.0 | T6–T7 | Domain detail page, competency detail page, all levels browseable |
| M4 — Self-Assessment | v0.4.0 | T8–T9 | Criteria checkboxes, self-rating, progress rings, focused view toggle — all wired to Zustand store |
| M5 — Polish | v0.5.0 | T10 | Coming-soon placeholders, P7 edge case, accessibility pass, Lighthouse ≥ 90 |
| M6 — v1.0 | v1.0.0 | all | Full v1 stable release, production deploy tagged |

---

## Global Constraints

1. TypeScript strict mode — `noImplicitAny: true`, `strictNullChecks: true`
2. No `any` types anywhere in the codebase
3. All unit/component tests use Vitest + React Testing Library — never Jest
4. Store hydration: always `skipHydration: true` in persist config; always call `useStore.persist.rehydrate()` inside a `useEffect` in client components — never call it at module level
5. Criterion ID format: `{shared|dev|qa|data|ai}/{domainId}/{competencyId}/{level}/{index}` — 0-indexed. Universal domain criteria use `shared` prefix.
6. Assessment key format (Zustand store key): `{trackId}/{domainId}/{competencyId}`
7. `getNextLevel('p7')` must return `null` — never attempt to access a level beyond P7
8. Coming-soon domains: `comingSoon: true`, `competencies: []` — render a placeholder, never attempt to render criteria
9. All content is static TypeScript at build time — no runtime markdown parsing in v1
10. E2E tests (Playwright) run manually before release PRs; not in CI due to install overhead

---

## TypeScript Interfaces (`src/lib/types.ts`)

```typescript
export type LevelId = 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7'
export type TrackId = 'dev' | 'qa' | 'data' | 'ai'
export type SelfRating = 'developing' | 'meeting' | 'exceeding'

export interface Criterion { id: string; text: string }
export interface LevelDescriptor { level: LevelId; descriptor: string; criteria: Criterion[] }
export interface Competency { id: string; name: string; description: string; levels: LevelDescriptor[] }
export interface Domain { id: string; name: string; description: string; comingSoon: boolean; competencies: Competency[] }
export interface Track { id: TrackId; name: string; description: string; domains: Domain[] }

export interface CompetencyAssessment {
  selfRating?: SelfRating
  criteriaChecked: string[]
  updatedAt: string
}

export interface AssessmentStore {
  currentTrack: TrackId
  currentLevel: LevelId
  focusedView: boolean
  assessments: Record<string, CompetencyAssessment>
  setTrack: (track: TrackId) => void
  setLevel: (level: LevelId) => void
  toggleFocusedView: () => void
  setRating: (key: string, rating: SelfRating) => void
  toggleCriterion: (key: string, criterionId: string) => void
}

export const LEVELS: LevelId[] = ['p2', 'p3', 'p4', 'p5', 'p6', 'p7']
```

---

## Zustand Store (`src/lib/store.ts`)

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AssessmentStore, TrackId, LevelId, SelfRating } from './types'

export const useStore = create<AssessmentStore>()(
  persist(
    (set) => ({
      currentTrack: 'dev',
      currentLevel: 'p3',
      focusedView: false,
      assessments: {},
      setTrack: (track) => set({ currentTrack: track }),
      setLevel: (level) => set({ currentLevel: level }),
      toggleFocusedView: () => set((s) => ({ focusedView: !s.focusedView })),
      setRating: (key, rating) =>
        set((s) => ({
          assessments: {
            ...s.assessments,
            [key]: {
              ...s.assessments[key],
              selfRating: rating,
              criteriaChecked: s.assessments[key]?.criteriaChecked ?? [],
              updatedAt: new Date().toISOString(),
            },
          },
        })),
      toggleCriterion: (key, criterionId) =>
        set((s) => {
          const existing = s.assessments[key]?.criteriaChecked ?? []
          const criteriaChecked = existing.includes(criterionId)
            ? existing.filter((id) => id !== criterionId)
            : [...existing, criterionId]
          return {
            assessments: {
              ...s.assessments,
              [key]: {
                ...s.assessments[key],
                criteriaChecked,
                updatedAt: new Date().toISOString(),
              },
            },
          }
        }),
    }),
    { name: 'ladder-store', skipHydration: true }
  )
)
```

---

## Content Utility Functions (`src/lib/content.ts`)

```typescript
import { tracks } from '@/content/tracks'
import { TrackId, LevelId, Competency, LEVELS } from './types'

export function getTracks() { return tracks }
export function getTrack(id: TrackId) { return tracks.find(t => t.id === id) ?? null }
export function getDomain(trackId: TrackId, domainId: string) {
  return getTrack(trackId)?.domains.find(d => d.id === domainId) ?? null
}
export function getCompetency(trackId: TrackId, domainId: string, competencyId: string) {
  return getDomain(trackId, domainId)?.competencies.find(c => c.id === competencyId) ?? null
}
export function getNextLevel(level: LevelId): LevelId | null {
  const idx = LEVELS.indexOf(level)
  return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null
}
export function computeProgress(competency: Competency, level: LevelId, checkedIds: string[]): number {
  const ld = competency.levels.find(l => l.level === level)
  if (!ld || ld.criteria.length === 0) return 0
  const checked = ld.criteria.filter(c => checkedIds.includes(c.id)).length
  return Math.round((checked / ld.criteria.length) * 100)
}
```

---

## Content Data Reference (`src/content/tracks.ts`)

The file exports `tracks: Track[]` with 4 tracks: `dev`, `qa`, `data`, `ai`.

### Criterion ID format

`{shared|dev|qa|data|ai}/{domainId}/{competencyId}/{level}/{index}`

- Universal domain criteria use `shared` prefix: `shared/leadership/decision-making/p3/0`
- Dev technical skill criteria use `dev` prefix: `dev/technical-skill/writing-code/p3/0`
- Index is 0-based

### Track structure

- **dev**: domains `delivery`, `leadership`, `fcc`, `strategic-impact`, `technical-skill` — all `comingSoon: false`
- **qa**: domains `delivery`, `leadership`, `fcc`, `strategic-impact` (`comingSoon: false`, same competency content as dev) + `technical-skill` (`comingSoon: true`, `competencies: []`)
- **data**: same pattern as qa
- **ai**: same pattern as qa

### Domain: `delivery` (domain id: `delivery`)

**planning-estimation** (id: `planning-estimation`, name: "Planning & Estimation"):
- P2: "Estimates own tasks with guidance; flags risks early." Criteria: ["Estimates their own tasks with guidance", "Flags risks early when they emerge"]
- P3: "Estimates own tasks unaided; breaks down work; flags dependencies." Criteria: ["Estimates their own tasks unaided", "Breaks work into smaller deliverable chunks", "Flags dependencies before they become blockers"]
- P4: "Estimates feature-level work; manages scope; communicates delays proactively." Criteria: ["Estimates feature-level work accurately", "Manages scope to protect commitments", "Communicates delays proactively"]
- P5: "Plans team-level delivery; identifies systemic estimation problems." Criteria: ["Plans delivery across the team", "Identifies systemic estimation problems and proposes fixes"]
- P6: "Plans across teams; maintains delivery predictability across engagements." Criteria: ["Plans delivery across multiple teams", "Maintains delivery predictability across client engagements"]
- P7: "Sets org-wide delivery planning standards." Criteria: ["Sets organisation-wide delivery planning standards"]

**execution-delivery** (id: `execution-delivery`, name: "Execution & Delivery"):
- P2: "Completes assigned tasks; asks for help when stuck." Criteria: ["Completes assigned tasks within agreed timelines", "Asks for help when stuck rather than going silent"]
- P3: "Delivers features end-to-end; unblocks self; manages client handoffs." Criteria: ["Delivers features end-to-end", "Unblocks themselves when possible", "Manages handoffs to client teams"]
- P4: "Delivers features on time across tech and client complexity." Criteria: ["Delivers features on time despite technical and client complexity", "Manages multiple workstreams simultaneously"]
- P5: "Ensures team delivers reliably; removes systemic blockers." Criteria: ["Ensures the team delivers reliably", "Removes systemic blockers affecting team delivery"]
- P6: "Ensures multiple teams deliver reliably." Criteria: ["Ensures multiple teams deliver reliably across client engagements"]
- P7: "Sets org delivery standards; drives organisation-wide reliability." Criteria: ["Sets organisation-wide delivery standards", "Drives organisation-wide delivery reliability"]

### Domain: `leadership` (domain id: `leadership`)

**decision-making** (id: `decision-making`, name: "Decision Making"):
- P2: "Recognises decisions involve tradeoffs and uncertainty; seeks guidance before acting." Criteria: ["Explains one cognitive bias that could affect a decision before making it", "Names who is accountable for a decision before acting on it"]
- P3: "Makes decisions for own tasks with awareness of bias and accountability." Criteria: ["Reflects on own cognitive bias when making a decision", "Holds themselves accountable for outcomes of decisions they make"]
- P4: "Reliably makes decisions with bias awareness and clear accountability." Criteria: ["Reliably reflects on own cognitive bias when making a decision", "Reliably holds themselves and teammates accountable for decision outcomes"]
- P5: "Raises bias awareness in team decisions; takes ownership of team-level decision outcomes." Criteria: ["Raises awareness of cognitive bias during team decision-making", "Takes ownership of team-level decision outcomes"]
- P6: "Owns cross-team decision outcomes and ensures accountability across those teams." Criteria: ["Owns cross-team decision outcomes", "Ensures accountability for decisions across multiple teams"]
- P7: "Owns org-wide decisions and drives accountability culture across the organisation." Criteria: ["Owns organisation-wide decision outcomes", "Drives a culture of accountability for decisions across the organisation"]

**driving-alignment** (id: `driving-alignment`, name: "Driving Alignment"):
- P2: "Contributes to strategy conversations when invited." Criteria: ["Contributes meaningfully to team strategy conversations when invited"]
- P3: "Initiates strategy conversations to align team direction." Criteria: ["Initiates strategy conversations to align team direction"]
- P4: "Runs strategy conversations that keep team aligned; ensures goal work is continuous." Criteria: ["Runs strategy conversations that keep team goals aligned", "Ensures goal-related work is continuous, not just at planning time"]
- P5: "Fosters a culture of alignment on their team." Criteria: ["Fosters a culture of alignment within their team", "Ensures team members understand and work toward shared goals"]
- P6: "Fosters alignment culture across teams; ensures several teams work toward shared goals." Criteria: ["Fosters a culture of alignment across multiple teams", "Ensures several teams work toward shared organisational goals"]
- P7: "Fosters org-wide alignment culture; ensures all teams understand and pursue org goals." Criteria: ["Fosters an organisation-wide culture of alignment", "Ensures all teams understand and pursue organisational goals"]

**process-thinking** (id: `process-thinking`, name: "Process Thinking"):
- P2: "Can explain team practices." Criteria: ["Explains the purpose of existing team practices and processes"]
- P3: "Sometimes discusses process improvements." Criteria: ["Sometimes raises opportunities for improving team processes"]
- P4: "Regularly discusses and contributes to process improvements." Criteria: ["Regularly raises and contributes to team process improvement discussions"]
- P5: "Collaborates beyond team on process; navigates client constraints." Criteria: ["Collaborates beyond the team on process improvements", "Navigates client-imposed process constraints without treating them as blockers"]
- P6: "Drives cross-team process improvements; maintains engineering standards across client engagements." Criteria: ["Drives process improvements across multiple teams", "Maintains engineering standards across client engagements"]
- P7: "Owns org practices; sets standards that survive enterprise scrutiny." Criteria: ["Owns organisation-wide engineering practices", "Sets process standards that survive enterprise-level scrutiny"]

**facilitation** (id: `facilitation`, name: "Facilitation"):
- P2: "Participates in facilitated discussions." Criteria: ["Participates constructively in team discussions facilitated by others"]
- P3: "Facilitates small team discussions with support." Criteria: ["Facilitates small team discussions with support from a more senior engineer"]
- P4: "Facilitates team discussions and client stakeholder discussions." Criteria: ["Facilitates team discussions to reach clear outcomes", "Facilitates client stakeholder discussions effectively"]
- P5: "Facilitates a wider range of team and client stakeholder discussions." Criteria: ["Facilitates a wider range of team and stakeholder discussions", "Guides discussions toward decisions with stakeholder buy-in"]
- P6: "Facilitates cross-team discussions; guides toward decisions with buy-in; navigates LFT–client authority dynamics." Criteria: ["Facilitates cross-team discussions to reach clear decisions", "Guides stakeholders toward decisions with genuine buy-in", "Navigates LFT–client authority dynamics during facilitation"]
- P7: "Facilitates org-wide and cross-account discussions." Criteria: ["Facilitates organisation-wide discussions", "Facilitates discussions spanning multiple client accounts"]

**mentoring** (id: `mentoring`, name: "Mentoring"):
- P2: "Seeks mentorship actively." Criteria: ["Actively seeks mentorship from more senior engineers"]
- P3: "Mentors teammates sometimes." Criteria: ["Mentors teammates on technical or process topics sometimes"]
- P4: "Mentors reliably; builds redundancy; accelerates client onboarding." Criteria: ["Reliably mentors teammates", "Builds redundancy by sharing knowledge to reduce single-person dependencies", "Accelerates client team onboarding through targeted mentoring"]
- P5: "Mentors across teams; sustains mentoring under utilisation pressure." Criteria: ["Mentors engineers across multiple teams", "Sustains mentoring commitments under utilisation pressure"]
- P6: "Mentors across teams; fosters mentoring culture." Criteria: ["Mentors engineers across multiple teams", "Fosters a culture of mentoring within and between teams"]
- P7: "Mentors org-wide; fosters org culture; develops other mentors." Criteria: ["Mentors engineers organisation-wide", "Fosters an organisation-wide mentoring culture", "Actively develops other engineers into mentors"]

### Domain: `fcc` (domain id: `fcc`)

**feedback** (id: `feedback`, name: "Feedback"):
- P2: "Explains feedback principles; actively seeks feedback." Criteria: ["Explains what makes feedback useful and actionable", "Actively seeks feedback on their own work"]
- P3: "Delivers feedback to teammates and manager." Criteria: ["Delivers useful feedback to teammates", "Delivers feedback to their manager"]
- P4: "Delivers feedback to stakeholders; reconciles matrixed feedback." Criteria: ["Delivers feedback to project stakeholders", "Reconciles feedback from multiple reporting lines in matrixed engagements"]
- P5: "Fosters feedback culture; coaches on matrixed feedback routing." Criteria: ["Fosters a feedback culture within their team", "Coaches teammates on navigating matrixed feedback routing"]
- P6: "Fosters feedback culture across teams." Criteria: ["Fosters a culture of useful feedback across multiple teams"]
- P7: "Fosters feedback culture org-wide." Criteria: ["Fosters an organisation-wide culture of high-quality feedback"]

**communication** (id: `communication`, name: "Communication"):
- P2: "Communicates clearly; shares knowledge; works async across timezones." Criteria: ["Communicates status and blockers clearly", "Shares knowledge proactively", "Works effectively async across timezones"]
- P3: "Communicates on technical and non-technical topics; contributes docs; handles routine client comms." Criteria: ["Communicates clearly on both technical and non-technical topics", "Contributes to team documentation", "Handles routine client communications competently"]
- P4: "Maintains consistent communication patterns; encourages docs; manages client expectations; adapts to distributed teams." Criteria: ["Maintains consistent communication norms on their team", "Encourages documentation practices", "Manages client expectations proactively", "Adapts communication style to distributed team structures"]
- P5: "Fosters comms culture; sets client-facing norms; designs cross-timezone communication norms." Criteria: ["Fosters a strong communication culture on their team", "Sets client-facing communication norms", "Designs cross-timezone communication norms for the team"]
- P6: "Fosters communication culture across teams." Criteria: ["Fosters strong communication culture across multiple teams"]
- P7: "Fosters communication culture org-wide." Criteria: ["Fosters an organisation-wide culture of clear, effective communication"]

**collaboration** (id: `collaboration`, name: "Collaboration"):
- P2: "Helps when requested; shares credit; builds relationships; handles disagreement; open to perspective change." Criteria: ["Helps teammates when requested", "Shares credit for team achievements", "Builds working relationships within the team", "Handles disagreement constructively", "Remains open to changing their position when presented with new information"]
- P3: "Helps with obstacles; responds reliably; builds broader relationships; handles disagreement non-defensively; adapts to client team structures." Criteria: ["Helps teammates navigate obstacles proactively", "Responds reliably when teammates need support", "Builds relationships beyond immediate team", "Handles disagreement non-defensively", "Adapts to client team structures and norms"]
- P4: "Sometimes helps proactively; builds stakeholder relationships; encourages opinion-sharing; works as embedded client peer; maintains engagement-boundary discipline." Criteria: ["Proactively helps teammates without waiting to be asked", "Builds working relationships with project stakeholders", "Encourages teammates to share opinions", "Works effectively as an embedded peer in client teams", "Maintains engagement-boundary discipline"]
- P5: "Consistently helps; leverages relationships for team benefit; fosters healthy disagreement culture; coaches on client collaboration." Criteria: ["Consistently helps teammates without being asked", "Leverages relationships to benefit the team", "Fosters a culture of healthy disagreement", "Coaches teammates on effective client collaboration"]
- P6: "Helps across teams; ensures credit sharing; works through disagreements; sets cross-team client-boundary norms." Criteria: ["Helps engineers across multiple teams", "Ensures credit is shared appropriately across teams", "Works through disagreements at the cross-team level", "Sets cross-team client-boundary norms"]
- P7: "Org-wide mutual support; org-wide relationships; integrates disagreeing perspectives." Criteria: ["Fosters mutual support across the organisation", "Maintains relationships across the organisation", "Integrates disagreeing perspectives into coherent org-level decisions"]

### Domain: `strategic-impact` (domain id: `strategic-impact`)

**business-acumen-strategy** (id: `business-acumen-strategy`, name: "Business Acumen & Strategy"):
- P2: "Describes how their domain fits the client product; explains what the client's product does." Criteria: ["Describes how their technical domain fits the client's product", "Explains what the client's product does and who uses it"]
- P3: "Explains how their domain connects to client strategy; understands org engineering strategy; understands T&M vs fixed-bid." Criteria: ["Explains how their domain connects to client business strategy", "Understands LFT's organisation engineering strategy", "Explains the difference between T&M and fixed-bid engagement models"]
- P4: "Applies domain understanding to decisions; participates in strategy discussions; explains business model; gives roadmap feedback; simplifies design; spots expansion opportunities." Criteria: ["Applies domain understanding when making technical decisions", "Participates in team strategy discussions", "Explains the client's business model", "Gives useful feedback on client product roadmaps", "Simplifies solution design to reduce cost or risk", "Spots opportunities for scope or account expansion"]
- P5: "Connects domain and market trends to decisions; decides team work based on org strategy; contributes to org strategy; evaluates product features as trusted advisor; identifies account-growth opportunities." Criteria: ["Connects domain knowledge and market trends to technical decisions", "Decides team work direction based on organisational strategy", "Contributes to organisational strategy discussions", "Evaluates client product features as a trusted advisor", "Identifies account-growth opportunities for LFT"]
- P6: "Cross-team/cross-account domain understanding; leads cross-team strategic efforts; shapes account growth plans." Criteria: ["Applies cross-team and cross-account domain understanding to decisions", "Leads cross-team strategic efforts", "Shapes account growth plans for multiple clients"]
- P7: "Org-wide domain understanding informs org decisions; leads org strategy; influences org alignment; redefines org roadmaps; influences portfolio of client accounts." Criteria: ["Applies org-wide domain understanding to organisation-level decisions", "Leads organisation strategy development", "Influences organisational alignment", "Redefines organisational roadmaps", "Influences strategy across a portfolio of client accounts"]

### Domain: `technical-skill` — Dev only (domain id: `technical-skill`)

**writing-code** (id: `writing-code`, name: "Writing Code"):
- P2: "Writes code that works for the happy path with guidance on edge cases and errors." Criteria: ["Identifies at least one edge case before submitting a PR", "Handles one error path explicitly in new code", "Names the part of the system their code belongs to before writing it"]
- P3: "Writes code that handles edge cases and errors without prompting." Criteria: ["Handles all obvious edge cases without being asked", "Writes code that fails explicitly rather than silently", "Checks client coding conventions before introducing a new pattern"]
- P4: "Writes code that is clear and maintainable for the team; includes others in style decisions." Criteria: ["Writes code a teammate can review without a verbal walkthrough", "Uses abstraction to reduce duplication without over-engineering", "Raises client style decisions in PR review rather than deciding alone"]
- P5: "Identifies and fixes readability problems across the team's codebase." Criteria: ["Identifies a readability pattern problem affecting the team and proposes a fix", "Reviews code for clarity, not just correctness"]
- P6: "Sets and maintains code quality standards across related teams." Criteria: ["Sets code quality standards used by multiple teams", "Reviews and maintains standards as codebases evolve"]
- P7: "Defines organisation-wide coding principles and measures adoption." Criteria: ["Defines organisation-wide coding principles", "Measures adoption of coding standards across the organisation"]

**testing** (id: `testing`, name: "Testing"):
- P2: "Writes a unit test with guidance; follows client test conventions." Criteria: ["Writes a unit test for a new function using the team's test framework with guidance", "Locates and follows an unfamiliar client codebase's test conventions with guidance"]
- P3: "Writes unit and higher-level tests unaided; onboards to client test suite; uses synthetic test data." Criteria: ["Writes unit and higher-level tests unaided, covering edge cases and error paths", "Onboards to a client codebase's test suite within the ramp-up window", "Builds test fixtures using synthetic or masked data, never live client data"]
- P4: "Writes multi-layer test suite for a feature; adapts to client CI constraints." Criteria: ["Writes a test suite spanning multiple testing-pyramid layers for a feature", "Adapts testing approach to client tooling and CI constraints without treating them as blockers"]
- P5: "Recommends testing-pyramid-aligned fix from quality metrics." Criteria: ["Recommends a testing-pyramid-aligned fix for a gap surfaced by team quality metrics"]
- P6: "Proposes converged testing strategy across several teams' practices." Criteria: ["Proposes a converged testing strategy across several teams' existing practices"]
- P7: "Sets org-wide testing standard with adherence measurement." Criteria: ["Sets an organisation-wide testing standard with a mechanism for measuring team adherence"]

**debugging** (id: `debugging`, name: "Debugging"):
- P2: "Reproduces bugs before fixing; uses debugger with guidance." Criteria: ["Reproduces a bug before attempting a fix", "Uses a debugger with guidance from a senior engineer"]
- P3: "Systematically debugs single-service issues; uses client logging tooling." Criteria: ["Systematically debugs issues within a single service", "Uses the client's logging and monitoring tooling to diagnose issues"]
- P4: "Diagnoses cross-service issues; works within client production access restrictions." Criteria: ["Diagnoses issues spanning multiple services", "Works within client production access restrictions when debugging"]
- P5: "Diagnoses full team domain issues unaided." Criteria: ["Diagnoses issues across the full team domain without assistance"]
- P6: "Diagnoses across related domains." Criteria: ["Diagnoses issues spanning multiple related team domains"]
- P7: "Leads org-wide incident response." Criteria: ["Leads organisation-wide incident response and post-mortem processes"]

**observability** (id: `observability`, name: "Observability"):
- P2: "Reads existing dashboards with guidance." Criteria: ["Reads existing monitoring dashboards with guidance from a senior engineer"]
- P3: "Explains normal operational data; orients to client monitoring." Criteria: ["Explains what normal operational data looks like for their service", "Orients to the client's monitoring and alerting setup"]
- P4: "Proposes monitoring changes from data patterns." Criteria: ["Proposes monitoring improvements based on patterns identified in operational data"]
- P5: "Drives team monitoring changes from data." Criteria: ["Drives monitoring improvements across the team based on operational data"]
- P6: "Establishes observability practice across teams." Criteria: ["Establishes a consistent observability practice across multiple teams"]
- P7: "Fosters org-wide observability culture." Criteria: ["Fosters an organisation-wide culture of observability"]

**understanding-code** (id: `understanding-code`, name: "Understanding Code"):
- P2: "Identifies module placement with guidance; gains task context with guidance." Criteria: ["Identifies where new code belongs in the module structure with guidance", "Gains sufficient context to complete a task with guidance"]
- P3: "Explains domain data flows; follows client codebase conventions." Criteria: ["Explains data flows within their domain", "Follows client codebase conventions without introducing their own patterns"]
- P4: "Scopes complex changes using service maps; works productively across team domain." Criteria: ["Uses service maps to scope complex changes", "Works productively across the full team domain"]
- P5: "Describes full team domain breadth and adjacent dependencies." Criteria: ["Describes the full breadth of the team domain", "Describes adjacent team dependencies accurately"]
- P6: "Describes related teams' domain breadth." Criteria: ["Describes the domain breadth of related teams accurately"]
- P7: "Describes org architecture and bounded contexts." Criteria: ["Describes the organisation's architecture and bounded contexts"]

**software-architecture** (id: `software-architecture`, name: "Software Architecture"):
- P2: "Describes how a function fits the architecture before writing it." Criteria: ["Describes how a new function fits the existing architecture before writing it"]
- P3: "Designs function interfaces aligned to team patterns." Criteria: ["Designs function interfaces that align with established team patterns"]
- P4: "Uses abstraction and isolation; delivers within client-mandated stack." Criteria: ["Uses abstraction and isolation to manage complexity", "Delivers solutions within client-mandated technology constraints"]
- P5: "Architects using accepted design patterns; negotiates tradeoffs with client stakeholders." Criteria: ["Architects solutions using accepted design patterns", "Negotiates architectural tradeoffs with client stakeholders"]
- P6: "Guides teams toward shared architectural patterns." Criteria: ["Guides multiple teams toward shared, consistent architectural patterns"]
- P7: "Defines org-wide architecture principles." Criteria: ["Defines organisation-wide architecture principles"]

**security** (id: `security`, name: "Security"):
- P2: "Names security implications; identifies client IP/data." Criteria: ["Names security implications of new code before submitting a PR", "Identifies what client IP or data their code touches"]
- P3: "Flags unclear security questions; uses approved credential handling." Criteria: ["Flags security questions that are unclear for senior review", "Uses only approved credential handling methods"]
- P4: "Identifies vulnerabilities in code review; applies security checklists; identifies applicable data terms." Criteria: ["Identifies security vulnerabilities during code review", "Applies security checklists to their work", "Identifies which client data handling terms apply to their code"]
- P5: "Refines team security practice; defines client-engagement-specific security." Criteria: ["Refines team security practices based on observed gaps", "Defines engagement-specific security requirements for client work"]
- P6: "Applies org security strategy; resolves cross-client security conflicts." Criteria: ["Applies the organisation's security strategy across teams", "Resolves security conflicts across client engagements"]
- P7: "Sets org security strategy; identifies obscure threats." Criteria: ["Sets the organisation's security strategy", "Identifies obscure or novel security threats"]

**ai-assisted-engineering** (id: `ai-assisted-engineering`, name: "AI-Assisted Engineering"):
- P2: "Reviews AI output line-by-line; checks client AI-tool approval." Criteria: ["Reviews AI-generated code line-by-line before submitting", "Checks whether the client has approved the AI tooling being used"]
- P3: "Uses consistent prompting patterns; strips client data from prompts." Criteria: ["Uses consistent, repeatable prompting patterns for code generation", "Strips client data from prompts before sending to AI tools"]
- P4: "Integrates AI across full feature lifecycle with review parity; applies per-client restrictions." Criteria: ["Integrates AI tools across the full feature development lifecycle", "Applies per-client AI tool restrictions consistently"]
- P5: "Establishes team AI tool standards." Criteria: ["Establishes AI tool standards for the team"]
- P6: "Drives AI adoption across teams." Criteria: ["Drives AI tool adoption and standards across multiple teams"]
- P7: "Sets org AI workflow standards measured by outcomes." Criteria: ["Sets organisation-wide AI workflow standards", "Measures AI workflow outcomes to validate standards"]

**ai-judgment-feature-delivery** (id: `ai-judgment-feature-delivery`, name: "AI Judgment in Feature Delivery"):
- P2: "Flags uncertain AI output." Criteria: ["Flags AI-generated output they are uncertain about for senior review"]
- P3: "Catches hallucinated API calls before PR." Criteria: ["Catches hallucinated API calls or incorrect references in AI output before raising a PR"]
- P4: "Ships AI feature with eval suite, rollback condition, and client-approved eval data." Criteria: ["Ships AI features with an evaluation suite", "Defines a rollback condition before shipping AI features", "Uses client-approved data for evaluation"]
- P5: "Reviews teammates' AI PRs with AI judgment." Criteria: ["Reviews AI-feature PRs from teammates with domain-appropriate AI judgment"]
- P6: "Addresses systemic AI risk patterns across teams." Criteria: ["Identifies and addresses systemic AI risk patterns across multiple teams"]
- P7: "Owns org AI governance tied to business outcomes." Criteria: ["Owns organisation-wide AI governance", "Ties AI governance to measurable business outcomes"]

---

## Task 1 — Repo Scaffolding

**Feature branch:** `feature/T1-repo-scaffold`
**Milestone:** M1 (v0.1.0)

### Goal

Create a working Next.js 15 App Router project with Tailwind, shadcn/ui, Vitest, React Testing Library, Playwright, and TypeScript strict mode. Set up GitHub Actions CI.

### Pre-conditions

No repo exists yet. You have Node.js ≥ 20 installed. You are on the `develop` branch of the parent monorepo, or starting a fresh directory named `ladder/`.

### TDD Steps

Task 1 is a scaffolding task. The "test first" principle applies: write the sanity test before wiring test config, so the first `npm test` run proves the environment works.

**Step 1 — Scaffold the app**

```bash
npx create-next-app@latest ladder \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
cd ladder
```

Verify: `npm run dev` starts without errors, `http://localhost:3000` loads.

**Step 2 — Install runtime dependencies**

```bash
npm install zustand
```

(`gray-matter` and `remark` are excluded — constraint 9 prohibits runtime markdown parsing in v1.)

**Step 3 — Install dev dependencies**

```bash
npm install -D vitest @vitest/coverage-v8 \
  @testing-library/react @testing-library/jest-dom \
  @vitejs/plugin-react \
  @playwright/test
```

**Step 4 — Write sanity test first (RED)**

Create `src/__tests__/sanity.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'

describe('environment sanity', () => {
  it('passes', () => {
    expect(1 + 1).toBe(2)
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module 'vitest' or its corresponding type declarations
```
(Or the test runner is not configured yet — either way, RED before config is correct.)

**Step 5 — Configure Vitest**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Create `src/test-setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage",
"test:e2e": "playwright test"
```

**Step 6 — Run sanity test (GREEN)**

```bash
npm test
```

Expected output: `1 passed`. All green.

**Step 7 — Configure Playwright**

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

Create `e2e/.gitkeep` as placeholder.

**Step 8 — Add TypeScript strict mode**

In `tsconfig.json`, confirm or add:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Step 9 — CI config**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run build
```

**Step 10 — Commit**

```
chore: scaffold Next.js 15 project with Vitest, Playwright, CI
```

Push `feature/T1-repo-scaffold`, open PR to `develop`, squash-merge after CI passes.

---

## Task 2 — Types and Store

**Feature branch:** `feature/T2-types-store`
**Milestone:** M1 (v0.1.0)

### Goal

Define all TypeScript interfaces (`src/lib/types.ts`) and the Zustand assessment store (`src/lib/store.ts`). TDD every store action.

### Pre-conditions

Task 1 is merged to `develop`. Cut `feature/T2-types-store` from `develop`. Vitest is configured and `npm test` is green.

### TDD Steps

**Step 1 — Write store tests first (RED)**

Create `src/lib/__tests__/store.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '@/lib/store'

beforeEach(() => {
  useStore.setState({
    currentTrack: 'dev',
    currentLevel: 'p3',
    focusedView: false,
    assessments: {},
  })
})

describe('store — initial state', () => {
  it('has correct defaults', () => {
    const s = useStore.getState()
    expect(s.currentTrack).toBe('dev')
    expect(s.currentLevel).toBe('p3')
    expect(s.focusedView).toBe(false)
    expect(s.assessments).toEqual({})
  })
})

describe('store — setTrack', () => {
  it('updates currentTrack', () => {
    useStore.getState().setTrack('qa')
    expect(useStore.getState().currentTrack).toBe('qa')
  })
})

describe('store — setLevel', () => {
  it('updates currentLevel', () => {
    useStore.getState().setLevel('p5')
    expect(useStore.getState().currentLevel).toBe('p5')
  })
})

describe('store — toggleFocusedView', () => {
  it('toggles to true', () => {
    useStore.getState().toggleFocusedView()
    expect(useStore.getState().focusedView).toBe(true)
  })
  it('toggles back to false', () => {
    useStore.getState().toggleFocusedView()
    useStore.getState().toggleFocusedView()
    expect(useStore.getState().focusedView).toBe(false)
  })
})

describe('store — setRating', () => {
  const KEY = 'dev/leadership/decision-making'
  it('creates assessment with selfRating', () => {
    useStore.getState().setRating(KEY, 'meeting')
    const a = useStore.getState().assessments[KEY]
    expect(a).toBeDefined()
    expect(a.selfRating).toBe('meeting')
    expect(a.criteriaChecked).toEqual([])
    expect(a.updatedAt).toBeTruthy()
  })
})

describe('store — toggleCriterion', () => {
  const KEY = 'dev/leadership/decision-making'
  const CID = 'shared/leadership/decision-making/p3/0'

  it('adds criterion id', () => {
    useStore.getState().toggleCriterion(KEY, CID)
    expect(useStore.getState().assessments[KEY].criteriaChecked).toContain(CID)
  })

  it('removes criterion id on second toggle', () => {
    useStore.getState().toggleCriterion(KEY, CID)
    useStore.getState().toggleCriterion(KEY, CID)
    expect(useStore.getState().assessments[KEY].criteriaChecked).not.toContain(CID)
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/lib/store'
```

**Step 2 — Create types**

Create `src/lib/types.ts` with the full interfaces listed in the TypeScript Interfaces section above.

**Step 3 — Create store**

Create `src/lib/store.ts` with the Zustand store implementation listed in the Zustand Store section above.

**Step 4 — Run tests (GREEN)**

```bash
npm test
```

Expected: all 8 store tests pass.

**Step 5 — Refactor check**

Confirm: no `any` types. `skipHydration: true` is present in the persist config. All actions use the `set` callback form where they read previous state.

**Step 6 — Commit**

```
feat: add TypeScript types and Zustand assessment store
```

Push `feature/T2-types-store`, open PR to `develop`, squash-merge.

---

## Task 3 — Content Data

**Feature branch:** `feature/T3-content-data`
**Milestone:** M1 (v0.1.0) — completes M1

### Goal

Write all competency content as static TypeScript data in `src/content/tracks.ts`. Schema validation tests ensure structural integrity.

### Pre-conditions

Task 2 is merged to `develop`. Types are available at `@/lib/types`. Cut `feature/T3-content-data` from `develop`.

### TDD Steps

**Step 1 — Write schema tests first (RED)**

Create `src/content/__tests__/schema.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { tracks } from '@/content/tracks'
import { LEVELS } from '@/lib/types'

describe('tracks schema', () => {
  it('has 4 tracks', () => {
    expect(tracks).toHaveLength(4)
  })

  it('every track has required fields', () => {
    for (const t of tracks) {
      expect(t.id).toBeTruthy()
      expect(t.name).toBeTruthy()
      expect(t.description).toBeTruthy()
      expect(Array.isArray(t.domains)).toBe(true)
    }
  })

  it('every domain has required fields', () => {
    for (const t of tracks) {
      for (const d of t.domains) {
        expect(d.id).toBeTruthy()
        expect(d.name).toBeTruthy()
        expect(d.description).toBeTruthy()
        expect(typeof d.comingSoon).toBe('boolean')
        expect(Array.isArray(d.competencies)).toBe(true)
      }
    }
  })

  it('non-coming-soon competencies have all 6 levels', () => {
    for (const t of tracks) {
      for (const d of t.domains) {
        if (d.comingSoon) continue
        for (const c of d.competencies) {
          const levelIds = c.levels.map(l => l.level)
          for (const lvl of LEVELS) {
            expect(levelIds).toContain(lvl)
          }
        }
      }
    }
  })

  it('each level has non-empty descriptor', () => {
    for (const t of tracks) {
      for (const d of t.domains) {
        if (d.comingSoon) continue
        for (const c of d.competencies) {
          for (const l of c.levels) {
            expect(l.descriptor.length).toBeGreaterThan(0)
          }
        }
      }
    }
  })

  it('no empty criteria arrays in non-coming-soon domains', () => {
    for (const t of tracks) {
      for (const d of t.domains) {
        if (d.comingSoon) continue
        for (const c of d.competencies) {
          for (const l of c.levels) {
            expect(l.criteria.length).toBeGreaterThan(0)
          }
        }
      }
    }
  })

  it('criterion IDs match expected format', () => {
    const pattern = /^(dev|qa|data|ai|shared)\/.+\/.+\/p[2-7]\/\d+$/
    for (const t of tracks) {
      for (const d of t.domains) {
        if (d.comingSoon) continue
        for (const c of d.competencies) {
          for (const l of c.levels) {
            for (const criterion of l.criteria) {
              expect(criterion.id).toMatch(pattern)
            }
          }
        }
      }
    }
  })

  it('competency IDs are unique within a domain', () => {
    for (const t of tracks) {
      for (const d of t.domains) {
        const ids = d.competencies.map(c => c.id)
        const unique = new Set(ids)
        expect(unique.size).toBe(ids.length)
      }
    }
  })

  it('coming-soon domains have empty competencies array', () => {
    for (const t of tracks) {
      for (const d of t.domains) {
        if (d.comingSoon) {
          expect(d.competencies).toHaveLength(0)
        }
      }
    }
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/content/tracks'
```

**Step 2 — Create content data**

Create `src/content/tracks.ts`. Start with the export declaration and build out each track:

```typescript
import { Track } from '@/lib/types'

// Helper to build criterion IDs
// Universal domains use 'shared' prefix
// Dev technical-skill uses 'dev' prefix

export const tracks: Track[] = [
  {
    id: 'dev',
    name: 'Development',
    description: 'Software engineers building client products',
    domains: [
      deliveryDomain,
      leadershipDomain,
      fccDomain,
      strategicImpactDomain,
      devTechnicalSkillDomain,
    ],
  },
  {
    id: 'qa',
    name: 'Quality Assurance',
    description: 'QA engineers ensuring product quality',
    domains: [
      deliveryDomain,
      leadershipDomain,
      fccDomain,
      strategicImpactDomain,
      {
        id: 'technical-skill',
        name: 'Technical Skills',
        description: 'QA-specific technical competencies',
        comingSoon: true,
        competencies: [],
      },
    ],
  },
  {
    id: 'data',
    name: 'Data',
    description: 'Data engineers and analysts',
    domains: [
      deliveryDomain,
      leadershipDomain,
      fccDomain,
      strategicImpactDomain,
      {
        id: 'technical-skill',
        name: 'Technical Skills',
        description: 'Data-specific technical competencies',
        comingSoon: true,
        competencies: [],
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI / ML',
    description: 'AI and machine learning engineers',
    domains: [
      deliveryDomain,
      leadershipDomain,
      fccDomain,
      strategicImpactDomain,
      {
        id: 'technical-skill',
        name: 'Technical Skills',
        description: 'AI/ML-specific technical competencies',
        comingSoon: true,
        competencies: [],
      },
    ],
  },
]
```

Implement each domain constant (`deliveryDomain`, `leadershipDomain`, `fccDomain`, `strategicImpactDomain`, `devTechnicalSkillDomain`) using the full content data documented in the Content Data Reference section. Assign criterion IDs using the format:
- `shared/{domainId}/{competencyId}/{level}/{index}` for universal domains
- `dev/technical-skill/{competencyId}/{level}/{index}` for dev technical skills

All indices are 0-based.

**Step 3 — Run schema tests (GREEN)**

```bash
npm test
```

Expected: all schema tests pass. Fix any criterion ID format errors or missing levels until all pass.

**Step 4 — Refactor check**

Ensure `tracks.ts` has no `any` types, all domain constants are typed as `Domain` or inlined as `Track['domains'][number]`, and all 4 tracks share the same universal domain constant references (not duplicated objects — use `const` references so shared domain data is defined once).

**Step 5 — Commit** — completes M1

```
feat: add competency content data for all universal domains and dev technical skills
```

Push `feature/T3-content-data`, open PR to `develop`, squash-merge.

**Release milestone M1 — v0.1.0:** After T3 merges, cut `release/v0.1.0` from `develop`, bump `package.json` version to `0.1.0`, open PR to `main`, tag `v0.1.0`, create GitHub release, sync `develop`.

---

## Task 4 — Content Utilities and Home Page

**Feature branch:** `feature/T4-content-utils-home`
**Milestone:** M2 (v0.2.0)

### Goal

Implement content utility functions (`src/lib/content.ts`) and the Home page (`src/app/page.tsx`) with a track picker and level picker, both wired to the Zustand store.

### Pre-conditions

Task 3 is merged to `develop`. `@/content/tracks` and `@/lib/types` are available. Cut `feature/T4-content-utils-home` from `develop`.

### TDD Steps

**Step 1 — Write content utility tests (RED)**

Create `src/lib/__tests__/content.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { getTracks, getTrack, getDomain, getCompetency, getNextLevel, computeProgress } from '@/lib/content'
import { LEVELS } from '@/lib/types'

describe('getTracks', () => {
  it('returns 4 tracks', () => {
    expect(getTracks()).toHaveLength(4)
  })
})

describe('getTrack', () => {
  it('returns dev track', () => {
    const t = getTrack('dev')
    expect(t).not.toBeNull()
    expect(t?.id).toBe('dev')
  })
  it('returns null for unknown id', () => {
    // @ts-expect-error testing invalid input
    expect(getTrack('nonexistent')).toBeNull()
  })
})

describe('getDomain', () => {
  it('returns leadership domain for dev', () => {
    const d = getDomain('dev', 'leadership')
    expect(d).not.toBeNull()
    expect(d?.id).toBe('leadership')
  })
  it('returns null for unknown domain', () => {
    expect(getDomain('dev', 'nonexistent')).toBeNull()
  })
})

describe('getCompetency', () => {
  it('returns decision-making competency', () => {
    const c = getCompetency('dev', 'leadership', 'decision-making')
    expect(c).not.toBeNull()
    expect(c?.id).toBe('decision-making')
  })
})

describe('getNextLevel', () => {
  it('returns p3 for p2', () => expect(getNextLevel('p2')).toBe('p3'))
  it('returns p7 for p6', () => expect(getNextLevel('p6')).toBe('p7'))
  it('returns null for p7', () => expect(getNextLevel('p7')).toBeNull())
})

describe('computeProgress', () => {
  it('returns 0 with no checked criteria', () => {
    const c = getCompetency('dev', 'leadership', 'decision-making')!
    expect(computeProgress(c, 'p3', [])).toBe(0)
  })
  it('returns 50 with one of two criteria checked', () => {
    const c = getCompetency('dev', 'leadership', 'decision-making')!
    const firstCriterion = c.levels.find(l => l.level === 'p3')!.criteria[0].id
    expect(computeProgress(c, 'p3', [firstCriterion])).toBe(50)
  })
  it('returns 100 with all criteria checked', () => {
    const c = getCompetency('dev', 'leadership', 'decision-making')!
    const allIds = c.levels.find(l => l.level === 'p3')!.criteria.map(cr => cr.id)
    expect(computeProgress(c, 'p3', allIds)).toBe(100)
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/lib/content'
```

**Step 2 — Create content utilities**

Create `src/lib/content.ts` using the implementation from the Content Utility Functions section above. Remember to import `LEVELS` from `./types`.

**Step 3 — Run tests (GREEN)**

```bash
npm test
```

Expected: all content utility tests pass.

**Step 4 — Write Home page component tests (RED)**

Create `src/app/__tests__/page.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from '@/app/page'
import { useStore } from '@/lib/store'

beforeEach(() => {
  useStore.setState({
    currentTrack: 'dev',
    currentLevel: 'p3',
    focusedView: false,
    assessments: {},
  })
})

describe('HomePage', () => {
  it('renders 4 track buttons', () => {
    render(<HomePage />)
    expect(screen.getByRole('button', { name: /development/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /quality assurance/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /data/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ai/i })).toBeInTheDocument()
  })

  it('renders 6 level buttons', () => {
    render(<HomePage />)
    for (const lvl of ['P2', 'P3', 'P4', 'P5', 'P6', 'P7']) {
      expect(screen.getByRole('button', { name: new RegExp(lvl, 'i') })).toBeInTheDocument()
    }
  })

  it('clicking a track button updates store', () => {
    render(<HomePage />)
    fireEvent.click(screen.getByRole('button', { name: /quality assurance/i }))
    expect(useStore.getState().currentTrack).toBe('qa')
  })

  it('clicking a level button updates store', () => {
    render(<HomePage />)
    fireEvent.click(screen.getByRole('button', { name: /P5/i }))
    expect(useStore.getState().currentLevel).toBe('p5')
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/app/page' or its corresponding type declarations
```
(Or: component exists from scaffolding but lacks the required buttons.)

**Step 5 — Create Home page**

Create (or rewrite) `src/app/page.tsx` as a client component:

```typescript
'use client'

import { useStore } from '@/lib/store'
import { getTracks } from '@/lib/content'
import { LEVELS, TrackId, LevelId } from '@/lib/types'
import Link from 'next/link'

export default function HomePage() {
  const { currentTrack, currentLevel, setTrack, setLevel } = useStore()
  const tracks = getTracks()

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Career Ladder</h1>

      <section aria-label="Track selection" className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Select your track</h2>
        <div className="flex flex-wrap gap-3">
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => setTrack(track.id as TrackId)}
              aria-pressed={currentTrack === track.id}
              className={`px-4 py-2 rounded border ${
                currentTrack === track.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border-gray-300 hover:border-blue-400'
              }`}
            >
              {track.name}
            </button>
          ))}
        </div>
      </section>

      <section aria-label="Level selection" className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Select your level</h2>
        <div className="flex flex-wrap gap-3">
          {LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setLevel(level as LevelId)}
              aria-pressed={currentLevel === level}
              className={`px-4 py-2 rounded border uppercase ${
                currentLevel === level
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border-gray-300 hover:border-blue-400'
              }`}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <Link
        href={`/${currentTrack}`}
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View my ladder →
      </Link>
    </main>
  )
}
```

**Step 6 — Run tests (GREEN)**

```bash
npm test
```

Expected: all content utility tests and home page tests pass.

**Step 7 — Commit**

```
feat: add content utilities and home page
```

Push `feature/T4-content-utils-home`, open PR to `develop`, squash-merge.

---

## Task 5 — Track Domain Overview Page

**Feature branch:** `feature/T5-track-domain-overview`
**Milestone:** M2 (v0.2.0) — completes M2

### Goal

Build `/[track]` page showing domain cards with progress rings for each domain. Coming-soon domains display a badge instead of a ring.

### Pre-conditions

Task 4 is merged to `develop`. Home page routes to `/[track]`. Cut `feature/T5-track-domain-overview` from `develop`.

### TDD Steps

**Step 1 — Write ProgressRing component test (RED)**

Create `src/components/__tests__/ProgressRing.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressRing } from '@/components/ProgressRing'

describe('ProgressRing', () => {
  it('renders percentage text', () => {
    render(<ProgressRing percentage={75} size={48} />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('renders 0% when at zero', () => {
    render(<ProgressRing percentage={0} size={48} />)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/components/ProgressRing'
```

**Step 2 — Create ProgressRing component**

Create `src/components/ProgressRing.tsx`:

```typescript
interface Props {
  percentage: number
  size: number
  strokeWidth?: number
}

export function ProgressRing({ percentage, size, strokeWidth = 4 }: Props) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-blue-500 transition-all duration-300"
        />
      </svg>
      <span className="absolute text-xs font-medium">{percentage}%</span>
    </div>
  )
}
```

**Step 3 — ProgressRing tests (GREEN)**

```bash
npm test
```

Expected: ProgressRing tests pass.

**Step 4 — Write track domain overview page test (RED)**

Create `src/app/[track]/__tests__/page.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TrackPage from '@/app/[track]/page'
import { useStore } from '@/lib/store'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({ track: 'dev' }),
}))

beforeEach(() => {
  useStore.setState({
    currentTrack: 'dev',
    currentLevel: 'p3',
    focusedView: false,
    assessments: {},
  })
})

describe('TrackPage — dev', () => {
  it('renders 5 domain cards', () => {
    render(<TrackPage params={{ track: 'dev' }} />)
    expect(screen.getByText(/delivery/i)).toBeInTheDocument()
    expect(screen.getByText(/leadership/i)).toBeInTheDocument()
    expect(screen.getByText(/communication, feedback/i, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(/strategic impact/i)).toBeInTheDocument()
    expect(screen.getByText(/technical skills/i)).toBeInTheDocument()
  })

  it('each non-coming-soon domain has a progress ring', () => {
    render(<TrackPage params={{ track: 'dev' }} />)
    // All 5 domains for dev are live — all show percentage
    const rings = screen.getAllByText(/%/)
    expect(rings.length).toBeGreaterThanOrEqual(5)
  })
})

describe('TrackPage — qa', () => {
  it('shows coming-soon badge on technical-skill domain', () => {
    render(<TrackPage params={{ track: 'qa' }} />)
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/app/[track]/page'
```

**Step 5 — Create track domain overview page**

Create `src/app/[track]/page.tsx`:

```typescript
import { getTrack, getDomain, getCompetency, computeProgress } from '@/lib/content'
import { ProgressRing } from '@/components/ProgressRing'
import { TrackId } from '@/lib/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// This is a server component — it reads params directly
interface Props {
  params: { track: string }
}

// Domain progress must be computed client-side (needs store).
// Wrap the inner component as a client component for store access,
// or pass down assessments. For v1, compute progress client-side.
// Use a Client Component wrapper.
export default function TrackPage({ params }: Props) {
  const track = getTrack(params.track as TrackId)
  if (!track) notFound()

  return <TrackDomainView track={track} />
}
```

Create a client component `src/components/TrackDomainList.tsx` (done in T8) — for now, inline the domain list in the page as a client component:

Create `src/app/[track]/TrackDomainView.tsx` (client component):

```typescript
'use client'

import { Track, LevelId } from '@/lib/types'
import { useStore } from '@/lib/store'
import { computeProgress } from '@/lib/content'
import { ProgressRing } from '@/components/ProgressRing'
import Link from 'next/link'

export function TrackDomainView({ track }: { track: Track }) {
  const { currentLevel, assessments } = useStore()

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{track.name}</h1>
      <p className="text-gray-600 mb-8">{track.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {track.domains.map((domain) => {
          if (domain.comingSoon) {
            return (
              <div key={domain.id} className="border rounded p-4 opacity-60">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{domain.name}</h2>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">Coming soon</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{domain.description}</p>
              </div>
            )
          }

          const totalCriteria = domain.competencies.reduce((sum, c) => {
            const ld = c.levels.find(l => l.level === currentLevel)
            return sum + (ld?.criteria.length ?? 0)
          }, 0)
          const checkedCriteria = domain.competencies.reduce((sum, c) => {
            const key = `${track.id}/${domain.id}/${c.id}`
            const checked = assessments[key]?.criteriaChecked ?? []
            const ld = c.levels.find(l => l.level === currentLevel)
            if (!ld) return sum
            return sum + ld.criteria.filter(cr => checked.includes(cr.id)).length
          }, 0)
          const pct = totalCriteria === 0 ? 0 : Math.round((checkedCriteria / totalCriteria) * 100)

          return (
            <Link
              key={domain.id}
              href={`/${track.id}/${domain.id}`}
              className="border rounded p-4 hover:border-blue-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{domain.name}</h2>
                <ProgressRing percentage={pct} size={48} />
              </div>
              <p className="text-sm text-gray-500 mt-1">{domain.description}</p>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
```

Update `src/app/[track]/page.tsx` to import and use `TrackDomainView`.

**Step 6 — Run tests (GREEN)**

```bash
npm test
```

Expected: all tests pass.

**Step 7 — Commit** — completes M2

```
feat: add track domain overview page with progress rings
```

Push `feature/T5-track-domain-overview`, open PR to `develop`, squash-merge.

**Release milestone M2 — v0.2.0:** Cut `release/v0.2.0` from `develop`, bump version to `0.2.0`, PR to `main`, tag, GitHub release, sync `develop`.

---

## Task 6 — Domain Detail Page

**Feature branch:** `feature/T6-domain-detail`
**Milestone:** M3 (v0.3.0)

### Goal

Build `/[track]/[domain]` page showing a list of competencies. Coming-soon domains show a placeholder. Each competency links to the competency detail page.

### Pre-conditions

Task 5 is merged to `develop`. Cut `feature/T6-domain-detail` from `develop`.

### TDD Steps

**Step 1 — Write ExploreButtonClient tests (RED)**

Create `src/components/__tests__/ExploreButtonClient.test.tsx`:

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ExploreButtonClient } from '@/components/ExploreButtonClient'

describe('ExploreButtonClient', () => {
  it('renders button with label', () => {
    render(<ExploreButtonClient label="Explore" onClick={vi.fn()} />)
    expect(screen.getByRole('button', { name: /explore/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<ExploreButtonClient label="Go" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: /go/i }))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/components/ExploreButtonClient'
```

**Step 2 — Create ExploreButtonClient**

Create `src/components/ExploreButtonClient.tsx`:

```typescript
'use client'

interface Props {
  label: string
  onClick: () => void
}

export function ExploreButtonClient({ label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {label}
    </button>
  )
}
```

**Step 3 — ExploreButtonClient tests (GREEN)**

```bash
npm test
```

Expected: ExploreButtonClient tests pass.

**Step 4 — Write domain detail page tests (RED)**

Create `src/app/[track]/[domain]/__tests__/page.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DomainPage from '@/app/[track]/[domain]/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

describe('DomainPage — dev/leadership', () => {
  it('renders competency names', async () => {
    render(<DomainPage params={{ track: 'dev', domain: 'leadership' }} />)
    expect(screen.getByText(/decision making/i)).toBeInTheDocument()
    expect(screen.getByText(/mentoring/i)).toBeInTheDocument()
    expect(screen.getByText(/facilitation/i)).toBeInTheDocument()
  })

  it('each competency links to correct URL', () => {
    render(<DomainPage params={{ track: 'dev', domain: 'leadership' }} />)
    const link = screen.getByRole('link', { name: /decision making/i })
    expect(link).toHaveAttribute('href', '/dev/leadership/decision-making')
  })
})

describe('DomainPage — qa/technical-skill (coming soon)', () => {
  it('shows placeholder, not a competency list', () => {
    render(<DomainPage params={{ track: 'qa', domain: 'technical-skill' }} />)
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /writing code/i })).not.toBeInTheDocument()
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/app/[track]/[domain]/page'
```

**Step 5 — Create domain detail page**

Create `src/app/[track]/[domain]/page.tsx`:

```typescript
import { getTrack, getDomain } from '@/lib/content'
import { TrackId } from '@/lib/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: { track: string; domain: string }
}

export default function DomainPage({ params }: Props) {
  const track = getTrack(params.track as TrackId)
  const domain = getDomain(params.track as TrackId, params.domain)

  if (!track || !domain) notFound()

  if (domain.comingSoon) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{domain.name}</h1>
        <p className="text-gray-600 mb-4">{domain.description}</p>
        <div className="border rounded p-8 text-center text-gray-400">
          <p className="text-lg font-medium">Coming soon</p>
          <p className="text-sm mt-2">
            {domain.name} competencies for the {track.name} track are being developed.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href={`/${params.track}`} className="hover:underline">{track.name}</Link>
        {' / '}
        <span>{domain.name}</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">{domain.name}</h1>
      <p className="text-gray-600 mb-8">{domain.description}</p>

      <ul className="space-y-3">
        {domain.competencies.map((competency) => (
          <li key={competency.id}>
            <Link
              href={`/${params.track}/${params.domain}/${competency.id}`}
              className="block border rounded p-4 hover:border-blue-400 transition-colors"
            >
              <h2 className="font-semibold">{competency.name}</h2>
              {competency.description && (
                <p className="text-sm text-gray-500 mt-1">{competency.description}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

**Step 6 — Run tests (GREEN)**

```bash
npm test
```

Expected: all tests pass.

**Step 7 — Commit**

```
feat: add domain detail page and ExploreButtonClient
```

Push `feature/T6-domain-detail`, open PR to `develop`, squash-merge.

---

## Task 7 — Competency Detail Page (Browse Mode)

**Feature branch:** `feature/T7-competency-detail`
**Milestone:** M3 (v0.3.0) — completes M3

### Goal

Build `/[track]/[domain]/[competency]` page showing all 6 level cards. The user's current level gets a "Your level" badge.

### Pre-conditions

Task 6 is merged to `develop`. Cut `feature/T7-competency-detail` from `develop`.

### TDD Steps

**Step 1 — Write competency detail page tests (RED)**

Create `src/app/[track]/[domain]/[competency]/__tests__/page.test.tsx`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CompetencyPage from '@/app/[track]/[domain]/[competency]/page'
import { useStore } from '@/lib/store'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

const PARAMS = { track: 'dev', domain: 'leadership', competency: 'decision-making' }

beforeEach(() => {
  useStore.setState({
    currentTrack: 'dev',
    currentLevel: 'p3',
    focusedView: false,
    assessments: {},
  })
})

describe('CompetencyPage', () => {
  it('renders all 6 level cards', () => {
    render(<CompetencyPage params={PARAMS} />)
    for (const lvl of ['P2', 'P3', 'P4', 'P5', 'P6', 'P7']) {
      expect(screen.getByText(new RegExp(lvl, 'i'))).toBeInTheDocument()
    }
  })

  it('shows "Your level" badge on current level card', () => {
    render(<CompetencyPage params={PARAMS} />)
    expect(screen.getByText(/your level/i)).toBeInTheDocument()
  })

  it('each level card shows descriptor text', () => {
    render(<CompetencyPage params={PARAMS} />)
    // P3 descriptor for decision-making
    expect(screen.getByText(/makes decisions for own tasks/i)).toBeInTheDocument()
  })

  it('each level card shows criteria', () => {
    render(<CompetencyPage params={PARAMS} />)
    expect(screen.getByText(/reflects on own cognitive bias/i)).toBeInTheDocument()
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/app/[track]/[domain]/[competency]/page'
```

**Step 2 — Create competency detail page**

Create `src/app/[track]/[domain]/[competency]/page.tsx`. This is a client component (needs store for current level):

```typescript
'use client'

import { getTrack, getCompetency } from '@/lib/content'
import { TrackId, LEVELS } from '@/lib/types'
import { useStore } from '@/lib/store'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: { track: string; domain: string; competency: string }
}

export default function CompetencyPage({ params }: Props) {
  const track = getTrack(params.track as TrackId)
  const competency = getCompetency(params.track as TrackId, params.domain, params.competency)
  const { currentLevel } = useStore()

  if (!track || !competency) notFound()

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href={`/${params.track}`}>{track.name}</Link>
        {' / '}
        <Link href={`/${params.track}/${params.domain}`}>{params.domain}</Link>
        {' / '}
        <span>{competency.name}</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">{competency.name}</h1>

      <div className="space-y-4 mt-6">
        {LEVELS.map((level) => {
          const ld = competency.levels.find(l => l.level === level)
          if (!ld) return null
          const isCurrent = level === currentLevel

          return (
            <div
              key={level}
              className={`border rounded p-4 ${isCurrent ? 'border-blue-500 bg-blue-50' : ''}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold uppercase text-sm">{level}</span>
                {isCurrent && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                    Your level
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700 mb-3">{ld.descriptor}</p>
              <ul className="space-y-1">
                {ld.criteria.map((criterion) => (
                  <li key={criterion.id} className="text-sm flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">—</span>
                    <span>{criterion.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </main>
  )
}
```

**Step 3 — Run tests (GREEN)**

```bash
npm test
```

Expected: all tests pass.

**Step 4 — Commit** — completes M3

```
feat: add competency detail page with all levels
```

Push `feature/T7-competency-detail`, open PR to `develop`, squash-merge.

**Release milestone M3 — v0.3.0:** Cut `release/v0.3.0` from `develop`, bump version to `0.3.0`, PR to `main`, tag, GitHub release, sync `develop`.

---

## Task 8 — Self-Assessment

**Feature branch:** `feature/T8-self-assessment`
**Milestone:** M4 (v0.4.0)

### Goal

Add criteria checkboxes and self-rating (Developing / Meeting / Exceeding) to the competency detail page. Wire everything to the Zustand store. Build `TrackDomainList` and `CompetencyAssessmentView` components.

### Pre-conditions

Task 7 is merged to `develop`. Assessment store actions are available. Cut `feature/T8-self-assessment` from `develop`.

### TDD Steps

**Step 1 — Write TrackDomainList tests (RED)**

Create `src/components/__tests__/TrackDomainList.test.tsx`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TrackDomainList } from '@/components/TrackDomainList'
import { useStore } from '@/lib/store'
import { getTrack } from '@/lib/content'

beforeEach(() => {
  useStore.setState({
    currentTrack: 'dev',
    currentLevel: 'p3',
    focusedView: false,
    assessments: {},
  })
})

describe('TrackDomainList', () => {
  it('renders domain cards for the given track', () => {
    const track = getTrack('dev')!
    render(<TrackDomainList track={track} />)
    expect(screen.getByText(/leadership/i)).toBeInTheDocument()
    expect(screen.getByText(/delivery/i)).toBeInTheDocument()
  })

  it('renders progress rings', () => {
    const track = getTrack('dev')!
    render(<TrackDomainList track={track} />)
    const percentages = screen.getAllByText(/\d+%/)
    expect(percentages.length).toBeGreaterThanOrEqual(4)
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/components/TrackDomainList'
```

**Step 2 — Create TrackDomainList**

Create `src/components/TrackDomainList.tsx`:

```typescript
'use client'

import { Track } from '@/lib/types'
import { useStore } from '@/lib/store'
import { ProgressRing } from './ProgressRing'
import Link from 'next/link'

interface Props {
  track: Track
}

export function TrackDomainList({ track }: Props) {
  const { currentLevel, assessments } = useStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {track.domains.map((domain) => {
        if (domain.comingSoon) {
          return (
            <div key={domain.id} className="border rounded p-4 opacity-60">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{domain.name}</h2>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">Coming soon</span>
              </div>
            </div>
          )
        }

        const totalCriteria = domain.competencies.reduce((sum, c) => {
          const ld = c.levels.find(l => l.level === currentLevel)
          return sum + (ld?.criteria.length ?? 0)
        }, 0)
        const checkedCount = domain.competencies.reduce((sum, c) => {
          const key = `${track.id}/${domain.id}/${c.id}`
          const checked = assessments[key]?.criteriaChecked ?? []
          const ld = c.levels.find(l => l.level === currentLevel)
          if (!ld) return sum
          return sum + ld.criteria.filter(cr => checked.includes(cr.id)).length
        }, 0)
        const pct = totalCriteria === 0 ? 0 : Math.round((checkedCount / totalCriteria) * 100)

        return (
          <Link
            key={domain.id}
            href={`/${track.id}/${domain.id}`}
            className="border rounded p-4 hover:border-blue-400 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{domain.name}</h2>
              <ProgressRing percentage={pct} size={48} />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
```

**Step 3 — TrackDomainList tests (GREEN)**

```bash
npm test
```

Expected: TrackDomainList tests pass.

**Step 4 — Write CompetencyAssessmentView tests (RED)**

Create `src/components/__tests__/CompetencyAssessmentView.test.tsx`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CompetencyAssessmentView } from '@/components/CompetencyAssessmentView'
import { useStore } from '@/lib/store'
import { getCompetency } from '@/lib/content'

const COMPETENCY = getCompetency('dev', 'leadership', 'decision-making')!
const ASSESSMENT_KEY = 'dev/leadership/decision-making'

beforeEach(() => {
  useStore.setState({
    currentTrack: 'dev',
    currentLevel: 'p3',
    focusedView: false,
    assessments: {},
  })
})

describe('CompetencyAssessmentView', () => {
  it('renders criteria checkboxes for current level', () => {
    render(
      <CompetencyAssessmentView
        competency={COMPETENCY}
        trackId="dev"
        domainId="leadership"
      />
    )
    // P3 decision-making has 2 criteria
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThanOrEqual(2)
  })

  it('checking a criterion calls store toggleCriterion', () => {
    render(
      <CompetencyAssessmentView
        competency={COMPETENCY}
        trackId="dev"
        domainId="leadership"
      />
    )
    const checkbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(checkbox)
    const assessed = useStore.getState().assessments[ASSESSMENT_KEY]
    expect(assessed.criteriaChecked.length).toBe(1)
  })

  it('renders self-rating buttons', () => {
    render(
      <CompetencyAssessmentView
        competency={COMPETENCY}
        trackId="dev"
        domainId="leadership"
      />
    )
    expect(screen.getByRole('button', { name: /developing/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /meeting/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /exceeding/i })).toBeInTheDocument()
  })

  it('clicking a rating calls store setRating', () => {
    render(
      <CompetencyAssessmentView
        competency={COMPETENCY}
        trackId="dev"
        domainId="leadership"
      />
    )
    fireEvent.click(screen.getByRole('button', { name: /meeting/i }))
    expect(useStore.getState().assessments[ASSESSMENT_KEY]?.selfRating).toBe('meeting')
  })

  it('highlights current level card', () => {
    render(
      <CompetencyAssessmentView
        competency={COMPETENCY}
        trackId="dev"
        domainId="leadership"
      />
    )
    expect(screen.getByText(/your level/i)).toBeInTheDocument()
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/components/CompetencyAssessmentView'
```

**Step 5 — Create CompetencyAssessmentView**

Create `src/components/CompetencyAssessmentView.tsx`:

```typescript
'use client'

import { Competency, TrackId, LevelId, SelfRating, LEVELS } from '@/lib/types'
import { useStore } from '@/lib/store'
import { getNextLevel } from '@/lib/content'

interface Props {
  competency: Competency
  trackId: TrackId
  domainId: string
}

const RATINGS: SelfRating[] = ['developing', 'meeting', 'exceeding']

export function CompetencyAssessmentView({ competency, trackId, domainId }: Props) {
  const { currentLevel, focusedView, assessments, setRating, toggleCriterion } = useStore()
  const assessmentKey = `${trackId}/${domainId}/${competency.id}`
  const assessment = assessments[assessmentKey]
  const nextLevel = getNextLevel(currentLevel)

  const levelsToShow = focusedView
    ? LEVELS.filter(l => l === currentLevel || l === nextLevel)
    : LEVELS

  return (
    <div className="space-y-6">
      {/* Self-rating */}
      <div>
        <h3 className="font-medium mb-2">Overall self-rating</h3>
        <div className="flex gap-2">
          {RATINGS.map((rating) => (
            <button
              key={rating}
              onClick={() => setRating(assessmentKey, rating)}
              aria-pressed={assessment?.selfRating === rating}
              className={`px-3 py-1.5 rounded border capitalize text-sm ${
                assessment?.selfRating === rating
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
      </div>

      {/* Level cards */}
      <div className="space-y-4">
        {levelsToShow.map((level) => {
          const ld = competency.levels.find(l => l.level === level)
          if (!ld) return null
          const isCurrent = level === currentLevel

          return (
            <div
              key={level}
              className={`border rounded p-4 ${isCurrent ? 'border-blue-500 bg-blue-50' : ''}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold uppercase text-sm">{level}</span>
                {isCurrent && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                    Your level
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700 mb-3">{ld.descriptor}</p>
              <ul className="space-y-2">
                {ld.criteria.map((criterion) => {
                  const checked = assessment?.criteriaChecked?.includes(criterion.id) ?? false
                  return (
                    <li key={criterion.id} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id={criterion.id}
                        checked={checked}
                        onChange={() => toggleCriterion(assessmentKey, criterion.id)}
                        className="mt-0.5"
                      />
                      <label htmlFor={criterion.id} className="text-sm cursor-pointer">
                        {criterion.text}
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

**Step 6 — Run all tests (GREEN)**

```bash
npm test
```

Expected: all tests pass.

**Step 7 — Commit**

```
feat: add self-assessment — criteria checks and self-rating wired to store
```

Push `feature/T8-self-assessment`, open PR to `develop`, squash-merge.

---

## Task 9 — Focused View Toggle + Store Hydration

**Feature branch:** `feature/T9-focused-view`
**Milestone:** M4 (v0.4.0) — completes M4

### Goal

Add focused view toggle (current + next level only). Handle P7 edge case (highest level, no next). Wire SSR-safe store hydration via a client component.

### Pre-conditions

Task 8 is merged to `develop`. `CompetencyAssessmentView` exists. `getNextLevel` is tested and returns null for P7. Cut `feature/T9-focused-view` from `develop`.

### TDD Steps

**Step 1 — Write focused view tests (RED)**

Add to `src/components/__tests__/CompetencyAssessmentView.test.tsx`:

```typescript
describe('CompetencyAssessmentView — focused view', () => {
  it('shows all 6 levels when focusedView=false', () => {
    useStore.setState({ currentLevel: 'p3', focusedView: false, currentTrack: 'dev', assessments: {} })
    render(
      <CompetencyAssessmentView competency={COMPETENCY} trackId="dev" domainId="leadership" />
    )
    for (const lvl of ['p2', 'p3', 'p4', 'p5', 'p6', 'p7']) {
      expect(screen.getByText(new RegExp(lvl, 'i'))).toBeInTheDocument()
    }
  })

  it('shows only current and next level when focusedView=true', () => {
    useStore.setState({ currentLevel: 'p3', focusedView: true, currentTrack: 'dev', assessments: {} })
    render(
      <CompetencyAssessmentView competency={COMPETENCY} trackId="dev" domainId="leadership" />
    )
    expect(screen.getByText(/p3/i)).toBeInTheDocument()
    expect(screen.getByText(/p4/i)).toBeInTheDocument()
    expect(screen.queryByText(/p2/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/p5/i)).not.toBeInTheDocument()
  })

  it('shows only P7 when focusedView=true and currentLevel=p7', () => {
    useStore.setState({ currentLevel: 'p7', focusedView: true, currentTrack: 'dev', assessments: {} })
    render(
      <CompetencyAssessmentView competency={COMPETENCY} trackId="dev" domainId="leadership" />
    )
    expect(screen.getByText(/p7/i)).toBeInTheDocument()
    expect(screen.queryByText(/p6/i)).not.toBeInTheDocument()
    expect(screen.getByText(/you.re at the highest level/i)).toBeInTheDocument()
  })
})
```

Run `npm test` — expected FAIL: "you're at the highest level" message not rendered yet.

**Step 2 — Update CompetencyAssessmentView for P7 edge case**

In `src/components/CompetencyAssessmentView.tsx`, add the P7 focused view message. In the render, after computing `levelsToShow`, add:

```typescript
const isAtHighest = currentLevel === 'p7' && focusedView

// Inside the level cards section, before the map:
{isAtHighest && (
  <p className="text-sm text-blue-700 font-medium">
    You're at the highest level — P7 is the top of the Leapfrog career ladder.
  </p>
)}
```

**Step 3 — Focused view tests (GREEN)**

```bash
npm test
```

Expected: all focused view tests pass.

**Step 4 — Write StoreHydration tests (RED)**

Create `src/components/__tests__/StoreHydration.test.tsx`:

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { StoreHydration } from '@/components/StoreHydration'
import { useStore } from '@/lib/store'

describe('StoreHydration', () => {
  it('calls persist.rehydrate on mount', () => {
    const rehydrate = vi.fn()
    // @ts-expect-error mocking persist
    useStore.persist = { rehydrate }
    render(<StoreHydration />)
    expect(rehydrate).toHaveBeenCalledOnce()
  })
})
```

Run `npm test` — expected FAIL:
```
Error: Cannot find module '@/components/StoreHydration'
```

**Step 5 — Create StoreHydration**

Create `src/components/StoreHydration.tsx`:

```typescript
'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'

export function StoreHydration() {
  useEffect(() => {
    useStore.persist.rehydrate()
  }, [])

  return null
}
```

Add `<StoreHydration />` to `src/app/layout.tsx` so it runs on every page.

**Step 6 — Run all tests (GREEN)**

```bash
npm test
```

Expected: all tests pass.

**Step 7 — Commit** — completes M4

```
feat: add focused view toggle and SSR-safe store hydration
```

Push `feature/T9-focused-view`, open PR to `develop`, squash-merge.

**Release milestone M4 — v0.4.0:** Cut `release/v0.4.0` from `develop`, bump version to `0.4.0`, PR to `main`, tag, GitHub release, sync `develop`.

---

## Task 10 — Polish, Accessibility, Coming-Soon Placeholders

**Feature branch:** `feature/T10-polish`
**Milestone:** M5 (v0.5.0) — completes M5

### Goal

Ensure coming-soon UI is correct for QA/Data/AI technical skills. Pass an accessibility audit. Hit Lighthouse ≥ 90.

### Pre-conditions

Tasks 1–9 are merged to `develop`. All 4 tracks render correctly. Cut `feature/T10-polish` from `develop`.

### TDD Steps

**Step 1 — Write E2E test (RED)**

Create `e2e/coming-soon.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test('QA technical-skill domain shows coming-soon placeholder', async ({ page }) => {
  await page.goto('/qa/technical-skill')
  await expect(page.getByText(/coming soon/i)).toBeVisible()
  // Must not show competency links
  await expect(page.getByRole('link', { name: /writing code/i })).not.toBeVisible()
})

test('Data technical-skill domain shows coming-soon placeholder', async ({ page }) => {
  await page.goto('/data/technical-skill')
  await expect(page.getByText(/coming soon/i)).toBeVisible()
})

test('AI technical-skill domain shows coming-soon placeholder', async ({ page }) => {
  await page.goto('/ai/technical-skill')
  await expect(page.getByText(/coming soon/i)).toBeVisible()
})

test('Dev technical-skill domain is NOT coming soon', async ({ page }) => {
  await page.goto('/dev/technical-skill')
  await expect(page.getByText(/coming soon/i)).not.toBeVisible()
  await expect(page.getByRole('link', { name: /writing code/i })).toBeVisible()
})
```

Run `npm run test:e2e` — expected FAIL (app not built or coming-soon UI incomplete):
```
Error: locator.toBeVisible: Error: ... element is not visible
```

**Step 2 — Fix coming-soon UI if needed**

Verify `src/app/[track]/[domain]/page.tsx` correctly handles `domain.comingSoon === true` — shows placeholder, no competency list. QA/Data/AI `technical-skill` domain in `tracks.ts` must have `comingSoon: true`.

Run `npm run build` — must pass with no TypeScript errors.

**Step 3 — Run E2E (GREEN)**

```bash
npm run test:e2e
```

Expected: all 4 E2E tests pass.

**Step 4 — Accessibility audit**

Manually check:
- All interactive elements (`<button>`, `<a>`, `<input type="checkbox">`) have accessible names — either visible text or `aria-label`
- Track/level buttons use `aria-pressed` to indicate selected state (already in place from T4)
- Level cards have logical focus order (top to bottom)
- No images without `alt` attributes
- Color contrast meets WCAG AA (blue-600 on white passes at normal text sizes)

Fix any gaps found during the audit.

**Step 5 — Lighthouse**

```bash
npm run build && npm run start
```

Open Lighthouse in Chrome DevTools against `http://localhost:3000`. Run audits for Performance, Accessibility, Best Practices, SEO. All scores must be ≥ 90.

Common fixes if score is below 90:
- Add `<meta name="description">` to `layout.tsx`
- Ensure `<html lang="en">` is set in `layout.tsx`
- Add `<title>` per page using Next.js metadata API
- Ensure no render-blocking resources

**Step 6 — Commit**

```
feat: coming-soon placeholders and accessibility polish
```

Push `feature/T10-polish`, open PR to `develop`, squash-merge.

**Release milestone M5 — v0.5.0:** Cut `release/v0.5.0` from `develop`, bump version to `0.5.0`, PR to `main`, tag, GitHub release, sync `develop`.

**Release milestone M6 — v1.0.0:** After M5 ships and any final integration checks pass, cut `release/v1.0.0` from `develop`, bump version to `1.0.0`, PR to `main`, tag `v1.0.0`, create GitHub release marked as Latest, sync `develop`. This is the production deploy.

---

## File Map

```
ladder/
├── .github/
│   └── workflows/
│       └── ci.yml                                          (T1)
├── src/
│   ├── app/
│   │   ├── layout.tsx                                      (T1, T9 — add StoreHydration)
│   │   ├── page.tsx                                        (T4)
│   │   ├── [track]/
│   │   │   ├── page.tsx                                    (T5)
│   │   │   ├── TrackDomainView.tsx                         (T5)
│   │   │   └── [domain]/
│   │   │       ├── page.tsx                                (T6)
│   │   │       └── [competency]/
│   │   │           ├── page.tsx                            (T7)
│   │   │           └── __tests__/
│   │   │               └── page.test.tsx                   (T7)
│   │   └── __tests__/
│   │       └── page.test.tsx                               (T4)
│   ├── components/
│   │   ├── ProgressRing.tsx                                (T5)
│   │   ├── TrackDomainList.tsx                             (T8)
│   │   ├── CompetencyAssessmentView.tsx                    (T8, T9)
│   │   ├── ExploreButtonClient.tsx                         (T6)
│   │   ├── StoreHydration.tsx                              (T9)
│   │   └── __tests__/
│   │       ├── ProgressRing.test.tsx                       (T5)
│   │       ├── TrackDomainList.test.tsx                    (T8)
│   │       ├── CompetencyAssessmentView.test.tsx           (T8, T9)
│   │       ├── ExploreButtonClient.test.tsx                (T6)
│   │       └── StoreHydration.test.tsx                     (T9)
│   ├── content/
│   │   ├── tracks.ts                                       (T3)
│   │   └── __tests__/
│   │       └── schema.test.ts                              (T3)
│   ├── lib/
│   │   ├── types.ts                                        (T2)
│   │   ├── store.ts                                        (T2)
│   │   ├── content.ts                                      (T4)
│   │   └── __tests__/
│   │       ├── store.test.ts                               (T2)
│   │       └── content.test.ts                             (T4)
│   └── test-setup.ts                                       (T1)
├── e2e/
│   └── coming-soon.spec.ts                                 (T10)
├── docs/
│   ├── 2026-09-26-ladder-design.md
│   ├── 2026-09-26-ladder-v1-plan.md
│   └── CONTRIBUTING.md
├── vitest.config.ts                                        (T1)
├── playwright.config.ts                                    (T1)
└── package.json
```
