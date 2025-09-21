import clsx from "clsx";
import type { LegacyKey } from "@/lib/legacy-content";
import { getLegacyContent, getLegacySourceMeta } from "@/lib/legacy-content";

type LegacyContentProps = {
  page: LegacyKey;
  title?: string;
  description?: string;
  className?: string;
};

export function LegacyContent({ page, title, description, className }: LegacyContentProps) {
  const paragraphs = getLegacyContent(page);
  if (!paragraphs.length) {
    return null;
  }

  const meta = getLegacySourceMeta(page);
  const heading = title ?? meta.label;

  return (
    <section className={clsx("section bg-[var(--color-sand)]", className)}>
      <div className="container space-y-4">
        <div className="space-y-1">
          <h2 className="font-display text-2xl text-[var(--color-navy)]">{heading}</h2>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            Source captured on {meta.captureDate}
          </p>
          {description ? <p className="text-sm text-muted">{description}</p> : null}
        </div>
        <div className="space-y-3 text-sm leading-6 text-[var(--color-text-primary)]">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}