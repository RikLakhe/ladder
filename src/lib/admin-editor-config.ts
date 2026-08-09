import type { FieldConfig } from "../components/GenericEntityEditor";
import type { EntityType } from "./mock/cms";

export const editorConfigs: Record<EntityType, FieldConfig[]> = {
  competency: [{ key: "name", label: "Name", type: "text" }],
  "primary-function": [
    { key: "name", label: "Name", type: "text" },
    { key: "competency_id", label: "Competency ID", type: "text" },
  ],
  standard: [
    { key: "body", label: "Body", type: "text" },
    { key: "level", label: "Level", type: "text" },
    { key: "pf_id", label: "Primary Function ID", type: "text" },
  ],
  badge: [
    { key: "name", label: "Name", type: "text" },
    { key: "level", label: "Level", type: "text" },
    { key: "pf_id", label: "Primary Function ID", type: "text" },
  ],
  instrument: [
    { key: "name", label: "Name", type: "text" },
    { key: "competency_id", label: "Competency ID", type: "text" },
  ],
  "training-unit": [
    { key: "name", label: "Name", type: "text" },
    { key: "competency_id", label: "Competency ID", type: "text" },
  ],
  "functional-analysis": [
    { key: "name", label: "Name", type: "text" },
    { key: "competency_id", label: "Competency ID", type: "text" },
  ],
};
