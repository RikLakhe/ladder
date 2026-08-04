## TSD S-0001.01 — Shared data model migration (PRD §S-0001.01)
| Aspect | Spec |
|--------|------|
| Interfaces | A single repeatable, idempotent migration operation, invoked with no runtime arguments, applicable to a fresh database. |
| Data / State | Tables: `competencies`, `primary_functions`, `standards`, `functional_analyses`, `badges`, `instruments`, `training_units`, `document_versions`, `admin_users`. FKs: `primary_functions.competency_id → competencies.id`, `standards.pf_id → primary_functions.id`, `badges.pf_id → primary_functions.id`, `instruments.pf_id → primary_functions.id`, `training_units.competency_id → competencies.id`, `document_versions.changed_by → admin_users.id`. Row-level access policy per content table: read unrestricted, write restricted to rows present in `admin_users`. |
| Behavior | After running the migration against a fresh database, every table above exists with its documented columns and constraints; a read against any of them succeeds (empty result set is valid, missing table/column is not). |
| Access | Schema itself has no runtime caller; access policy behavior is exercised through S-0001.03 and the sibling features. |
| Boundaries | The database service itself (external, not owned by this story) — schema application depends on connecting to a real or ephemeral instance of it. |
| Tests | Integration: after migration, assert every listed table exists with its FK constraints enforced (an insert violating a FK is rejected) and that the write-policy rejects an unauthenticated/non-admin write while allowing an admin write. Smoke: run the migration against a fresh database end-to-end and query each table once. |
