import type { LegacyKey } from "@/lib/legacy-content";
import { getLegacyContent } from "@/lib/legacy-content";

export function LegacyPage({ page }: { page: LegacyKey }) {
  const paragraphs = getLegacyContent(page);
  if (!paragraphs.length) {
    return null;
  }

  return (
    <div className="space-y-12 pb-24">
      <div className="container space-y-4 text-base leading-7 text-[var(--color-text-primary)]">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}