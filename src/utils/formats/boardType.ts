// Map of board types to their Korean names
const boardTypeMap = {
  announcement: "공지사항",
  community: "자유게시판",
  "academic-job": "학업/취업",
  buyandsell: "사고팔기",
  housing: "하우징/룸메이트",
  "": "일반",
};

// Create a reverse mapping of Korean names to board types
const koreanBoardTypeMap = Object.fromEntries(
  Object.entries(boardTypeMap).map(([key, value]) => [value, key])
);

/**
 * Get the Korean name of a board type
 * @param boardType - The English board type
 * @returns The Korean name of the board type, or a default message if not found
 */
export function getKoreanBoardType(boardType: string): string {
  return boardTypeMap[boardType] || "존재하지 않는 게시판";
}

/**
 * Get the English board type from its Korean name
 * @param boardType - The Korean name of the board type
 * @returns The English board type, or "none" if not found
 */
export function getEnglishBoardType(boardType: string): string {
  return koreanBoardTypeMap[boardType] || "none";
}

/**
 * Get the list of tags for the announcement board
 * @returns An array of objects containing name and type for each tag
 */
export function getTagListForAnnouncement(): { name: string; type: string }[] {
  return [
    { name: "태그 없음", type: "" },
    ...Object.entries(boardTypeMap)
      // Filter out "announcement" and empty string
      .filter(([key]) => key !== "announcement" && key !== "")
      // Map the remaining entries to the required format
      .map(([type, name]) => ({ name, type })),
  ];
}
