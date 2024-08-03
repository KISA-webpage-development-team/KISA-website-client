// Declare Types for Post Entity (not props!)

import { BoardType } from "./board";

interface Post {
  postid: number;
  email: string;
  fullname: string;
  created: string;
  title: string;
  text: string;
  type: BoardType;
  readCount: number;
  isAnnouncement: boolean;
  commentsCount: number;
}

interface UserBoardPost extends Omit<Post, "commentsCount"> {}

export type { Post, UserBoardPost };
