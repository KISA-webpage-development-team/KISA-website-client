import { BoardType } from "../common/types";

export type EditorMode = "create" | "update";

export interface EditorClientProps {
  boardType: BoardType;
  mode: EditorMode;
}

// Post formdata
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
