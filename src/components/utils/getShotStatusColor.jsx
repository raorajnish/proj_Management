export const getShotStatusColor = (status) => {
  switch (status) {
    case "Accepted":
      return "var(--progress-fill-high)";
    case "Partial":
      return "var(--progress-fill-mid)";
    case "Rejected":
      return "var(--progress-fill-low)";
    default:
      return "hsl(0 0% 60%)"; // Not Given
  }
};
