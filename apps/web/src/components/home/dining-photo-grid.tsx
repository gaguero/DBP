"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
}

interface DiningPhotoGridProps {
  images: ImageItem[];
}

export function DiningPhotoGrid({ images }: DiningPhotoGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="relative aspect-square overflow-hidden rounded group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </button>
        ))}
      </div>
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className="relative max-w-4xl w-full aspect-video">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
            />
            {images[selectedImage].caption && (
              <p className="text-white mt-4 text-center">{images[selectedImage].caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}





