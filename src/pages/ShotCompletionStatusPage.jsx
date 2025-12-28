import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../data/products.json";
import scenes from "../data/scenes.json";
import shots from "../data/shots.json";
import { getProgressColor } from "../components/utils/getProgressColor";
import { CheckCircle, XCircle, AlertCircle, Clock, Search } from "lucide-react";

const ShotCompletionStatusPage = () => {
  const { projectId, sceneId } = useParams();

  const project = products.find((p) => p.id === projectId);
  const scene = scenes.find((s) => s.id === sceneId);
  const sceneShots = shots.filter((s) => s.sceneId === sceneId);

  /* ---------- Stats ---------- */
  const accepted = sceneShots.filter((s) => s.approval === "Accepted").length;
  const partial = sceneShots.filter((s) => s.approval === "Partial").length;
  const rejected = sceneShots.filter((s) => s.approval === "Rejected").length;
  const notGiven = sceneShots.filter(
    (s) => !s.approval || s.approval === "Not Given",
  ).length;

  /* ---------- Filters ---------- */
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const filteredShots = sceneShots.filter((shot) => {
    const matchSearch = shot.name.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status === "All" ? true : shot.approval === status;

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/" className="text-subtext hover:text-maintext">
          Projects
        </Link>
        <span>/</span>
        <Link
          to={`/project/${projectId}`}
          className="text-subtext hover:text-maintext"
        >
          {project?.name}
        </Link>
        <span>/</span>
        <Link
          to={`/project/${projectId}/completion`}
          className="text-subtext hover:text-maintext"
        >
          Scene Completion
        </Link>
        <span>/</span>
        <span className="text-maintext font-semibold">{scene?.name}</span>
      </div>

      {/* Header */}
      <h1 className="font-bbh text-3xl">Shot Completion Status</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-border bg-bg-light flex animate-pulse items-center justify-between rounded-xl border p-4"
            >
              <div>
                <div className="bg-loading mb-2 h-3 w-24 rounded" />
                <div className="bg-loading h-7 w-16 rounded" />
              </div>
              <div className="bg-loading h-9 w-9 rounded-lg" />
            </div>
          ))
        ) : (
          <>
            <StatCard
              label="Accepted"
              value={accepted}
              icon={<CheckCircle className="text-green-500" />}
            />
            <StatCard
              label="Partial"
              value={partial}
              icon={<AlertCircle className="text-amber-500" />}
            />
            <StatCard
              label="Rejected"
              value={rejected}
              icon={<XCircle className="text-red-500" />}
            />
            <StatCard
              label="Not Given"
              value={notGiven}
              icon={<Clock className="text-slate-400" />}
            />
          </>
        )}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-4">
        <div className="relative">
          <Search
            size={16}
            className="text-subtext absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shots..."
            className="border-border bg-bg-light rounded-lg border py-2 pr-4 pl-9 text-sm outline-none"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border-border bg-bg-light rounded-lg border px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>Accepted</option>
          <option>Partial</option>
          <option>Rejected</option>
          <option>Not Given</option>
        </select>
      </div>

      {/* Table */}
      <div className="border-border overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-bg-light">
            <tr>
              <th className="p-3 text-left">Shot</th>
              <th className="p-3 text-left">Approval</th>
              <th className="p-3 text-left">Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-border border-t">
                  <td className="p-3">
                    <div className="bg-loading h-4 w-48 animate-pulse rounded" />
                  </td>
                  <td className="p-3">
                    <div className="bg-loading h-4 w-20 animate-pulse rounded" />
                  </td>
                  <td className="p-3">
                    <div className="bg-loading h-4 w-24 animate-pulse rounded" />
                  </td>
                </tr>
              ))
            ) : (
              <>
                {filteredShots.map((shot) => {
                  const color = getProgressColor(
                    shot.approval === "Accepted"
                      ? 100
                      : shot.approval === "Partial"
                        ? 60
                        : shot.approval === "Rejected"
                          ? 20
                          : 0,
                  );

                  return (
                    <tr
                      key={shot.id}
                      className="border-border hover:bg-bg-light/60 border-t transition"
                    >
                      <td className="p-3 font-medium">{shot.name}</td>

                      <td className="p-3">
                        <span
                          className="rounded-full px-2.5 py-1 text-xs font-bold"
                          style={{ background: color }}
                        >
                          {shot.approval || "Not Given"}
                        </span>
                      </td>

                      <td className="text-subtext p-3">
                        {shot.assignedTo || "—"}
                      </td>
                    </tr>
                  );
                })}

                {filteredShots.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-subtext p-6 text-center">
                      No shots found
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ---------- Small Stat Card ---------- */
const StatCard = ({ label, value, icon }) => (
  <div className="border-border bg-bg-light flex items-center justify-between rounded-xl border p-4">
    <div>
      <p className="text-subtext text-xs font-semibold uppercase">{label}</p>
      <p className="text-maintext text-2xl font-bold">{value}</p>
    </div>
    <div className="bg-bg flex h-9 w-9 items-center justify-center rounded-lg">
      {icon}
    </div>
  </div>
);

export default ShotCompletionStatusPage;
