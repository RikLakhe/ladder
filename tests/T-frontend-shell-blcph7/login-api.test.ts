import { describe, it, expect } from "vitest";
import { POST } from "../../src/app/api/admin/login/route";

describe("POST /api/admin/login — B-1", () => {
  it("returns 401 and no Set-Cookie for wrong credentials", async () => {
    const req = new Request("http://localhost/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "wrong", password: "wrong" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(res.headers.get("Set-Cookie")).toBeNull();
  });

  it("returns 200 and sets admin_session cookie for correct credentials", async () => {
    const req = new Request("http://localhost/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "system", password: "TEST@123" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const cookie = res.headers.get("Set-Cookie");
    expect(cookie).not.toBeNull();
    expect(cookie).toContain("admin_session=");
  });
});
