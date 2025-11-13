"use client";

import { useState } from "react";
import { ExperienceCarouselCard } from "./experience-carousel-card";
import { Button } from "@/components/button";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

interface Experience {
  title: string;
  image: string;
  duration: string;
  intensity: string;
  season?: string;
  href: string;
}

interface ExperiencesCarouselProps {
  title?: string;
  experiences: Experience[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function ExperiencesCarousel({
  title,
  experiences,
  ctaLabel = "Explore All Experiences →",
  ctaHref = "/experiences",
}: ExperiencesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <Section>
      <Container>
        {title && <h2 className="section-heading text-center mb-8">{title}</h2>}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {experiences.map((exp, index) => (
                <div key={index} className="min-w-full px-4">
                  <ExperienceCarouselCard {...exp} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
            aria-label="Previous experience"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
            aria-label="Next experience"
          >
            →
          </button>
          <div className="flex justify-center gap-2 mt-4">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-[var(--color-ocean)]" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button href={ctaHref} variant="primary">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}





