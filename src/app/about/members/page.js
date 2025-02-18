import React from "react";
import InfoTitle from "../../../components/shared/InfoTitle";
import SubTeamCard from "../../../components/About/SubTeamCard";
import TeamMembersList from "../../../components/About/TeamMembersList";
import MemberCard from "@/components/About/MemberCard";
import { members } from "../../../config/static/memberPageData";
import { divide } from "lodash";

export const metadata = {
  title: "조직도",
  description:
    "미시간 대학교 한인 학부 학생회의 멤버들입니다. 회장단, OP팀, PR팀으로 나뉘어져있습니다.",
};

export default function MemberPage() {
  const allMembers = [
    ...members.presidents.map((member) => ({
      ...member,
      section: "presidents",
    })),
    ...members.operations.map((member) => ({
      ...member,
      section: "operations",
    })),
    ...members.public_relations.map((member) => ({
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
        <InfoTitle title="24-25 Board" />
      </header>
      {/* Your code here */}
      {/* presidents */}
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
