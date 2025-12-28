import { getProgressColor } from "../components/utils/getProgressColor";

import { useNavigate } from "react-router-dom";
// import { getProgressColor } from "../utils/getProgressColor";

const SceneCard = ({ scene }) => {
  const navigate = useNavigate();
  const progressColor = getProgressColor(scene.completion);

  return (
    <div
      onClick={() => navigate(`/scene/${scene.id}`)}
      className="card group relative flex cursor-pointer flex-col rounded-xl p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bbh text-maintext text-lg">{scene.name}</h3>
          <p className="text-subtext mt-1 text-sm">{scene.description}</p>
        </div>

        {/* Status badge */}
        <span
          className="rounded-full px-2.5 py-1 text-[8px] font-bold uppercase"
          style={{
            background: progressColor,
            color: "hsl(0 0% 10%)",
          }}
        >
          {scene.status}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-4 pt-4">
        {/* Assigned people */}
        <div className="flex -space-x-2">
          {scene.assignedPeople?.length > 0 ? (
            scene.assignedPeople.map((p, i) => (
              <div
                key={p}
                title={p}
                style={{ zIndex: 10 - i }}
                className="bg-bg-light border-border flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold"
              >
                {p.charAt(0)}
              </div>
            ))
          ) : (
            <span className="text-subtext text-xs">Unassigned</span>
          )}
        </div>

        {/* Progress */}
        <div className="flex w-28 flex-col items-end">
          <span className="text-maintext text-xs font-semibold">
            {scene.completion}%
          </span>

          <div
            className="h-1.5 w-full overflow-hidden rounded"
            style={{ background: "var(--progress-bg)" }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${scene.completion}%`,
                background: progressColor,
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom inset glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 opacity-0 transition group-hover:opacity-100"
        style={{
          background: `linear-gradient(
            to right,
            transparent,
            ${progressColor},
            transparent
          )`,
        }}
      />
    </div>
  );
};

export default SceneCard;
