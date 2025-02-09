// / : page.js에 사용되는 데이터

// <homeCarouselData>
// id: image id
// title
// descr
// url
const homeCarouselData = [
  {
    id: "fa24_kisa_yearbook",
    title: "KISA Yearbook",
    desc: (
      <p>
        FA24 - WN25 졸업생 선배님들! 미시간 대학교에서 만들었던 소중한 추억과
        경험들을 KISA Yearbook에 담아 간직해 보세요📽️🎞️ 이어북을 통해 오랫동안
        기억에 남을 미시간에서의 순간들을 함께 회상해 보는 건
        어떨까요?❄️선배님들의 학교생활과 노력을 한 권에 모은 특별한 앨범! 얼른
        신청해 주세요⛄️
      </p>
    ),
    url: "https://www.instagram.com/p/DCmf2f8R-JA/?img_index=1",
  },
  {
    id: "fa24_small_group_recruitment",
    title: "소그룹 신규 모집",
    desc: (
      <p>
        미시간에서 취미 활동을 함께 할 사람들을 찾고 있나요? 골프, 자동차, 게임
        볼링, 독서, 음악 등등… 공통된 관심사를 공유하며 돈독한 관계를 쌓을 수
        있는 “소그룹”이 드디어 열렸습니다! 여러분의 학교생활을 더욱더 윤택하게
        만들어줄 소그룹, 지금 당장 지원하러 오세요💙
      </p>
    ),
    url: "https://www.instagram.com/p/DAtXy-0OWwa/?img_index=1",
  },
  {
    id: "24-25_new_student_chatroom",
    title: "[24-25] 신/편입생 톡방",
    desc: (
      <p>
        미시간 대학교 입학을 축하드립니다!! KISA에서 준비한 신/편입생 톡방에
        들어오셔서 다양한 정보를 얻고 새로운 사람들도 만나보세요!
        <br />
        오픈채팅방 비밀번호는 @kisa_michigan 인스타 디엠으로 물어봐주세요!
      </p>
    ),
    url: "https://open.kakao.com/o/gFbE6Hng",
  },
];

// Quick link data
// <homeQuickLinksData>
// id: image id
// title
// url: link
const homeQuickLinksData = [
  {
    id: "wolverine_access",
    title: "Wolverine Access",
    url: "https://csprod.dsc.umich.edu/psc/csprodnonop/EMPLOYEE/SA/c/NUI_FRAMEWORK.PT_AGSTARTPAGE_NUI.GBL?CONTEXTIDPARAMS=TEMPLATE_ID%3aPTPPNAVCOL&scname=ADMN_CAMPUS_FINANCES&PanelCollapsible=Y&PTPPB_GROUPLET_ID=M_SF_CAMPUS_FIN&CRefName=ADMN_CAMPUS_FIN",
  },
  {
    id: "canvas",
    title: "Canvas",
    url: "https://canvas.it.umich.edu/",
  },
  {
    id: "atlas",
    title: "Atlas",
    url: "https://atlas.ai.umich.edu/",
  },
  {
    id: "mprint",
    title: "MPrint",
    url: "https://mprint.umich.edu/",
  },
  {
    id: "mdining",
    title: "MDining",
    url: "https://dining.umich.edu/menus-locations/dining-halls/",
  },
];

// <homeSponsorCarouselData>
// id: sponsor id (image id)
// title
// url: link
const homeSponsorCarouselData = [
  {
    id: "1",
    title: "Fast Campus",
    url: "https://fastcampus.co.kr/",
  },
  {
    id: "2",
    title: "Meta Code",
    url: "https://www.metacodes.co.kr/",
  },
  {
    id: "3",
    title: "Rezi",
    url: "https://www.rezi.ai/",
  },
  {
    id: "4",
    title: "Mock 4",
    url: "https://mprint.umich.edu/",
  },
  {
    id: "5",
    title: "Mock 5",
    url: "https://dining.umich.edu/menus-locations/dining-halls/",
  },
  {
    id: "6",
    title: "Mock 6",
    url: "https://meta.com",
  },
];

export { homeCarouselData, homeQuickLinksData, homeSponsorCarouselData };
