import { Client } from "pg";

export async function seed(connectionString: string): Promise<void> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    const competency = await client.query(
      "INSERT INTO competencies (name, domains) VALUES ($1, $2) RETURNING id",
      ["Technical Skill", ["development", "devops"]]
    );
    const competencyId = competency.rows[0].id;

    const pf = await client.query(
      "INSERT INTO primary_functions (competency_id, name) VALUES ($1, $2) RETURNING id",
      [competencyId, "Quality & Testing"]
    );
    const pfId = pf.rows[0].id;

    // P6 intentionally has no standard row (inapplicable-at-level gap).
    const standardLevels: Record<string, string> = {
      P2: "A practitioner at this level can write a function with explicit edge-case and error-handling branches that a reviewer can approve without a walkthrough, and write a unit test for a new function using the team's test framework, with guidance from a senior engineer.",
      P3: "A practitioner at this level can write unit and higher-level tests unaided, covering edge cases and error paths in addition to the happy path, and write a docstring that explains non-obvious function intent without commenting self-evident code.",
      P4: "A practitioner at this level can write production-ready, self-documenting code that reserves comments for non-obvious rationale only, and write a test suite spanning multiple testing-pyramid layers for a feature, unaided.",
      P5: "A practitioner at this level can recommend a testing-pyramid-aligned fix for a gap surfaced by the team's quality metrics.",
      P7: "A practitioner at this level can set an organization-wide testing standard with a mechanism for measuring team adherence.",
    };
    for (const [level, body] of Object.entries(standardLevels)) {
      await client.query(
        "INSERT INTO standards (pf_id, level, body) VALUES ($1, $2, $3)",
        [pfId, level, body]
      );
    }

    const instrument = await client.query(
      "INSERT INTO instruments (pf_id, name, rows) VALUES ($1, $2, $3) RETURNING id",
      [
        pfId,
        "Code Review Rubric",
        JSON.stringify({
          criteria: [
            "Edge-case & error-path coverage",
            "Test-pyramid layer selection",
            "Readability without walkthrough",
          ],
        }),
      ]
    );
    const instrumentId = instrument.rows[0].id;

    await client.query(
      "INSERT INTO badges (pf_id, name, level, evidence_required) VALUES ($1, $2, $3, $4)",
      [pfId, "Seed Badge", "P3", JSON.stringify({ instrument_id: instrumentId })]
    );

    // Training sequence: each unit's prereqs only point to earlier-sequenced units.
    const sequence: { level: string; note: string }[] = [
      { level: "P2", note: "Write testable code + unit tests, in a client's own conventions" },
      { level: "P3", note: "Unaided edge-case and error-path test coverage" },
      { level: "P4", note: "Multi-layer test suite for a full feature" },
    ];
    const insertedIds: string[] = [];
    for (const unit of sequence) {
      const row = await client.query(
        "INSERT INTO training_units (competency_id, level, prereqs) VALUES ($1, $2, $3) RETURNING id",
        [competencyId, unit.level, JSON.stringify(insertedIds)]
      );
      insertedIds.push(row.rows[0].id);
    }

    // P7 intentionally has no training units (P6/P7 gap — no guided-exercise/autonomous-project rows).
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  const connectionString =
    process.env.DATABASE_URL ?? "postgres://ladder:ladder@localhost:55432/ladder";
  seed(connectionString)
    .then(() => {
      console.log("seed applied");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
