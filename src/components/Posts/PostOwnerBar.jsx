import React from "react";
import VerticalDivider from "../shared/VerticalDivider";
import ClockIcon from "../ui/ClockIcon";
import { fullDateFormatter } from "../../utils/dateFormatter";

export default function PostOwnerBar({
  fullname,
  created,
  readCount,
  commentsCount,
}) {
  return (
    <div
      className="flex justify-between items-center 
    text-xs md:text-base"
    >
      {/* left: fullname + created */}
      <div className="flex items-center gap-2">
        {/* later, fullname will be linked to user profile */}
        <p className="font-semibold">{fullname}</p>
        <VerticalDivider size="small" />
        <ClockIcon />
        <p className="text-gray-600">{fullDateFormatter(created)}</p>
      </div>

      {/* right: readCount, (추천수, 댓글수) */}
      <div
        className="flex items-center 
      gap-2 md:gap-3 text-gray-600"
      >
        <div className="flex items-center gap-1">
          <p>조회</p>
          <p className="text-black">{readCount}</p>
        </div>
        <VerticalDivider size="small" />
        <div className="flex items-center gap-1">
          <p>댓글</p>
          <p className="text-black">{commentsCount}</p>
        </div>
      </div>
    </div>
  );
}
