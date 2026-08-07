## TSD S-0004.07 — Training viewer (mock-backed)  (PRD §S-0004.07)
| Aspect | Spec |
|--------|------|
| Interfaces | Mock service returning training items by subtype (Learning Path, Concept Notes, Guided Exercises, Autonomous Projects, Onboarding Track), shaped per `design/03-training-viewer.md`. |
| Data / State | Mock fixtures only. |
| Behavior | A competency's Training tab / detail page renders the correct subtype layout for each item's type; Learning Path shows prerequisites + ordered sequence with level gates, other subtypes show their own structured fields. Navigating from the tab to a specific item renders its detail page. |
| Access | Public — no auth required. |
| Boundaries | none |
| Tests | unit (each of the 5 subtypes renders its required fields from a populated fixture) / integration (Training tab → item detail navigation renders the matching subtype view) |
