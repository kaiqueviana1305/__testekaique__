import clsx from "clsx";
import type { Platform } from "../../types";

const PLATFORMS: { value: Platform | "all"; label: string; color: string }[] = [
  { value: "all", label: "Todas", color: "bg-gray-600" },
  { value: "meta", label: "Meta", color: "bg-blue-600" },
  { value: "linkedin", label: "LinkedIn", color: "bg-sky-600" },
  { value: "google_ads", label: "Google Ads", color: "bg-red-500" },
];

interface PlatformFilterProps {
  selected: Platform | "all";
  onChange: (platform: Platform | "all") => void;
}

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {PLATFORMS.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value as Platform | "all")}
          className={clsx(
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors text-white",
            selected === p.value ? p.color : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
