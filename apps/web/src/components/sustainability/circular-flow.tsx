interface CircularStep {
  icon: string;
  label: string;
  sublabel?: string;
  percentage?: string;
}

interface CircularFlowProps {
  steps: CircularStep[];
  className?: string;
}

export function CircularFlow({ steps, className = "" }: CircularFlowProps) {
  return (
    <div className={`my-8 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4 md:gap-6">
            <div className="text-center flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-[var(--color-forest)]/10 to-[var(--color-gold)]/10 rounded-full flex items-center justify-center mb-2 border-2 border-[var(--color-forest)]/30 shadow-md">
                <span className="text-4xl md:text-5xl">{step.icon}</span>
              </div>
              <p className="text-sm md:text-base font-semibold text-[var(--color-navy)]">{step.label}</p>
              {step.sublabel && (
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{step.sublabel}</p>
              )}
              {step.percentage && (
                <p className="text-xs font-bold text-[var(--color-forest)] mt-1">{step.percentage}</p>
              )}
            </div>
            {index < steps.length - 1 && (
              <>
                <div className="hidden md:block text-3xl text-[var(--color-forest)]/40 font-bold">→</div>
                <div className="md:hidden text-3xl text-[var(--color-forest)]/40 font-bold">↓</div>
              </>
            )}
          </div>
        ))}
      </div>
      {/* Return arrow */}
      <div className="text-center mt-4">
        <div className="inline-flex items-center gap-2 text-sm text-[var(--color-forest)] font-semibold">
          <span>↓</span>
          <span>Returns to Garden</span>
          <span>↓</span>
        </div>
      </div>
    </div>
  );
}


