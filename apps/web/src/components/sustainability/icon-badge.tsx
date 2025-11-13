interface IconBadgeProps {
  icon: string;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'ocean' | 'forest' | 'gold' | 'navy';
  className?: string;
}

export function IconBadge({ 
  icon, 
  label, 
  size = 'md',
  color = 'ocean',
  className = "" 
}: IconBadgeProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-20 h-20 text-4xl'
  };

  const colorClasses = {
    ocean: 'bg-[var(--color-ocean)]/10 border-[var(--color-ocean)]/30',
    forest: 'bg-[var(--color-forest)]/10 border-[var(--color-forest)]/30',
    gold: 'bg-[var(--color-gold)]/10 border-[var(--color-gold)]/30',
    navy: 'bg-[var(--color-navy)]/10 border-[var(--color-navy)]/30'
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center border-2 ${colorClasses[color]} mb-2`}>
        <span>{icon}</span>
      </div>
      <p className="text-xs md:text-sm font-semibold text-[var(--color-navy)] text-center">{label}</p>
    </div>
  );
}


