import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import TrainingDetailPage from "../../src/app/competencies/[id]/training/[unitId]/page";

afterEach(cleanup);

describe("B-3: training detail route renders correct unit view", () => {
  it("renders content for a concept_notes unit", async () => {
    const page = await TrainingDetailPage({
      params: Promise.resolve({ id: "demo", unitId: "tu-cn-1" }),
    });
    render(page);
    expect(
      screen.getByText("Understand the core principles of the domain.")
    ).toBeDefined();
  });

  it("does not render a PrereqStepper for concept_notes", async () => {
    const page = await TrainingDetailPage({
      params: Promise.resolve({ id: "demo", unitId: "tu-cn-1" }),
    });
    render(page);
    expect(screen.queryByTestId("prereq-stepper")).toBeNull();
  });
});
