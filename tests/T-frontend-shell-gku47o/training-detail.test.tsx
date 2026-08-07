import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
// @ts-expect-error — page default export resolved after implementation
import TrainingDetailPage from "../../src/app/competencies/[id]/training/[unitId]/page";

afterEach(cleanup);

describe("B-3: training detail page renders the correct subtype view", () => {
  it("renders concept_notes unit content", async () => {
    const jsx = await TrainingDetailPage({
      params: Promise.resolve({ id: "demo", unitId: "tu-cn-1" }),
    });
    render(jsx);
    expect(screen.getByText("Understand the core principles of the domain.")).toBeDefined();
  });

  it("concept_notes detail page has no prereq stepper", async () => {
    const jsx = await TrainingDetailPage({
      params: Promise.resolve({ id: "demo", unitId: "tu-cn-1" }),
    });
    render(jsx);
    expect(screen.queryByTestId("prereq-stepper")).toBeNull();
  });
});
