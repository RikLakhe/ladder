"use client";

import { useEffect, useState } from "react";
import { getFocusPanel, getWhatsNextPanel } from "../lib/homePanels";

const STORAGE_KEY = "ladder-level";

export function HomePanels() {
  const [level, setLevel] = useState<string | null>(null);

  useEffect(() => {
    setLevel(sessionStorage.getItem(STORAGE_KEY));
  }, []);

  const focus = getFocusPanel(level);
  const whatsNext = getWhatsNextPanel(level);

  return (
    <>
      {focus && (
        <section aria-label="Focus">
          <h2>{focus.title}</h2>
          <p>{focus.description}</p>
        </section>
      )}
      {whatsNext && (
        <section aria-label="What's Next">
          <h2>{whatsNext.title}</h2>
          <p>{whatsNext.description}</p>
        </section>
      )}
    </>
  );
}
