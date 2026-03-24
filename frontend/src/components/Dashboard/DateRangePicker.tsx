import clsx from "clsx";

const PRESETS = [
  { value: "last_7_days",  label: "7 dias" },
  { value: "last_14_days", label: "14 dias" },
  { value: "last_30_days", label: "30 dias" },
  { value: "this_month",   label: "Este mês" },
  { value: "last_month",   label: "Mês passado" },
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
      <div className="flex items-center gap-1 bg-white rounded-xl p-1" style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
        {PRESETS.map((p) => {
          const isActive = preset === p.value;
          return (
            <button
              key={p.value}
              onClick={() => onChange(p.value)}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150",
                isActive
                  ? "text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
              style={isActive ? { background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" } : {}}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl" style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onChange("custom", e.target.value, dateTo)}
          className="text-xs text-slate-600 outline-none bg-transparent cursor-pointer"
        />
        <span className="text-slate-300 text-xs">→</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onChange("custom", dateFrom, e.target.value)}
          className="text-xs text-slate-600 outline-none bg-transparent cursor-pointer"
        />
      </div>
    </div>
  );
}
