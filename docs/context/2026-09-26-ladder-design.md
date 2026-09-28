# Ladder — Design Spec
**Date:** 2026-09-26
**Status:** Approved for implementation planning
**Owner:** Rikesh Shrestha

---

## Problem

Leapfrog engineers (P2–P7, ~500 people across Dev, QA, Data, AI tracks) lack a single place to understand where they are on the career ladder, what the next level looks like, and how to self-assess their own progress. Career path clarity is the #2 reason engineers leave — not compensation. A platform that makes the ladder visible and self-assessable directly addresses retention, promotion fairness, and 1:1 development conversation quality.

---

## Proof of Value

| Claim | Evidence | Quality |
|---|---|---|
| Career path opacity is #2 departure reason | Gallup 2025; 45% say advancement clarity would make them stay | Strong |
| Structured ladder reduces turnover dramatically | Princeton RSE: 70% → 7% turnover after ladder rollout | Strong (peer-reviewed, arXiv:2602.19353) |
| Internal mobility doubles tenure | LinkedIn Learning 2025: 5.4 vs 2.9 years | Strong |
| Self-assessment improves fairness perception 2.5x | SHRM 2024 | Strong |
| 75 companies publish ladders publicly | progression.fyi | Observable fact |
| Unmanaged attrition cost exceeds platform build cost | Replacement = 33–200% annual salary per engineer | Strong |

Self-assessment only delivers the 2.5x fairness improvement when anchored to observable criteria — exactly what the LFT competency matrix provides.

---

## What We're Building

**Ladder** — a web platform where Leapfrog engineers browse their career matrix by track and level, self-assess against observable criteria, and track their own growth progress. Engineers see where they are, where they're going, and what evidence closes the gap.

---

## Scope

### v1 (Ship now — anonymous)
- All 4 tracks (Dev, QA, Data, AI) visible
- 4 universal domains live for all tracks: Delivery, Leadership, Feedback/Communication/Collaboration, Strategic Impact
- Technical Skills domain: live for Dev track; "coming soon" placeholder for QA/Data/AI tracks
- Browse all P2–P7 levels; engineer sets their current level in-browser
- Current level highlighted; focused view toggle collapses to current + next level only
- Per-level: descriptor text + checkable criteria
- Self-rating per competency: Developing | Meeting | Exceeding
- Progress rings on domain overview (% criteria checked)
- State in localStorage — no login, no backend

### v2 (Auth + persistence — additive, no rewrite)
- Google SSO / LFT email login (Supabase Auth)
- Saved assessments in Postgres
- Evidence upload per criterion — private, per-user (Supabase Storage + RLS)
- Manager dashboard: team snapshot view
- QA/Data/AI Technical Skills content added as built

---

## Information Architecture

```
/ (home)
  → Pick track: Dev | QA | Data | AI
  → Set your level: P2 | P3 | P4 | P5 | P6 | P7

/[track]
  → Domain cards: Delivery | Leadership | FCC | Strategic Impact | Technical Skills
  → Progress ring per domain (% criteria met at current level)
  → Technical Skills card: "coming soon" badge for QA/Data/AI

/[track]/[domain]
  → Competency list with progress indicators

/[track]/[domain]/[competency]
  → All levels shown (P2–P7)
  → Current level: highlighted card with colored border + "Your level" badge
  → Focused view toggle (sticky, persisted in localStorage): collapses to current + next level
  → Per level:
      - Descriptor text
      - Checkable criteria list
      - Self-rating: Developing | Meeting | Exceeding
  → v2: evidence upload button per criterion
```

---

## Data Model

### Content (build-time, from markdown)

```
Track          → dev | qa | data | ai
  Domain       → delivery | leadership | fcc | strategic-impact | technical-skill
    Competency → writing-code | testing | debugging | ...
      Level    → p2 | p3 | p4 | p5 | p6 | p7
        descriptor: string
        criteria: string[]
```

Content sourced from `competencies/` markdown files, parsed at build time via gray-matter + remark. New tracks and new track-specific competencies are added by dropping markdown files into the content tree — no code change required.

### v1 — localStorage schema

```json
{
  "currentTrack": "dev",
  "currentLevel": "p4",
  "focusedView": true,
  "assessments": {
    "dev/technical-skill/writing-code": {
      "selfRating": "meeting",
      "criteriaChecked": ["c1", "c3"],
      "updatedAt": "2026-09-26T10:00:00Z"
    }
  }
}
```

### v2 — Persisted backend (schema is provider-agnostic)

```sql
assessments        (id, user_id, track, domain, competency, level, self_rating, updated_at)
criteria_checks    (id, assessment_id, criteria_id, met)
evidence_files     (id, assessment_id, criteria_id, storage_key, filename, uploaded_at)
```

Per-user access control on `evidence_files`: users can only read/write their own rows. Evidence files served via signed URLs only — never public.

**Provider strategy:**
- **v2 initial:** Supabase (Auth + Postgres + Storage) — fastest to ship, managed, zero infra ops.
- **v2 migration target:** LFT-owned AWS ecosystem — Cognito (auth), RDS Postgres (database), S3 + IAM (storage). Triggered when data sovereignty or security requirements demand it.

The data access layer in Next.js API routes is abstracted behind a repository interface — swapping Supabase for AWS is a provider adapter change, not a rewrite. The DB schema, evidence file structure, and signed URL pattern are identical across both providers.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 App Router | Static now; API routes ready for v2 auth |
| Styling | Tailwind CSS + shadcn/ui | Fast, consistent, accessible |
| Content | gray-matter + remark | Parse existing markdown at build time, no CMS |
| State (v1) | Zustand + localStorage | Simple, zero infra |
| Deploy | Vercel | Zero config, GitHub CI/CD, preview deploys per PR |
| Auth (v2 initial) | Supabase Auth | Google SSO, fastest to ship |
| Database (v2 initial) | Supabase Postgres | Managed, no infra ops |
| Storage (v2 initial) | Supabase Storage | Signed URLs, per-user access |
| Auth (v2 migration) | AWS Cognito | LFT-owned, data sovereignty |
| Database (v2 migration) | AWS RDS Postgres | Same schema, LFT-controlled |
| Storage (v2 migration) | AWS S3 + IAM | Private buckets, signed URLs |
| Data layer | Repository interface | Abstracts provider — swap is adapter change not rewrite |

---

## Content Source Mapping (v1)

| Track | Domain | Source |
|---|---|---|
| All | Delivery | `competencies/delivery/` |
| All | Leadership | `competencies/leadership/` |
| All | FCC | `competencies/feedback-communication-collaboration/` |
| All | Strategic Impact | `competencies/strategic-impact/` |
| Dev | Technical Skill | `competencies/technical-skill/` |
| QA / Data / AI | Technical Skill | "Coming soon" placeholder |

The LFT engineering competency matrix (`competencies/lft-engineering-competency-matrix.md`) provides the P2–P7 level descriptors and criteria for all universal domains.

---

## Phase Boundaries

| Capability | v1 | v2 |
|---|---|---|
| All tracks visible | ✓ | ✓ |
| 4 universal domains | ✓ | ✓ |
| Dev Technical Skills | ✓ | ✓ |
| QA/Data/AI Technical Skills | Coming soon | ✓ when content built |
| Browse all levels + focused toggle | ✓ | ✓ |
| Progress rings | ✓ | ✓ |
| Self-assessment + criteria checks | ✓ localStorage | ✓ Supabase |
| Authentication | ✗ | ✓ Google SSO |
| Saved assessments | ✗ | ✓ |
| Evidence upload (private) | ✗ | ✓ |
| Manager dashboard | ✗ | ✓ |

---

## Non-Goals (v1)

- No manager visibility of engineer assessments
- No notifications or reminders
- No comparison to peers or team averages
- No integration with HRIS or performance review tools
- No mobile app (responsive web is sufficient)

---

## Success Criteria (v1)

- Engineers can self-assess all universal domains across all 4 tracks
- Progress persists across browser sessions (localStorage)
- Focused view reduces noise to current + next level on demand
- New tracks' Technical Skills content slots in without code change
- Deploys to Vercel from GitHub main branch in < 5 minutes
- Lighthouse performance score ≥ 90

---

## Related

- `competencies/` — source of truth for all competency content
- `competencies/lft-engineering-competency-matrix.md` — P2–P7 matrix, all domains
- `competencies/index.md` — competency catalogue, build pipeline status
- POV sources: arXiv:2602.19353, LinkedIn Learning 2025, SHRM 2024, progression.fyi
