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
  const { president, operations, public_relations } = members;

  console.log(operations);

  {
    /* <div className="flex flex-col items-center w-full gap-12">
    <SubTeamCard role="President" members={president.members} />

    <div
      className="flex flex-col md:flex-row md:justify-center 
    gap-24 md:gap-28 lg:gap-32 w-full "
    >
      <TeamMembersList team={operations} name="Operations" />
      <TeamMembersList team={public_relations} name="Public Relations" />
    </div>
  </div> */
  }
  return (
    <section
      className="flex flex-col items-center pt-2 md:pt-3 lg:pt-4 
    gap-8 md:gap-16"
    >
      <InfoTitle title="24-25 Board" />
      {/* Your code here */}
      {/* op */}
      {/* {operations.members.map(({ isLead, name, major, year }, index) => (
        <MemberCard role={role} name={name} major={major} year={year} />

        ))} */}

      {operations.map(({ role, members }, outer_index) => (
        <div key={outer_index}>
          {members.map(({ name, major, year }, inner_index) => (
            <div key={`${outer_index}_${inner_index}`}>
              <MemberCard role={role} name={name} major={major} year={year} />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
