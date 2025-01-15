"use client";

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import SubTeamCard from "./SubTeamCard";
import TeamMembersList from "./TeamMembersList";

export default function MemberAccordion({ boardsData }) {
    const {
        president: president_24_25,
        operations: operations_24_25,
        public_relations: public_relations_24_25,
    } = boardsData.board_24_25;
    
    const {
        president: president_23_24,
        operations: operations_23_24,
        public_relations: public_relations_23_24,
    } = boardsData.board_23_24;
    
    return (
        <Accordion selectionMode="multiple">
        {/*24-25 Board */}
        <AccordionItem key="24-25" title="24-25 Board">
            <div className="flex flex-col items-center w-full gap-12">
            {/* President */}
            <SubTeamCard role="President" members={president_24_25.members} />
    
            {/* OP + PR */}
            <div
                className="flex flex-col md:flex-row md:justify-center
                gap-24 md:gap-28 lg:gap-32 w-full"
            >
                <TeamMembersList team={operations_24_25} name="Operations" />
                <TeamMembersList team={public_relations_24_25} name="Public Relations" />
            </div>
            </div>
        </AccordionItem>
    
        {/*23-24 Board */}
        <AccordionItem key="23-24" title="23-24 Board">
            <div className="flex flex-col items-center w-full gap-12">
            {/* President */}
            <SubTeamCard role="President" members={president_23_24.members} />
    
            {/* OP + PR */}
            <div
                className="flex flex-col md:flex-row md:justify-center
                gap-24 md:gap-28 lg:gap-32 w-full"
            >
                <TeamMembersList team={operations_23_24} name="Operations" />
                <TeamMembersList team={public_relations_23_24} name="Public Relations" />
            </div>
            </div>
        </AccordionItem>
        </Accordion>
    );
}