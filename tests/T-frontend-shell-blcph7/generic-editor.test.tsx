import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { GenericEntityEditor } from "../../src/components/GenericEntityEditor";
import type { FieldConfig } from "../../src/components/GenericEntityEditor";

afterEach(cleanup);

const competencyConfig: FieldConfig[] = [{ key: "name", label: "Name", type: "text" }];

const badgeConfig: FieldConfig[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "level", label: "Level", type: "text" },
  { key: "pf_id", label: "Primary Function", type: "text" },
];

describe("GenericEntityEditor — B-3", () => {
  it("renders correct fields for competency config (name only)", () => {
    render(
      <GenericEntityEditor
        fieldConfig={competencyConfig}
        initialValues={{ name: "" }}
        onSave={() => {}}
      />
    );
    expect(screen.getByLabelText(/name/i)).toBeTruthy();
    expect(screen.queryByLabelText(/level/i)).toBeNull();
    expect(screen.queryByLabelText(/primary function/i)).toBeNull();
  });

  it("renders correct fields for badge config (name, level, pf_id)", () => {
    render(
      <GenericEntityEditor
        fieldConfig={badgeConfig}
        initialValues={{ name: "", level: "", pf_id: "" }}
        onSave={() => {}}
      />
    );
    expect(screen.getByLabelText(/name/i)).toBeTruthy();
    expect(screen.getByLabelText(/level/i)).toBeTruthy();
    expect(screen.getByLabelText(/primary function/i)).toBeTruthy();
  });

  it("preview button disabled when change-note is empty", () => {
    render(
      <GenericEntityEditor
        fieldConfig={competencyConfig}
        initialValues={{ name: "old" }}
        onSave={() => {}}
      />
    );
    const preview = screen.getByRole("button", { name: /preview/i });
    expect((preview as HTMLButtonElement).disabled).toBe(true);
  });

  it("preview button enabled when change-note is filled", () => {
    render(
      <GenericEntityEditor
        fieldConfig={competencyConfig}
        initialValues={{ name: "old" }}
        onSave={() => {}}
      />
    );
    const changeNote = screen.getByPlaceholderText(/change note/i);
    fireEvent.change(changeNote, { target: { value: "Fixed typo" } });
    const preview = screen.getByRole("button", { name: /preview/i });
    expect((preview as HTMLButtonElement).disabled).toBe(false);
  });
});
