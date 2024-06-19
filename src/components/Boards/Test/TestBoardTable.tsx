// [2024.06.18 ~] Testing on semantic html on board table

import React from "react";
import Link from "next/link";
import AnnouncementIcon from "../../ui/AnnouncementIcon";
import { dateFormatter } from "../../../utils/dateFormatter";

import "../../../app/boards/board.css";
import TestBoardTableRow from "./TestBoardTableRow";

// for now, just use any type
type Props = {
  postStartIdx: number;
  posts: any[];
  announcementPosts: any[];
};

export default function TestBoardTable({
  postStartIdx,
  posts,
  announcementPosts,
}: Props) {
  return (
    <table className="normal_table">
      <caption className="hidden">게시판 목록</caption>

      {/* 아. colgroup이 안되던 이유가 있었다. */}
      {/* normal_table_header에 flex가 있어서 그랬음 ㅋㅋ */}
      {/* normal_table_header안에서 py-2로 스타일링은 또 웃기게 안됨 뭐노... */}
      {/* colgroup에 다이렉트한 스탕일 */}
      {/* py-2는 th안으로 넣어버림 엄 */}
      {/* span은 col 개수를 명시하는것. */}

      <colgroup span={5}>
        <col width="10%" />
        <col width="*" />
        <col width="10%" />
        <col width="10%" />
        <col width="8%" />
      </colgroup>

      <thead>
        <tr className="normal_table_header">
          {/* 번호는 실질적인 col의 역할을 하지 않는다 */}
          <th>번호</th>
          <th scope="col">제목</th>
          <th scope="col">글쓴이</th>
          <th scope="col">작성일</th>
          <th scope="col">조회</th>
        </tr>
      </thead>

      <tbody>
        {announcementPosts?.map((announcement, _) => (
          <TestBoardTableRow
            key={announcement.postid}
            post={announcement}
            isAnnouncement
          />
        ))}
        {posts?.map((post, idx) => (
          <TestBoardTableRow
            key={post.postid}
            post={post}
            postNum={postStartIdx - idx}
          />
        ))}
      </tbody>
    </table>
  );
}
