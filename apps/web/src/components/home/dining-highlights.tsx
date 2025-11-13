interface Highlight {
  icon?: string;
  text: string;
}

interface DiningHighlightsProps {
  highlights: Highlight[];
}

export function DiningHighlights({ highlights }: DiningHighlightsProps) {
  return (
    <ul className="grid md:grid-cols-2 gap-4">
      {highlights.map((highlight, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="text-[var(--color-gold)] text-xl mt-1">✓</span>
          <span className="text-[var(--color-text-primary)]">{highlight.text}</span>
        </li>
      ))}
    </ul>
  );
}





