import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
import Link from "next/link";
import { dateFormatter } from "../../utils/dateFormatter";
import HorizontalDivider from "../shared/HorizontalDivider";
import MobileBoardList from "../Boards/MobileBoardList";

export default function HomePostView({ type, posts }) {
  console.log(posts);

  return (
    <div
      className="w-full flex flex-col
  rounded-lg  border-gray-300 border-1 
  p-3 md:p-6 gap-2"
    >
      <h2
        className={`${sejongHospitalBold.className} text-lg sm:text-xl mb-0`}
      >{`${type} 게시판`}</h2>

      <HorizontalDivider color="gray" />

      {/* table */}
      <MobileBoardList posts={posts} annoucements={null} hasBorder={false} />
    </div>
  );
}
