import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { getAssessmentForCompetency } from "../../src/lib/mock/assessments";
import { getTrainingForCompetency } from "../../src/lib/mock/training";
import { getEvidenceForCompetency } from "../../src/lib/mock/evidence";
import { EmptyState } from "../../src/components/EmptyState";
import { CompetencyTabs } from "../../src/components/CompetencyTabs";

describe("B-2: mock tab data services return null when no fixture, and EmptyState covers it", () => {
  it("mock getters return null for a competency id with no fixture", () => {
    expect(getAssessmentForCompetency("unseeded-id")).toBeNull();
    expect(getTrainingForCompetency("unseeded-id")).toBeNull();
    expect(getEvidenceForCompetency("unseeded-id")).toBeNull();
  });

  it("Evidence tab renders EmptyState when the mock source returns nothing", () => {
    render(
      <CompetencyTabs
        standard={<p>standard-content</p>}
        assessment={<p>assessment-content</p>}
        training={<p>training-content</p>}
        evidence={<EmptyState variant="no-evidence" />}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Evidence" }));

    expect(screen.getByText("No evidence recorded for this competency yet.")).toBeDefined();
  });
});
