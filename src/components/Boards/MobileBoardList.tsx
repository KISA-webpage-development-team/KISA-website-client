import React from "react";
import MobileBoardListItem from "./MobileBoardListItem";
import { SimplePost } from "@/types/post";

type Props = {
  isEveryKisa?: boolean;
  posts: SimplePost[];
  annoucements: SimplePost[];
  hasBorder?: boolean;
};

export default function MobileBoardList({
  isEveryKisa = false,
  posts,
  annoucements,
  hasBorder = true,
}: Props) {
  return (
    <ol
      className={`sm:w-full sm:translate-x-0
  ${hasBorder && "w-screen -translate-x-4"}
  ${hasBorder && "border-t border-b border-gray-400"}`}
    >
      {annoucements?.map((announcement, _) => (
        <MobileBoardListItem
          isEveryKisa={isEveryKisa}
          key={announcement.postid}
          post={announcement}
          isAnnouncement
        />
      ))}
      {posts?.map((post, _) => (
        <MobileBoardListItem
          isEveryKisa={isEveryKisa}
          key={post.postid}
          post={post}
        />
      ))}
    </ol>
  );
}
