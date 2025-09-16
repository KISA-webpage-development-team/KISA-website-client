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
  },
];

const usInfoContents: InfoContent[] = [
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
        <br />
        <p>
          <strong>미국 Finance/Consulting 분야:</strong> 7월-8월에 지원이
          시작되며, 9월-10월 서류 심사, 11월-12월 인터뷰, 1월-2월 최종 결과가
          나옵니다. Goldman Sachs, McKinsey, BCG 등은 네트워킹이 매우
          중요합니다.
        </p>
        <br />
        <p>
          <strong>한국 CS/DS/Eng 분야:</strong> 3월-4월에 지원이 시작되며,
          5월-6월 서류 심사, 7월-8월 인터뷰, 9월-10월 최종 결과가 나옵니다.
          네이버, 카카오, 삼성전자 등은 포트폴리오와 프로젝트 경험이 중요합니다.
        </p>
        <br />
        <p>
          <strong>한국 Finance/Consulting 분야:</strong> 2월-3월에 지원이
          시작되며, 4월-5월 서류 심사, 6월-7월 인터뷰, 8월-9월 최종 결과가
          나옵니다. 한국투자증권, 삼성증권 등은 인맥과 학점이 중요한 요소입니다.
        </p>
      </div>
    ),
  },
  {
    id: "item-2",
    title: "레쥬메 팁",
    content: (
      <div>
        <p>
          <strong>미국 CS/DS/Eng 레쥬메:</strong> 1페이지 내외로 간결하게
          작성하고, 프로젝트 경험을 구체적인 기술 스택과 함께 명시해야 합니다.
          GitHub 링크와 포트폴리오를 포함하고, LeetCode, HackerRank 등 코딩
          테스트 플랫폼 프로필을 추가하세요.
        </p>
        <br />
        <p>
          <strong>미국 Finance/Consulting 레쥬메:</strong> 정량적 성과 중심으로
          작성하고, 리더십 경험과 팀워크를 강조해야 합니다. 관련 인턴십이나
          프로젝트 경험을 포함하고, 네트워킹 이벤트 참여 경험을 명시하세요.
        </p>
        <br />
        <p>
          <strong>한국 레쥬메 차이점:</strong> 미국과 달리 사진 첨부가 가능하고,
          더 상세한 개인정보를 포함합니다. 학점과 토익 점수를 명시하고,
          자기소개서와 함께 제출하며, 한국어와 영어 버전을 모두 준비해야 합니다.
        </p>
      </div>
    ),
  },
  {
    id: "item-3",
    title: "인턴 지원 과정",
    content: (
      <div>
        <p>
          <strong>LinkedIn:</strong> 미국에서는 가장 일반적인 방법입니다. 회사
          채용 담당자와 직접 연결하여 기회를 찾고, 프로필을 완성하고 관련
          게시물에 댓글을 달며 네트워킹을 확장하세요.
        </p>
        <br />
        <p>
          <strong>Career Fair:</strong> 학교에서 개최하는 채용 박람회로, 직접
          회사 담당자와 만날 수 있는 기회입니다. 사전에 관심 회사를 조사하고
          명함을 준비하여 인상적인 첫인상을 남기세요.
        </p>
        <br />
        <p>
          <strong>Cold Email:</strong> 직접 회사 담당자에게 이메일을 보내 지원
          의사를 전달하는 방법입니다. 개인화된 이메일을 작성하고 간단한
          자기소개와 관심 분야를 명확히 표현하세요.
        </p>
        <br />
        <p>
          <strong>한국 인맥:</strong> 한국에서는 인맥이 가장 효과적인
          방법입니다. 선배나 지인을 통한 추천이 중요하며, 동문회 활동이나 인턴십
          프로그램 참여를 통해 인맥을 확장하세요.
        </p>
      </div>
    ),
  },
  {
    id: "item-4",
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
  },
  {
    id: "item-5",
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
  },
];

export { usInfoContents, koreaInfoContents };
