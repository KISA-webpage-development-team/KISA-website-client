"use client";

import React from "react";
import { homeQuickLinksData as items } from "../../config/static/homePageData";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";

export default function QuickLinks() {
  const navigateToLink = (url) => {
    console.log("url", url);
    window.open(url, "_blank");
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className={`w-full mt-0 sm:mt-4 md:mt-0
    flex flex-col gap-2 ${sejongHospitalBold.className}`}
    >
      <h2>Quick Links</h2>

      <div className="gap-8 flex items-center overflow-x-hidden p-1">
        {items.map((item, index) => (
          <Card
            key={item.id}
            isFooterBlurred
            radius="lg"
            className="min-h-36 min-w-36 
            basis-1/5 aspect-square relative border-none
            flex flex-col justify-center items-center"
            isPressable
            onPress={() => console.log("wow")}
          >
            <Image
              className="h-full object-contain"
              src={`/quick_links/${item.id}.png`}
              alt={item.title}
              fill
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
