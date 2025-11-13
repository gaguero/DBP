import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/button";

interface HomeHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundVideo?: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  className?: string;
}

export function HomeHero({
  title,
  subtitle,
  backgroundImage,
  backgroundVideo,
  ctaPrimary,
  ctaSecondary,
  className,
}: HomeHeroProps) {
  return (
    <section className={clsx("relative isolate overflow-hidden", className)}>
      {backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : (
        <Image src={backgroundImage} alt="" fill priority className="object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
      <div className="relative container flex min-h-[60vh] flex-col justify-center gap-6 py-24 text-white">
        <h1 className="max-w-3xl font-display text-4xl md:text-6xl">{title}</h1>
        <p className="max-w-2xl text-lg text-white/80">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href={ctaPrimary.href} variant="primary">
            {ctaPrimary.label}
          </Button>
          <Button href={ctaSecondary.href} variant="secondary" className="bg-transparent border-white text-white hover:bg-white/10">
            {ctaSecondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}





