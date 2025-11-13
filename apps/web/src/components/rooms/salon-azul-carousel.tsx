"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Salon Azul Carousel Component
 * 
 * ⚠️ TODO: CONFIRM PHOTOS TO USE
 * 
 * This carousel is ready but currently has no images. When Salon Azul photos are available,
 * add them to the salonAzulImages array below with the following structure:
 * 
 * {
 *   src: "/images/salon-azul/filename.avif",
 *   alt: "Descriptive alt text for SEO",
 * }
 * 
 * Recommended image types:
 * - Interior views of Salon Azul (relaxation space, reading area, board games)
 * - Outdoor workout area/patio (weights, dumbbells, fitness ball, yoga mats)
 * - Yoga/meditation space
 * - Massage area (if applicable)
 * 
 * Save images to: /apps/web/public/images/salon-azul/
 * 
 * SEO-friendly naming examples:
 * - salon-azul-interior-relaxation-space.avif
 * - salon-azul-outdoor-workout-area-weights.avif
 * - salon-azul-yoga-meditation-space.avif
 */
const salonAzulImages = [
  // TODO: Add Salon Azul images here when photos are confirmed
  // Example structure:
  // {
  //   src: "/images/salon-azul/interior-relaxation-space.avif",
  //   alt: "Interior of Salon Azul showing serene relaxation space at Dolphin Blue Paradise, Bocas del Toro",
  // },
];

export function SalonAzulCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (salonAzulImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % salonAzulImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + salonAzulImages.length) % salonAzulImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % salonAzulImages.length);
  };

  // Don't render if no images
  if (salonAzulImages.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Image Display */}
      <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden bg-black">
        {salonAzulImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        {salonAzulImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 z-10"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 z-10"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {salonAzulImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm z-10">
            {currentIndex + 1} / {salonAzulImages.length}
          </div>
        )}

        {/* Dot Indicators */}
        {salonAzulImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 flex-wrap justify-center max-w-[90%]">
            {salonAzulImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/60 hover:bg-white/80 w-2"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

