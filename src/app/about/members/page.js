"use client";

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import InfoTitle from "../../../components/shared/InfoTitle";
import SubTeamCard from "../../../components/About/SubTeamCard";
import TeamMembersList from "../../../components/About/TeamMembersList";
import { boardsData } from "../../../config/static/memberPageData";


export default function MemberPage() {

  return (
    <section className="flex flex-col gap-12">
      <Accordion selectionMode="multiple">
        {/*loop through the boardsData and create an AccordionItem for each board*/}
        {boardsData.map((board) => {
          const presidentTeam = board.teams.find(
            (team) => team.teamName === "President"
          );
          const operationsTeam = board.teams.find(
            (team) => team.teamName === "Operations"
          );
          const publicRelationsTeam = board.teams.find(
            (team) => team.teamName === "Public Relations"
          );

          return (
            <AccordionItem
              key={board.title}
              title={`${board.year} Board`}
            >
              <div className="flex flex-col items-center w-full gap-12">
                {presidentTeam && (
                  <SubTeamCard
                    role="President"
                    members={presidentTeam.subteams[0]?.members || []}
                  />
                )}
                <div
                  className="flex flex-col md:flex-row md:justify-center gap-24 md:gap-28 lg:gap-32 w-full"
                > 
                  {operationsTeam && (
                    <TeamMembersList
                      team={operationsTeam.subteams}
                      name="Operations"
                    />
                  )}
                  {publicRelationsTeam && (
                    <TeamMembersList
                      team={publicRelationsTeam.subteams}
                      name="Public Relations"
                    />
                  )}
                </div>
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
