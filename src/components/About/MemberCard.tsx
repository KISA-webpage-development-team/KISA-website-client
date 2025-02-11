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
    <Card className="py-4">
      <CardBody className="flex flex-col items-center gap-4 overflow-visible py-2">
        <Image
          alt="Card background"
          className="rounded-full object-cover w-60 h-60"
          src="/kisa_logo.png"
          width={200}
          height={200}
        />

        <div className="flex items-center">
          <span
            className={`${sejongHospitalBold.className} text-xl md:text-2xl`}
          >
            {name}
          </span>
          <span>{`${major} | ${year}`}</span>
          <span>{role}</span>
        </div>
      </CardBody>
    </Card>
  );
}
