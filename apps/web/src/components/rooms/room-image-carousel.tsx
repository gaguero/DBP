"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface RoomImageCarouselProps {
  images: string[];
  alt: string;
}

export function RoomImageCarousel({ images, alt }: RoomImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);


  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Main Image Display */}
      <div className="relative flex-1 w-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`${alt} - Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm z-10">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Square Button Gallery Navigation - Homepage Style */}
      {images.length > 1 && (
        <div className="absolute left-8 bottom-8 flex flex-col gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 border-none cursor-pointer transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

