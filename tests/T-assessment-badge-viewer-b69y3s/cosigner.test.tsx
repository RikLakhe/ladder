import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BadgeDetail } from "../../src/components/BadgeDetail";

afterEach(cleanup);

const BASE_PROPS = {
  badgeCode: "X",
  name: "N",
  tier: "Bronze",
  level: "P3",
  certifies: "C.",
  completionBar: "1/2",
  verifierRole: "Lead",
  cosignerRequired: false,
};

describe("B-1: co-signer indicator toggles on cosignerRequired", () => {
  it("absent when cosignerRequired=false", () => {
    render(<BadgeDetail {...BASE_PROPS} cosignerRequired={false} />);
    expect(screen.queryByTestId("cosigner-indicator")).toBeNull();
  });

  it("present when cosignerRequired=true", () => {
    render(<BadgeDetail {...BASE_PROPS} cosignerRequired={true} />);
    expect(screen.getByTestId("cosigner-indicator")).toBeTruthy();
  });
});
