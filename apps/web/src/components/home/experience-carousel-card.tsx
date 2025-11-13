import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface ExperienceCarouselCardProps {
  title: string;
  image: string;
  duration: string;
  intensity: string;
  season?: string;
  href: string;
  className?: string;
}

export function ExperienceCarouselCard({
  title,
  image,
  duration,
  intensity,
  season,
  href,
  className,
}: ExperienceCarouselCardProps) {
  return (
    <Link href={href} className={clsx("group relative block h-96 overflow-hidden rounded", className)}>
      <Image src={image} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="font-display text-2xl mb-2">{title}</h3>
        <div className="flex gap-4 text-sm">
          <span>{duration}</span>
          <span>•</span>
          <span>{intensity}</span>
          {season && <span>•</span>}
          {season && <span>{season}</span>}
        </div>
      </div>
    </Link>
  );
}





