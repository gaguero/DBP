"use client";

import { useState } from "react";
import { TestimonialCard } from "./testimonial-card";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

interface Testimonial {
  quote: string;
  author: string;
  authorImage?: string;
  rating: number;
  source: "Google" | "Booking.com" | "TripAdvisor";
  sourceBadge?: string;
  category?: "accommodations" | "dining" | "experiences" | "sustainability";
}

interface TestimonialsSliderProps {
  title?: string;
  testimonials: Testimonial[];
}

export function TestimonialsSlider({ title, testimonials }: TestimonialsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 2;

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + itemsPerView, testimonials.length - itemsPerView));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerView, 0));
  };

  return (
    <Section>
      <Container>
        {title && <h2 className="section-heading text-center mb-8">{title}</h2>}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-[50%] px-4">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg disabled:opacity-50"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= testimonials.length - itemsPerView}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg disabled:opacity-50"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </Container>
    </Section>
  );
}





