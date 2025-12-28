import resources from "../data/resources.json";

export function getResources(level, levelId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        resources.filter((r) => r.level === level && r.levelId === levelId),
      );
    }, 300);
  });
}
