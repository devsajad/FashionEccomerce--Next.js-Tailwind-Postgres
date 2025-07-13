"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function ImageGallary({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [curImage, setCurImage] = useState(0);

  return (
    <div>
      <div className="mb-2 relative w-full max-w-[350px] aspect-square mx-auto md:mx-0">
        <Image
          src={images[curImage]}
          alt={`${alt} image`}
          fill
          className="object-contain"
          sizes="(max-width: 400px) 100vw, 400px"
          priority
          quality={70}
        />
      </div>
      <div className="flex gap-2 justify-center md:justify-start">
        {images.map((image, i) => (
          <button
            key={i}
            className={cn(
              "cursor-pointer block relative aspect-square w-25 border overflow-hidden rounded-lg hover:border-amber-400",
              curImage === i && "border-amber-400"
            )}
          >
            <Image
              src={image}
              alt={`${alt} image`}
              fill
              className="object-contain"
              priority
              quality={70}
              sizes="100px"
              onClick={() => setCurImage(i)}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
