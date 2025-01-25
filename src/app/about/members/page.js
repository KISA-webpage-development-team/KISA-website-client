"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import SubTeamCard from "../../../components/About/SubTeamCard";
import TeamMembersList from "../../../components/About/TeamMembersList";
import { boardsData } from "../../../config/static/memberPageData";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

export default function MemberPage() {
  const [selectedBoard, setSelectedBoard] = useState(new Set(["members-0"]));

  const accordionItemClass = {
    base: "py-4",
    title: `text-4xl font-bold ${sejongHospitalBold.className}`,
  };

  const getPresident = (board) => {
    return board.teams.find((team) => team.teamName === "President");
  };

  const getMembersWithoutPresident = (board) => {
    return board.teams.filter((team) => team.teamName !== "President");
  };

  return (
    <section className="flex flex-col gap-12">
      <Accordion
        selectionMode="multiple"
        itemClasses={accordionItemClass}
        defaultSelectedKeys={["members-0"]}
      >
        {/*loop through the boardsData and create an AccordionItem for each board*/}
        {boardsData.map((board, idx) => (
          <AccordionItem key={`members-${idx}`} title={`${board.year} Board`}>
            <div className="flex flex-col items-center w-full gap-12">
              <SubTeamCard
                role="President"
                members={getPresident(board).subteams[0]?.members || []}
              />
              <div className="flex flex-col md:flex-row md:justify-center gap-24 md:gap-28 lg:gap-32 w-full">
                {getMembersWithoutPresident(board).map((team) => (
                  <TeamMembersList
                    key={team.teamName}
                    team={team.subteams}
                    name={team.teamName}
                  />
                ))}
              </div>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
