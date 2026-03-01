import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { InfoContent } from "../types/infoContents";

const koreaInfoContents: InfoContent[] = [
  {
    id: 'item-1',
    title: '여름 인턴 일정 및 지원과정 - CS/DS/Eng',
    content: (
      <div>
        <strong className={`${sejongHospitalBold.className}`}>
          지원 일정 개요
        </strong>

        <p>
          <p>
            대부분의 한국 기업들은 여름(6월 ~) 인턴십 채용 공고를 그 해 2 ~ 3월
            사이에 게시합니다. 이 시기에 이력서(Resume), 자기소개서, 경우에 따라
            GitHub Portfolio 등 추가 자료 제출을 요구하며, 서류 전형 결과는
            3월쯤 발표되는 경우가 많습니다.
          </p>
          <br />
          <p>
            서류 합격 후에는 보통 1차 코딩 테스트, 이어서 2차 적성(면접) 전형이
            진행되며, 최종 발표는 3~5월 사이에 나오는 것이 일반적인 일정입니다.
            다만 회사마다 프로세스가 조금씩 달라, 코딩 테스트를 생략하거나 서류
            심사와 코딩 테스트를 한 단계로 통합하는 경우도 있으니 반드시 공고를
            꼼꼼히 확인해야 합니다.
          </p>
          <br />
          <p>
            또 한 가지 주의할 점은, 유학생 전형이 아닌 일반 대학생 기준 인턴십의
            경우 인턴십 시작 시기가 다소 늦게 잡히는 경우가 있다는 것입니다.
            예를 들어, 한국 대학생들은 방학이 더 늦게 시작하기 때문에 인턴십이
            7월에 시작해 9월까지 이어지는 경우도 있습니다. 하지만 미국 대학의
            경우 보통 8월 말 개강이므로, 한국 인턴십 종료 시점과 학기 시작이
            겹칠 수 있습니다. 따라서 사전에 일정을 면밀히 확인하고, 필요하다면
            회사 측과 일정을 조정할 수 있는지 미리 문의하는 것이 중요합니다.
          </p>
          <br />
          <p>
            대부분의 기업에서는 온라인 코딩 테스트를 통해 기본적인 알고리즘 및
            문제 해결 능력을 평가합니다. 진행 방식은 미국처럼 화상 인터뷰에서
            코딩 과정을 직접 시연 + 설명 하는 방식보다, 별도의 온라인 플랫폼에서
            일정 시간 내 문제를 푸는 형식이 일반적입니다. LeetCode보다는 백준,
            프로그래머스 같은 한국 코딩 플랫폼 문제를 활용하는 경우가 많은 것
            같고, 전반적으로 미국 기업의 코딩 인터뷰보다는 난이도가 낮은 편인 것
            같음으로, LeetCode 기준 Easy~Medium 정도로 생각하시면 좋을 것
            같습니다.
          </p>
          <br />
          <p>
            2차 적성 면접은 한국과 미국 모두 기본적인 준비 방향은 크게 다르지
            않습니다. 한국도 지원자의 경험을 실제 기업 업무와 얼마나 잘 연결
            지어 설명할 수 있는지를 특히 중시합니다. 이력서에 기재한 프로젝트에
            대해 배경, 동기, 본인 역할, 사용 기술, 결과와 배운 점을 정확히
            설명할 수 있어야 하고, 자신이 사용했다고 적은 프레임워크나 기술에
            대해 “왜 선택했는지, 대안은 없었는지, 한계는 무엇이었는지”를 설명할
            수 있도록 준비 하시는게 좋습니다.
          </p>
          <br />
          <strong className={`${sejongHospitalBold.className}`}>
            지원 방법 (ex. 채용 공고 사이트, 인맥 etc..)
          </strong>
          <br />
          <p>
            국내에서 인턴십을 지원하는 방법은 크게 채용 공고 사이트 활용, 기업
            자체 프로그램 확인, 네트워크(인맥) 활용, 그리고 대학 부설 프로그램을
            통한 경로로 나눌 수 있습니다.
          </p>
          <br />
          <p>
            가장 일반적인 경로는 각 기업의 공식 채용 웹사이트 또는 채용 포털
            사이트를 통한 지원입니다. 대부분의 인턴십은 별도 인턴 태그로
            구분되어 있어 찾기 어렵지 않습니다. 사실상 각 회사 홈페이지에
            올라오는 공고들은 대부분 채용 포털에도 연동되기 때문에, 대표적인 몇
            개 포털만 꾸준히 확인해도 충분합니다 (사람인, 잡코리아, 슈퍼루키,
            원티드). 이 중 슈퍼루키가 인턴 공고가 특히나 더 자주 올라오는
            편입니다. 이 외에도 토스, 당근마켓 같은 기업들은 자체 여름/겨울
            인턴십 프로그램을 매년 운영하기 때문에, 반드시 회사 공식 웹사이트도
            확인하는 것이 좋습니다. 여기에 추가로 저희 키사 개발진들이 만든
            유학생 전용 채용 공고 사이트도 추후에 확인해보면 도움 되실겁니다!
          </p>
          <br />
          <p>
            제출하시게 될 이력서는 미국식 1페이지 Resume와는 다소 다릅니다.
            형식적으로는 Resume보다 CV에 가까운 스타일을 선호하는 것 같습니다.
            프로젝트, 활동 경험에 대한 구체적인 설명을 더 많이 적는 것이
            일반적이며, 2페이지까지는 무방 하다고 생각합니다. 최근에는 Notion과
            같은 플랫폼을 이용해서 포트폴리오를 제출하는 지원자도 늘고 있는
            것으로 알고 있습니다! 중요한 점은, 되도록이면 영문 Resume를 그대로
            제출하거나 단순 번역해서는 안 된다는 것입니다. 한국 인턴십
            지원용으로는 국문 버전 이력서를 새로 작성하는 것이 가장 좋을겁니다.
            좋은 예시들은 네이버에 검색해봐도 많이 나오니 참고해보면 좋고,
            이력서 관련한 구체적인 정보는 다른 글에 기재되어 있으니 그걸 참고
            해보면 좋을 것 같습니다. 만약 한국 국적의 남성 지원자라면, 일부
            기업은 병역 이행 여부를 명시적으로 요구하기도 합니다. 예를 들어,
            과거 (본인)은 한화 인턴십에 지원하려 했으나 그 당시 미필자라 불가
            했던 사례가 있었습니다. 공고에 명시된 경우라면 그대로 따라야 하고,
            별도 언급이 없다면 대부분 이와 상관 없이 지원해도 무방합니다.
          </p>
          <br />
          <p>
            정규 채용 경로 외에도, 대학 부설 프로그램을 통해 인턴십 + 학점
            병행이 가능한 옵션이 있습니다. 일부 대학 부설 프로그램 (YISS: Yonsei
            International Summer School)에서 여름 인턴 + 학점 과목 병행
            프로그램이 존재합니다. 또 다른 옵션으로, 미시간 International
            Center에서 제공하는 CIEE 서울 인턴십 프로그램이 있습니다. 다만 이 두
            가지 옵션은 급여 대신 학점으로 보상받는 구조라, 결과적으로 돈을 받는
            것이 아닌, 돈을 들여 인턴십을 하는 형태입니다. 정규 루트로 인턴십을
            찾기 어렵거나, 학점을 병행해야 하는 학생에게는 여전히 고려해볼 만한
            대안인 것 같습니다!
          </p>
          <br />
          <strong className={`${sejongHospitalBold.className}`}>
            기타 조언
          </strong>
          <br />
          <p>
            본인이 한국어를 유창하게 할 수 있는 사람이 아닌데 유학생 전용
            인턴십이 아닌 경우, 언어와 소통 능력을 꼭 고려해야 합니다. 아무리
            업무 실력이 뛰어나더라도, 실제 회사 생활에서는 동료와의 원활한
            커뮤니케이션이 필수이고 회사는 이를 중요시 여깁니다. 한국어가
            서툴다면 근무 적응에 어려움이 생길 수 있으니 미리 참고하시는 것이
            좋습니다. 반대로 영어 실력은 분명한 강점으로 작용하는 것 같습니다.
            또한 한국 학생들과 차별화를 두기 위해서는, 당연한 얘기지만 단순히
            “코딩 실력”만으로는 부족합니다. 미국 대학생으로서만 가질 수 있는
            특별한 경험들을 강조하는 것이 효과적일 것 같습니다. 예를 들어, 유명
            해커톤 참가, 학부 연구 프로젝트, 동아리 활동, 국제 컨퍼런스 발표
            경험 등은 한국 대학생들이 상대적으로 접하기 어려운 기회이기 때문에
            좋은 차별화 포인트가 될 것입니다.
          </p>
          <br />
          <p>
            지원 전략 측면에서도, 아직까지 한국에서는 LinkedIn을 통한 리쿠르터
            접근이나 콜드 이메일이 흔하지 않습니다. 하지만 오히려 그런 점을
            역이용하여, 이런 미국식 접근법이 담당자들에겐 오히려 신선하게
            받아들여질 수 있을 것 같습니다. 관심 있는 기업이 있다면 영문과
            국문을 혼합한 포트폴리오와 간단한 소개 메일을 담당자에게 직접 이메일
            또는 링크드인을 통해 보내보는 것도 좋은 전략이 될 수 있을 것
            같습니다.
          </p>
          <br />
          <p>
            인턴십을 시작하면 보통 본인을 담당할 멘토나 선임이 배정됩니다. 이때
            중요한 것은 단순히 주어진 업무를 충실히 수행하는 데 그치지 않고, “이
            인턴십을 통해 무엇을 배우고 싶고 어떤 도전을 해보고 싶은지”를 분명히
            전달하는 것입니다. 특히 규모가 작은 회사일수록 개인의 성장 목표와
            희망을 업무에 반영해줄 가능성이 크므로, 입사 초기부터 적극적으로
            공유해서 의미 있는 인턴 시간을 보내시기 바랍니다! 마지막으로,
            인턴십을 찾을 때 반드시 대기업만 (네카라쿠배당토 등등)을 목표로 할
            필요는 없습니다. 물론 잘 알려진 기업의 이름 값은 한국에서
            매력적이지만, 실제로 미국 취업 시장에서는 크게 다르지 않게 평가되는
            경우가 많습니다. 반면 스타트업이나 소규모 기업에서는 높은 확률로 더
            다양한 프로젝트에 참여할 기회를 얻고, 실무 경험을 빠르게 쌓을 수
            있는 것 같습니다 (제 경험상). 특히 아직 1, 2학년 학부생이라거나
            경력이 적은 단계라면, 회사의 이름값보다 실제 경험과 배움의 폭을
            넓히는 것이 적어도 한국에 있을땐 훨씬 가치 있는 선택이 될 수
            있을거라 조심스럽게 생각해봅니다!
          </p>
        </p>
      </div>
    ),

    author: {
      name: 'Dongeun Kim',
      classOf: '2028',
      email: 'dongeunk@umich.edu',
    },
  },
];

const usInfoContents: InfoContent[] = [
  {
    id: 'item-1',
    title: '인턴십 일정 및 지원 과정 - CS/DS/Eng',
    content: (
      <div>
        <p>
          <strong className={`${sejongHospitalBold.className}`}>
            지원 일정 개요 (ex. 기업 지원서 오픈/마감 시기)
          </strong>
        </p>
        <p>
          CS/DS/Eng의 여름 인턴십의 경우, 그 전 해 8월부터 리크루팅을
          시작합니다. FAANG, Chase, Optiver, Figma 등 큰 회사들은 일찍
          시작하므로 조기 지원을 권장합니다. 인턴십 공고는 다음 해 6월까지
          열려있습니다. International Student의 경우 CPT 발급 시간이 필요하므로
          최종 리크루팅 기간은 4월 초입니다. 정리하자면, 26년 여름 인턴십을 찾고
          있다면, 25년 8/9월부터 4월 초까지 공고를 지원하는 것입니다.
        </p>
        <br />
        <p>
          <strong className={`${sejongHospitalBold.className}`}>
            지원 방법 (ex. Linkedin, Career Fair ..etc)
          </strong>
        </p>
        <p>
          가장 일반적인 방법은 링크드인입니다. 링크드인에 올라온 공고만 지원해도
          충분히 많기 때문에 이것만 해도 됩니다. 원하는 인턴십을 검색하면 회사의
          인턴십 페이지로 리다이렉트되고, 이력서를 업로드하고 질문지를 작성하면
          됩니다.
        </p>
        <br />
        <p>
          Career Fair의 경우, 9월에 학교에서 활발히 열립니다. Engineering Career
          Fair가 9월 초 North Campus에서 열립니다. 큰 Career Fair는 큰 회사
          부스에 줄이 길고, 큰 회사 부스의 채용 담당자들은 QR코드를 찍어서
          온라인으로 지원하라고 하는 경우가 많습니다. 메인 Career Fair와 다른
          날에 열리는 스타트업 중심의 Career Fair에 참여하는 것을 추천합니다.
          작은 회사들은 이력서를 들고 적극적으로 다가가는 것을 좋아하고, 때로는
          그 자리에서 인터뷰를 잡기도 합니다.
        </p>
        <br />
        <p>
          링크드인으로 수백 개 지원해도 부족하다고 느낄 수 있습니다. 이때 Cold
          Email을 활용해보세요. 원하는 회사의 채용 담당자나 엔지니어에게 Cold
          Email을 보내거나 링크드인 메시지를 보내 직접 어필하는 방법입니다. Cold
          Email을 적극적으로 활용해보세요. 메시지 하나 보내는 것에 잃을 것은
          없습니다.
        </p>
        <br />
        <p>
          <strong className={`${sejongHospitalBold.className}`}>
            기타 조언
          </strong>
        </p>
        <p>
          제가 해드릴 수 있는 유일한 조언은 &apos;최대한 많이 지원하라&apos;입니다. 적어도
          몇백 개는 지원해야하고, 많으면 천 개가 넘어가는 사람도 봤습니다.
          그렇게 지원해야 간신히 열 손가락으로 셀 수 있는 개수의 인터뷰가
          잡힙니다. 인터뷰가 한 번만이라도 걸리면 무조건 붙는다는 마인드로 수백
          개를 지원해보세요. 하나라도 걸리면 됩니다. 탈락 메일이 무수히 많이
          오더라도 좌절하지 마십시오. 끝까지 하다보면 결국 되곤 합니다. (저도
          8월에 시작해서 다음 해 3월 말에 간신히 잡았습니다.)
        </p>
      </div>
    ),
    author: {
      name: 'Jioh In',
      classOf: '2027',
      email: 'jiohin@umich.edu',
    },
  },
  {
    id: 'item-2',
    title: '레쥬메 팁 - CS/DS/Eng',
    content: (
      <div>
        <p>
          처음 미국 취업을 준비할 때, 가장 먼저 작성하는게 Resume입니다.
          Resume를 쓰기 위해 제일 먼저 검색하는게 Template입니다. 사실 어떤
          Template을 쓰든 그렇게 큰 차이가 있진 않습니다. 가장 중요한 건
          리크루터가 읽기에 깔끔하고 직관적이냐입니다. 가장 일반적인 Resume
          Template을 쓰시는걸 추천드립니다. 맨 위에 이름, Contact가 있고,
          Education, Work Experience, Projects/Extracurricular 순서로 되어있는
          Template입니다.
        </p>
        <br />
        <p>
          Template에 대한 두 가지 주의사항이 있습니다. 미국 Resume는 딱 한
          페이지여야 합니다. 리크루터가 수많은 Resume를 리뷰하기 때문에 한
          페이지로 제한하는게 일반적입니다. (CV는 다릅니다.) 두번째 주의사항은
          Resume에 얼굴 사진 넣지 마십쇼. 담백하게 글로만 채우는게 정석입니다.
        </p>
        <br />
        <p>
          CS/DS/Eng 분야의 Resume엔 Work Experience뿐만 아니라 다양한 Project나
          Club 경험들을 넣어야 합니다. 각 경험들이나 프로젝트의 Bullet Point를
          작성할 땐 STAR 메소드를 참고해서 작성하는걸 추천드립니다. 가장
          정석적인 방법입니다.{' '}
          <a
            href='https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/'
            className='hover:underline'
          >
            (https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/)
          </a>
        </p>
      </div>
    ),
    author: {
      name: 'Jioh In',
      classOf: '2027',
      email: 'jiohin@umich.edu',
    },
  },
  {
    id: 'item-3',
    title: '리서치 프로그램 정보',
    content: (
      <div>
        <p>
          <strong>UROP (Undergraduate Research Opportunity Program):</strong>{' '}
          미시간에서 학부생을 위한 연구 기회 프로그램으로 GPA 3.0 이상이
          필요하며, 매년 1월-2월에 지원합니다.
        </p>
        <br />
        <p>
          <strong>SROP (Summer Research Opportunity Program):</strong> 여름 방학
          동안 진행되는 연구 프로그램입니다. 미시간 대학 재학생이 대상이며 연구
          경험이 우대되고, 매년 3월-4월에 지원합니다.
        </p>
        <br />
        <p>
          <strong>NSF REU:</strong> 미국 내 다른 리서치 프로그램으로 전국
          대학에서 진행되는 여름 연구 프로그램입니다. 미국 시민권자 또는
          영주권자, 학부 2-3학년이 대상입니다.
        </p>
        <br />
        <p>
          <strong>KIST 인턴십:</strong> 한국과학기술연구원 인턴십으로 과학기술
          분야 전공, 학부 3-4학년이 대상이며 매년 5월-6월에 지원합니다.
        </p>
      </div>
    ),
    author: {
      name: 'Yunseong Na',
      classOf: '2026',
      email: 'ysna@umich.edu'
    },
  },
  {
    id: 'item-4',
    title: '리서치 지원 과정 - 미시간 대학교',
    content: (
      <div>
        <p>
          미시간에서 연구 기회를 구할 때 확률을 높이는 방법은 수업을 듣는
          교수님의 과목에서 좋은 성적을 거두는 것입니다. 오피스 아워도 자주
          찾아가고, 교수님이 이름을 기억하기 시작할 즈음 직접 연구에 관심이
          있다고 말씀드리거나 이메일을 보내면 좋습니다.
        </p>
        <br />
        <p>
          아무런 인연이 없는 교수님의 연구에 관심이 있다면 cold email 이 가장
          흔한 방법입니다. 하지만 연구 기회를 얻는 방법은 생각보다 다양합니다.
          공대에서 human subjects 실험을 진행할 경우, 참가자로 참여한 뒤 해당
          연구를 진행하는 박사·석사 과정 학생에게 학부 연구생 자리가 열려 있는지
          물어보는 것도 방법입니다. 또, 아는 선배의 리퍼럴을 받아 연구에
          들어가는 경우도 자주 있습니다 (네트워킹이 매우 중요합니다).
        </p>
        <br />
        <p>
          교수님께 이메일을 쓸 때 가장 중요한 것은 ‘연구’라는 활동 자체에 대해
          적극적으로 관심을 표현하는 것입니다. 대학원 진학에 관심이 있다고
          언급하는 것도 플러스 요인이 될 가능성이 높습니다(설령 실제 관심이
          없더라도). 오랫동안 함께 연구하고 싶다는 의사를 밝히는 것도 도움이
          됩니다. 교수님의 논문 1~2편을 읽고 이메일에서 간단히 언급하면 좋으며,
          마지막에는 반드시 resume 와 unofficial transcript 를 첨부해야 합니다.
        </p>
        <br />
        <p>
          UROP의 경우에는 오히려 연구 경험이 없다는 점을 강조하는 것이
          중요합니다. 이 프로그램의 목적 자체가 연구 경험이 없는 학생들에게
          기회를 주는 것이기 때문입니다. 자리가 있을 때 최대한 빨리 지원하는
          것을 추천드리며, 합격률도 상당히 높은 것으로 알려져 있습니다.
        </p>
        <br />
        <strong className={`${sejongHospitalBold.className}`}>
          Sample Email
        </strong>
        <p>Hi Dr. [교수님 이름]</p>
        <br />
        <p>
          I am writing this email to express my interest in assisting you in
          your work at your lab. As a recent IOE transfer (previously stats
          major), I have gained the most interest in ergonomics after enrolling
          in your IOE 333 class. Your lecture style alongside your thorough
          explanations in office hours helped me tremendously with broadening my
          understanding of the fundamental concepts of ergonomics.
        </p>
        <br />
        <p>
          I would love to further explore the field of ergonomics and gain a
          breadth of research experience under your mentorship as I am
          interested in pursuing a PhD in industrial engineering. I was drawn to
          your work in stress and virtual reality based response while reading
          some of your publications. And I was wondering if you had an opening
          in your lab for me as an undergraduate research assistant/intern on a
          project similar to this over the summer.
        </p>
        <br />
        <p>
          Though I would love for it to be a paid internship, I am still
          interested in working in your lab this summer and into the school year
          if it is not a paid opportunity. I am planning on staying in Ann Arbor
          throughout the summer and can commit to a full-time position. Although
          I have minimal research experience, I am eager to learn and am
          confident that I will be a fast learner, performing to your
          expectations with your guidance. This opportunity would allow me to
          grow and learn methodology of conducting research and developing
          deeper critical thinking skills applicable to grad school and beyond.
        </p>
        <br />
        <p>
          Please let me know if there&apos;s any other information I can provide.
          Thank you for your time and consideration.
        </p>
      </div>
    ),
    author: {
      name: 'Jacob Um',
      classOf: '2026',
      email: 'jisangum@umich.edu'
    },
  },
  {
    id: 'item-5',
    title: '리서치 지원 과정 - 외부 리서치 프로그램',
    content: (
      <div>
        <p>
          미국 내 타 리서치 프로그램으로는 대표적으로 REU 프로그램과 여름 연구
          펠로우십이 있습니다.
        </p>
        <br />
        <p>
          REU (Research Experiences for Undergraduates) 프로그램은 미국
          국립과학재단(NSF)이 지원하는 대표적인 학부생 연구 기회로, 다양한 대학
          및 연구기관에서 여름 동안 진행됩니다. 단, 대다수의 경우 미국
          시민권자에게만 지원 기회가 주어집니다. 주로 STEM 분야를 중심으로 연구
          프로젝트에 직접 참여하며, 교수와 대학원생의 멘토링을 받을 수 있습니다.
          참가자는 연구 경험뿐 아니라 네트워킹과 대학원 진학 준비에 유리한
          기회를 얻게 됩니다. 미시간 이메일 또는 미국 리서치 기관 (IEEE, AIChE
          등등)에서 홍보 이메일을 보내고, 관심이 있으시면 전공 어드바이저께
          물어보셔서 전공별 절차를 물어보는걸 추천드립니다.
        </p>
        <br />
        <p>
          여름 연구 펠로우십은 REU 외에도 각 대학, 연구소, 학회 등이 독자적으로
          운영하는 학부생 연구 지원 프로그램입니다. 예를 들어 하버드, MIT,
          스탠퍼드와 같은 대학들은 자체적인 서머 리서치 프로그램을 운영하며,
          STEM 뿐만 아니라 의학, 사회과학, 인문학 등 다양한 분야에서도 기회가
          열려 있습니다. 이 프로그램들은 대체로 8~10주 동안 진행되며, 참가자는
          연구 주제 탐구와 발표를 통해 학문적 성장을 경험할 수 있습니다.
          지원자격과 혜택은 기관마다 다르지만, 연구 경험을 쌓고 진학이나 커리어
          방향성을 구체화하는 데 큰 도움이 됩니다. 또한 여름 연구 펠로우십을
          기반으로, 미시간에 관련 연구실과 연결하여 학기 중에도 연구를 이어가는
          경우가 많습니다. 특히 컴퓨터과학이나 데이터사이언스처럼 온라인 협업이
          가능한 분야에서는, 담당 교수의 허락을 받아 학기 중에도 연구 프로젝트에
          계속 참여할 수 도 있습니다.
        </p>
        <br />
        <p>
          미국의 연구 프로그램은 각 기관 웹사이트나 통합 플랫폼을 통해 공지되며,
          대표적으로 NSF REU 공식 사이트, 대학 연구소 홈페이지, 또는 학과별
          리서치 페이지에서 정보를 확인할 수 있습니다. 일반적으로 지원 마감은
          프로그램 시작 전 해의 12월부터 이듬해 2월 사이에 집중되어 있으며,
          일부는 3월까지도 접수가 가능합니다. 만 유명한 대학이나 연구소일수록
          지원 경쟁이 매우 치열하기 때문에, 관심 있는 분야와 기관을 일찍
          조사하고 미리 준비하는 것이 중요합니다.
        </p>
      </div>
    ),
    author: {
      name: 'Junhee Han',
      classOf: '2028',
      email: 'junheeh@umich.edu'
    },
  },
  {
    id: 'item-6',
    title: 'OPT/CPT/SSN 정보',
    content: (
      <div>
        <p>
          <strong>OPT (Optional Practical Training):</strong> 졸업 전과 졸업 후
          두 종류가 있습니다. 졸업 전 OPT는 학기 중 주 20시간 이하로만 가능하고,
          졸업 후 OPT는 주 40시간 풀타임으로 일할 수 있습니다.
        </p>
        <br />
        <p>
          <strong>졸업 후 OPT:</strong> 최대 12개월이며 STEM 전공자는 24개월
          연장이 가능합니다. 졸업 90일 전부터 신청 가능하며 I-20, I-765, 사진,
          수수료가 필요합니다.
        </p>
        <br />
        <p>
          <strong>CPT (Curricular Practical Training):</strong> 전공 필수
          과목으로 인턴십이 요구되는 Required CPT와 전공 선택 과목으로 인턴십을
          하는 Optional CPT가 있습니다. 소속 College에 따라 신청하는 방법에 차이가 있으니 확인해야 합니다. International Center에서도 신청을 해야하니 넉넉하게 시간을 잡고 CPT를 신청해야 합니다.
        </p>
        <br />
        <p>
          <strong>SSN (Social Security Number):</strong> 받으려면 고용 확인서
          또는 OPT 승인서를 준비하고 가장 가까운 Social Security 사무소를
          방문해야 합니다. 약 2-4주 후 우편으로 수령됩니다.
        </p>
      </div>
    ),
    author: {
      name: 'Junho Lee',
      classOf: '2028',
      email: 'jnho@umich.edu'
    },
  },
];

export { usInfoContents, koreaInfoContents };
