import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import versions from "../data/versions.json";
import shots from "../data/shots.json";
import scenes from "../data/scenes.json";
import products from "../data/products.json";
import reviews from "../data/reviews.json";

import { getProgressColor } from "../components/utils/getProgressColor";

const tabs = ["All", "Accepted", "Partial", "Rejected", "Not Given"];

const MasterPage = () => {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState("All");
  const [selected, setSelected] = useState(null);

  const project = products.find((p) => p.id === projectId);

  /* --------- Enrich versions --------- */
  const enriched = versions
    .map((v) => {
      const shot = shots.find((s) => s.id === v.shotId);
      const scene = scenes.find((sc) => sc.id === shot.sceneId);
      const review = reviews.find((r) => r.versionId === v.id);

      return {
        ...v,
        shot,
        scene,
        status: review?.status || "Not Given",
      };
    })
    .filter((v) => v.scene.projectId === projectId);

  const filtered =
    activeTab === "All"
      ? enriched
      : enriched.filter((v) => v.status === activeTab);

  /* --------- Modal navigation --------- */
  const currentIndex = selected
    ? filtered.findIndex((v) => v.id === selected.id)
    : -1;

  const goPrev = () => {
    if (currentIndex > 0) setSelected(filtered[currentIndex - 1]);
  };

  const goNext = () => {
    if (currentIndex < filtered.length - 1)
      setSelected(filtered[currentIndex + 1]);
  };

  const selectedReviews = selected
    ? reviews.filter((r) => r.versionId === selected.id)
    : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div className="text-subtext flex items-center gap-2 text-sm">
        <Link to="/" className="hover:text-maintext transition-colors">
          Projects
        </Link>
        <span>/</span>
        <Link
          to={`/project/${project.id}`}
          className="hover:text-maintext transition-colors"
        >
          {project.name}
        </Link>
        <span>/</span>
        <span className="text-maintext font-semibold">Master View</span>
      </div>

      {/* Header + Tabs */}
      <div className="border-border flex flex-wrap items-end justify-between gap-4 border-b pb-3">
        <div>
          <h1 className="font-bbh text-maintext text-3xl">Master View</h1>
          <p className="text-subtext mt-1 text-sm">
            All shots & versions across scenes
          </p>
        </div>

        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "text-maintext"
                  : "text-subtext hover:text-maintext"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="bg-accent absolute inset-x-0 -bottom-[1px] h-0.5 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-4">
        {filtered.map((v) => {
          const statusColor = getProgressColor(
            v.status === "Accepted"
              ? 100
              : v.status === "Partial"
                ? 60
                : v.status === "Rejected"
                  ? 20
                  : 0,
          );

          return (
            <button
              key={v.id}
              onClick={() => setSelected(v)}
              className="card card-hover group relative overflow-hidden rounded-xl p-3 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={v.image}
                alt={v.label}
                className="h-40 w-full rounded-lg object-cover"
              />

              <div className="mt-3 text-sm font-semibold">{v.label}</div>
              <div className="text-subtext text-xs">{v.scene.name}</div>

              <div
                className="absolute inset-x-0 bottom-0 h-0.5"
                style={{
                  background: `linear-gradient(
                    to right,
                    transparent,
                    ${statusColor},
                    transparent
                  )`,
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-bg-light card relative w-full max-w-5xl rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev / Next */}
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border px-2 py-1 text-lg disabled:opacity-30"
            >
              ←
            </button>

            <button
              onClick={goNext}
              disabled={currentIndex === filtered.length - 1}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border px-2 py-1 text-lg disabled:opacity-30"
            >
              →
            </button>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Image */}
              <div className="relative">
                <img
                  src={selected.image}
                  alt={selected.label}
                  className="max-h-[70vh] w-full rounded-lg object-contain"
                />

                <span
                  className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: getProgressColor(
                      selected.status === "Accepted"
                        ? 100
                        : selected.status === "Partial"
                          ? 60
                          : selected.status === "Rejected"
                            ? 20
                            : 0,
                    ),
                    color: "hsl(0 0% 10%)",
                  }}
                >
                  {selected.status}
                </span>
              </div>

              {/* Info + Reviews */}
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  <h2 className="font-bbh text-2xl">{selected.label}</h2>

                  <Info label="Project" value={project.name} />
                  <Info label="Scene" value={selected.scene.name} />
                  <Info label="Shot" value={selected.shot.name} />
                  <Info label="Created" value={selected.createdAt} />

                  {/* Reviews */}
                  <div className="pt-4">
                    <h3 className="mb-2 font-semibold">Review Comments</h3>

                    {selectedReviews.length === 0 ? (
                      <p className="text-subtext text-sm">No reviews yet</p>
                    ) : (
                      <div className="space-y-2">
                        {selectedReviews.map((r) => (
                          <div
                            key={r.id}
                            className="border-border rounded-lg border p-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold">
                                {r.reviewer}
                              </span>
                              <span
                                className="rounded-full px-2 py-0.5 text-xs font-bold"
                                style={{
                                  background: getProgressColor(
                                    r.status === "Accepted"
                                      ? 100
                                      : r.status === "Partial"
                                        ? 60
                                        : 20,
                                  ),
                                  color: "hsl(0 0% 10%)",
                                }}
                              >
                                {r.status}
                              </span>
                            </div>
                            <p className="text-subtext mt-1 text-sm">
                              {r.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="border-border hover:bg-bg mt-6 self-start rounded-xl border px-5 py-2 text-sm font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Bottom accent */}
            <div
              className="absolute inset-x-0 bottom-0 h-0.5"
              style={{
                background: `linear-gradient(
                  to right,
                  transparent,
                  ${getProgressColor(
                    selected.status === "Accepted"
                      ? 100
                      : selected.status === "Partial"
                        ? 60
                        : selected.status === "Rejected"
                          ? 20
                          : 0,
                  )},
                  transparent
                )`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Info = ({ label, value }) => (
  <p className="text-sm">
    <span className="text-subtext">{label}:</span>{" "}
    <span className="text-maintext font-semibold">{value}</span>
  </p>
);

export default MasterPage;
