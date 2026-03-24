import clsx from "clsx";

interface KPICardProps {
  label: string;
  value: string | number;
  subtext?: string;
  color?: "blue" | "green" | "purple" | "orange" | "red";
  icon?: React.ReactNode;
}

const colorConfig = {
  blue: {
    iconBg: "rgba(99,102,241,0.1)",
    iconColor: "#6366f1",
    accent: "#6366f1",
    badge: "rgba(99,102,241,0.08)",
  },
  green: {
    iconBg: "rgba(16,185,129,0.1)",
    iconColor: "#10b981",
    accent: "#10b981",
    badge: "rgba(16,185,129,0.08)",
  },
  purple: {
    iconBg: "rgba(139,92,246,0.1)",
    iconColor: "#8b5cf6",
    accent: "#8b5cf6",
    badge: "rgba(139,92,246,0.08)",
  },
  orange: {
    iconBg: "rgba(245,158,11,0.1)",
    iconColor: "#f59e0b",
    accent: "#f59e0b",
    badge: "rgba(245,158,11,0.08)",
  },
  red: {
    iconBg: "rgba(239,68,68,0.1)",
    iconColor: "#ef4444",
    accent: "#ef4444",
    badge: "rgba(239,68,68,0.08)",
  },
};

export function KPICard({ label, value, subtext, color = "blue", icon }: KPICardProps) {
  const cfg = colorConfig[color];

  return (
    <div
      className={clsx(
        "bg-white rounded-2xl p-5 flex flex-col gap-3 transition-shadow duration-200 hover:shadow-card-hover cursor-default"
      )}
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</span>
        {icon && (
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: cfg.iconBg, color: cfg.iconColor }}
          >
            {icon}
          </span>
        )}
      </div>

      <div>
        <div
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#0f172a" }}
        >
          {value}
        </div>
        {subtext && (
          <div
            className="text-xs mt-1 font-medium px-2 py-0.5 rounded-full inline-block"
            style={{ background: cfg.badge, color: cfg.accent }}
          >
            {subtext}
          </div>
        )}
      </div>

      {/* Bottom accent bar */}
      <div
        className="h-0.5 rounded-full w-1/3"
        style={{ background: `linear-gradient(90deg, ${cfg.accent}, transparent)` }}
      />
    </div>
  );
}
