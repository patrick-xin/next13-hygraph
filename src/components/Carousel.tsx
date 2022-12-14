"use client";

import { useState, useEffect, useCallback } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import useEmblaCarousel from "embla-carousel-react";
import cn from "clsx";

import Image from "next/image";
import { Blog } from "@/lib/types";
import Link from "next/link";

export const PrevButton = ({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) => (
  <button
    className={cn("absolute top-1/2 -translate-y-1/2 left-6 lg:left-16")}
    onClick={onClick}
    disabled={!enabled}
  >
    <IoIosArrowDropleftCircle
      className={cn("text-white/80 w-8 h-8 md:h-10 md:w-10 lg:h-12 lg:w-12")}
    />
  </button>
);

export const NextButton = ({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) => (
  <button
    className="absolute top-1/2 -translate-y-1/2 right-6 lg:right-16"
    onClick={onClick}
    disabled={!enabled}
  >
    <IoIosArrowDroprightCircle className="text-white/80 w-8 h-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
  </button>
);

const EmblaCarousel = ({ carousel }: { carousel: Blog[] }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    loop: true,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;

    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();

    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {carousel.map((slide, index) => (
              <div className="embla__slide relative" key={index}>
                <div className="relative overflow-hidden h-[55vh]">
                  <Image
                    onLoadingComplete={() => {
                      setPrevBtnEnabled(true);
                      setNextBtnEnabled(true);
                    }}
                    className="h-full object-cover rounded"
                    src={slide.coverImage.url}
                    alt={`${slide.title}-cover-image`}
                    blurDataURL={slide.coverImage.blurDataUrl}
                    placeholder={
                      slide.coverImage.blurDataUrl ? "blur" : "empty"
                    }
                    fill
                  />
                </div>
                <div className="absolute min-h-[24rem] flex justify-center bg-black/20 rounded px-12 py-6 text-white bottom-6 md:bottom-0 left-0 right-0 mb-8 z-75 lg:max-w-2xl lg:mx-40">
                  <div>
                    <Link href={`/article/${slide.slug}`}>
                      <h1 className="text-3xl my-6 lg:text-5xl font-display hover:underline decoration-2 underline-offset-2">
                        {slide.title}
                      </h1>
                    </Link>

                    <p className="line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
                      {slide.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </>
  );
};

export default EmblaCarousel;
