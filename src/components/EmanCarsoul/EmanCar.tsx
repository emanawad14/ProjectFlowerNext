"use client"
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface ProductCarouselProps {
  images: string[];
  title?: string;
}

export default function ProductCarousel({ images, title }: ProductCarouselProps) {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full max-w-lg"
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <Image
              src={img}
              alt={title || "Product image"}
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      
      
    </Carousel>
  );
}
