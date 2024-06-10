"use client";

//  유저페이지 전용 댓글 리스트 뷰
//  columns: id, title, author, view, created

import Link from "next/link";
import { timeForToday } from "../../utils/dateFormatter";

export default function CommentsTable({ comments }) {
  return (
    <table className="border border-gray-300 w-full">
      <thead className="">
        <tr
          className="px-2 py-1 border-b border-gray-400 bg-gray-50/100 
        flex items-center"
        >
          <th className="grow text-center text-sm font-medium">내용</th>
          <th className="w-12 text-sm font-medium">작성일</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {comments.map(({ commentid, text, created, postid }, idx) => (
          <tr
            key={commentid}
            className={`px-2 border-b border-gray-200 flex items-center `}
          >
            <td
              className="grow max-h-12 text-left py-2
              overflow-hidden
            "
            >
              <Link href={`/posts/${postid}`} className="hover:underline ">
                <span className="text-overflow">{text}</span>
              </Link>
            </td>
            <td className="w-12 min-w-12 text-center ">
              {timeForToday(created)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
