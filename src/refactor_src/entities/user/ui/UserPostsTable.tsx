import React from "react";
import { Post } from "../../post/types";

type UserPostsTableProps = {
  posts: Post[];
};

export function UserPostsTable({ posts }: UserPostsTableProps) {
  return (
    <table
      className="border border-gray-300 w-full
text-base text-black"
    >
      <caption className="hidden">게시판 목록</caption>

      <colgroup span={5}>
        <col width="60px" />
        <col width="*" />
        <col width="100px" />
        <col width="80px" />
        <col width="55px" />
      </colgroup>

      <thead className="w-full">
        <tr className="border-b border-gray-500">
          {/* 번호는 실질적인 col의 역할을 하지 않는다 */}
          <th className="pl-2 py-2 font-semibold text-gray-800">번호</th>
          <th className="py-2 font-semibold text-gray-800" scope="col">
            제목
          </th>
          <th className="py-2 font-semibold text-gray-800" scope="col">
            게시판
          </th>
          <th className="py-2 font-semibold text-gray-800" scope="col">
            작성일
          </th>
          <th className="pr-2 py-2 font-semibold text-gray-800" scope="col">
            조회
          </th>
        </tr>
      </thead>

      {/* <tbody className="w-full">
        {posts.map((post, idx) => (
          <tr key={post.postid} className="border-b border-gray-300">
            <td className="pl-2 py-2 text-center">{idx + 1}</td>
            <td className="py-2">{post.title}</td>
            <td className="py-2">{post.type}</td>
            <td className="py-2">{post.created}</td>
            <td className="pr-2 py-2 text-center">{post.readCount}</td>
          </tr>
        ))}
      </tbody> */}
    </table>
  );
}
