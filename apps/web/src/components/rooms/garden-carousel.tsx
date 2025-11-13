"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const gardenImages = [
  {
    src: "/images/garden/orchids.jpeg",
    alt: "Beautiful purple and white tropical orchids blooming in the garden at Dolphin Blue Paradise, Bocas del Toro",
  },
  {
    src: "/images/garden/pink-hibiscus.jpeg",
    alt: "Vibrant pink hibiscus flower in the tropical garden at Dolphin Blue Paradise, Bocas del Toro",
  },
  {
    src: "/images/garden/cream-hibiscus.jpeg",
    alt: "Cream and white hibiscus flower with pink accents in the tropical garden, Dolphin Blue Paradise",
  },
  {
    src: "/images/garden/white-hibiscus.jpeg",
    alt: "Elegant white hibiscus flower with pink center in the tropical garden, Dolphin Blue Paradise, Bocas del Toro",
  },
  {
    src: "/images/garden/magenta-hibiscus.jpeg",
    alt: "Stunning magenta hibiscus flower in the tropical garden at Dolphin Blue Paradise, Bocas del Toro",
  },
  {
    src: "/images/garden/pink-hibiscus-yellow-flower.jpeg",
    alt: "Pink and yellow hibiscus flowers together in the tropical garden, Dolphin Blue Paradise",
  },
  {
    src: "/images/garden/pink-ginger.jpeg",
    alt: "Pink torch ginger flower (Etlingera elatior) in the tropical garden at Dolphin Blue Paradise, Bocas del Toro",
  },
  {
    src: "/images/garden/ginger-red.jpeg",
    alt: "Red ginger flower (Alpinia purpurata) in the tropical garden at Dolphin Blue Paradise, Bocas del Toro",
  },
  {
    src: "/images/garden/torch-ginger.jpeg",
    alt: "Torch ginger flower with red and pink bracts in the tropical garden, Dolphin Blue Paradise",
  },
  {
    src: "/images/garden/red-flowers.jpeg",
    alt: "Red and orange Ixora flowers in the tropical garden at Dolphin Blue Paradise, Bocas del Toro",
  },
  {
    src: "/images/garden/purple-flowers.jpeg",
    alt: "Purple tropical flowers in the lush garden at Dolphin Blue Paradise, Bocas del Toro",
  },
  {
    src: "/images/garden/whit-red-flower.jpeg",
    alt: "White and red tropical flower in the garden at Dolphin Blue Paradise, Bocas del Toro",
  },
  {
    src: "/images/garden/tomatoes.jpeg",
    alt: "Fresh heirloom tomatoes from the garden at Dolphin Blue Paradise - farm-to-table produce, Bocas del Toro",
  },
  {
    src: "/images/garden/walk-aroung-garden.jpeg",
    alt: "Garden pathway through the tropical garden at Dolphin Blue Paradise, Bocas del Toro - nature walk experience",
  },
];

export function GardenCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (gardenImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gardenImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + gardenImages.length) % gardenImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % gardenImages.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Image Display */}
      <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden bg-black">
        {gardenImages.map((image, index) => (
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
        {gardenImages.length > 1 && (
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
        {gardenImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm z-10">
            {currentIndex + 1} / {gardenImages.length}
          </div>
        )}

        {/* Dot Indicators */}
        {gardenImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 flex-wrap justify-center max-w-[90%]">
            {gardenImages.map((_, index) => (
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

