"use client";

import { useState } from "react";

export default function FACollapsible({ content }: { content: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen((v) => !v)}>
        {open ? "Hide" : "Show"} Functional Analysis
      </button>
      {open && <p>{content}</p>}
    </div>
  );
}
