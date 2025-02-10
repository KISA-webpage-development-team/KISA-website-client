"use client";
import React from "react";
import { homeSponsorCarouselData as items } from "../../config/static/homePageData";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
import Image from "next/image";
import Link from "next/link";
import "react-multi-carousel/lib/styles.css";
import NextIconTail from "../ui/NextIconTail";

// import Carousel from "react-multi-carousel";
import "./test.css";

// import Carousel from "shadcn/ui"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// import Card from "shadcn/ui"
import { Card, CardContent } from "@/components/ui/card";

export default function SponsorCarousel() {
  const getImagePath = (sponsorID: string) => {
    return `/sponsor/${sponsorID}.png`;
  };

  const handleSponsorClick = () => {
    window.open(
      "https://umich.qualtrics.com/jfe/form/SV_3pEWxPBxDOahdps",
      "_blank"
    );
  };

  return (
    <div
      className={`w-full
    flex flex-col gap-4 ${sejongHospitalBold.className}`}
    >
      <h2 className="section_title">Sponsors</h2>
      <h2 className={`${sejongHospitalLight.className}`}>
        Proudly supported by leading organizations.
      </h2>
      <Carousel className="w-full">
        {/* For phone view, when only 3 box (it becomes scrollable) */}
        <CarouselContent className="flex snap-x scroll-smooth scrollbar-hide">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="snap-start basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/5"
            >
              <div className="p-1">
                <Card className="border-5 border-[#31506E] rounded-3xl">
                  <Link href={item.url} target="_blank">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        className="h-full object-contain"
                        src={
                          item.id === "5" || item.id === "6"
                            ? getImagePath("kisa")
                            : getImagePath(item.id)
                        }
                        alt={item.title}
                        width={500}
                        height={500}
                      />
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* Become a Sponsor Button (directed to external form) */}
      <div className="flex w-full justify-end">
        <button
          className="flex bg-[#31506E] text-white text-base sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-6 md:px-10 lg:px-12 py-2 sm:py-3 md:py-4 rounded-2xl hover:bg-[#1f3750] items-center transition-all duration-200"
          onClick={handleSponsorClick}
        >
          Become a Sponsor
          <span className="pl-1">
            <NextIconTail />
          </span>
        </button>
      </div>
    </div>
  );
}
