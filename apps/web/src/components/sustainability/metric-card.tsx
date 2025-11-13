interface MetricCardProps {
  icon?: string;
  value: string;
  label: string;
  sublabel?: string;
  percentage?: number;
  highlight?: boolean;
  className?: string;
}

export function MetricCard({ 
  icon, 
  value, 
  label, 
  sublabel, 
  percentage,
  highlight = false,
  className = "" 
}: MetricCardProps) {
  return (
    <div className={`p-6 text-center bg-white ${highlight ? 'border-2 border-[var(--color-gold)] bg-gradient-to-br from-[var(--color-gold)]/5 to-white' : ''} ${className}`}>
      {icon && (
        <div className="text-4xl md:text-5xl mb-3">{icon}</div>
      )}
      {percentage !== undefined ? (
        <div className="relative w-24 h-24 mx-auto mb-3">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="var(--color-sand)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="var(--color-forest)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${percentage * 2.51} 251`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-[var(--color-forest)]">{value}</span>
          </div>
        </div>
      ) : (
        <div className="text-4xl md:text-5xl font-bold text-[var(--color-ocean)] mb-2">{value}</div>
      )}
      <div className="text-xs md:text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wider">{label}</div>
      {sublabel && (
        <div className="text-xs text-[var(--color-text-muted)] mt-1">{sublabel}</div>
      )}
    </div>
  );
}


