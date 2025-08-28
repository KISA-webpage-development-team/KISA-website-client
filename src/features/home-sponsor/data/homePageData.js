// / : page.js에 사용되는 데이터

// <homeCarouselData>
// id: image id
// title
// descr
// url

const homeCarouselData = [
  {
    id: 'f25-26_mass_meeting_pocha',
    title: '어서와, 미시간은 처음이지?',
    desc: (
      <p>
        새학기, 새출발, 새사람들🍁 2025 가을학기의 시작을 맞이하며, KISA 2025
        MASS MEETING 과 개강포차가 돌아왔습니다! 🙌 새 학기의 시작은 키사와 함께
        하세요!
      </p>
    ),
    url: 'https://forms.gle/cS4MY56ZbVLB9sncA',
  },
  {
    id: 'f25-26_kisa_recruiting',
    title: '25-26 보드멤버 모집',
    desc: (
      <p>
        💡KISA를 함께 이끌어 나갈 새로운 보드 멤버를 모집합니다💡 KISA는 여러
        네트워킹 이벤트와 소셜 이벤트를 통해 미시간대학교 한인 커뮤니티를
        활성화하고, 교내·외 생활에 실질적인 도움을 주는 것을 목표로 하고
        있습니다. 다가오는 한 해, KISA와 함께하고자 하는 분들은 아래 모집 일정을
        확인하시고 많은 관심 부탁드립니다 📣💛💙
      </p>
    ),
    url: 'https://forms.gle/WSN4HE6K5vyg83bh6',
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

export { homeCarouselData, homeQuickLinksData };
