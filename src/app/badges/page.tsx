import { getBadges } from "../../lib/mock/badges";

export default async function BadgesPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level } = await searchParams;
  const badges = getBadges(level ? { level } : undefined);

  return (
    <main>
      <h1>Badges</h1>
      <ul>
        {badges.map((badge) => (
          <li key={badge.id}>
            <span>{badge.badge_code}</span>
            <span>{badge.name}</span>
            <span>{badge.tier}</span>
            <span>{badge.certifies}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
