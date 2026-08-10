import { Client } from "pg";

export type Badge = {
  id: string;
  name: string;
  level: string;
};

export type EvidenceResult = {
  instrumentId: string;
  rowKey: string;
  resolved: boolean;
  rowText?: string;
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
