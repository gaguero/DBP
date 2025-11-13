import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@/types/experiences";

interface ExperiencesGridLayoutProps {
  activities: Activity[];
}

export function ExperiencesGridLayout({ activities }: ExperiencesGridLayoutProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <Link
              key={activity.slug}
              href={`/experiences/${activity.slug}`}
              prefetch={false}
              className="group relative overflow-hidden rounded border border-black/10 bg-white hover:shadow-xl transition-all duration-300 block"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={activity.image || "/images/hero-bay.jpg"}
                  alt={activity.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-xl mb-1 uppercase font-light" style={{ color: '#FFFFFF', textShadow: '3px 3px 6px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,1), 1px -1px 0 rgba(0,0,0,1), -1px 1px 0 rgba(0,0,0,1), 1px 1px 0 rgba(0,0,0,1), 0 0 10px rgba(255,255,255,0.3)' }}>
                    {activity.name.toUpperCase()}
                  </h3>
                  <div className="flex items-center gap-3 text-sm" style={{ color: '#FFFFFF', textShadow: '2px 2px 4px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,1), 1px -1px 0 rgba(0,0,0,1), -1px 1px 0 rgba(0,0,0,1), 1px 1px 0 rgba(0,0,0,1)' }}>
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
              <div className="p-6">
                <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-3">
                  {activity.summary}
                </p>
                {activity.seasonal && activity.seasonNote && (
                  <p className="text-xs text-[var(--color-gold)] mb-3 italic">
                    {activity.seasonNote}
                  </p>
                )}
                <div className="button-primary w-full text-center py-3 px-6 rounded cursor-pointer">
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

