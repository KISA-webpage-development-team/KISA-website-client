// / : page.js에 사용되는 데이터

// <homeCarouselData>
// id: image id
// title
// descr
// url

const homeCarouselData = [
  {
    id: 'f25-26_last_pocha',
    title: 'KISA 종강포차',
    desc: (
      <p>
        드디어 연말이 다가오고 있습니다!!!🎄❄️☃️🎁 학기말 시험들, 밀린 과제들,
        밤새운 날들 - 모두모두 잠깐 내려놓고 우리 즐거운 토요일 다함께 놀고
        마셔요! 🌟신나는 밤을 위해 준비한 특별 이벤트! 💥 소주 첫 50병을 $15 →
        $10 ✨ 무려 5불 할인된 가격으로 판매합니다! 지금 RSVP하고 이번 학기
        마지막 포차를 더 저렴하게 즐겨요! 😆✨ 이번 포차는 total wireless의
        후원으로 함께합니다📱🎄
      </p>
    ),
    url: 'https://tr.ee/V7i4TJNsot',
  },
  {
    id: 'f25-26_kisa_yearbook',
    title: 'KISA Yearbook 2025-26',
    desc: (
      <p>
        안녕하세요 미시간 졸업예정자 여러분, 여러분의 이야기로 채워질 Yearbook의
        주인공이 되어주세요!🩵 📚KISA Yearbook은 미시간에서 보낸 소중한 추억과
        경험들을 한 권의 앨범에 담는 프로젝트입니다. 단순한 기록을 넘어,
        이곳에서 보낸 시간들을 다시 떠올리고 서로의 이야기를 나누는 의미 있는
        여정을 함께하고자 합니다.
      </p>
    ),
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdUMtf0DisuJtBcjsI8GjVu7NujMTwHC-pODtApDTN-Hg7E4w/viewform',
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
