-- 0004_competency_description.sql — add description field to competencies
ALTER TABLE competencies ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '';
