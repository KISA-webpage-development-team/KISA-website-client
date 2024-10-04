import React from "react";
import VerticalDivider from "../../shared/VerticalDivider";
import ClockIcon from "../../ui/ClockIcon";
import { fullDateFormatter, timeForToday } from "../../../utils/dateFormatter";
import Link from "next/link";

type PostOwnerBarProps = {
  email: string;
  fullname: string;
  created: string;
  readCount: number;
  commentsCount: number;
  anonymous: boolean;
};

export default function PostOwnerBar({
  email,
  fullname,
  created,
  readCount,
  commentsCount,
  anonymous,
}: PostOwnerBarProps) {
  return (
    <div
      className="flex justify-between items-center 
    text-xs sm:text-sm"
    >
      {/* left: fullname + created */}
      <div className="flex items-center gap-2">
        {/* later, fullname will be linked to user profile */}
        {anonymous ? (
          <p className="font-semibold">익명</p>
        ) : (
          <Link href={`/users/${email}`}>
            <p className="font-semibold hover:underline">{fullname}</p>
          </Link>
        )}

        <VerticalDivider size="small" />
        <div className="flex items-center gap-1">
          <ClockIcon />
          <p className="text-gray-600 hidden sm:block">
            {fullDateFormatter(created)}
          </p>
          <p className="text-gray-600 block sm:hidden">
            {timeForToday(created)}
          </p>
        </div>
      </div>

      {/* right: readCount, (추천수, 댓글수) */}
      <div
        className="flex items-center 
      gap-2 text-gray-600"
      >
        <div className="flex items-center gap-1">
          <p>조회</p>
          <p className="text-black">{`${readCount}`}</p>
        </div>
        <VerticalDivider size="small" />
        <div className="flex items-center gap-1">
          <p>댓글</p>
          <p className="text-black">{`${commentsCount}`}</p>
        </div>
      </div>
    </div>
  );
}
