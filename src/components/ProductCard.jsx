const ProductCard = ({ product, onClick }) => {
  const { name, description, tags, assignedPeople, progress } = product;

  const progressColor =
    progress > 80
      ? "var(--progress-fill-high)"
      : progress > 50
        ? "var(--progress-fill-mid)"
        : "var(--progress-fill-low)";

  return (
    <div
      onClick={onClick}
      className="card card-hover relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl p-6 "
    >
      {/* Title */}
      <h2 className="font-bbh text-maintext text-xl">{name}</h2>

      {/* Description */}
      <p className="font-lora text-subtext mt-2 grow text-sm leading-relaxed">
        {description}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="border-border font-gothic rounded-full border px-2 py-1 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom row */}
      <div className="mt-6 flex items-center justify-between gap-4">
        {/* Assigned people */}
        <div className="flex -space-x-2">
          {assignedPeople.map((person, index) => (
            <div
              key={person}
              title={person}
              style={{ zIndex: 10 - index }}
              className="border-border bg-bg-light text-maintext flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold"
            >
              {person.charAt(0)}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="flex w-32 flex-col items-end">
          <div
            className="h-2 w-full overflow-hidden rounded"
            style={{ background: "var(--progress-bg)" }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: progressColor,
              }}
            />
          </div>
          <span className="text-subtext mt-1 text-xs">{progress}%</span>
        </div>
      </div>

      {/* Bottom inset */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5"
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

export default ProductCard;
