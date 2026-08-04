import type { Level } from "./LevelTag";

export function LevelTabStrip({
  currentLevel,
  levels,
  inapplicableLevels,
}: {
  currentLevel: Level;
  levels: readonly Level[];
  inapplicableLevels: readonly Level[];
}) {
  return (
    <div role="tablist">
      {levels.map((level) => (
        <button
          key={level}
          role="tab"
          aria-selected={level === currentLevel}
          disabled={inapplicableLevels.includes(level)}
        >
          {level}
        </button>
      ))}
    </div>
  );
}
