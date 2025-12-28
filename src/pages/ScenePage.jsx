import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../data/products.json";
import scenes from "../data/scenes.json";
import SceneCard from "../components/SceneCard";
import ProjectResources from "../components/ProjectResources";
import CompletionStatus from "../components/CompletionStatus";

const ScenePage = () => {
  const { projectId } = useParams();
  const project = products.find((p) => p.id === projectId);
  const projectScenes = scenes.filter((s) => s.projectId === projectId);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

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

            <button className="font-gothic btn rounded-xl bg-black px-5 py-2 text-white dark:bg-white/60 dark:text-black">
              + New Scene
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {loading
              ? Array.from({ length: Math.max(projectScenes.length, 6) }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="card group card-hover relative flex animate-pulse cursor-pointer flex-col rounded-xl p-5"
                    >
                      {/* Header placeholder */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="bg-loading mb-2 h-5 w-36 rounded" />
                          <div className="bg-loading h-3 w-3/4 rounded" />
                        </div>

                        <div className="bg-loading rounded-full px-2.5 py-1 text-[8px] font-bold" />
                      </div>

                      {/* Footer placeholder */}
                      <div className="mt-auto flex items-center justify-between gap-4 pt-4">
                        <div className="flex -space-x-2">
                          <div className="bg-loading h-8 w-8 rounded-full" />
                          <div className="bg-loading h-8 w-8 rounded-full" />
                        </div>

                        <div className="flex w-28 flex-col items-end">
                          <div className="bg-loading mb-2 h-4 w-12 rounded" />

                          <div className="bg-loading h-1.5 w-full rounded" />
                        </div>
                      </div>
                    </div>
                  ),
                )
              : projectScenes.map((scene) => (
                  <SceneCard key={scene.id} scene={scene} />
                ))}
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className="w-full space-y-6 lg:w-80">
          <ProjectResources loading={loading} />
          <CompletionStatus scenes={projectScenes} loading={loading} />
        </aside>
      </div>
    </div>
  );
};

export default ScenePage;
