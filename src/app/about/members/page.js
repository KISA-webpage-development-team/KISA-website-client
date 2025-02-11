"use client";

import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

import SubTeamCard from "../../../components/About/SubTeamCard";
import TeamMembersList from "../../../components/About/TeamMembersList";
import { membersData } from "../../../config/static/memberPageData";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

export default function MemberPage() {
  const [selectedBoard, setSelectedBoard] = useState(null);

  const getPresident = (board) => {
    return board.teams.find((team) => team.teamName === "President");
  };

  const getMembersWithoutPresident = (board) => {
    return board.teams.filter((team) => team.teamName !== "President");
  };

  const [selectedYear, setSelectedYear] = useState(null);

  const handleSelectChange = (keys) => {
    const [year] = Array.from(keys);
    setSelectedYear(year);

    const foundBoard = membersData.find((b) => b.year === year);
    setSelectedBoard(foundBoard || null);
  };

  return (

    <div className="flex flex-col gap-12">
      <div className="flex justify-end">
        <Select 
          className="max-w-xs"
          classNames={{trigger:"border border-black hover:border-black focus:border-black"}} 
          label="Select year"
          variant={"bordered"}
          radius={"full"}
          selectedKeys={selectedYear ? new Set([selectedYear]) : new Set()}
          onSelectionChange={handleSelectChange}
        >
          {membersData?.map((board, idx) => (
              <SelectItem key={board.year}>
                {board.year}
              </SelectItem>
            ))}
        </Select>
      </div>

      {selectedBoard && (
      <div className="flex flex-col items-center w-full gap-12">
        <SubTeamCard
          role="President"
          members={getPresident(selectedBoard).subteams[0]?.members || []}
        />
        <div className="flex flex-col md:flex-row md:justify-center gap-24 md:gap-28 lg:gap-32 w-full">
          {getMembersWithoutPresident(selectedBoard).map((team) => (
            <TeamMembersList
              key={team.teamName}
              team={team.subteams}
              name={team.teamName}
            />
          ))}
        </div>
      </div>
    )}
    </div>
  );
}
