"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";
import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

export default function MemberCard({ role, name, major, year }) {
  return (
    <Card className="flex flex-col bg-[#eeeeee] shadow-none pt-2 h-full w-[90%] sm:w-[80%] md:w-[300px] md:h-[400px] mx-auto">
      <CardBody className="flex flex-row md:flex-col items-center overflow-visible flex-grow">
        <Image
          alt="Profile Images"
          className="rounded-full object-cover w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44"
          src="/kisa_logo.png"
          width={200}
          height={200}
        />

        <div className="flex flex-col justify-center items-center w-full">
          {/* Name & Major Section (Ensures they are centered) */}
          <div className="flex flex-col items-center text-center min-h-[70px]">
            <span
              className={`${sejongHospitalBold.className} text-lg sm:text-2xl md:text-2xl`}
            >
              {name}
            </span>
            <span className="text-sm sm:text-lg md:text-base">{`${major} | ${year}`}</span>
          </div>

          {/* Role Container (Centered & aligned properly) */}
          <div className="flex flex-col items-center justify-center w-full mt-2">
            {Array.isArray(role) ? (
              role.map((r, index) => (
                <span
                  key={index}
                  className={`${sejongHospitalBold.className} text-base text-[#31506E] sm:text-lg md:text-lg`}
                >
                  {r}
                </span>
              ))
            ) : (
              <span>{role}</span>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
