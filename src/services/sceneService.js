import scenes from "../data/scenes.json";

export function getScenesByProject(projectId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(scenes.filter((s) => s.projectId === projectId));
    }, 400);
  });
}
