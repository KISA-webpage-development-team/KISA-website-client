import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
import Link from "next/link";
import { dateFormatter } from "../../utils/dateFormatter";
import HorizontalDivider from "../shared/HorizontalDivider";

export default function HomePostView({ type, posts }) {
  return (
    <div
      className="w-full flex flex-col
  rounded-lg  border-gray-300 border-1 p-6"
    >
      <h2
        className={`${sejongHospitalBold.className} text-lg sm:text-xl mb-2`}
      >{`${type} 게시판 [준비중입니다...]`}</h2>

      {/* <HorizontalDivider color="gray" /> */}

      {/* table */}
      <table className="w-full">
        <tbody>
          {posts?.map(
            (
              { postid, title, commentsCount, created, fullname, readCount },
              idx
            ) => (
              <tr
                key={postid}
                className={`flex flex-col items-start justify-center
                                border-b border-gray-200 py-2`}
              >
                {/* top: 제목 [댓글수]] */}
                <td className="text-left">
                  <Link
                    href={`/posts/${postid}`}
                    className="hover:underline text-sm sm:text-base"
                  >
                    {commentsCount > 0 ? (
                      <span className={``}>
                        {title}
                        <span className="ml-1 text-red-500 font-normal">{`[${commentsCount}]`}</span>
                      </span>
                    ) : (
                      <span className="">{title}</span>
                    )}
                  </Link>
                </td>

                {/* bottom: 날짜 / 글쓴이 / 조회수 */}
                <td className="flex items-center gap-3 text-center text-[10px] sm:text-xs text-gray-500">
                  <span className="">{dateFormatter(created)}</span>
                  <span className="">{fullname}</span>
                  <span className="">{readCount}</span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
