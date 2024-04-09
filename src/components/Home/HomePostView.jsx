import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";
import Link from "next/link";

export default function HomePostView({ type, posts }) {
  return (
    <div
      className="w-full flex flex-col gap-4
  rounded-lg shadow-lg border-michigan-blue border-1 p-6"
    >
      <h2
        className={`${sejongHospitalBold.className} text-lg sm:text-xl`}
      >{`${type} 게시판`}</h2>

      {/* table */}
      <table className="border-t-gray-200 border-t-1 w-full">
        <tbody className={`${sejongHospitalLight.className}`}>
          {posts.map(
            (
              { postid, title, commentsCount, created, fullname, readCount },
              idx
            ) => (
              <tr
                key={postid}
                className={`flex flex-col items-start justify-center
                                border-b border-gray-200  py-2 `}
              >
                {/* top: 제목 [댓글수]] */}
                <td className="text-left grow ">
                  <Link
                    href={`/posts/${postid}`}
                    className="hover:underline text-sm sm:text-base"
                  >
                    {commentsCount > 0 ? `${title} [${commentsCount}]` : title}
                  </Link>
                </td>

                {/* bottom: 날짜 / 글쓴이 / 조회수 */}
                <td>
                  <span className="text-center text-[10px] sm:text-xs text-gray-500">
                    {created.split(" ")[0]}
                  </span>
                  <span className="text-center ml-3 text-[10px] sm:text-xs text-gray-500">
                    {fullname}
                  </span>
                  <span className="text-center ml-3 text-[10px] sm:text-xs text-gray-500">
                    {readCount}
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
