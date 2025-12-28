export const getProgressColor = (percentage) => {
  if (percentage > 80) return "var(--progress-fill-high)";
  if (percentage > 50) return "var(--progress-fill-mid)";
  return "var(--progress-fill-low)";
};
