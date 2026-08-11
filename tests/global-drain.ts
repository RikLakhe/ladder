import { beforeAll } from "vitest";
import { execSync } from "node:child_process";

// All ports reserved by e2e test files in this worktree
const TEST_PORTS = [
  34127, 34128, 34129, 34130, 34131, 34132, 34133, 34134, 34135,
  34199,
  34204,
  34210, 34211, 34212, 34213, 34260, 34270, 34271, 34272, 34301, 34302, 34310,
  34320, 34321, 34322,
];

function pidsOnPorts(ports: number[]): string[] {
  const pids: string[] = [];
  for (const port of ports) {
    try {
      const out = execSync(`lsof -ti :${port} 2>/dev/null`, {
        encoding: "utf8",
      }).trim();
      if (out) pids.push(...out.split("\n").filter(Boolean));
    } catch {
      // port not in use — ignore
    }
  }
  return [...new Set(pids)];
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

beforeAll(async () => {
  // Gracefully stop lingering dev servers so PostgreSQL drains their
  // connections before the next test's migrate() runs.
  const pids = pidsOnPorts(TEST_PORTS);
  if (pids.length > 0) {
    try {
      execSync(`kill -TERM ${pids.join(" ")} 2>/dev/null || true`);
    } catch { /* ignore */ }
    await sleep(1500);
    const survivors = pidsOnPorts(TEST_PORTS);
    if (survivors.length > 0) {
      try {
        execSync(`kill -9 ${survivors.join(" ")} 2>/dev/null || true`);
      } catch { /* ignore */ }
      await sleep(500);
    }
  }

});
