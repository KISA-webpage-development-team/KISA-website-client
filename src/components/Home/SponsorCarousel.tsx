"use client";
import React from "react";
import { homeSponsorCarouselData as items } from "../../config/static/homePageData";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
// import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
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

  const navigateToLink = (link) => {
    window.open(link, "_blank");
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
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/4 md:basis-1/3 lg:basis-1/5"
            >
              <div className="p-1">
                <Card className="border-5 border-[#31506E] rounded-3xl">
                  <Link href={item.url}>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        className="h-full object-contain"
                        src={getImagePath(item.id)}
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
      {/* Become a Sponsor Button (Directed to external google form) */}
      <div className="w-full flex justify-end">
        <button
          className="bg-[#31506E] text-white text-2xl px-[50px] py-4 rounded-2xl hover:bg-[#1f3750] transition flex items-center"
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSfVLLhSbYzwLLCJKsy_GCkbP-R8igUUYUgH700vcK6qvu5x2g/viewform?usp=sharing",
              "_blank"
            )
          }
        >
          Become a Sponsor{" "}
          <span className="mb-1">
            <NextIconTail></NextIconTail>
          </span>
        </button>
      </div>
    </div>
  );
}
