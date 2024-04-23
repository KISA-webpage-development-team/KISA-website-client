"use client";

//  유저페이지 전용 댓글 리스트 뷰
//  columns: id, title, author, view, created

import Link from "next/link";
import React, { useEffect, useState } from "react";
import AnnouncementIcon from "../ui/AnnouncementIcon";
import { dateFormatter } from "../../utils/dateFormatter";

export default function CommentsTable({ comments }) {
  if (!comments || comments?.length === 0) return null;

  return (
    <table className="border border-gray-300 w-full">
      <thead className="">
        <tr className="px-2  py-1 border-b border-gray-400 bg-gray-50/100 text-sm font-normal flex items-center">
          <th className="grow text-left">내용</th>
          <th className="w-12">작성일</th>
        </tr>
      </thead>
      <tbody className="">
        {comments.map(({ commentid, text, created, postid }, idx) => (
          <tr
            key={commentid}
            className={`px-2 border-b border-gray-200 flex items-center `}
          >
            <td className="text-left grow py-2">
              <Link href={`/posts/${postid}`} className="hover:underline">
                {text}
              </Link>
            </td>
            <td className="text-center w-12">{dateFormatter(created)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
