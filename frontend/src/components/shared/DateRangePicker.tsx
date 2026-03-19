import { useState } from "react";

type Preset = "last_7_days" | "last_14_days" | "last_30_days" | "this_month" | "last_month" | "custom";

interface DateRangePickerProps {
  dateFrom: string;
  dateTo: string;
  preset: Preset;
  onChange: (preset: Preset, from?: string, to?: string) => void;
}

const PRESETS: { value: Preset; label: string }[] = [
  { value: "last_7_days", label: "7 dias" },
  { value: "last_14_days", label: "14 dias" },
  { value: "last_30_days", label: "30 dias" },
  { value: "this_month", label: "Este mês" },
  { value: "last_month", label: "Mês passado" },
  { value: "custom", label: "Personalizado" },
];

export function DateRangePicker({ dateFrom, dateTo, preset, onChange }: DateRangePickerProps) {
  const [showCustom, setShowCustom] = useState(false);

  const handlePreset = (p: Preset) => {
    if (p === "custom") {
      setShowCustom(true);
      return;
    }
    setShowCustom(false);
    onChange(p);
  };

  const fmt = (d: string) => {
    if (!d) return "";
    const [y, m, day] = d.split("-");
    return `${day}/${m}/${y}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.map((p) => (
        <button
          key={p.value}
          onClick={() => handlePreset(p.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            preset === p.value
              ? "bg-blue-600 text-white"
              : "bg-[#21262d] text-[#8b949e] hover:bg-[#2d333b] hover:text-white"
          }`}
        >
          {p.label}
        </button>
      ))}
      {(preset === "custom" || showCustom) && (
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => onChange("custom", e.target.value, dateTo)}
            className="bg-[#21262d] border border-[#30363d] text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
          />
          <span className="text-[#8b949e] text-xs">→</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => onChange("custom", dateFrom, e.target.value)}
            className="bg-[#21262d] border border-[#30363d] text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}
      {preset !== "custom" && dateFrom && dateTo && (
        <span className="text-xs text-[#6b7280]">
          {fmt(dateFrom)} – {fmt(dateTo)}
        </span>
      )}
    </div>
  );
}
