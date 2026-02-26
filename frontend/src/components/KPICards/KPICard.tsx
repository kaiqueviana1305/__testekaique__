import clsx from "clsx";

interface KPICardProps {
  label: string;
  value: string | number;
  subtext?: string;
  color?: "blue" | "green" | "purple" | "orange" | "red";
  icon?: React.ReactNode;
}

const colorMap = {
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  green: "bg-green-50 text-green-600 border-green-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  orange: "bg-orange-50 text-orange-600 border-orange-200",
  red: "bg-red-50 text-red-600 border-red-200",
};

export function KPICard({ label, value, subtext, color = "blue", icon }: KPICardProps) {
  return (
    <div className={clsx("rounded-xl border p-5 flex flex-col gap-2", colorMap[color])}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium opacity-80">{label}</span>
        {icon && <span className="opacity-60">{icon}</span>}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {subtext && <div className="text-xs opacity-60">{subtext}</div>}
    </div>
  );
}
