"use client";

import { use } from "react";
import { useState, useEffect, useCallback } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import useEmblaCarousel from "embla-carousel-react";
import cn from "clsx";
import img from "../public/bg.jpg";
import Image from "next/image";
import { Blog } from "@/lib/types";
import { client } from "@/lib/client";
import { CAROUSEL_QUERY } from "@/lib/query";
import Link from "next/link";

export const PrevButton = ({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) => (
  <button
    className={cn("absolute top-1/2 -translate-y-1/2 left-10 lg:left-16")}
    onClick={onClick}
    disabled={!enabled}
  >
    <IoIosArrowDropleftCircle
      className={cn("text-white/80 h-10 w-10 lg:h-12 lg:w-12")}
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
    className="absolute top-1/2 -translate-y-1/2 right-10 lg:right-16"
    onClick={onClick}
    disabled={!enabled}
  >
    <IoIosArrowDroprightCircle className="text-white/80 h-10 w-10 lg:h-12 lg:w-12" />
  </button>
);

const getData = async () => {
  const data: {
    blogs: Pick<Blog, "coverImage" | "title" | "excerpt" | "slug">[];
  } = await client(CAROUSEL_QUERY);
  return data;
};

const getCarousel = getData();

const EmblaCarousel = () => {
  const data = use(getCarousel);

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
            {data.blogs.map((slide, index) => (
              <div className="embla__slide relative" key={index}>
                <div className="embla__slide__inner h-[55vh]">
                  <Image
                    className="h-full object-cover rounded"
                    src={slide.coverImage.url}
                    alt={`${slide.title}-cover-image`}
                    fill
                  />
                </div>
                <div className="absolute flex justify-center bg-black/20 rounded px-12 py-6 text-white bottom-0 left-0 right-0 mb-8 z-75 lg:max-w-xl lg:mx-40">
                  <div>
                    <Link href={`/article/${slide.slug}`}>
                      <h1 className="text-3xl my-6 lg:text-5xl font-display">
                        {slide.title}
                      </h1>
                    </Link>

                    <p>{slide.excerpt}</p>
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
