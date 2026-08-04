import type { ReactNode } from "react";

export function ContentLayout({
  standard,
  badge,
  training,
}: {
  standard?: ReactNode;
  badge?: ReactNode;
  training?: ReactNode;
}) {
  return (
    <div>
      <section data-slot="standard">{standard}</section>
      <section data-slot="badge">{badge}</section>
      <section data-slot="training">{training}</section>
    </div>
  );
}
