import reviews from "../data/reviews.json";

export function getReviewsByVersion(versionId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reviews.filter((r) => r.versionId === versionId));
    }, 300);
  });
}
