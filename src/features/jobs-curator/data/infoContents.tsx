import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { InfoContent } from "../types/infoContents";

const koreaInfoContents: InfoContent[] = [
  {
    id: "item-1",
    title: "여름 인턴 타임라인",
    content: (
      <div>
        <p>
          <strong>미국 CS/DS/Eng 분야:</strong> 8월-9월에 지원이 시작되며,
          10월-11월 서류 심사, 12월-1월 인터뷰, 2월-3월 최종 결과가 나옵니다.
          Google, Microsoft, Apple 등 빅테크는 특히 일찍 시작합니다.
        </p>
      </div>
    ),
    author: {
      name: "John Doe",
      classOf: "2025",
    },
  },
];

const usInfoContents: InfoContent[] = [
  {
    id: "item-1",
    title: "인턴십 일정 및 지원 과정 - CS/DS/Eng",
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
          제가 해드릴 수 있는 유일한 조언은 '최대한 많이 지원하라'입니다. 적어도
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
      name: "인지오",
      classOf: "2027",
      email: "jiohin@umich.edu",
    },
  },
  {
    id: "item-2",
    title: "레쥬메 팁 - CS/DS/Eng",
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
          정석적인 방법입니다.{" "}
          <a
            href="https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/"
            className="hover:underline"
          >
            (https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/)
          </a>
        </p>
      </div>
    ),
    author: {
      name: "인지오",
      classOf: "2027",
      email: "jiohin@umich.edu",
    },
  },
  {
    id: "item-3",
    title: "리서치 지원 과정",
    content: (
      <div>
        <p>
          <strong>UROP (Undergraduate Research Opportunity Program):</strong>{" "}
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
      name: "John Doe",
      classOf: "2025",
    },
  },
  {
    id: "item-4",
    title: "OPT/CPT/SSN 정보",
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
          하는 Optional CPT가 있습니다.
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
      name: "John Doe",
      classOf: "2025",
    },
  },
];

export { usInfoContents, koreaInfoContents };
