import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@/types/experiences";

interface ExperiencesSplitLayoutProps {
  activities: Activity[];
}

export function ExperiencesSplitLayout({ activities }: ExperiencesSplitLayoutProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="space-y-0">
          {activities.map((activity, index) => {
            const isEven = index % 2 === 0;
            return (
              <Link
                key={activity.slug}
                href={`/experiences/${activity.slug}`}
                prefetch={false}
                className={`flex flex-col md:flex-row items-stretch min-h-[400px] hover:bg-gray-50 transition-colors ${
                  index !== activities.length - 1 ? "mb-0 border-b border-black/10" : ""
                }`}
              >
                {/* Image Section - 50% width */}
                <div className={`relative w-full md:w-1/2 h-64 md:h-auto ${!isEven ? "md:order-2" : "md:order-1"}`}>
                  <Image
                    src={activity.image || "/images/hero-bay.jpg"}
                    alt={activity.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Section - 50% width */}
                <div
                  className={`w-full md:w-1/2 flex flex-col justify-between p-8 md:p-12 bg-white ${
                    !isEven ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] mb-3">
                      <span>{activity.duration}</span>
                      {activity.difficulty && (
                        <>
                          <span>•</span>
                          <span>{activity.difficulty}</span>
                        </>
                      )}
                      {activity.seasonal && (
                        <>
                          <span>•</span>
                          <span className="text-[var(--color-gold)]">Seasonal</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-[var(--color-navy)] mb-4 uppercase font-light">
                      {activity.name.toUpperCase()}
                    </h3>
                    <p className="text-base text-[var(--color-text-primary)] mb-6 leading-relaxed">
                      {activity.summary}
                    </p>
                    {activity.seasonal && activity.seasonNote && (
                      <p className="text-sm text-[var(--color-gold)] mb-4 italic">
                        {activity.seasonNote}
                      </p>
                    )}
                    {activity.highlights && activity.highlights.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {activity.highlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                            <span className="text-[var(--color-gold)] mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="button-primary w-full md:w-auto text-center py-3 px-6 rounded cursor-pointer">
                    Learn More
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}


