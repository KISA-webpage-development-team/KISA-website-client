import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";
import Link from "next/link";
import HorizontalDivider from "../shared/HorizontalDivider";
import MobileBoardList from "../Boards/MobileBoardList";
import {
  getKoreanBoardType,
  isEveryKisaBoard,
} from "@/utils/formats/boardType";

export default function HomePostView({ type, posts }) {
  const boardLink = isEveryKisaBoard(type) ? "everykisa" : "boards";

  return (
    <div
      className="w-full flex flex-col
  rounded-lg  border-gray-300 border-1 
  p-3 md:p-6 gap-2"
    >
      <Link href={`/${boardLink}/${type}`}>
        <h2
          className={`${sejongHospitalBold.className} text-lg sm:text-xl mb-0 hover:underline cursor-pointer`}
        >{`${getKoreanBoardType(type)}`}</h2>
      </Link>

      <HorizontalDivider color="gray" />

      {/* table */}
      <MobileBoardList
        isEveryKisa={isEveryKisaBoard(type)}
        posts={posts}
        announcements={null}
        hasBorder={false}
      />
    </div>
  );
}
