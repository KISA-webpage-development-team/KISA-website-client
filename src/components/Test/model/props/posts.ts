import { BoardType } from "../common/types";

export type EditorMode = "create" | "update";

export interface EditorClientProps {
  boardType: BoardType;
  mode: EditorMode;
}
