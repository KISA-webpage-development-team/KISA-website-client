import { BoardType } from "@/types/board";
import type { SimplePost } from "@/types/post";

const EVERYKISA_BOARDS: ReadonlySet<BoardType> = new Set([
  BoardType.Community,
  BoardType.Concern,
  BoardType.Academic,
  BoardType.Career,
  BoardType.LivingQA,
]);

export function isEverykisaBoard(board: BoardType): boolean {
  return EVERYKISA_BOARDS.has(board);
}

const KOREAN_NAMES: ReadonlyArray<{ fullname: string; email: string }> = [
  { fullname: "인지오", email: "jiohin@umich.edu" },
  { fullname: "김동섭", email: "dongsubk@umich.edu" },
  { fullname: "박서연", email: "seoyeonp@umich.edu" },
  { fullname: "이민준", email: "minjunl@umich.edu" },
  { fullname: "최지원", email: "jiwonc@umich.edu" },
  { fullname: "정현우", email: "hyunwooj@umich.edu" },
  { fullname: "김서영", email: "seoyoungk@umich.edu" },
  { fullname: "장민석", email: "minseokj@umich.edu" },
  { fullname: "윤하늘", email: "haneuly@umich.edu" },
  { fullname: "한지민", email: "jiminh@umich.edu" },
];

const TITLES_BY_BOARD: Record<BoardType, ReadonlyArray<string>> = {
  [BoardType.JobAnnouncement]: [
    "Goldman Sachs 인턴 모집",
    "삼성전자 SDS 신입공채",
    "Google STEP 인턴 안내",
    "Meta New Grad 채용",
    "Amazon SDE 인턴",
    "Microsoft Explore Program",
    "현대자동차 글로벌 인턴",
    "LG CNS 신입공채",
    "Apple iOS Engineer 채용",
    "Netflix Data Engineer 모집",
    "Stripe Backend 채용",
    "Airbnb Frontend 채용",
    "DoorDash 인턴 모집",
    "Robinhood Internship",
    "Citadel Quant 인턴",
    "Two Sigma SWE 인턴",
    "Bloomberg 신입공채",
    "Salesforce SWE 채용",
    "Adobe Internship",
    "Uber Eats SWE 채용",
  ],
  [BoardType.Announcement]: [
    "2026 봄학기 학생회 공지",
    "신입생 환영회 개최 안내",
    "장학금 신청 기간 안내",
    "회칙 개정 공고",
    "임원진 선출 공고",
    "정기총회 일정 안내",
    "회비 납부 안내",
    "행사 자원봉사자 모집",
    "겨울방학 활동 보고",
    "학생회 신규 사업 안내",
    "회원 등록 갱신 안내",
    "비상연락망 업데이트",
    "오피스아워 변경 안내",
    "한인학생회 50주년 기념행사",
    "외부 기관 협업 안내",
    "공식 SNS 채널 개설",
    "포차 행사 자원봉사 모집",
    "리서치 미팅 일정",
    "회칙 영문 번역본 공유",
    "졸업생 송별회 안내",
  ],
  [BoardType.BuyAndSell]: [
    "MacBook Air M2 판매합니다",
    "iPhone 14 Pro 판매",
    "이케아 책상 무료 나눔",
    "전자레인지 팔아요",
    "캠핑용품 일괄 판매",
    "기숙사 미니냉장고 판매",
    "한국 책 단체 판매",
    "프린터 + 토너 판매",
    "닌텐도 스위치 OLED",
    "자전거 판매합니다",
    "에어팟 프로 2세대",
    "데스크탑 + 모니터",
    "이불 세트 무료나눔",
    "한국 화장품 판매",
    "키보드 + 마우스 세트",
    "기내용 캐리어 판매",
    "코스트코 회원권 양도",
    "차량 양도 (Honda Civic)",
    "쌀통 + 전기밥솥",
    "한국 책 5권 판매",
  ],
  [BoardType.Housing]: [
    "Forest Hills 1bed 룸메이트 구함",
    "South U 2bed 서블렛",
    "North Campus 스튜디오 양도",
    "Kerrytown 룸메 구함",
    "Ann Arbor 4bed 한 자리",
    "Packard St. 서블렛 (여름)",
    "주차 가능한 곳 구합니다",
    "한국인 룸메 환영",
    "Geddes 근처 1bed",
    "Hill St. 룸메 구함",
    "겨울학기 서블렛 구함",
    "Stadium Blvd. 1bed",
    "Pet-friendly 하우징",
    "Plymouth Rd. 2bed",
    "조용한 룸메 구함",
    "기숙사 양도",
    "여름방학 단기 서블렛",
    "Liberty Plaza 1bed",
    "1년 리스 구해요",
    "Plymouth 5bed 한 자리",
  ],
  [BoardType.Sponsor]: [
    "스폰서: 한식당 미가",
    "스폰서: 진가네",
    "스폰서: KISA 관광",
    "스폰서: 한국학원",
    "스폰서: 본가",
    "스폰서: 명동치킨",
    "스폰서: K-mart",
    "스폰서: 한밭칼국수",
    "스폰서: 김밥천국",
    "스폰서: 한국타이어",
    "스폰서: 어머니쌈밥",
    "스폰서: 닭갈비집",
    "스폰서: 분식왕",
    "스폰서: 메이드 인 한국",
    "스폰서: 떡볶이타운",
    "스폰서: 한솥도시락",
    "스폰서: 콩나물국밥집",
    "스폰서: 부산갈매기",
    "스폰서: KISA 무역",
    "스폰서: 한솔여행사",
  ],
  [BoardType.Community]: [
    "오늘 학식 너무 짠데 저만 그래요?",
    "도서관 24시간 자리 추천",
    "기숙사에서 키울 수 있는 식물",
    "미시간 첫눈 언제 올까요",
    "학교 안 카페 추천",
    "한국 음식점 BEST 5",
    "Ann Arbor 데이트 코스 공유",
    "한국에서 가져온 음식 자랑",
    "방학 때 뭐 하실거에요?",
    "MM 미식회 멤버 모집",
    "헬스장 같이 다니실 분",
    "학교 셔틀 진짜 늦네요",
    "한국 드라마 추천 받아요",
    "넷플릭스 같이 보실 분",
    "공부 같이 하실 분 (도서관)",
    "한국 카페 그리워요",
    "여름방학 인턴 어디서 하세요",
    "주말에 뭐 하세요?",
    "한국 친구가 놀러왔어요",
    "Wolverine 응원합니다",
  ],
  [BoardType.Concern]: [
    "교수님께 메일 보낼 때 멘탈 무너져요",
    "GPA 너무 안 좋아서 우울해요",
    "친구 사귀기가 너무 어려워요",
    "한국이 너무 그리워요",
    "비자 문제로 머리 아픕니다",
    "기숙사에서 자꾸 우울해져요",
    "성적 스트레스 어떻게 풀어요?",
    "졸업 후 진로가 막막합니다",
    "발표 공포증 어떻게 극복하셨나요",
    "외로움 견디는 법",
    "한국 부모님 걱정 때문에...",
    "학사경고 받았어요. 도와주세요",
    "룸메이트와 갈등 중입니다",
    "수업 따라가기가 너무 힘듭니다",
    "장학금 떨어졌어요",
    "학교 카운슬링 추천해주세요",
    "교환학생인데 적응이 어려워요",
    "비자 인터뷰 너무 떨립니다",
    "취업 압박감 너무 심해요",
    "심리상담 어떻게 시작하나요",
  ],
  [BoardType.Academic]: [
    "EECS 281 시험 후기",
    "Math 215 잘 듣는 법",
    "Stats 250 추천하시나요",
    "PSYCH 111 좋은 교수님",
    "ECON 101 후기",
    "ENGR 100 프로젝트 팁",
    "Calc 2 공부법 공유",
    "수강신청 팁 모아요",
    "교수님 메일 어떻게 쓰세요",
    "리딩 빨리 끝내는 법",
    "코드 스타일 가이드 공유",
    "석사 지원 어떻게 준비?",
    "박사과정 인터뷰 후기",
    "전공 선택 고민 중입니다",
    "GSI 후기 공유",
    "오피스아워 활용 팁",
    "그룹 프로젝트 빌런 후기",
    "잠 안 자고 공부하는 법",
    "TOEFL 준비 어떻게 하셨어요",
    "학점 관리 노하우",
  ],
  [BoardType.Career]: [
    "Goldman Sachs 인터뷰 후기",
    "신입 SWE 연봉 공유",
    "이력서 첨삭 부탁드려요",
    "코딩 인터뷰 준비 팁",
    "OPT vs CPT 차이",
    "비자 스폰서 회사 리스트",
    "Big Tech vs Startup",
    "리쿠르팅 시즌 일정",
    "미국 취업 vs 한국 취업",
    "면접 후 follow-up 메일",
    "LinkedIn 잘 쓰는 법",
    "Google STEP 후기",
    "Amazon 인턴 후기",
    "리퍼럴 받는 팁",
    "Career Fair 갈만한가요",
    "이력서 양식 공유",
    "behavioral 면접 답변 팁",
    "Coding Patterns 추천",
    "테크 인턴 vs 컨설팅 인턴",
    "박사 후 진로 고민",
  ],
  [BoardType.LivingQA]: [
    "Ann Arbor 운전면허 시험",
    "처음 와서 핸드폰 개통 어디서?",
    "한국에서 송금하는 법",
    "은행계좌 어디가 좋을까요",
    "건강보험 가입 방법",
    "치과 추천해주세요",
    "한국 식자재 어디서 사세요",
    "여름방학 인턴 갈때 짐 보관?",
    "Costco vs Sam's Club",
    "차 보험 어디가 싸요?",
    "한국 음식 배달 가능한 곳",
    "주차권 어디서 사나요",
    "겨울옷 어디서 사세요?",
    "한국 책 어디서 빌려요",
    "여름철 모기 퇴치법",
    "전기/가스 셋업 어떻게?",
    "택배 받는 법",
    "버스 패스 어디서 사요",
    "Detroit 공항 가는 법",
    "한국으로 돌아갈 때 짐 보내기",
  ],
};

const ANN_TITLES_BY_BOARD: Record<BoardType, ReadonlyArray<string>> = {
  [BoardType.JobAnnouncement]: [
    "[필독] 2026 채용 공고 게시 가이드",
    "[필독] Career Fair 일정 공지",
  ],
  [BoardType.Announcement]: [
    "[필독] 학생회 공지사항 게시 규정",
    "[필독] 2026 학생회 임원 명단",
  ],
  [BoardType.BuyAndSell]: [
    "[필독] 사고팔기 게시판 이용 규정",
    "[필독] 사기방지 안내",
  ],
  [BoardType.Housing]: [
    "[필독] 하우징 게시판 이용 안내",
    "[필독] 룸메 매칭 가이드",
  ],
  [BoardType.Sponsor]: [
    "[필독] 스폰서 게시판 안내",
    "[필독] 스폰서 등록 방법",
  ],
  [BoardType.Community]: [
    "[필독] 자유게시판 이용 규정",
    "[필독] 익명글 작성 가이드",
  ],
  [BoardType.Concern]: [
    "[필독] 고민게시판 이용 규정",
    "[필독] 심리상담 리소스 모음",
  ],
  [BoardType.Academic]: [
    "[필독] 공부게시판 이용 규정",
    "[필독] 학업 자료 공유 규정",
  ],
  [BoardType.Career]: [
    "[필독] 취업·진로 게시판 이용 안내",
    "[필독] 면접 후기 작성 시 유의사항",
  ],
  [BoardType.LivingQA]: [
    "[필독] 생활 Q&A 게시판 안내",
    "[필독] 자주 묻는 질문 모음",
  ],
};

let nextPostId = 10000;

function buildPostsForBoard(board: BoardType): SimplePost[] {
  const titles = TITLES_BY_BOARD[board];
  const isEverykisa = isEverykisaBoard(board);
  return titles.map((title, idx) => {
    const author = KOREAN_NAMES[idx % KOREAN_NAMES.length];
    // Alternate anonymous flag for everykisa boards (idx 0,2,4 → true; 1,3,5 → false).
    const anonymous = isEverykisa ? idx % 2 === 0 : false;
    const day = (idx + 1).toString().padStart(2, "0");
    const month = ((idx % 12) + 1).toString().padStart(2, "0");
    return {
      postid: nextPostId++,
      title,
      created: `2026-${month}-${day}T${(8 + (idx % 12)).toString().padStart(2, "0")}:00:00`,
      type: board,
      fullname: anonymous ? "익명" : author.fullname,
      email: author.email,
      readCount: 50 + idx * 7,
      commentsCount: idx % 11,
      anonymous,
      likesCount: idx % 9,
    };
  });
}

function buildAnnouncementsForBoard(board: BoardType): SimplePost[] {
  const titles = ANN_TITLES_BY_BOARD[board];
  return titles.map((title, idx) => {
    const author = KOREAN_NAMES[idx % KOREAN_NAMES.length];
    return {
      postid: nextPostId++,
      title,
      created: `2026-01-${(idx + 1).toString().padStart(2, "0")}T09:00:00`,
      type: board,
      fullname: author.fullname,
      email: author.email,
      readCount: 200 + idx * 30,
      commentsCount: 5 + idx,
      anonymous: false,
      likesCount: 10 + idx * 2,
    };
  });
}

const ALL_BOARDS: BoardType[] = [
  BoardType.JobAnnouncement,
  BoardType.Announcement,
  BoardType.BuyAndSell,
  BoardType.Housing,
  BoardType.Sponsor,
  BoardType.Community,
  BoardType.Concern,
  BoardType.Academic,
  BoardType.Career,
  BoardType.LivingQA,
];

export const mockBoardPosts: Record<BoardType, SimplePost[]> = ALL_BOARDS.reduce(
  (acc, board) => {
    acc[board] = buildPostsForBoard(board);
    return acc;
  },
  {} as Record<BoardType, SimplePost[]>
);

export const mockBoardAnnouncements: Record<BoardType, SimplePost[]> =
  ALL_BOARDS.reduce(
    (acc, board) => {
      acc[board] = buildAnnouncementsForBoard(board);
      return acc;
    },
    {} as Record<BoardType, SimplePost[]>
  );
