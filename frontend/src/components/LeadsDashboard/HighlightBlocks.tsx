import { highlightBlocks } from "../../data/mockLeads";

export function HighlightBlocks() {
  return (
    <div className="flex flex-col gap-3">
      {highlightBlocks.map((block) => (
        <div
          key={block.label}
          className={`${block.color} rounded-xl p-4 flex flex-col`}
        >
          <p className="text-white/80 text-xs font-medium">{block.label}</p>
          <p className="text-white text-2xl font-bold mt-1">{block.value}</p>
        </div>
      ))}
    </div>
  );
}
