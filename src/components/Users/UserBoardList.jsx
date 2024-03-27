import React, { useState, useEffect } from "react";

import CommentsTable from "./CommentsTable";
import UserPostsTable from "./UserPostsTable";

export default function UserBoardList({ posts, comments, openPosts }) {
  // TODO: need to prevent 무지성 api call
  // console.log(data);
  return (
    <div className="flex flex-col">
      {openPosts ? (
        <UserPostsTable posts={posts} />
      ) : (
        <CommentsTable comments={comments} />
      )}
    </div>
  );
}
