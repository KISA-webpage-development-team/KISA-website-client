export function getBoardName(boardType) {
  if (boardType === "announcement") {
    return "공지사항";
  } else if (boardType === "community") {
    return "자유게시판";
  } else if (boardType === "academic-job") {
    return "학업/취업";
  } else if (boardType === "buyandsell") {
    return "사고팔기";
  } else if (boardType === "housing") {
    return "하우징/룸메이트";
  } else if (boardType === "") {
    return "일반";
  } else {
    return "존재하지 않는 게시판";
  }
}

export function getBoardNameFromKorean(boardType) {
  if (boardType === "공지사항") {
    return "announcement";
  } else if (boardType === "자유게시판") {
    return "community";
  } else if (boardType === "학업/취업") {
    return "academic-job";
  } else if (boardType === "사고팔기") {
    return "buyandsell";
  } else if (boardType === "하우징/룸메이트") {
    return "housing";
  } else if (boardType === "일반") {
    return "";
  } else {
    return "none";
  }
}

export function getTagListForAnnouncement() {
  return [
    { name: "태그 없음", type: "" },
    { name: "자유게시판", type: "community" },
    { name: "학업/취업", type: "academic-job" },
    { name: "사고팔기", type: "buyandsell" },
    { name: "하우징/룸메이트", type: "housing" },
  ];
}
