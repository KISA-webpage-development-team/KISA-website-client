"use client";

import React, { useEffect, useRef, useState } from "react";
import { homeCarouselData as items } from "../../config/static/homePageData";
import Image from "next/image";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
import { motion } from "framer-motion";
//?

export default function HomeCarousel() {
  const duration = 10000; // 10 seconds
  const frame = useRef(0);
  const firstFrameTime = useRef(performance.now());
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    firstFrameTime.current = performance.now();
    frame.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, [active]);

  const animate = (now) => {
    let timeFraction = (now - firstFrameTime.current) / duration;

    if (timeFraction <= 1) {
      setProgress(timeFraction * 100);
      frame.current = requestAnimationFrame(animate);
    } else {
      timeFraction = 1;

      setProgress(0);
      setActive((active + 1) % items.length);
    }
  };

  return (
    <div className="mt-4 relative w-full h-full flex flex-col items-center md:flex-row gap-10">
      <div className="h-full transition-all duration-150 delay-300 ease-in-out">
        <div
          className="relative w-full flex flex-col justify-center 
        h-72 sm:h-[500px] md:h-[55vh] aspect-[6/4]"
        >
          {items.map(({ id, desc }, index) => (
            <motion.div
              key={`carousel-${id}`}
              initial={{
                x: active === index ? 0 : 50,
                opacity: active === index ? 1 : 0,
              }}
              animate={{
                x: active === index ? 0 : -50,
                opacity: active === index ? 1 : 0,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`cursor-pointer absolute w-full h-72 sm:h-[500px] md:h-[55vh] ${
                active === index ? "" : "hidden"
              }`}
              onClick={() => window.open(items[active].url, "_blank")}
            >
              <Image
                className="object-fit"
                src={`/carousel/${id}.png`}
                fill
                priority={index === active}
                alt={desc}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative h-full flex flex-col justify-center gap-2">
        {items.map(({ id, title, desc }, index) => (
          <motion.div
            key={`carousel-${id}`}
            initial={{ opacity: active === index ? 1 : 0 }}
            animate={{ opacity: active === index ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`object-contain ${active === index ? "" : "hidden"}`}
          >
            <div
              className="h-full flex flex-col justify-center 
            gap-2 md:gap-4 
            pr-10 md:pr-4
            pt-2 md:pt-0"
            >
              <h2
                className={`${sejongHospitalBold.className} text-xl sm:text-2xl md:text-3xl`}
              >
                {title}
              </h2>
              <p
                className={`${sejongHospitalLight.className} text-sm sm:text-base md:text-xl`}
              >
                {desc}
              </p>
            </div>
          </motion.div>
        ))}
        {/* Progress Bar */}
        <div
          className=" absolute
        w-full 
      bottom-0 right-0
      translate-y-6 sm:translate-y-12 md:translate-y-0
      flex gap-3
      md:pr-0"
        >
          {items.map(({ id, title, desc }, index) => (
            <button
              key={`carousel-${id}`}
              // className="flex flex-col gap-4 text-left bg-pink-200"
              className="w-full"
              onClick={() => {
                setActive(index);
                setProgress(0);
              }}
            >
              <span
                className="block relative w-full hover:bg-opacity-50 bg-slate-200 h-[10px] rounded-full"
                role="progressbar"
                aria-valuenow={active === index ? progress : 0}
              >
                <span
                  className="absolute inset-0 bg-michigan-blue rounded-[inherit]"
                  style={{ width: active === index ? `${progress}%` : "0%" }}
                ></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
