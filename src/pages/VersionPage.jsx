import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";

import products from "../data/products.json";
import scenes from "../data/scenes.json";
import shots from "../data/shots.json";
import versions from "../data/versions.json";
import reviews from "../data/reviews.json";

import { getProgressColor } from "../components/utils/getProgressColor";

const VersionPage = () => {
  const { shotId } = useParams();

  const shot = shots.find((s) => s.id === shotId);
  if (!shot) return <p>Shot not found</p>;

  const scene = scenes.find((s) => s.id === shot.sceneId);
  const project = products.find((p) => p.id === scene.projectId);

  const shotVersions = versions.filter((v) => v.shotId === shotId);

  const [localVersions, setLocalVersions] = useState(shotVersions);
  const [activeVersion, setActiveVersion] = useState(shotVersions[0]);

  const versionReviews = reviews.filter(
    (r) => r.versionId === activeVersion?.id,
  );

  const reviewStatus = versionReviews[0]?.status;

  /* ================= Upload ================= */
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const newVersion = {
      id: `v-${Date.now()}`,
      shotId,
      label: `v${localVersions.length + 1}`,
      image: imageUrl,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setLocalVersions((prev) => [...prev, newVersion]);
    setActiveVersion(newVersion);
  };

  return (
    <div className="flex flex-col gap-6 overflow-x-hidden">
      {/* ================= Breadcrumb ================= */}
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
        <Link
          to={`/scene/${scene.id}`}
          className="text-subtext hover:text-maintext"
        >
          {scene.name}
        </Link>
        <span>/</span>
        <span className="text-maintext font-semibold">{shot.name}</span>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ================= MAIN ================= */}
        <main className="flex-1 space-y-6">
          {/* ===== Image Preview ===== */}
          <div className="border-border bg-bg-light relative rounded-xl border p-4">
            {/* Review Status */}
            {reviewStatus && (
              <span
                className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  background: getProgressColor(
                    reviewStatus === "Accepted"
                      ? 100
                      : reviewStatus === "Partial"
                        ? 60
                        : 20,
                  ),
                }}
              >
                {reviewStatus}
              </span>
            )}

            <img
              src={activeVersion.image}
              alt={activeVersion.label}
              className="mx-auto max-h-105 w-full rounded-lg object-contain"
            />
          </div>

          {/* ===== Versions Strip ===== */}
          <div className="relative">
            <div className="scrollbar-thin scrollbar-thumb-border flex justify-center items-center gap-3 overflow-x-auto pb-2">
              {localVersions.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVersion(v)}
                  className={`shrink-0 rounded-lg border p-1 transition ${
                    activeVersion.id === v.id
                      ? "border-accent"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <img
                    src={v.image}
                    alt={v.label}
                    className="h-20 w-28 rounded object-cover"
                  />
                  <span className="mt-1 block text-center text-xs font-semibold">
                    {v.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ===== Upload Section (SEPARATE) ===== */}
          <label className="group border-border text-subtext hover:border-accent hover:text-accent flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-6 transition">
            <UploadCloud size={28} />
            <span className="text-sm font-semibold">Upload new version</span>
            <span className="text-xs opacity-70">PNG / JPG</span>

            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </main>

        {/* ================= RIGHT SIDEBAR ================= */}
        <aside className="w-full space-y-6 lg:w-80">
          {/* ===== References ===== */}
          <div className="card border-border bg-bg-light rounded-xl border p-5">
            <h3 className="mb-4 font-semibold">References</h3>

            <div className="border-border flex items-center gap-3 rounded-lg border p-3">
              <FileText size={18} />
              <span className="text-sm font-medium">SB_Sketch.pdf</span>
            </div>

            <div className="mt-3 flex gap-2">
              <div className="border-border h-10 w-10 rounded border" />
              <div className="border-border h-10 w-10 rounded border" />
              <div className="border-border h-10 w-10 rounded border" />
            </div>
          </div>

          {/* ===== Review ===== */}
          <div className="card border-border bg-bg-light rounded-xl border p-5">
            <h3 className="mb-4 font-semibold">Review</h3>

            {versionReviews.length === 0 ? (
              <p className="text-subtext text-sm">No review yet</p>
            ) : (
              versionReviews.map((r) => (
                <div key={r.id} className="border-border rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{r.reviewer}</span>
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
                      }}
                    >
                      {r.status}
                    </span>
                  </div>

                  <p className="text-subtext mt-2 text-sm">{r.comment}</p>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VersionPage;
