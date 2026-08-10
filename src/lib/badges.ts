import { Client } from "pg";

export type Badge = {
  id: string;
  badgeCode?: string;
  name: string;
  tier?: string | null;
  certifies?: string;
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

export type EvidenceResult = {
  instrumentId: string;
  rowKey: string;
  resolved: boolean;
  rowText?: string;
};

export async function getBadgesForPrimaryFunction(
  connectionString: string,
  pfId: string,
  level?: string
): Promise<Badge[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    let query = "SELECT id, badge_code, name, tier, certifies, level FROM badges WHERE pf_id = $1";
    const params: (string | undefined)[] = [pfId];

    if (level !== undefined) {
      query += " AND level = $2";
      params.push(level);
    }

    const result = await client.query(query, params);
    return result.rows.map((row) => ({
      id: row.id,
      badgeCode: row.badge_code,
      name: row.name,
      tier: row.tier,
      certifies: row.certifies,
      level: row.level,
    }));
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

export async function getEvidenceForBadge(
  connectionString: string,
  badgeCode: string
): Promise<EvidenceResult[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    // Get badge and its evidence_required
    const badgeResult = await client.query(
      "SELECT evidence_required FROM badges WHERE badge_code = $1",
      [badgeCode]
    );

    if (badgeResult.rows.length === 0) {
      return [];
    }

    const evidenceRequired = badgeResult.rows[0].evidence_required || [];

    // For each evidence entry, resolve it
    const results: EvidenceResult[] = [];
    for (const entry of evidenceRequired) {
      const instrumentId = entry.instrument_id;
      const rowKey = entry.row_key;

      // Try to find the instrument
      const instrumentResult = await client.query(
        "SELECT rows FROM instruments WHERE id = $1::uuid",
        [instrumentId]
      );

      if (instrumentResult.rows.length === 0) {
        // Instrument not found
        results.push({
          instrumentId,
          rowKey,
          resolved: false,
        });
        continue;
      }

      // Instrument found, search for the row_key in the rows array
      const rows = instrumentResult.rows[0].rows || [];
      const foundRow = rows.find(
        (row: { key: string; text: string }) => row.key === rowKey
      );

      if (foundRow) {
        // Row found
        results.push({
          instrumentId,
          rowKey,
          resolved: true,
          rowText: foundRow.text,
        });
      } else {
        // Row not found
        results.push({
          instrumentId,
          rowKey,
          resolved: false,
        });
      }
    }

    return results;
  } finally {
    await client.end();
  }
}
