// Declare Types for Post Entity (not props!)

interface Comment {
  commentid: number;
  postid: number;
  email: string;
  created: string;
  isCommentOfComment: boolean;
  parentCommentid: number | null;
  text: string;
}

export type { Comment };
