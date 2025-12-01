// / : page.js에 사용되는 데이터

// <homeCarouselData>
// id: image id
// title
// descr
// url

const homeCarouselData = [
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
  {
    id: 'f25-kisa-small-group',
    title: '소그룹 신규 모집',
    desc: (
      <p>
        🎉 25-26학기 KISA 소그룹을 소개합니다! 골프⛳️, 보드게임🎲, 클라이밍🧗‍♀️,
        화투🃏, 노래방🎤, 카공☕️, 마라탕🔥까지! 다양한 취미와 관심사로 가득한
        소그룹에서 새로운 친구들과 즐겁게 어울려보세요 ☀️ 소그룹은 상시 참여
        가능하며, 소그룹장의 카카오톡 아이디로 연락하면 바로 참여 가능합니다! 💛
      </p>
    ),
    url: 'https://www.instagram.com/p/DQJ4awKjqmO/?img_index=1',
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
