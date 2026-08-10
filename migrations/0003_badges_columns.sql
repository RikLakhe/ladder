-- 0003_badges_columns.sql — add badge detail columns
-- Idempotent: ADD COLUMN IF NOT EXISTS

ALTER TABLE badges ADD COLUMN IF NOT EXISTS badge_code TEXT;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS tier TEXT;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS certifies TEXT;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS completion_bar TEXT;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS verifier_role TEXT;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS cosigner_required BOOLEAN DEFAULT false;
