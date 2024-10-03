import { BoardType, CustomSession } from "../common/types";

export type EditorMode = "create" | "update";

export type CommentEditorMode = "create" | "update" | "reply";

// Page Props -------------------------------------------
export interface PostParamsPageProps {
  params: {
    postid: string;
  };
}

// Component Props -------------------------------------
// * post-view
export interface PostViewProps {
  post: Post;
}
export interface PostButtonBarProps {
  isAuthor: boolean;
  type: BoardType;
  postid?: number;
  title?: string;
}
export interface PostTitleBarProps {
  isAnnouncement: boolean;
  title: string;
}
export interface PostOwnerBarProps {
  email: string;
  fullname: string;
  created: string;
  readCount: Number;
  commentsCount: Number;
}
export interface PostContentProps {
  text: string;
}

// * post-edit
export interface EditorClientProps {
  boardType: BoardType;
  curPost: Post | null;
  mode: EditorMode;
}
export interface TextEditorProps {
  isAdmin?: boolean;
  text: string;
  setText: (text: string) => void;
}
export interface CheckBoxesProps {
  isBoardAnnouncement: boolean;
  isAnnouncement: boolean;
  setIsAnnouncement: (value: boolean) => void;
  announcementTag: string;
  setAnnouncementTag: (value: string) => void;
  customTag: string;
  setCustomTag: (value: string) => void;
}
export interface PostSubmitButtonProps {
  disabled: boolean;
  token: string;
  mode: EditorMode;
  postid?: Number | null; // only needed for update mode
  formData: SimplePostFormData | PostFormData;
}

// ------------------------------------------------------

// Post formdata ----------------------------------------
export interface SimplePostFormData {
  title: string;
  text: string;
  isAnnouncement: boolean;
  tag: string;
}
export interface PostFormData extends SimplePostFormData {
  type: BoardType;
  fullname: string;
  email: string;
}
export interface SimplePost extends Omit<Post, "email" | "text"> {}

export interface Post extends Omit<PostFormData, "tag"> {
  postid: number;
  readCount: number;
  commentsCount: number;
  created: string;
}
// ------------------------------------------------------

// * comments
export interface CommentsViewProps {
  commentsCount: Number;
  postid: Number;
}

export interface CommentEditorProps {
  mode: CommentEditorMode;
  session: CustomSession | null;
  postid: number;
  commentid?: number;
  curCommentId?: number | null;
  placeholder?: string;
  setCommentsStale: (value: boolean) => void;
  setOpenCommentEditor?: (value: boolean) => void;
}

export interface CommentsListProps {
  comments: Comment[];
  session: CustomSession | null;
  setCommentsStale: (value: boolean) => void;
}

export interface CommentItemProps {
  session: CustomSession | null;
  comment: Comment;
  parentCommentid?: number;
  setCommentsStale: (value: boolean) => void;
}

// Comment formdata -------------------------------------
export interface Comment {
  commentid: number;
  created: string;
  email: string;
  fullname: string;
  isCommentOfComment: boolean;
  parentCommentid: number;
  postid: number;
  text: string;
  childComments: Comment[];
}
