"use client";

import React from "react";
import InfoTitle from "../../../components/shared/InfoTitle";
import SubTeamCard from "../../../components/About/SubTeamCard";
import TeamMembersList from "../../../components/About/TeamMembersList";
import { Select, SelectItem } from "@nextui-org/react";

import MemberCard from "@/components/About/MemberCard";
import {
  members_2024,
  members_2023,
} from "../../../config/static/memberPageData";
import { divide } from "lodash";
import { useState, useEffect } from "react";

export default function MemberPage() {
  const membersData = {
    "24-25": members_2024,
    "23-24": members_2023,
  };

  const sortedYears = Object.keys(membersData).sort((a, b) => b - a);

  // To select the most recent year
  const [selectedYear, setSelectedYear] = useState(sortedYears[0]);

  const handleSelectChange = (keys) => {
    setSelectedYear(keys.values().next().value);
  };

  const selectedMembers = membersData[selectedYear];

  const allMembers = [
    ...selectedMembers.presidents.map((member) => ({
      ...member,
      section: "presidents",
    })),
    ...selectedMembers.operations.map((member) => ({
      ...member,
      section: "operations",
    })),
    ...selectedMembers.public_relations.map((member) => ({
      ...member,
      section: "public_relations",
    })),
  ];

  return (
    <section className="space-y-6">
      <header
        className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
    gap-8 md:gap-16"
      >
        <InfoTitle title={`${selectedYear} Board`} />
      </header>
      <div className="flex justify-end">
        <Select
          className="max-w-xs"
          classNames={{
            trigger:
              "border border-black hover:border-black focus:border-black",
          }}
          label="Select Year"
          variant="bordered"
          radius="full"
          selectedKeys={selectedYear ? new Set([selectedYear]) : new Set()}
          onSelectionChange={handleSelectChange}
        >
          {Object.keys(membersData).map((year) => (
            <SelectItem key={year}>{year}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Grid Style Cards Display */}
      <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-20 md:gap-y-[60px]">
        {allMembers.map(({ name, major, year, role }, index) => (
          <MemberCard
            key={index}
            role={role}
            name={name}
            major={major}
            year={year}
          />
        ))}
      </div>
    </section>
  );
}
