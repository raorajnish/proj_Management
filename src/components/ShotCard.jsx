import { getShotStatusColor } from "../components/utils/getShotStatusColor";
import { useNavigate } from "react-router-dom";

const ShotCard = ({ shot }) => {
  const statusColor = getShotStatusColor(shot.approval);
    const navigate = useNavigate();


  return (
    <div
      onClick={() => navigate(`/shot/${shot.id}`)}
      className="card card-hover group cursor-pointer overflow-hidden rounded-xl"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={shot.image}
          alt={shot.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />

        {/* Status badge */}
        <span
          className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold text-black"
          style={{ background: statusColor }}
        >
          {shot.approval}
        </span>
      </div>

      {/* Content */}
      <div className="flex items-center justify-between p-4">
        <div>
          <h4 className="font-bbh text-maintext">{shot.name}</h4>
          <p className="text-subtext text-xs">Assigned to {shot.assignedTo}</p>
        </div>

        <div
          className="h-2 w-2 rounded-full"
          style={{ background: statusColor }}
        />
      </div>

      {/* Bottom inset */}
      <div
        className="pointer-events-none h-0.5 w-full opacity-0 transition group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, transparent, ${statusColor}, transparent)`,
        }}
      />
    </div>
  );
};

export default ShotCard;
