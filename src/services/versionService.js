import versions from "../data/versions.json";

export function getVersionsByShot(shotId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(versions.filter((v) => v.shotId === shotId));
    }, 300);
  });
}
