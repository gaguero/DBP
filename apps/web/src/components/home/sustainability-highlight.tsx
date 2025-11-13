import { StatsBlock } from "./stats-block";
import { Button } from "@/components/button";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

interface Stat {
  value: string;
  label: string;
}

interface SustainabilityHighlightProps {
  title?: string;
  description?: string;
  stats: Stat[];
  ctaLabel?: string;
  ctaHref?: string;
  background?: boolean;
}

export function SustainabilityHighlight({
  title,
  description,
  stats,
  ctaLabel = "Our Impact →",
  ctaHref = "/sustainability",
  background = true,
}: SustainabilityHighlightProps) {
  return (
    <Section background={background ? "sand" : "none"}>
      <Container>
        {title && <h2 className="section-heading text-center mb-4">{title}</h2>}
        {description && (
          <p className="text-center text-[var(--color-text-primary)] mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <StatsBlock stats={stats} />
        <div className="mt-8 text-center">
          <Button href={ctaHref} variant="primary">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}





