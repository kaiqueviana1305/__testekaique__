interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: number;
  className?: string;
  valueClassName?: string;
}

export function StatCard({ label, value, subtext, trend, className = "", valueClassName = "" }: StatCardProps) {
  return (
    <div className={`bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex flex-col gap-1 ${className}`}>
      <span className="text-xs text-[#8b949e] font-medium uppercase tracking-wide">{label}</span>
      <span className={`text-2xl font-bold text-white leading-tight ${valueClassName}`}>{value}</span>
      {trend !== undefined && (
        <span className={`text-xs font-medium ${trend >= 0 ? "text-green-400" : "text-red-400"}`}>
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend).toFixed(2)}%
        </span>
      )}
      {subtext && <span className="text-xs text-[#6b7280]">{subtext}</span>}
    </div>
  );
}
