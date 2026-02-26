import clsx from "clsx";

const PRESETS = [
  { value: "last_7_days", label: "7 dias" },
  { value: "last_14_days", label: "14 dias" },
  { value: "last_30_days", label: "30 dias" },
  { value: "this_month", label: "Este mês" },
  { value: "last_month", label: "Mês passado" },
];

interface DateRangePickerProps {
  preset: string;
  dateFrom: string;
  dateTo: string;
  onChange: (preset: string, from?: string, to?: string) => void;
}

export function DateRangePicker({ preset, dateFrom, dateTo, onChange }: DateRangePickerProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {PRESETS.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={clsx(
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
            preset === p.value
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:border-blue-400"
          )}
        >
          {p.label}
        </button>
      ))}
      <div className="flex items-center gap-1 ml-1">
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onChange("custom", e.target.value, dateTo)}
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
        />
        <span className="text-gray-400 text-sm">até</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onChange("custom", dateFrom, e.target.value)}
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
        />
      </div>
    </div>
  );
}
