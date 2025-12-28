import { useParams, Link } from "react-router-dom";
import products from "../data/products.json";
import scenes from "../data/scenes.json";
import SceneCard from "../components/SceneCard";
import ProjectResources from "../components/ProjectResources";
import CompletionStatus from "../components/CompletionStatus";

const ScenePage = () => {
  const { projectId } = useParams();
  const project = products.find((p) => p.id === projectId);
  const projectScenes = scenes.filter((s) => s.projectId === projectId);

  if (!project) return <p>Project not found</p>;

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/" className="text-subtext hover:text-maintext">
          Projects
        </Link>
        <span>/</span>
        <span className="font-semibold">{project.name}</span>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* MAIN */}
        <main className="flex-1 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-bbh text-3xl">{project.name}</h1>
              <p className="text-subtext mt-2 max-w-xl">
                {project.description}
              </p>
            </div>

            <button className="font-gothic btn rounded-xl bg-black dark:bg-white/60 px-5 py-2 text-white dark:text-black">
              + New Scene
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projectScenes.map((scene) => (
              <SceneCard key={scene.id} scene={scene} />
            ))}
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className="w-full space-y-6 lg:w-80">
          <ProjectResources />
          <CompletionStatus scenes={projectScenes} />
        </aside>
      </div>
    </div>
  );
};

export default ScenePage;
