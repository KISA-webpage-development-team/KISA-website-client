"use client";

import React, { useEffect, useRef, useState } from "react";
import { homeCarouselData as items } from "../../config/static/homeCarouselData";
import Image from "next/image";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";
import { motion } from "framer-motion";

export default function HomeCarousel() {
  const duration = 5000; // 5 seconds
  const frame = useRef(0);
  const firstFrameTime = useRef(performance.now());
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animationCompleted, setAnimationCompleted] = useState(false);

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
      setAnimationCompleted(true); // Set animation completed for the new active item
    }
  };

  return (
    <div className="relative w-full h-96 flex flex-col md:flex-row gap-2">
      <div className="basis-1/2 transition-all duration-150 delay-300 ease-in-out">
        <div className="relative flex flex-col w-full h-full">
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
              className={`object-contain absolute w-full h-full ${
                active === index ? "" : "hidden"
              }`}
              onAnimationComplete={() => setAnimationCompleted(false)}
            >
              <Image
                className="object-contain"
                src={`/carousel/${id}.png`}
                fill
                alt={desc}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="basis-1/2 flex flex-col justify-center gap-2 pl-10">
        {items.map(({ id, title, desc }, index) => (
          <motion.div
            key={`carousel-${id}`}
            initial={{ opacity: active === index ? 1 : 0 }}
            animate={{ opacity: active === index ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`object-contain ${active === index ? "" : "hidden"}`}
            onAnimationComplete={() => setAnimationCompleted(false)}
          >
            <div className="h-full flex flex-col justify-center gap-4">
              <h2 className={`${sejongHospitalBold.className} text-3xl`}>
                {title}
              </h2>
              <p>{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div
        className="absolute w-1/2 bottom-0 right-0
      flex gap-3 pl-10"
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
              className="block relative w-full bg-slate-200 h-2 rounded-full"
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
  );
}
