export function getBoardName(boardType) {
  if (boardType === "announcement") {
    return "공지사항";
  } else if (boardType === "community") {
    return "자유게시판";
  } else if (boardType === "job") {
    return "취업 정보";
  } else if (boardType === "buyandsell") {
    return "사고팔기";
  } else if (boardType === "housing") {
    return "하우징/룸메이트";
  } else {
    return "게시판";
  }
}
