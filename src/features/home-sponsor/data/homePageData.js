// / : page.js에 사용되는 데이터

// <homeCarouselData>
// id: image id
// title
// descr
// url

const homeCarouselData = [
  {
    id: 'kim_kwang_jin_concert',
    title: 'K-ONNECT with 김광진',
    desc: (
      <p>
        '편지’, ‘마법의 성’, ‘동경소녀’ 등 수많은 명곡을 통해 사랑받아온 미시간
        동문 김광진 선배님을 초청해 그의 음악과 삶의 이야기를 가까이에서 나누는
        특별한 자리를 마련했습니다. 친구, 가족, 연인과 함께 따뜻한 음악과
        이야기로 물드는 가을밤을 함께하세요!
      </p>
    ),
    url: 'https://www.eventbrite.com/e/k-onnect-tickets-1564667445449',
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
