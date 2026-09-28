# Product — Ladder

> Absolute truth of the current product. Update when the product meaningfully changes.
> Human-maintained — `lane fold` does not write to this file.

## What it is

Ladder is a web platform where Leapfrog engineers (P2–P7, ~500 people across Dev, QA, Data, and AI tracks) browse the LFT career competency matrix by track and level, self-assess against observable criteria, and track their own growth progress — with no login required in v1.

## Who uses it

Leapfrog engineers at all seniority levels (P2–P7) across four engineering tracks: Development, Quality Assurance, Data, and AI/ML. They use it to understand where they are on the career ladder, what the next level looks like, and how to self-assess their own progress. It also improves the quality of 1:1 development conversations between engineers and managers.

## What it does

**v1 (current — anonymous, localStorage-only):**
- Displays all 4 tracks (Dev, QA, Data, AI) and all 6 levels (P2–P7)
- Shows 4 universal domains for all tracks: Delivery, Leadership, Feedback/Communication/Collaboration (FCC), Strategic Impact
- Shows Technical Skills domain fully populated for Dev track; "coming soon" placeholder for QA/Data/AI
- Engineer sets their current track and level in-browser; selection persists in localStorage
- Focused view toggle collapses the competency detail view to current + next level only (persisted in localStorage)
- Per level: descriptor text + checkable criteria list
- Self-rating per competency: Developing | Meeting | Exceeding
- Progress rings on domain overview cards showing % criteria checked at current level
- All state in localStorage — no login, no backend

**v2 (planned — additive, no rewrite):**
- Google SSO / LFT email login via Supabase Auth
- Saved assessments in Postgres
- Evidence upload per criterion — private, per-user (Supabase Storage + RLS)
- Manager dashboard: team snapshot view
- QA/Data/AI Technical Skills content added as built

## What it doesn't do

**v1 out of scope:**
- No manager visibility of engineer assessments
- No notifications or reminders
- No comparison to peers or team averages
- No integration with HRIS or performance review tools
- No mobile app (responsive web only)
- No authentication or backend persistence
- No QA/Data/AI Technical Skills content (placeholder only)

**v2 out of scope:**
- No peer review or 360-degree feedback
- No automated promotion recommendations
- No integration with payroll or HR systems
