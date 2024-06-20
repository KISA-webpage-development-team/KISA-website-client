import React from "react";
import { SimplePost } from "../../model/props/posts";
import MobileBoardListItem from "./MobileBoardListItem";

type Props = {
  posts: SimplePost[];
  annoucements: SimplePost[];
};

export default function MobileBoardList({ posts, annoucements }: Props) {
  return (
    <ol
      className="sm:w-full sm:translate-x-0
  w-screen -translate-x-4
  border-t border-b border-gray-400"
    >
      {annoucements?.map((announcement, _) => (
        <MobileBoardListItem
          key={announcement.postid}
          post={announcement}
          isAnnouncement
        />
      ))}
      {posts?.map((post, _) => (
        <MobileBoardListItem key={post.postid} post={post} />
      ))}
    </ol>
  );
}
