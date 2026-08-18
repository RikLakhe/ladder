-- 0004_competency_page_completeness.sql
-- Adds fields required for the Competency Page Completeness feature.
-- Idempotent: safe to re-run on an already-migrated database.

-- description: free-text summary for a competency
ALTER TABLE competencies ADD COLUMN IF NOT EXISTS description text;

-- pf_number: short identifier (e.g. "PF-01") for a primary function
-- domain_classification: domain label (e.g. "Technical", "Leadership")
ALTER TABLE primary_functions ADD COLUMN IF NOT EXISTS pf_number text;
ALTER TABLE primary_functions ADD COLUMN IF NOT EXISTS domain_classification text;

-- competency_id on functional_analyses: direct link to the parent competency
-- (denormalised alongside pf_id for efficient competency-level FA queries)
ALTER TABLE functional_analyses ADD COLUMN IF NOT EXISTS competency_id uuid REFERENCES competencies(id);

-- content: the full text of a competency-level functional analysis entry
ALTER TABLE functional_analyses ADD COLUMN IF NOT EXISTS content text;
