export function BadgeStatusLegend() {
  return (
    <div data-testid="badge-status-legend">
      <div>🟢 Earned-eligible — All criteria met, ready for assessment</div>
      <div>🟡 Blocked-assignment-limited — Assignment quota reached, cannot be assessed this cycle</div>
      <div>⚪ Not-attempted — No assessment attempt has been made</div>
    </div>
  );
}
