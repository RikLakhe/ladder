-- 0001_init.sql — shared data model migration (idempotent, safe on a fresh database)

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS competencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS primary_functions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competency_id uuid NOT NULL REFERENCES competencies(id),
  name text NOT NULL
);

CREATE TABLE IF NOT EXISTS standards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pf_id uuid NOT NULL REFERENCES primary_functions(id),
  level text NOT NULL,
  body text
);

CREATE TABLE IF NOT EXISTS functional_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pf_id uuid NOT NULL REFERENCES primary_functions(id),
  level text NOT NULL,
  body text
);

CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pf_id uuid NOT NULL REFERENCES primary_functions(id),
  level text NOT NULL,
  evidence_required jsonb
);

ALTER TABLE badges ADD COLUMN IF NOT EXISTS name text NOT NULL DEFAULT '';
ALTER TABLE badges ALTER COLUMN name DROP DEFAULT;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS badge_code text;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS tier text;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS certifies text;

-- domains: a competency can span multiple domains (e.g. development, devops, ai, data);
-- distinct from environment/deployment domains like dev/qa, which are out of scope here.
ALTER TABLE competencies ADD COLUMN IF NOT EXISTS domains text[] NOT NULL DEFAULT '{}';

CREATE TABLE IF NOT EXISTS instruments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pf_id uuid NOT NULL REFERENCES primary_functions(id),
  name text NOT NULL,
  rows jsonb
);

CREATE TABLE IF NOT EXISTS training_units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competency_id uuid NOT NULL REFERENCES competencies(id),
  level text NOT NULL,
  prereqs jsonb
);

CREATE TABLE IF NOT EXISTS document_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_table text NOT NULL,
  entity_id uuid NOT NULL,
  change_note text NOT NULL,
  changed_by uuid NOT NULL REFERENCES admin_users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Non-superuser role that RLS policies below actually constrain (superusers/owners bypass RLS).
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'app_user') THEN
    CREATE ROLE app_user LOGIN PASSWORD 'app_user';
  END IF;
END
$$;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;

-- is_admin(): true when the session's declared user id (app.current_user_id GUC, set per
-- connection by the app layer after authentication) matches a row in admin_users.
CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
  );
$$ LANGUAGE sql STABLE;

DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['competencies','primary_functions','standards','functional_analyses','badges','instruments','training_units','document_versions']
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS %I_select ON %I', t, t);
    EXECUTE format('CREATE POLICY %I_select ON %I FOR SELECT USING (true)', t, t);
    EXECUTE format('DROP POLICY IF EXISTS %I_write ON %I', t, t);
    EXECUTE format('CREATE POLICY %I_write ON %I FOR ALL USING (is_admin()) WITH CHECK (is_admin())', t, t);
  END LOOP;
END
$$;
