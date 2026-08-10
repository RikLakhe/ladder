import { Client } from "pg";

export type Badge = {
  id: string;
  name: string;
  level: string;
};

export type EvidenceRef = {
  instrument_id: string;
  row_key: string;
  note?: string;
};

export type BadgeDetail = {
  badgeCode: string;
  name: string;
  tier: string | null;
  level: string;
  certifies: string | null;
  completionBar: string | null;
  verifierRole: string | null;
  cosignerRequired: boolean;
  evidenceRequired?: EvidenceRef[];
};

export async function getBadgesForPrimaryFunction(
  connectionString: string,
  pfId: string
): Promise<Badge[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      "SELECT id, name, level FROM badges WHERE pf_id = $1",
      [pfId]
    );
    return result.rows.map((row) => ({ id: row.id, name: row.name, level: row.level }));
  } finally {
    await client.end();
  }
}

export async function resolveEvidence(
  connectionString: string,
  ref: EvidenceRef
): Promise<{ text: string } | { broken: true }> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      "SELECT rows FROM instruments WHERE id = $1",
      [ref.instrument_id]
    );
    if (result.rows.length === 0) {
      return { broken: true };
    }
    const rows = result.rows[0].rows as Array<{ key: string; text: string }>;
    const row = rows.find((r) => r.key === ref.row_key);
    if (!row) {
      return { broken: true };
    }
    return { text: row.text };
  } finally {
    await client.end();
  }
}

export async function getBadgeByCode(
  connectionString: string,
  badgeCode: string
): Promise<BadgeDetail | null> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const result = await client.query(
      `SELECT badge_code, name, tier, level, certifies, completion_bar, verifier_role, cosigner_required, evidence_required
       FROM badges WHERE badge_code = $1`,
      [badgeCode]
    );
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return {
      badgeCode: row.badge_code,
      name: row.name,
      tier: row.tier,
      level: row.level,
      certifies: row.certifies,
      completionBar: row.completion_bar,
      verifierRole: row.verifier_role,
      cosignerRequired: row.cosigner_required,
      evidenceRequired: row.evidence_required || [],
    };
  } finally {
    await client.end();
  }
}
