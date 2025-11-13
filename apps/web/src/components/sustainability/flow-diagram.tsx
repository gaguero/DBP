interface FlowStep {
  icon: string;
  label: string;
  sublabel?: string;
  value?: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
  className?: string;
}

export function FlowDiagram({ steps, className = "" }: FlowDiagramProps) {
  return (
    <div className={`flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center gap-4">
          <div className="text-center flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-[var(--color-ocean)]/10 to-[var(--color-forest)]/10 rounded-full flex items-center justify-center mb-2 border-2 border-[var(--color-ocean)]/20">
              <span className="text-3xl md:text-4xl">{step.icon}</span>
            </div>
            <p className="text-sm md:text-base font-semibold text-[var(--color-navy)]">{step.label}</p>
            {step.sublabel && (
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{step.sublabel}</p>
            )}
            {step.value && (
              <p className="text-xs font-bold text-[var(--color-ocean)] mt-1">{step.value}</p>
            )}
          </div>
          {index < steps.length - 1 && (
            <>
              <div className="hidden md:block text-2xl text-[var(--color-ocean)]/40">→</div>
              <div className="md:hidden text-2xl text-[var(--color-ocean)]/40">↓</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}


