import { getProgressColor } from "./utils/getProgressColor";

const CompletionStatus = ({ scenes }) => {
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
        <span className="text-maintext font-bold">{overall}%</span>
      </div>

      <div
        className="mb-4 h-2 overflow-hidden rounded"
        style={{ background: "var(--progress-bg)" }}
      >
        <div
          className="h-full transition-all"
          style={{
            width: `${overall}%`,
            background: progressColor,
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <Stat label="Scenes" value={scenes.length} />
        <Stat label="Total Shots" value={totalShots} />
        <Stat label="Approved" value={approvedShots} />
        <Stat label="Pending" value={totalShots - approvedShots} />
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-bg-light border-border rounded-lg border p-3">
    <p className="text-subtext text-xs uppercase">{label}</p>
    <p className="text-maintext text-lg font-bold">{value}</p>
  </div>
);

export default CompletionStatus;
