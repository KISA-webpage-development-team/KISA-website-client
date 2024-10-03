// Declare Types for Post Entity (not props!)

interface NewCommentBody {
  email: string;
  fullname: string;
  text: string;
  isCommentOfComment: boolean;
  parentCommentid: number | null;
}

interface UpdateCommentBody {
  text: string;
}

interface Comment extends NewCommentBody {
  commentid: number;
  postid: number;
  created: string;
  childComments: Comment[];
}

export type { Comment, NewCommentBody, UpdateCommentBody };
