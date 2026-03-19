interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
}

export function SectionCard({ title, children, className = "", headerRight }: SectionCardProps) {
  return (
    <div className={`bg-[#161b22] border border-[#21262d] rounded-xl p-4 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[#8b949e] uppercase tracking-wide">{title}</h3>
          {headerRight}
        </div>
      )}
      {children}
    </div>
  );
}
