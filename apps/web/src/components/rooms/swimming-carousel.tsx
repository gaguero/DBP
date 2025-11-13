"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const swimmingImages = [
  {
    src: "/images/swimming/swim-platform-crystal-clear-water-snorkeling-dolphin-bay.jpg",
    alt: "Swim platform extending over crystal clear turquoise water at Dolphin Blue Paradise, Bocas del Toro - perfect for swimming and snorkeling in Dolphin Bay",
  },
  {
    src: "/images/swimming/lounge-chairs-sunbathing-swim-platform-ocean-view.avif",
    alt: "Lounge chairs on swim platform for sunbathing with panoramic ocean view at Dolphin Blue Paradise, Bocas del Toro",
  },
  {
    src: "/images/swimming/sunset-hammock-golden-hour-dolphin-bay.jpeg",
    alt: "Sunset over Dolphin Bay with hammock on swim platform at Dolphin Blue Paradise, Bocas del Toro - golden hour relaxation",
  },
  {
    src: "/images/swimming/sunset-swim-platform-golden-hour-ocean.jpeg",
    alt: "Beautiful sunset over swim platform and Dolphin Bay at Dolphin Blue Paradise, Bocas del Toro - golden hour tranquility",
  },
  {
    src: "/images/swimming/swim-platform-gazebo-overwater-structures-dolphin-bay.jpeg",
    alt: "Overwater gazebo and structures on swim platform at Dolphin Blue Paradise, Bocas del Toro - relaxing over Dolphin Bay",
  },
  {
    src: "/images/swimming/lounge-chairs-deck-waterfront-catamaran-view.jpeg",
    alt: "Lounge chairs on waterfront deck with catamaran view at Dolphin Blue Paradise, Bocas del Toro - perfect for sunbathing",
  },
];

export function SwimmingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (swimmingImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % swimmingImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + swimmingImages.length) % swimmingImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % swimmingImages.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Image Display */}
      <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden bg-black">
        {swimmingImages.map((image, index) => (
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
        {swimmingImages.length > 1 && (
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
        {swimmingImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm z-10">
            {currentIndex + 1} / {swimmingImages.length}
          </div>
        )}

        {/* Dot Indicators */}
        {swimmingImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {swimmingImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/60 hover:bg-white/80"
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

