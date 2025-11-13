import clsx from "clsx";

interface Stat {
  value: string;
  label: string;
}

interface StatsBlockProps {
  stats: Stat[];
  separator?: string;
  className?: string;
}

export function StatsBlock({ stats, separator = "|", className }: StatsBlockProps) {
  return (
    <div className={clsx("flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6", className)}>
      {stats.map((stat, idx) => (
        <div key={idx} className="flex items-center gap-4 md:gap-6">
          <div className="text-center">
            <div className="font-display text-3xl md:text-4xl font-bold text-[var(--color-navy)]">
              {stat.value}
            </div>
            <div className="text-sm text-[var(--color-text-muted)] mt-1">
              {stat.label}
            </div>
          </div>
          {idx < stats.length - 1 && separator && (
            <span className="text-[var(--color-text-muted)] hidden md:inline">{separator}</span>
          )}
        </div>
      ))}
    </div>
  );
}





