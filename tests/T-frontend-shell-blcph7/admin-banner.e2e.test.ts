import { describe, it, expect } from "vitest";

const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3000";

describe("Admin banner — B-2", () => {
  it("GET / with admin_session cookie includes banner text", async () => {
    const res = await fetch(`${BASE}/`, {
      headers: { Cookie: "admin_session=system" },
    });
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("Signed in as system");
  });

  it("GET / without admin_session cookie does not include banner text", async () => {
    const res = await fetch(`${BASE}/`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).not.toContain("Signed in as system");
  });
});
