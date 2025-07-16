// / : page.js에 사용되는 데이터

// <homeCarouselData>
// id: image id
// title
// descr
// url

const homeCarouselData = [
  {
    id: 'f25-26_new_student_pocha',
    title: '[25-26] 신/편입생 환영회',
    id: 'f25-26_new_student_pocha',
    title: '[25-26] 신/편입생 환영회',
    desc: (
      <p>
        앤아버는 처음이라 한편으로는 걱정되신다고요? 그런 걱정 싹 날려버리게
        신입생 환영회로 오세요!
        <br />
        미시간에 대한 궁금증도 해결하고, 꿀팁도 듣고, 친구도 사귀고, 선후배들과
        만날 수 있는 신환회로 초대합니다 💌
      </p>
    ),
    url: 'https://www.instagram.com/p/DLyzKkXztO-/?img_index=1',
    url: 'https://www.instagram.com/p/DLyzKkXztO-/?img_index=1',
  },
  {
    id: 'fa24_small_group_recruitment',
    title: '소그룹 신규 모집',
    desc: (
      <p>
        미시간에서 취미 활동을 함께 할 사람들을 찾고 있나요? 골프, 자동차, 게임
        볼링, 독서, 음악 등등… 공통된 관심사를 공유하며 돈독한 관계를 쌓을 수
        있는 “소그룹”이 드디어 열렸습니다! 여러분의 학교생활을 더욱더 윤택하게
        만들어줄 소그룹, 지금 당장 지원하러 오세요💙
      </p>
    ),
    url: 'https://www.instagram.com/p/DAtXy-0OWwa/?img_index=1',
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
