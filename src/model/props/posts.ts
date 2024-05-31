import { BoardType } from "../common/types";

export type EditorMode = "create" | "update";

// Page Props -------------------------------------------
export interface PostParamsPageProps {
  params: {
    postid: string;
  };
}

// Component Props -------------------------------------
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
export interface Post extends Omit<PostFormData, "tag"> {
  postid: Number;
  readCount: Number;
  commentsCount: Number;
  created: string;
}
// ------------------------------------------------------
