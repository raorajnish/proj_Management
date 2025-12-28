import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import scenes from "../data/scenes.json";
import products from "../data/products.json";
import { getProgressColor } from "../components/utils/getProgressColor";
import { CheckCircle, Clock, TrendingUp, Layers, Search } from "lucide-react";

const SceneCompletionStatusPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = products.find((p) => p.id === projectId);
  const projectScenes = scenes.filter((s) => s.projectId === projectId);

  /* --------- Stats --------- */
  const totalScenes = projectScenes.length;
  const completed = projectScenes.filter((s) => s.completion === 100).length;
  const inProgress = projectScenes.filter(
    (s) => s.completion > 0 && s.completion < 100,
  ).length;

  const avgVelocity = "4 days";

  /* --------- Filters --------- */
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [assignee, setAssignee] = useState("All");

  const filteredScenes = projectScenes.filter((scene) => {
    const matchSearch = scene.name.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "All"
        ? true
        : status === "Completed"
          ? scene.completion === 100
          : status === "In Progress"
            ? scene.completion < 100
            : true;

    const matchAssignee =
      assignee === "All" ? true : scene.assignedPeople?.includes(assignee);

    return matchSearch && matchStatus && matchAssignee;
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
        <span className="text-maintext font-semibold">Scene Completion</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-bbh text-3xl">Scene Completion</h1>

        <button
          onClick={() => navigate(`/project/${projectId}/master`)}
          className="bg-accent rounded-xl px-5 py-2 text-sm font-semibold text-maintext border border-maintext"
        >
          Master View
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Scenes" value={totalScenes} icon={<Layers />} />
        <StatCard
          label="Completed"
          value={completed}
          icon={<CheckCircle className="text-green-500" />}
        />
        <StatCard
          label="In Progress"
          value={inProgress}
          icon={<TrendingUp className="text-blue-500" />}
        />
        <StatCard
          label="Avg Velocity"
          value={avgVelocity}
          sub="remaining"
          icon={<Clock className="text-purple-500" />}
        />
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative">
          <Search
            size={16}
            className="text-subtext absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scenes, tags..."
            className="border-border bg-bg-light rounded-lg border py-2 pr-4 pl-9 text-sm outline-none"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border-border bg-bg-light rounded-lg border px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>Completed</option>
          <option>In Progress</option>
        </select>

        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="border-border bg-bg-light rounded-lg border px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>Aarav</option>
          <option>Neha</option>
          <option>Kabir</option>
        </select>
      </div>

      {/* Table */}
      <div className="border-border overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-bg-light">
            <tr>
              <th className="p-3 text-left">Scene</th>
              <th className="p-3 text-left">Progress</th>
              <th className="p-3 text-left">Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {filteredScenes.map((scene) => {
              const color = getProgressColor(scene.completion);

              return (
                <tr
                  key={scene.id}
                  onClick={() =>
                    navigate(
                      `/project/${projectId}/scene/${scene.id}/completion`,
                    )
                  }
                  className="border-border cursor-pointer hover:bg-bg-light/60 border-t transition"
                >
                  <td className="p-3 font-medium">{scene.name}</td>

                  <td className="p-3">
                    <span
                      className="rounded-full px-2.5 py-1 text-xs font-bold"
                      style={{ background: color }}
                    >
                      {scene.completion}%
                    </span>
                  </td>

                  <td className="text-subtext p-3">
                    {scene.assignedPeople?.join(", ") || "—"}
                  </td>
                </tr>
              );
            })}

            {filteredScenes.length === 0 && (
              <tr>
                <td colSpan="3" className="text-subtext p-6 text-center">
                  No scenes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ---------- Stat Card ---------- */
const StatCard = ({ label, value, sub, icon }) => (
  <div className="border-border bg-bg-light flex items-center justify-between rounded-xl border p-4">
    <div>
      <p className="text-subtext text-xs font-semibold uppercase">{label}</p>
      <p className="text-maintext text-2xl font-bold">
        {value}{" "}
        {sub && <span className="text-subtext text-sm font-medium">{sub}</span>}
      </p>
    </div>

    <div className="bg-bg flex h-9 w-9 items-center justify-center rounded-lg">
      {icon}
    </div>
  </div>
);

export default SceneCompletionStatusPage;
