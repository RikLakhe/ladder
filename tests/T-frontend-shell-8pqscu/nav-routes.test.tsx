import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import LevelViewPage from "../../src/app/level-view/page";
import TransitionGuidePage from "../../src/app/transition-guide/page";
import BadgesPage from "../../src/app/badges/page";
import VersionHistoryPage from "../../src/app/version-history/page";

describe("B-4 (e2e): every Shell nav route renders without throwing", () => {
  it.each([
    ["/level-view", LevelViewPage],
    ["/transition-guide", TransitionGuidePage],
    ["/badges", BadgesPage],
    ["/version-history", VersionHistoryPage],
  ])("renders %s", (_path, PageComponent) => {
    expect(() => render(<PageComponent />)).not.toThrow();
  });
});
