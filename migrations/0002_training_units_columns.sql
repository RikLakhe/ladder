-- 0002_training_units_columns.sql — add missing columns to training_units
-- Idempotent: ADD COLUMN IF NOT EXISTS

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'training_unit_type') THEN
    CREATE TYPE training_unit_type AS ENUM (
      'learning_path',
      'concept_notes',
      'guided_exercise',
      'autonomous_project',
      'onboarding',
      'reference_card'
    );
  END IF;
END
$$;

ALTER TABLE training_units ADD COLUMN IF NOT EXISTS type training_unit_type;
ALTER TABLE training_units ADD COLUMN IF NOT EXISTS sequence_order integer;
ALTER TABLE training_units ADD COLUMN IF NOT EXISTS content text;
