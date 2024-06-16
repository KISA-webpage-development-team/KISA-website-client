"use client";

// 게시판 테이블 뷰
//  columns: id, title, author, view, created

import Link from "next/link";
import AnnouncementIcon from "../ui/AnnouncementIcon";
import { dateFormatter } from "../../utils/dateFormatter";

export default function BoardTable({ postStartIdx, posts, announcementPosts }) {
  if (posts?.length === 0 && announcementPosts?.length === 0) {
    return <div>Loading...</div>;
  }

  const navigateToPost = (postid) => () => {
    window.location.href = `/posts/${postid}`;
  };

  return (
    <table
      className="border border-gray-300 w-full 
      text-base text-black "
    >
      <thead className="">
        <tr
          className="border-b border-gray-500 bg-white
           flex items-center py-2"
        >
          <th className="basis-1/12 min-w-16">번호</th>
          <th
            className="flex-1"
            onClick={() => {
              window.location.href =
                "../../launching-event/fueTV5v4BjBXxwd3FGgrYvCPt3FnkKKy";
            }}
          >
            제목
          </th>
          <th className="basis-1/12 min-w-16">글쓴이</th>
          <th className="basis-[10%] min-w-16">작성일</th>
          <th className="w-16">조회수</th>
        </tr>
      </thead>
      <tbody className="">
        {announcementPosts?.map(
          (
            {
              postid,
              // email,
              title,
              fullname,
              readCount,
              created,
              isAnnouncement,
              commentsCount,
            },
            idx
          ) => (
            // 번호 | 제목 | 글쓴이 | 작성일 | 조회수
            <tr
              key={postid}
              className={`relative border-b border-gray-200 flex items-center py-2 ${
                isAnnouncement ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
            >
              <td
                className={` ${
                  isAnnouncement && ""
                } text-center basis-1/12 flex justify-center min-w-16 `}
              >
                <>
                  <AnnouncementIcon />
                  <span className="absolute top-0 left-0 h-full w-1 bg-michigan-blue" />
                </>
              </td>
              <td className="text-left flex-1">
                <Link className="hover:underline" href={`/posts/${postid}`}>
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

              <td className="text-center basis-1/12 min-w-16">
                {/* <Link href={`/users/${email.split("@")[0]}`}>
                  <span>{fullname}</span>{" "}
                </Link> */}
                {fullname}
              </td>
              <td className="text-center basis-[10%] min-w-16">
                {dateFormatter(created)}
              </td>
              <td className="text-center w-16">{readCount}</td>
            </tr>
          )
        )}
        {posts?.map(
          (
            {
              postid,
              // email,
              title,
              fullname,
              readCount,
              created,
              isAnnouncement,
              commentsCount,
            },
            idx
          ) => (
            // 번호 | 제목 | 글쓴이 | 작성일 | 조회수
            <tr
              key={postid}
              className={`relative border-b border-gray-200 flex items-center py-2 ${
                isAnnouncement ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
            >
              <td
                className={` ${
                  isAnnouncement && ""
                } text-center basis-1/12 flex justify-center min-w-16 `}
              >
                {isAnnouncement ? (
                  <>
                    <AnnouncementIcon />
                    <td className="absolute top-0 left-0 h-full w-1 bg-michigan-blue" />
                  </>
                ) : (
                  postStartIdx - idx
                )}
              </td>
              <td className="text-left flex-1">
                <button
                  onClick={navigateToPost(postid)}
                  className="hover:underline"
                >
                  {commentsCount > 0 ? (
                    <span className={``}>
                      {title}
                      <span className="ml-1 text-red-500 font-normal ">{`[${commentsCount}]`}</span>
                    </span>
                  ) : (
                    <span className="">{title}</span>
                  )}
                </button>
              </td>

              <td className="text-center basis-1/12 min-w-16">
                {/* <Link href={`/users/${email.split("@")[0]}`}>
                  <span>{fullname}</span>
                </Link> */}
                {fullname}
              </td>
              <td className="text-center basis-[10%] min-w-16">
                {dateFormatter(created)}
              </td>
              <td className="text-center w-16">{readCount}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
