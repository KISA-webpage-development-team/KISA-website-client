// / : page.js에 사용되는 데이터

// <homeCarouselData>
// id: image id
// title
// descr
// url

const homeCarouselData = [
  {
    id: 'f25-26_friends_up',
    title: 'Friends-UP!',
    desc: (
      <p>
        🎮✨ 어색함은 DOWN ⬇️ Friends는 UP ⬆️ ✨🎉 새로운 동기, 선후배들과 한층
        더 가까워질 수 있는 Friends UP 이벤트가 새롭게 찾아왔습니다! 💙💛 키사가
        준비한 이 특별한 밤, 다 같이 웃고 게임하고 친해져요 🫶
      </p>
    ),
    url: 'https://tr.ee/t2xsTYk5oh',
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
