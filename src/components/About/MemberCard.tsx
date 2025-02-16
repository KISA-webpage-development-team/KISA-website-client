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
    <Card className="flex flex-col py-4 bg-[#eeeeee] shadow-none h-full">
      <CardBody className="flex flex-row md:flex-col items-center gap-1 overflow-visible py-2 h-full flex-grow">
        <Image
          alt="Card background"
          className="rounded-full object-cover w-60 h-60"
          src="/kisa_logo.png"
          width={200}
          height={200}
        />

        <div className="flex flex-col justify-center items-center w-full">
          {/* Name & Major Section (Ensures they are centered) */}
          <div className="flex flex-col items-center text-center min-h-[70px]">
            <span
              className={`${sejongHospitalBold.className} text-lg md:text-2xl`}
            >
              {name}
            </span>
            <span className="text-sm md:text-base">{`${major} | ${year}`}</span>
          </div>

          {/* Role Container (Centered & aligned properly) */}
          <div className="flex flex-col items-center justify-center w-full mt-2">
            {Array.isArray(role) ? (
              role.map((r, index) => (
                <span
                  key={index}
                  className={`${sejongHospitalBold.className} text-base text-[#31506E]`}
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
