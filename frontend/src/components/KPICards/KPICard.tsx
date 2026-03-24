interface KPICardProps {
  label: string;
  value: string | number;
  subtext?: string;
  color?: "red" | "green" | "purple" | "orange" | "blue";
  icon?: React.ReactNode;
}

const colorConfig = {
  red:    { iconBg: "rgba(227,30,36,0.1)",   iconColor: "#E31E24", accent: "#E31E24" },
  green:  { iconBg: "rgba(16,185,129,0.1)",  iconColor: "#10b981", accent: "#10b981" },
  purple: { iconBg: "rgba(139,92,246,0.1)",  iconColor: "#8b5cf6", accent: "#8b5cf6" },
  orange: { iconBg: "rgba(245,158,11,0.1)",  iconColor: "#f59e0b", accent: "#f59e0b" },
  blue:   { iconBg: "rgba(59,130,246,0.1)",  iconColor: "#3b82f6", accent: "#3b82f6" },
};

export function KPICard({ label, value, subtext, color = "red", icon }: KPICardProps) {
  const cfg = colorConfig[color];
  return (
    <div
      className="bg-white rounded-2xl p-5 flex flex-col gap-3 transition-shadow duration-200 hover:shadow-card-hover cursor-default"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</span>
        {icon && (
          <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: cfg.iconBg, color: cfg.iconColor }}>
            {icon}
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight text-slate-900">{value}</div>
        {subtext && (
          <div className="text-xs mt-1 font-medium px-2 py-0.5 rounded-full inline-block"
            style={{ background: `${cfg.accent}12`, color: cfg.accent }}>
            {subtext}
          </div>
        )}
      </div>
      <div className="h-0.5 rounded-full w-1/3" style={{ background: `linear-gradient(90deg, ${cfg.accent}, transparent)` }} />
    </div>
  );
}
