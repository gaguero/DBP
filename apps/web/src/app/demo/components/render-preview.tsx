import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/button";
import type { ComponentDefinition } from "./types";

type HeroContent = {
  kicker?: string;
  heading?: string;
  copy?: string;
  backgroundImage?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

type PillarItem = {
  icon?: string;
  title?: string;
  description?: string;
};

type ExperienceItem = {
  title?: string;
  description?: string;
  meta?: string;
  image?: string;
};

type ImpactMetric = {
  label?: string;
  value?: string;
  helper?: string;
};

type JourneyStep = {
  icon?: string;
  title?: string;
  description?: string;
};

type GalleryImage = {
  src?: string;
  alt?: string;
  span?: string;
};

type ContactContent = {
  heading?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  note?: string;
};

type TestimonialContent = {
  quote?: string;
  author?: string;
  location?: string;
  image?: string;
};

function HeroPreview(content: HeroContent | undefined) {
  const backgroundImage = content?.backgroundImage ?? "/images/hero-bay.jpg";

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-navy)] text-white shadow-[var(--shadow-soft)]">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/30" />
      </div>
      <div className="relative flex flex-col gap-4 p-8 md:p-12">
        {content?.kicker ? (
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--color-gold)]">
            {content.kicker}
          </p>
        ) : null}
        <h2 className="max-w-3xl font-display text-3xl sm:text-4xl md:text-5xl">
          {content?.heading ?? "Hero Headline Placeholder"}
        </h2>
        {content?.copy ? (
          <p className="max-w-2xl text-base text-white/80 md:text-lg">{content.copy}</p>
        ) : null}
        <div className="flex flex-wrap gap-3 pt-2">
          {content?.primaryCta ? (
            <Button href={content.primaryCta.href}>{content.primaryCta.label}</Button>
          ) : null}
          {content?.secondaryCta ? (
            <Button variant="secondary" href={content.secondaryCta.href}>
              {content.secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ValuePillarsPreview(items: PillarItem[] | undefined) {
  if (!items?.length) {
    return <PlaceholderBox label="Value pillars coming soon" />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={`${item.title ?? index}`}
          className="rounded-[var(--radius-md)] border border-white/80 bg-white/80 p-6 shadow-sm backdrop-blur"
        >
          <div className="mb-3 text-3xl" aria-hidden="true">
            {item.icon ?? "✨"}
          </div>
          <h3 className="text-lg font-semibold text-[var(--color-navy)]">
            {item.title ?? "Pillar title"}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {item.description ?? "Short description of this value pillar."}
          </p>
        </div>
      ))}
    </div>
  );
}

function ExperienceShowcasePreview(items: ExperienceItem[] | undefined) {
  if (!items?.length) {
    return <PlaceholderBox label="Experience showcase content missing" />;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={`${item.title ?? index}`}
          className="flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] bg-white shadow-[var(--shadow-soft)]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={item.image ?? "/images/jeremy-wermeille-unsplash.jpg"}
              alt={item.title ?? ""}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">
              {item.meta ?? "Signature Experience"}
            </span>
            <h3 className="text-lg font-semibold text-[var(--color-navy)]">
              {item.title ?? "Experience Title"}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              {item.description ?? "Preview copy describing the experience in one or two lines."}
            </p>
            <div className="mt-auto pt-2 text-sm font-medium text-[var(--color-ocean)]">
              Learn more →
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ImpactMetricsPreview(content: { heading?: string; metrics?: ImpactMetric[] } | undefined) {
  const metrics = content?.metrics ?? [];

  return (
    <div className="rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-navy)] via-[var(--color-ocean)] to-[var(--color-forest)] p-6 text-white shadow-[var(--shadow-soft)] md:p-10">
      <h3 className="text-2xl font-semibold md:text-3xl">{content?.heading ?? "Impact Headline"}</h3>
      {metrics.length ? (
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <div key={`${metric.label ?? index}`} className="rounded-md bg-white/10 p-4">
              <div className="text-sm uppercase tracking-[0.3em] text-white/70">
                {metric.label ?? "Metric"}
              </div>
              <div className="mt-2 text-3xl font-semibold">{metric.value ?? "—"}</div>
              <p className="mt-2 text-sm text-white/70">
                {metric.helper ?? "Supporting copy for this metric."}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-white/70">Add impact metrics to showcase measurable outcomes.</p>
      )}
    </div>
  );
}

function JourneyPlannerPreview(steps: JourneyStep[] | undefined) {
  if (!steps?.length) {
    return <PlaceholderBox label="Journey planner steps pending" />;
  }

  return (
    <ol className="relative space-y-6 border-l border-dashed border-[var(--color-ocean)] pl-6">
      {steps.map((step, index) => (
        <li key={`${step.title ?? index}`} className="relative">
          <div className="absolute -left-8 flex items-center justify-center rounded-full bg-[var(--color-ocean)] p-3 text-lg text-white shadow">
            {step.icon ?? index + 1}
          </div>
          <div className="rounded-[var(--radius-md)] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[var(--color-navy)]">
              {step.title ?? `Step ${index + 1}`}
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {step.description ?? "Description of this phase in the travel journey."}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function TestimonialPreview(content: TestimonialContent | undefined) {
  return (
    <div className="flex flex-col gap-6 rounded-[var(--radius-lg)] bg-white p-6 shadow-[var(--shadow-soft)] md:flex-row md:items-center md:p-10">
      <div className="relative mx-auto size-32 overflow-hidden rounded-full border-4 border-[var(--color-sand)] md:mx-0">
        <Image
          src={content?.image ?? "/images/guest-avatar.svg"}
          alt={content?.author ?? ""}
          fill
          className={clsx("object-cover", content?.image ? undefined : "p-4")}
          unoptimized
        />
      </div>
      <div className="flex-1">
        <p className="text-lg italic leading-relaxed text-[var(--color-navy)]">
          {content?.quote ?? "“Insert a guest testimonial that captures the emotion of staying with us.”"}
        </p>
        <div className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">
          {content?.author ?? "Guest Name"} • {content?.location ?? "Home City"}
        </div>
      </div>
    </div>
  );
}

function GalleryPreview(images: GalleryImage[] | undefined) {
  if (!images?.length) {
    return <PlaceholderBox label="Gallery mosaic assets missing" />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-6">
      {images.map((image, index) => (
        <div
          key={`${image.src ?? index}`}
          className={clsx(
            "relative overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-sand)]",
            image.span ?? "col-span-3",
          )}
        >
          <Image
            src={image.src ?? "/images/Hero_sea.png"}
            alt={image.alt ?? ""}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}

function ContactBannerPreview(content: ContactContent | undefined) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-navy)] p-6 text-white shadow-[var(--shadow-soft)] md:flex md:items-center md:justify-between md:p-8">
      <div className="max-w-xl space-y-3">
        <h3 className="text-2xl font-semibold md:text-3xl">{content?.heading ?? "Contact CTA Heading"}</h3>
        <p className="text-sm text-white/80 md:text-base">{content?.body ?? "Supporting copy inviting guests to connect."}</p>
        {content?.note ? <p className="text-xs uppercase tracking-[0.3em] text-white/60">{content.note}</p> : null}
      </div>
      <div className="mt-4 flex flex-col gap-3 md:mt-0 md:flex-row">
        {content?.primary ? (
          <Button href={content.primary.href}>{content.primary.label}</Button>
        ) : null}
        {content?.secondary ? (
          <Button variant="secondary" href={content.secondary.href}>
            {content.secondary.label}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function PlaceholderBox({ label }: { label: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-ocean)] bg-white/60 p-6 text-sm text-[var(--color-text-muted)]">
      {label}
    </div>
  );
}

export function renderPreview(definition: ComponentDefinition) {
  const content = definition.content;

  switch (definition.component) {
    case "hero":
      return HeroPreview(content as HeroContent);
    case "valuePillars":
      return ValuePillarsPreview((content as { items?: PillarItem[] } | undefined)?.items);
    case "experienceShowcase":
      return ExperienceShowcasePreview((content as { items?: ExperienceItem[] } | undefined)?.items);
    case "impactMetrics":
      return ImpactMetricsPreview(content as { heading?: string; metrics?: ImpactMetric[] });
    case "journeyPlanner":
      return JourneyPlannerPreview((content as { steps?: JourneyStep[] } | undefined)?.steps);
    case "testimonial":
      return TestimonialPreview(content as TestimonialContent);
    case "gallery":
      return GalleryPreview((content as { images?: GalleryImage[] } | undefined)?.images);
    case "contactCta":
      return ContactBannerPreview(content as ContactContent);
    default:
      return <PlaceholderBox label={`Preview renderer missing for "${definition.component}"`} />;
  }
}
