import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";

const PORT = 34127;
const BASE_URL = `http://localhost:${PORT}`;

let server: ChildProcess;

async function waitForServer(timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(BASE_URL);
      if (res.ok) return;
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error("Next.js dev server did not become ready in time");
}

beforeAll(async () => {
  server = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    stdio: "ignore",
    detached: true,
  });
  await waitForServer(30_000);
}, 40_000);

afterAll(() => {
  if (server?.pid) {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      // already exited
    }
  }
});

describe("B-1: GET / route", () => {
  it("returns a successful response with placeholder content", async () => {
    const res = await fetch(BASE_URL);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body.length).toBeGreaterThan(0);
  });
});
