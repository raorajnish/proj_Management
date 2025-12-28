import shots from "../data/shots.json";

export function getShotsByScene(sceneId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(shots.filter((s) => s.sceneId === sceneId));
    }, 400);
  });
}
