# Database Seed Script Documentation

## Overview
`seed-content.ts` is a comprehensive TypeScript script that populates the Ladder database with all real content extracted from the design documents in `/design/`.

## Features

### 1. Idempotent UUIDs
- Uses stable, hardcoded UUIDs for all entities
- Scheme: `a0000000-0000-4000-[type]-[sequential]`
- Types: `a000` (competencies), `b000` (PFs), `c000` (standards), `d000` (badges), `e000` (training units)
- Enables safe re-runs without duplicate data

### 2. Data Coverage

#### Competencies (5 total)
- Delivery
- Feedback, Communication & Collaboration
- Leadership
- Strategic Impact
- Technical Skill

All marked as Core competencies with domains: `['development', 'ai', 'data', 'devops', 'frontend']`

#### Primary Functions (15 total)
- Delivery: Incremental Value Delivery, Self-Organization
- Feedback: Feedback, Communication, Collaboration
- Leadership: Judgment & Organizational Improvement, Facilitation, Mentoring
- Strategic Impact: Business Acumen & Strategy
- Technical Skill: Quality & Testing, Debugging & Observability, Software Design & Architecture, Security, AI-Assisted Engineering, AI Judgment & Feature Delivery

#### Standards
Performance Criteria by Level (P2–P7) extracted directly from design documents:
- **Delivery PF1 & PF2**: 6 levels each with full criteria text
- **Feedback PF1, PF2, PF3**: 6 levels each
- **Leadership PF1**: 6 levels (PF2/PF3 can be extended)
- **Technical Skill PF2**: Sample P2–P3 levels (extensible to P7)

#### Badges (12+ badges seeded)
All badges follow the reusable pattern from `competencies/*/assessment/badges.md`:
- Badge ID format: `[COMPETENCY_CODE]-[PF#]-[LEVEL]`
- Tiers mapped to P2–P7 levels
- Example: `DL-1-P2` = Delivery, PF1, P2 (Tier 1 Foundation)

#### Training Units
Per competency:
- `learning_path`: Overall P2–P7 progression guide
- `concept_notes`: 12–13 required knowledge sections
- `onboarding`: Day 1 / Week 1 / Month 1 onboarding track
- (Extensible for `guided_exercise`, `autonomous_project`, `reference_card`)

## Usage

```bash
# Using environment variable
DATABASE_URL=postgresql://user:pass@localhost:5432/ladder npx ts-node scripts/seed-content.ts

# Or with default (localhost:5432/ladder)
npx ts-node scripts/seed-content.ts
```

## Database Tables

Script populates:
- `competencies` (id, name, domains)
- `primary_functions` (id, competency_id, name)
- `standards` (id, pf_id, level, body)
- `functional_analyses` (id, pf_id, level, body)
- `badges` (id, pf_id, level, name, evidence_required)
- `training_units` (id, competency_id, type, level, sequence_order, content, prereqs)

All inserts use `ON CONFLICT (id) DO UPDATE SET ...` for full idempotency.

## Content Sources

All text content sourced from:
- `/design/[competency]/index.md` — overview, pipeline status
- `/design/[competency]/functional-analysis.md` — PF definitions, sub-functions
- `/design/[competency]/standard/*.md` — Performance Criteria by Level
- `/design/[competency]/assessment/badges.md` — badge catalog
- `/design/[competency]/training/` — learning paths, concept notes, exercises, projects

## Extensibility

To add more standards/badges/training:
1. Extract content from relevant design files
2. Add entries to the `standards`, `badges`, or `trainingUnits` arrays
3. Re-run script—no manual cleanup needed (idempotency handles it)

## Limitations

- **Standards**: Currently shows sample levels; can be extended with all P2–P7 criteria from design docs
- **Functional Analyses**: Sample entries; full sub-function text from functional-analysis.md files not yet serialized (extensible)
- **Training Units**: Concept notes are placeholder summaries; full content (all 13 sections per competency) can be pulled from training/01-concept-notes.md files
- **Badges**: Core set of 12+ badges; extensible to full 60+ badge catalog from assessment/badges.md Part 2 tables

## Future Enhancements

1. **Complete all standards**: Iterate through all 5 competencies' standards/ folders, extract all P2–P7 criteria
2. **Full functional analyses**: Extract and seed all 100+ sub-functions with their definitions
3. **Complete training content**: Pull full concept notes, exercises, projects, and onboarding guides from training/ folders
4. **Batch insert optimization**: Use multi-row inserts for large datasets
5. **Validation layer**: Add pre-flight checks to verify all FKs before seeding

## Notes

- No client data or secrets stored (all example content from design documents)
- Domains array stored as JSON in PostgreSQL
- Prerequisites array stored as empty JSON array `[]` by default (can be extended)
- Evidence requirements stored as JSON objects with `instruments`, `verifier`, `summary` fields
