import projects from "../data/projects.json";

export function getProjects() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!projects) reject("Projects not found");
      resolve(projects);
    }, 400);
  });
}
