import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@/types/experiences";

interface ExperiencesMasonryLayoutProps {
  activities: Activity[];
}

export function ExperiencesMasonryLayout({ activities }: ExperiencesMasonryLayoutProps) {
  // Create staggered heights for masonry effect
  const getHeightClass = (index: number) => {
    const heights = ["h-64", "h-80", "h-72", "h-96", "h-64", "h-80"];
    return heights[index % heights.length];
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {activities.map((activity, index) => (
            <Link
              key={activity.slug}
              href={`/experiences/${activity.slug}`}
              prefetch={false}
              className="break-inside-avoid mb-6 group relative overflow-hidden rounded border border-black/10 bg-white hover:shadow-xl transition-all duration-300 block"
            >
              <div className={`relative ${getHeightClass(index)} overflow-hidden`}>
                <Image
                  src={activity.image || "/images/hero-bay.jpg"}
                  alt={activity.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-lg md:text-xl mb-1 uppercase font-light" style={{ color: '#FFFFFF', textShadow: '3px 3px 6px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,1), 1px -1px 0 rgba(0,0,0,1), -1px 1px 0 rgba(0,0,0,1), 1px 1px 0 rgba(0,0,0,1), 0 0 10px rgba(255,255,255,0.3)' }}>
                    {activity.name.toUpperCase()}
                  </h3>
                  <div className="flex items-center gap-2 text-xs md:text-sm" style={{ color: '#FFFFFF', textShadow: '2px 2px 4px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,1), 1px -1px 0 rgba(0,0,0,1), -1px 1px 0 rgba(0,0,0,1), 1px 1px 0 rgba(0,0,0,1)' }}>
                    <span>{activity.duration}</span>
                    {activity.difficulty && (
                      <>
                        <span>•</span>
                        <span>{activity.difficulty}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-3">
                  {activity.summary}
                </p>
                {activity.seasonal && activity.seasonNote && (
                  <p className="text-xs text-[var(--color-gold)] mb-3 italic">
                    {activity.seasonNote}
                  </p>
                )}
                {activity.highlights && activity.highlights.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {activity.highlights.slice(0, 2).map((highlight, idx) => (
                      <li key={idx} className="text-xs text-[var(--color-text-muted)] flex items-start gap-2">
                        <span className="text-[var(--color-gold)] mt-0.5">•</span>
                        <span className="line-clamp-1">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="button-primary w-full text-sm text-center py-3 px-6 rounded cursor-pointer">
                  Learn More
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

