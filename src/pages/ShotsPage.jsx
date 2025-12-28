import { useParams, Link } from "react-router-dom";
import products from "../data/products.json";
import scenes from "../data/scenes.json";
import shots from "../data/shots.json";
import ShotCard from "../components/ShotCard";
import ProjectResources from "../components/ProjectResources";
import CompletionStatus from "../components/CompletionStatus";
import { useState, useEffect } from "react";

const statusTabs = ["All", "Accepted", "Partial", "Rejected", "Not Given"];

const ShotsPage = () => {
  const { sceneId } = useParams();
  const scene = scenes.find((s) => s.id === sceneId);
  const project = products.find((p) => p.id === scene.projectId);

  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (!scene) return <p>Scene not found</p>;

  const sceneShots = shots.filter((shot) => shot.sceneId === sceneId);
  const filteredShots =
    activeTab === "All"
      ? sceneShots
      : sceneShots.filter((s) => s.approval === activeTab);

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/" className="text-subtext hover:text-maintext">
          Projects
        </Link>

        <span>/</span>

        <Link
          to={`/project/${project.id}`}
          className="text-subtext hover:text-maintext"
        >
          {project.name}
        </Link>

        <span>/</span>

        <span className="text-maintext font-semibold">{scene.name}</span>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* MAIN */}
        <main className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-bbh text-3xl">{scene.name}</h1>
              <p className="text-subtext mt-2">Shots under this scene</p>
            </div>

            <button className="font-gothic btn rounded-xl bg-black px-5 py-2 text-white dark:bg-white/60 dark:text-black">
              + New Shot
            </button>
          </div>

          {/* Status Tabs */}
          <div className="border-border flex gap-6 border-b">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-sm font-semibold transition focus:outline-none ${
                  activeTab === tab
                    ? "text-maintext"
                    : "text-subtext hover:text-maintext"
                }`}
              >
                {tab}

                {/* Active underline */}
                {activeTab === tab && (
                  <span className="bg-bg-light absolute inset-x-0 bottom-px h-0.5 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Shots Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              // Skeleton placeholders while loading
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="card animate-pulse overflow-hidden rounded-xl"
                >
                  <div className="bg-loading relative aspect-video" />
                  <div className="p-4">
                    <div className="bg-loading mb-2 h-4 w-3/4 rounded" />
                    <div className="bg-loading h-3 w-1/2 rounded" />
                  </div>
                </div>
              ))
            ) : (
              <>
                {filteredShots.map((shot) => (
                  <ShotCard key={shot.id} shot={shot} />
                ))}

                {filteredShots.length === 0 && (
                  <p className="text-subtext">No shots found.</p>
                )}
              </>
            )}
          </div>
        </main>

        {/* SIDEBAR (loading synced) */}
        <aside className="w-full space-y-6 lg:w-80">
          <ProjectResources loading={loading} />
          <CompletionStatus scenes={[scene]} loading={loading} />
        </aside>
      </div>
    </div>
  );
};

export default ShotsPage;
