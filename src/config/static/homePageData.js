// / : page.js에 사용되는 데이터

// <homeCarouselData>
// id: image id
// title
// descr
// url
const homeCarouselData = [
  {
    id: "24_new_student_welcome",
    title: "신편입생 환영회",
    desc: (
      <p>
        장소: 강남비치
        <br />
        일시: 2024년 7월 27일 토요일 18:30 - 23:00
        <br />
        KISA가 올 가을 미시간 대학교에 입학하는 신/편입생을 환영합니다! 새로운
        친구들을 만나고 다가오는 새 학기에 도움이 될 꿀팁도 알아가세요.
        신환회에서 여러분의 첫 걸음을 응원합니다🫶
      </p>
    ),
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
  {
    id: "metacode_kisa_event",
    title: "[메타코드] 2달 무료 수강 이벤트",
    desc: (
      <p>
        KISA가 [메타코드]와 협업하여 미시간 한인 학생들을 위한 2달 무료 수강
        이벤트를 진행합니다. 코딩에 조금이라도 관심 있는 학우분들께서는 7.21까지
        신청하여 2달 무료 수강 쿠폰 받아 가세요!
      </p>
    ),
    url: "https://www.instagram.com/p/C9BIwGgO7bf/",
  },

  {
    id: "w24_course_evaluation",
    title: "여러분의 수강신청을 도와드립니다",
    desc: (
      <p>
        다음 학기에는 무슨 수업을 들으면 좋을지 고민하고 계시나요? 저희 키사가
        제작한 Course Evaluation Booklet을 통해 많은 수업들의 과제 정도, 교수님
        평가, 수업 난이도 등 솔직한 리뷰들을 살펴보세요! 여러분의 성공적인
        수강신청을 키사가 응원합니다!
        <br />
        <a href="https://www.umichkisa.com/posts/124">
          <b className="font-extrabold">[자료 보러 가기]</b>
        </a>
      </p>
    ),
    url: "https://www.umichkisa.com/posts/124",
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
