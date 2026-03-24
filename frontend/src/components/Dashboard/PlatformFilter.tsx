import clsx from "clsx";
import type { Platform } from "../../types";

const PLATFORMS: { value: Platform | "all"; label: string; color: string; dot: string }[] = [
  { value: "all",        label: "Todas",      color: "#6366f1", dot: "#6366f1" },
  { value: "meta",       label: "Meta",       color: "#6366f1", dot: "#6366f1" },
  { value: "linkedin",   label: "LinkedIn",   color: "#0A66C2", dot: "#0A66C2" },
  { value: "google_ads", label: "Google Ads", color: "#f43f5e", dot: "#f43f5e" },
];

interface PlatformFilterProps {
  selected: Platform | "all";
  onChange: (platform: Platform | "all") => void;
}

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {PLATFORMS.map((p) => {
        const isActive = selected === p.value;
        return (
          <button
            key={p.value}
            onClick={() => onChange(p.value as Platform | "all")}
            className={clsx(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150",
              isActive ? "text-white shadow-sm" : "bg-white text-slate-500 hover:text-slate-700"
            )}
            style={
              isActive
                ? { background: `linear-gradient(135deg, ${p.color}dd 0%, ${p.color} 100%)` }
                : { border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }
            }
          >
            {!isActive && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.dot }} />
            )}
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
