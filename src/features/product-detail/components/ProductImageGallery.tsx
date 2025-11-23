"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface ProductImageGalleryProps {
  productName: string;
  images: string[];
  video?: string | null;
}

export function ProductImageGallery({
  productName,
  images,
  video,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Combine images and video into a single array of media items
  const mediaItems = [
    ...(video ? [{ type: "video" as const, src: video }] : []),
    ...images.map((src) => ({ type: "image" as const, src })),
  ];

  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const renderMainMedia = () => {
    const item = mediaItems[selectedImage];

    if (item.type === "video") {
      const youtubeId = getYoutubeId(item.src);
      if (youtubeId) {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title="Product Video"
            className="w-full h-full absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
      return (
        <video
          src={item.src}
          controls
          className="w-full h-full object-cover"
          autoPlay
        />
      );
    }

    return (
      <Image
        src={item.src}
        alt={productName}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        priority
      />
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Media */}
      <div className="relative aspect-square rounded-2xl overflow-hidden glass group">
        {renderMainMedia()}

        {/* Navigation Arrows */}
        {mediaItems.length > 1 && (
          <>
            <button
              onClick={() =>
                setSelectedImage((prev) =>
                  prev === 0 ? mediaItems.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 z-10"
              aria-label="Trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setSelectedImage((prev) =>
                  prev === mediaItems.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 z-10"
              aria-label="Tiếp theo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {mediaItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
              selectedImage === index
                ? "ring-2 ring-primary scale-105"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {item.type === "video" ? (
              <div className="relative w-full h-full">
                {(() => {
                  const youtubeId = getYoutubeId(item.src);
                  if (youtubeId) {
                    return (
                      <>
                        <Image
                          src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                          alt="Video thumbnail"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white fill-current drop-shadow-lg" />
                        </div>
                      </>
                    );
                  }
                  return (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary fill-current" />
                    </div>
                  );
                })()}
              </div>
            ) : (
              <Image
                src={item.src}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
