import React from "react";
import VerticalDivider from "../shared/VerticalDivider";
import ClockIcon from "../ui/ClockIcon";

export default function PostOwnerBar({ fullname, created, readCount }) {
  return (
    <div
      className="flex justify-between items-center 
    text-sm md:text-base bg-green-100"
    >
      {/* left: fullname + created */}
      <div className="flex items-center gap-2">
        {/* later, fullname will be linked to user profile */}
        <p className="font-semibold">{fullname}</p>
        <VerticalDivider size="small" />
        <ClockIcon />
        <p>{created}</p>
      </div>

      {/* right: readCount, (추천수, 댓글수) */}
      <div className="flex items-center">
        <p>조회</p>
        <p className="ml-1">{readCount}</p>
      </div>
    </div>
  );
}
