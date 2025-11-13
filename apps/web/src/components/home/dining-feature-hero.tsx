import Image from "next/image";
import { Container } from "@/components/shared/container";

interface DiningFeatureHeroProps {
  title: string;
  description: string;
  image: string;
}

export function DiningFeatureHero({ title, description, image }: DiningFeatureHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
      <div className="relative container flex min-h-[50vh] flex-col justify-center gap-6 py-24 text-white">
        <h2 className="max-w-3xl font-display text-4xl md:text-5xl">{title}</h2>
        <p className="max-w-2xl text-lg text-white/80">{description}</p>
      </div>
    </section>
  );
}





