// / : page.js에 사용되는 데이터

// <homeCarouselData>
// id: image id
// title
// descr
// url
const homeCarouselData = [
  {
    id: "f24-halloween-pocha",
    title: "나야, 할로윈",
    desc: (
      <p>
        할로윈 주말에 다들 뭐 하시나유?? 저희 키사는 할로윈 포차를 진행할
        예정이거덩요~ 맛있는 술뿐만 아니라 오뎅탕, 통닭, 족발 등등 다양한 안주도
        먹으며 즐거운 할로윈을 함께 보내면 어떨까요? 친구들과 다양한 코스튬도
        입고 와서 래플 이벤트에도 참여해 보세요~👻
      </p>
    ),
  },
  {
    id: "f24-study-break",
    title: "맛있는 간식 드시고 힘내세요🤍",
    desc: (
      <p>
        타지에서 한국 음식이 그립지 않으신가요? 키사에서 시험과 과제에 지친
        여러분을 위해 간식 나눔을 진행하려 합니다! Mason Hall로 오셔서 맛있는
        간식 드시고 가세요~ 여러분을 위해 키사가 맛있게 준비해 놓고
        기다리겠습니다! 😊
      </p>
    ),
    url: "https://www.instagram.com/p/DBMQhjWufn-/",
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
