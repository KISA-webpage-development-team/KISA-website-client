// [2024.06.18 ~] Testing on semantic html on board table

import React from "react";
import BoardTableRow from "./BoardTableRow";
import "../../app/boards/board.css";

// for now, just use any type
type Props = {
  postStartIdx: number;
  posts: any[];
  annoucements: any[];
};

// [NOTE]
// 왜 board.css의 스타일이 table에 빌드 때 적용되지 않느냐?
// 시발!

export default function BoardTable({
  postStartIdx,
  posts,
  annoucements,
}: Props) {
  return (
    <table
      className="border border-gray-300 w-full
  text-base text-black"
    >
      <caption className="hidden">게시판 목록</caption>

      {/* 아. colgroup이 안되던 이유가 있었다. */}
      {/* board_table_header에 flex가 있어서 그랬음 ㅋㅋ */}
      {/* board_table_header안에서 py-2로 스타일링은 또 웃기게 안됨 뭐노... */}
      {/* colgroup에 다이렉트한 스탕일 */}
      {/* py-2는 th안으로 넣어버림 엄 */}
      {/* span은 col 개수를 명시하는것. */}

      <colgroup span={5}>
        <col width="60px" />
        <col width="*" />
        <col width="80px" />
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
            글쓴이
          </th>
          <th className="py-2 font-semibold text-gray-800" scope="col">
            작성일
          </th>
          <th className="pr-2 py-2 font-semibold text-gray-800" scope="col">
            조회
          </th>
        </tr>
      </thead>

      <tbody className="w-full">
        {annoucements?.map((announcement, _) => (
          <BoardTableRow
            key={announcement.postid}
            post={announcement}
            isAnnouncement
          />
        ))}
        {posts?.map((post, idx) => (
          <BoardTableRow
            key={post.postid}
            post={post}
            postNum={postStartIdx - idx}
          />
        ))}
      </tbody>
    </table>
  );
}
