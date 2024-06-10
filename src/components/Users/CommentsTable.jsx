"use client";

//  유저페이지 전용 댓글 리스트 뷰
//  columns: id, title, author, view, created

import Link from "next/link";
import { dateFormatter } from "../../utils/dateFormatter";

export default function CommentsTable({ comments }) {
  return (
    <table className="border border-gray-300 w-full">
      <thead className="">
        <tr className="border-b border-gray-400 bg-gray-50/100 text-sm font-normal flex items-center py-2">
          <th className="basis-1/12 min-w-16">번호</th>
          <th className="flex-1">내용</th>
          <th className="w-28">작성일</th>
        </tr>
      </thead>
      <tbody className="">
        {comments.map(({ commentid, text, created, postid }, idx) => (
          <tr
            key={commentid}
            className={`border-b border-gray-200 flex items-center `}
          >
            <td className="text-center basis-1/12 min-w-16 py-2 flex justify-center items-center">
              {comments.length - idx}
            </td>
            <td className="text-left flex-1 py-2">
              <Link href={`/posts/${postid}`} className="hover:underline">
                <span className="text-overflow">{text}</span>
              </Link>
            </td>
            <td className="text-center w-28">{dateFormatter(created)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
