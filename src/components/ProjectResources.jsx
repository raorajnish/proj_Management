import { FileText, File, Link2, Download, ExternalLink } from "lucide-react";

const resources = [
  {
    name: "Final_Script_v4.pdf",
    size: "2.4 MB",
    type: "pdf",
  },
  {
    name: "Character_Bible.docx",
    size: "850 KB",
    type: "doc",
  },
  {
    name: "Moodboard_Ref",
    type: "link",
  },
];

const iconMap = {
  pdf: <FileText className="text-red-500" size={20} />,
  doc: <File className="text-blue-500" size={20} />,
  link: <Link2 className="text-purple-500" size={20} />,
};

const ProjectResources = ({ loading = false }) => {
  return (
    <div className="card rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bbh text-lg">Resources</h3>
        <button className="text-accent text-sm font-semibold">Manage</button>
      </div>

      <ul className="space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-loading h-9 w-9 animate-pulse rounded-lg" />
                  <div>
                    <div className="bg-loading mb-1 h-4 w-32 animate-pulse rounded" />
                    <div className="bg-loading h-3 w-20 animate-pulse rounded" />
                  </div>
                </div>

                <div className="bg-loading h-4 w-4 animate-pulse rounded" />
              </li>
            ))
          : resources.map((res) => (
              <li
                key={res.name}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-bg-light border-border flex h-9 w-9 items-center justify-center rounded-lg border">
                    {iconMap[res.type]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{res.name}</p>
                    {res.size && (
                      <p className="text-subtext text-xs">{res.size}</p>
                    )}
                  </div>
                </div>

                {res.type === "link" ? (
                  <ExternalLink size={16} className="text-subtext" />
                ) : (
                  <Download size={16} className="text-subtext" />
                )}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ProjectResources;
