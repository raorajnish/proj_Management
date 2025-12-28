import { useNavigate, useParams } from "react-router-dom";
import { getProgressColor } from "./utils/getProgressColor";

const CompletionStatus = ({ scenes, loading = false }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  if (loading) {
    return (
      <div className="card rounded-xl p-5">
        <h3 className="font-bbh mb-4 text-lg">Completion Status</h3>

        <div className="mb-2 flex justify-between">
          <span className="text-subtext text-sm">Overall Progress</span>
          <span className="font-bold">--%</span>
        </div>

        <div className="bg-loading mb-4 h-2 overflow-hidden rounded">
          <div className="bg-loading h-full w-1/3 animate-pulse" />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-border animate-pulse rounded-lg border p-3"
            >
              <div className="bg-loading mb-2 h-3 w-24 rounded" />
              <div className="bg-loading h-6 w-8 rounded" />
            </div>
          ))}
        </div>

        <button
          disabled
          className="btn bg-loading text-maintext w-full rounded-lg py-3 text-sm font-semibold opacity-60"
        >
          View Details
        </button>
      </div>
    );
  }

  const totalShots = scenes.reduce((a, s) => a + s.totalShots, 0);
  const approvedShots = scenes.reduce((a, s) => a + s.approvedShots, 0);

  const overall =
    totalShots === 0 ? 0 : Math.round((approvedShots / totalShots) * 100);

  const progressColor = getProgressColor(overall);

  return (
    <div className="card rounded-xl p-5">
      <h3 className="font-bbh mb-4 text-lg">Completion Status</h3>

      <div className="mb-2 flex justify-between">
        <span className="text-subtext text-sm">Overall Progress</span>
        <span className="font-bold">{overall}%</span>
      </div>

      <div
        className="mb-4 h-2 overflow-hidden rounded"
        style={{ background: "var(--progress-bg)" }}
      >
        <div
          className="h-full"
          style={{ width: `${overall}%`, background: progressColor }}
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
        <Stat label="Scenes" value={scenes.length} />
        <Stat label="Total Shots" value={totalShots} />
        <Stat label="Approved" value={approvedShots} />
        <Stat label="Pending" value={totalShots - approvedShots} />
      </div>

      <button
        onClick={() => navigate(`/project/${projectId}/completion`)}
        className="btn bg-bg-dark text-maintext w-full rounded-lg py-3 text-sm font-semibold"
      >
        View Details
      </button>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="border-border hover:bg-bg-dark rounded-lg border p-3">
    <p className="text-subtext text-xs uppercase">{label}</p>
    <p className="text-lg font-bold">{value}</p>
  </div>
);

export default CompletionStatus;
