const DAY_MS = 24 * 60 * 60 * 1000;

export function renderDaysAgo(lastUpdated: number) {
  const now = new Date().getTime();

  const diff = now - lastUpdated;
  const daysAgo = Math.floor(diff / DAY_MS);

  if (daysAgo <= 0) {
    return "today";
  } else if (daysAgo === 1) {
    return "yesterday";
  } else {
    return `${daysAgo} days ago`;
  }
}
