"use client";

import { useState } from "react";
import Image from "next/image";

export function RoomPhotoCarousel() {
  // TODO: Replace with actual room photos
  const galleryImages: string[] = [
    // Visual needed: Room gallery images - luxury resort rooms, overwater cabanas, room interiors, ocean views
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Show placeholder if no images
  if (galleryImages.length === 0) {
    return (
      <div className="relative max-w-4xl mx-auto">
        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
          <p className="text-xs text-gray-500 text-center px-4 italic">
            Visual needed: Room gallery images - luxury resort rooms, overwater cabanas, room interiors, ocean views
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Room gallery image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      {galleryImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {galleryImages.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-[var(--color-ocean)] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

