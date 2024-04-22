// / : page.js에 사용되는 데이터

// <homeCarouselData>
// id: image id
// title
// descr
// url
const homeCarouselData = [
  {
    id: "website",
    title: "웹사이트 런칭 이벤트",
    desc: (
      <p>
        새 학기를 맞이하여 신규 소그룹 모집을 진행하였는데요! 이번에 새로 개설된
        두 개의 소그룹과 이번 학기에도 활동할 세 개의 기존 소그룹을 소개합니다
      </p>
    ),
    url: "https://www.instagram.com/p/C3YUambphdn/?img_index=1",
  },
  {
    id: "pdo",
    title: "Pre-Departure Orientation (PDO)",
    desc: (
      <p>
        장소: 소피텔 앰버서더 서울
        <br />
        일시: 2024년 5월 24일 금요일 13:00 - 17:00
        <br />
        UMich International Center에서 공식적으로 주최하는 Pre-Departure
        Orientation 참석하셔서 학교생활과 학업 등 미국으로 출국 전 필요한 다양한
        정보들을 얻어 가세요!
      </p>
    ),
  },

];

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

export { homeCarouselData, homeQuickLinksData };
