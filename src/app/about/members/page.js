import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import InfoTitle from "../../../components/shared/InfoTitle";
import SubTeamCard from "../../../components/About/SubTeamCard";
import TeamMembersList from "../../../components/About/TeamMembersList";
import { boardsData } from "../../../config/static/memberPageData";
import MemberAccordion from "../../../components/About/MemberAccordion";

export const metadata = {
  title: "조직도",
  description:
    "미시간 대학교 한인 학부 학생회의 멤버들입니다. 회장단, OP팀, PR팀으로 나뉘어져있습니다.",
};

export default function MemberPage() {

  return (
    <section className="flex flex-col gap-12">
      <MemberAccordion boardsData={boardsData} />
    </section>
  );
}
