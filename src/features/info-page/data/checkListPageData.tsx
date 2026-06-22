// /info/checklist page에 사용되는 리스트 데이터
//
// title: 체크리스트 항목의 제목 (Accordion trigger에 그대로 표시됨)
// desc:  체크리스트 항목의 설명 (Accordion 내부에 펼쳐서 표시, JSX)

import type { ReactNode } from "react";

export type CheckListItem = {
  id: string;
  title: string;
  desc: ReactNode;
};

// desc 내부에서 재사용하는 스타일 (CheckList가 type-body / text-foreground 래퍼를 제공)
const subHeading = "mt-5 first:mt-0 text-lg font-semibold";
const groupHeading = "mt-6 first:mt-0 text-lg font-bold text-primary";
const taskHeading = "mt-4 font-semibold";
const paragraph = "mt-2";
const list = "mt-2 list-disc pl-5 space-y-1";
const link = "text-primary underline";

export const checkListData: CheckListItem[] = [
  {
    id: "after-acceptance",
    title: "1. 합격 수락 직후 — 제일 먼저",
    desc: (
      <>
        <p className={subHeading}>Uniqname 생성 및 계정 활성화</p>
        <ul className={list}>
          <li>
            Deposit을 납부하면 보통 1~2일 이내에 학교 ITS로부터 ‘OTID(One-Time
            Identifier, 10자리 번호)’가 담긴 안내 메일이 발송됩니다. 이 OTID와
            본인의 고유 학번인 ‘UMID(8자리 번호)’로 본인만의 계정인 ‘Uniqname’을
            만들게 됩니다.
          </li>
          <li>
            이렇게 만든 Uniqname은 앞으로 비자 발급, 기숙사 배정, 수강신청 등 모든
            학교 행정 시스템에 로그인하는 아이디가 되며, 동시에 미시간 대학교 공식
            이메일 주소(uniqname@umich.edu)로 사용됩니다.
          </li>
          <li>
            Uniqname을 만들 때 비밀번호 설정을 완료하셔야 합니다. 과정을 중간에
            멈추거나 창을 닫으면 계정이 잠겨버려, 학교 ITS 부서에 직접 전화를 걸어
            복구해야 하는 번거로운 일이 발생할 수 있습니다.
          </li>
        </ul>

        <p className={subHeading}>미시간 공식 이메일(UMICH) 상시 확인</p>
        <ul className={list}>
          <li>
            Uniqname을 생성한 순간부터 학교의 모든 공식 소통은 개인 메일이 아닌
            미시간 대학교 이메일로만 이루어집니다.
          </li>
          <li>
            미국 입국에 필요한 비자 서류(I-20) 안내, 신입생 오리엔테이션 일정,
            수강신청 가이드 등이 모두 이 메일로만 발송됩니다. 따라서 방학 기간 동안
            매일 이메일을 확인하는 것을 권장합니다. 중요한 공지나 서류 제출
            데드라인을 놓치게 되면 입학 첫 학기 스케줄에 큰 차질이 생길 수 있으니
            각별히 유의해 주세요.
          </li>
        </ul>

        <p className={subHeading}>여권 유효기간 확인 및 재발급</p>
        <ul className={list}>
          <li>
            미국 입국 및 비자 발급을 위해서는 미국 입국 예정일을 기준으로 여권
            유효기간이 최소 ‘6개월 이상’ 남아 있어야 합니다. 기간이 얼마 남지
            않았다면 지금 바로 가까운 구청이나 외교부를 통해 여권 재발급을
            신청하시기 바랍니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "get-i20",
    title: "2. I-20 받기 — F-1 비자 신청을 위한 필수 서류",
    desc: (
      <>
        <p className={paragraph}>
          F-1 비자를 신청하려면 먼저 미시간 대학교에서 발급하는 I-20를 준비해야
          해요! I-20가 발급되지 않으면 F-1 비자 신청을 진행할 수 없습니다.
        </p>

        <p className={subHeading}>재정증명 서류 준비</p>
        <p className={paragraph}>
          I-20를 발급받기 위해서는 첫 1년 동안의 학비와 생활비를 충당할 수 있다는
          재정 증명이 필요해요. 보통 영문 은행 잔고 증명서, 후원자의 재직증명서,
          또는 장학금 증명서 등을 제출할 수 있습니다.
        </p>
        <p className={paragraph}>재정 서류를 준비할 때는 다음 사항을 꼭 확인해 주세요.</p>
        <ul className={list}>
          <li>
            재정 후원자의 이름이 Sponsor’s Certification of Financial Support에
            서명한 사람과 일치해야 합니다.
          </li>
          <li>서류는 영문 공식 문서여야 합니다.</li>
          <li>서류는 발급일 기준 1년 이내여야 합니다.</li>
          <li>
            증명 금액은 Financial Resources Statement (FRS)에 적힌 첫 1년 비용
            이상이어야 합니다.
          </li>
          <li>주식, 투자 계좌, 증권 등의 형태는 재정 증명으로 인정되지 않습니다.</li>
        </ul>

        <p className={subHeading}>I-20 신청</p>
        <p className={paragraph}>
          학부 신입생의 경우, 입학 후 받은 안내에 따라 Enrollment Connect에서 필요한
          서류를 업로드하면 됩니다. 제출해야 하는 주요 서류는 다음과 같습니다: FRS,
          Sponsor’s Certification of Financial Support, 공식 재정 증빙 서류, 여권
          사본.
        </p>
        <p className={paragraph}>
          서류 검토와 I-20 발급에는 약 2주 이상의 시간이 걸릴 수 있고, 서류 수정이
          필요한 경우 추가시간이 소요될 수 있으므로 가능한 한 일찍 제출하는 것을
          추천드립니다.
        </p>

        <p className={subHeading}>필요한 서류 확인 방법</p>
        <p className={paragraph}>
          정확한 서류 목록은{" "}
          <a
            className={link}
            href="https://teamdynamix.umich.edu/TDClient/154/Portal/KB/Article/7606/Requirements-Before-I-20-Can-Be-Issued"
            target="_blank"
            rel="noopener"
          >
            Requirements Before I-20 Can Be Issued
          </a>
          , 그리고{" "}
          <a
            className={link}
            href="https://internationalcenter.umich.edu/isss/new-transfer-students"
            target="_blank"
            rel="noopener"
          >
            International Center 신입생 페이지
          </a>{" "}
          내에서 확인할 수 있습니다.
        </p>
      </>
    ),
  },
  {
    id: "housing-health",
    title: "3. Housing 신청 & 건강 서류 준비",
    desc: (
      <>
        <p className={paragraph}>
          기숙사 신청과 건강 관련 서류 제출은 비자 준비와 동시에 진행할 수 있어요.
          특히 기숙사는 신청 시기와 마감일이 중요하기 때문에, 입학을 확정했다면
          가능한 한 빨리 확인하고 준비하는 것을 추천합니다.
        </p>

        <p className={subHeading}>Housing Application</p>
        <p className={paragraph}>
          신입생의 경우 미시간에 도착하기 전에 거주할 곳을 미리 정해두는 것을
          권장합니다. U-M Housing 신청은 enrollment deposit을 낸 후 안내 이메일을
          통해 진행할 수 있으며, application에서는 선호하는 룸 타입이나 생활 환경 등을
          입력하게 됩니다.
        </p>
        <p className={paragraph}>
          First-year housing application은 보통 봄에 열리고, 마감일 이후에는 선착순으로
          배정될 수 있습니다. 또한 application에 기재한 선호 사항이 항상 보장되는 것은
          아니기 때문에, 정확한 일정과 절차는 매년 U-M Housing 웹사이트에서 확인하는
          것이 가장 안전합니다. 2026년 기준으로는 first-year housing application이 4월
          2일에 열리고 5월 11일 11:59 PM EDT에 마감된다고 안내되어 있습니다.
        </p>

        <p className={subHeading}>예방접종 증명 제출</p>
        <p className={paragraph}>
          Michigan Housing에 거주하는 학생은 예방접종 기록을 제출해야 합니다. 현재
          U-M 안내에 따르면 제출 대상에는 다음 백신 기록이 포함됩니다: MMR, MenACWY,
          Meningitis B, Polio, Tdap, Varicella.
        </p>
        <p className={paragraph}>
          예방접종 기록은 U-M의 Vax Viewer를 통해 제출하게 됩니다. 접종을 완료하지
          않았거나 기록을 제출할 수 없는 경우에도, 관련 양식 또는 attestation을 제출해야
          합니다. 기록 확인에는 시간이 걸릴 수 있고, 확인이 완료되지 않으면 housing
          contract를 받는 데 문제가 생길 수 있으므로 기숙사 신청 후 가능한 한 빨리
          제출하는 것이 좋습니다.
        </p>
      </>
    ),
  },
  {
    id: "academics",
    title: "4. 학사 준비",
    desc: (
      <>
        <p className={paragraph}>비자 준비를 하는 동안 함께 진행해야 하는 부분입니다!</p>

        <p className={subHeading}>Advising 일정 신청 & Virtual Orientation</p>
        <p className={paragraph}>
          보통 5~6월 사이에 진행됩니다. International Center에서 신입 유학생을 위한
          오리엔테이션과 여러 워크숍을 운영하는데, 캠퍼스 생활, 이민 관련 정보, 학교
          자원 등 핵심적인 내용을 다루기 때문에 미리 들어두면 확실히 도움이 됩니다.
        </p>

        <p className={subHeading}>Online Placement Exam</p>
        <p className={paragraph}>
          보통 6월 초까지가 마감입니다. 수학 및 외국어 배치고사 결과에 따라 수강할 수
          있는 과목이 달라질 수 있으므로, 충분한 시간을 가지고 응시하는 것을
          추천드립니다. 추가로, 한국에서 초등학교 또는 중·고등학교를 졸업하셨다면
          Advisor에게 문의하여 외국어 시험을 면제받을 수 있는지 확인해 보시는 것을
          추천드립니다.
        </p>

        <p className={subHeading}>학과 Pre-advising → Advising Meeting → 수강 신청</p>
        <p className={paragraph}>
          Canvas에서 학과 Pre-advising 모듈을 완료한 뒤 Advising Meeting을 진행하고,
          이후 수강 신청을 하면 됩니다. 보통 7월 중·하순에 진행되며, 인기가 많은 수업은
          금방 마감되기 때문에 최대한 일찍 완료해 두는 것을 추천드립니다.
        </p>
      </>
    ),
  },
  {
    id: "visa-arrival",
    title: "5. F-1 비자 신청 & 입국 준비",
    desc: (
      <>
        <p className={paragraph}>I-20를 받은 뒤부터는 속도가 중요해집니다.</p>

        <p className={subHeading}>SEVIS 비용 납부 & 비자 인터뷰 예약</p>
        <p className={paragraph}>
          I-20를 받으면 SEVIS I-901 비용을 납부하고 주한미국대사관 비자 인터뷰를
          예약합니다. 여름 성수기에는 예약이 금방 마감되기 때문에 I-20를 받자마자 바로
          예약하는 것을 추천드립니다.
        </p>

        <p className={subHeading}>비자 인터뷰 준비</p>
        <p className={paragraph}>
          International Center에 F/J 비자 인터뷰 준비 영상이 마련되어 있습니다. 또한
          미국 비자 대기 시간은 시기마다 크게 달라질 수 있으니 미리 확인해 두는 것을
          추천드립니다.
        </p>

        <p className={subHeading}>항공권 구매</p>
        <p className={paragraph}>
          항공권은 비자 발급이 지연될 가능성을 고려해 비자 승인이 완료된 후 확정하는
          것이 안전합니다. 인천(ICN) → 디트로이트(DTW) 노선은 보통 대한항공과 델타항공
          공동운항이며, 기숙사 입주 가능 기간(보통 8월 하순)에 맞춰 도착 일정을 잡으시면
          됩니다.
        </p>

        <p className={subHeading}>입국할 때 꼭 필요한 것</p>
        <p className={paragraph}>
          여권, F-1 비자, 서명된 I-20, 입학 및 재정 관련 서류 사본은 반드시 챙겨주세요.
          또한, 입국 후 며칠 동안 사용할 식비와 공항에서 캠퍼스까지 이동할 때 사용할
          교통비 정도의 현금도 준비해 두는 것을 추천드립니다.
        </p>
      </>
    ),
  },
  {
    id: "first-week",
    title: "6. 도착하고 첫 주 — 우선순위 순서대로",
    desc: (
      <>
        <p className={groupHeading}>출국 전</p>

        <p className={taskHeading}>0. Pre-Departure Orientation(PDO) 참석 (선택)</p>
        <p className={paragraph}>
          출국 전 본국에서 열리는 대면 오리엔테이션으로, U-M 재학생·졸업생·International
          Center 스태프에게 직접 질문할 수 있는 자리입니다. 2026년 서울 행사는 6월
          19일입니다.
        </p>

        <p className={groupHeading}>도착 후 첫 주 (우선순위 순)</p>

        <p className={taskHeading}>1. 의무 이민 체크인(Mandatory Immigration Check-In)</p>
        <p className={paragraph}>
          신규 F-1/J-1 학생은 합법적 이민 신분 유지를 위해 International Center와의
          이민 체크인을 반드시 완료해야 합니다. 이는 권장이 아니라 연방 규정상 의무이며,
          완료하지 않으면 합법 이민 신분을 잃을 수 있습니다.
        </p>
        <ul className={list}>
          <li>미국에 도착한 이후에 진행해야 합니다.</li>
          <li>
            보통 I-20/DS-2019의 프로그램 시작일 약 30일 전에 umich.edu 이메일로 체크인
            안내와 절차가 전송되며, 해당 메일에 본인 학기용 정확한 링크가 포함되어
            있습니다.
          </li>
          <li>
            International Center의 Canvas 체크인 코스를 이수하고 이민 서류 스캔본을
            제출하면 완료됩니다. 어떤 서류가 필요한지는 코스 안에서 안내합니다.
          </li>
          <li>체크인을 완료해야 미시간 운전면허와 SSN 신청이 가능합니다.</li>
        </ul>

        <p className={taskHeading}>2. 대면 오리엔테이션(In-Person Orientation)</p>
        <p className={paragraph}>오리엔테이션은 크게 두 가지로 나뉩니다.</p>
        <ul className={list}>
          <li>
            <strong>Go Blue Orientation (필수):</strong> Office of New Student
            Programs(ONSP)가 주관하며, 가상과 대면 요소가 결합된 하이브리드 방식으로
            모든 신입·편입 학부생에게 필수입니다. 여름·가을 입학생은 보통 4월에 U-M
            이메일로 등록 안내를 받으며, 온라인 코스와 배치고사를 먼저 완료한 뒤 가상
            학업 상담을 진행합니다.
          </li>
          <li>
            <strong>International Student and Family Welcome Day (강력 권장):</strong>{" "}
            International Center가 주관하는 대면 행사입니다. 2026년 8월 24일(월)에
            열리며, 문화 적응·이민 신분 유지·건강보험 사용법 등을 안내하고 다른 신입
            국제학생을 만날 수 있습니다. 교내 기숙사 계약자는 7월 1일까지 등록 시 8월
            23일(일) 조기 입주가 가능합니다.
          </li>
        </ul>

        <p className={taskHeading}>3. MCard(학생증) 발급</p>
        <p className={paragraph}>
          일반적으로 Michigan Union → Ground Floor → Union Tech Shop, 또는 North
          Campus의 Pierpont Commons(2101 Bonisteel Blvd.)에 있는 MCard Center에서
          학생증을 발급받을 수 있습니다. MCard 앞면에서는 8자리 UMID(학생 아이디)와 본인
          신분을, 뒷면에서는 본인의 Uniqname을 확인할 수 있습니다.
        </p>
        <ul className={list}>
          <li>
            Uniqname은 본인의 학교 메일 @ 앞 아이디와 일치합니다. (예:
            honggildong@umich.edu → Uniqname은 honggildong)
          </li>
          <li>
            MCard를 발급받으면 캠퍼스의 파란 버스(학교 M 버스)와 하얀 버스(The Ride)를
            무료로 이용할 수 있습니다.
          </li>
          <li>
            Nursing처럼 별도로 발급하는 학과도 있으므로, 먼저 Union Tech Shop에 들러
            확인한 뒤 별도 발급이 필요하면 본인 해당 학과에 연락하여 받으면 됩니다.
          </li>
        </ul>

        <p className={taskHeading}>4. 학교 계정 세팅(Okta Verify)</p>
        <p className={paragraph}>
          Wolverine Access 등 학교 시스템 접속을 위한 계정을 설정합니다. 아이디는 본인의
          Uniqname이며, 비밀번호는 본인이 직접 설정합니다. 참고로 2026년 2월부터 기존
          Duo가 Okta Verify로 대체되었습니다.
        </p>
        <ul className={list}>
          <li>wolverineaccess.umich.edu에 접속합니다.</li>
          <li>Uniqname 또는 이메일을 입력합니다.</li>
          <li>UMICH 비밀번호를 입력합니다.</li>
          <li>
            Okta Verify 셋업을 진행합니다. (핸드폰과 태블릿 두 기기 모두 설치하는 것을
            권장합니다.)
          </li>
          <li>
            셋업이 끝나면 해당 아이디와 비밀번호로 캠퍼스 내 MWireless 와이파이에 연결할
            수 있습니다.
          </li>
        </ul>

        <p className={taskHeading}>5. UM 건강보험 확인</p>
        <p className={paragraph}>
          국제학생은 UM 건강보험 가입이 필수이므로 반드시 확인해야 합니다. 이민 체크인을
          완료하면 자동으로 BCN(Blue Care Network) 기반 국제학생 보험(IHI)에 가입됩니다.
          보험 시작일은 I-20/DS-2019의 프로그램 시작일입니다.
        </p>
        <ul className={list}>
          <li>
            가입되면 enrollee ID(가입자 번호)가 담긴 이메일이 발송되며, 안내에 따라 BCN
            회원 계정을 만들면 가상 보험카드를 확인할 수 있습니다.
          </li>
          <li>
            실물 카드는 Wolverine Access에 등록된 주소로 우편 발송되므로, 본인 주소가
            정확히 등록되어 있는지 확인해야 합니다.
          </li>
        </ul>

        <p className={taskHeading}>6. 은행 계좌 개설</p>
        <p className={paragraph}>
          국제학생도 SSN 없이 여권과 I-20만으로 계좌를 개설할 수 있는 은행이 많으므로,
          도착 후 빠르게 진행하는 것이 좋습니다.
        </p>
        <ul className={list}>
          <li>
            캠퍼스 주변 주요 은행으로는 Chase, Bank of America, PNC, 그리고 미시간대
            구성원 대상 신용조합인 University of Michigan Credit Union(UMCU)이 있습니다.
          </li>
          <li>
            필요 서류는 보통 여권, I-20/비자, 미국 주소 증빙이며, 은행에 따라 보조
            신분증을 요구하기도 합니다.
          </li>
          <li>
            SSN이 없어도 개설 가능한 경우가 많으나 은행마다 정책이 다르므로, 방문 전에
            해당 지점에 필요 서류를 확인하는 것을 권장합니다.
          </li>
        </ul>

        <p className={taskHeading}>7. 휴대폰 개통</p>
        <p className={paragraph}>
          미국 도착 직후에는 신용 기록이 없으므로, 신용 조회가 필요 없는 선불(prepaid)
          요금제가 개통이 가장 간편합니다.
        </p>
        <ul className={list}>
          <li>
            대형 통신사로는 T-Mobile, Verizon, AT&T가 있으나, 후불 요금제는 신용 조회나
            SSN을 요구할 수 있습니다.
          </li>
          <li>
            Mint Mobile, US Mobile, Visible 같은 저가 선불/MVNO는 eSIM으로 즉시 개통이
            가능하며 신용 조회가 필요 없습니다.
          </li>
          <li>
            한국 번호로 오는 인증 문자 수신이 필요하면, 미국 eSIM과 한국 SIM을
            병행하거나 인증 앱을 활용하는 방법을 고려합니다.
          </li>
        </ul>

        <p className={taskHeading}>8. 수업 시간표 확인</p>
        <p className={paragraph}>
          Wolverine Access → Students → Student Business → Student Center →
          Backpack/Registration → My Class Schedule 경로에서 본인이 수강하는 수업과
          시간표를 확인할 수 있습니다.
        </p>
        <ul className={list}>
          <li>학기 시작 전 학교 이메일을 통해 수업별로 미리 준비해야 할 사항이 있는지 확인합니다.</li>
        </ul>

        <p className={taskHeading}>9. 교실 사전 답사</p>
        <p className={paragraph}>
          캠퍼스를 직접 돌아다니며 본인이 수업을 듣는 교실의 위치를 미리 둘러봅니다.
        </p>

        <p className={taskHeading}>10. 생필품 구매</p>
        <p className={paragraph}>
          Target, Kroger, Trader Joe’s 등의 마트에 들러 생필품과 필요한 물건을 미리
          구매합니다.
        </p>

        <p className={groupHeading}>개강 후</p>

        <p className={taskHeading}>11. Festifall 참석</p>
        <p className={paragraph}>
          미시간대 최대 규모의 동아리·캠퍼스 참여 박람회로, 동아리를 찾고 친구를 사귀기에
          가장 좋은 자리입니다.
        </p>
        <ul className={list}>
          <li>
            900개가 넘는 학생 단체가 참여하며, 전체 목록은 Maize Pages에서 확인할 수
            있습니다.
          </li>
          <li>
            2026년 일정은 Festifall-North가 8월 31일(월) 오후 5–8시 Gerstacker
            Grove(노스캠퍼스), Festifall-Central이 9월 2일(수) 오후 3–5시 및 6–8시 the
            Diag(센트럴캠퍼스)에서 열립니다.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "contacts",
    title: "중요 연락처",
    desc: (
      <>
        <p className={subHeading}>이민 체크인 · 비자 · 신분 문제</p>
        <p className={paragraph}>International Center</p>
        <ul className={list}>
          <li>전화: 734-764-9310</li>
          <li>위치: 1500 Student Activities Building, 515 E Jefferson St, Ann Arbor, MI 48109</li>
          <li>
            이메일:{" "}
            <a className={link} href="mailto:icenter@umich.edu">
              icenter@umich.edu
            </a>
          </li>
          <li>체크인 안내 메일이 안 왔거나 SEVIS 관련 문제가 있을 때 여기로 연락하면 됩니다.</li>
        </ul>

        <p className={subHeading}>건강보험(IHI/BCN)</p>
        <p className={paragraph}>International Center 보험 오피스</p>
        <ul className={list}>
          <li>
            이메일:{" "}
            <a className={link} href="mailto:ihi@umich.edu">
              ihi@umich.edu
            </a>
          </li>
          <li>전화: 734-647-2303 (메시지 남기면 보험 어드바이저가 회신)</li>
          <li>가상 드롭인 상담도 운영합니다. 가입 여부·카드 발급 등 보험 관련 문의는 여기로.</li>
        </ul>

        <p className={subHeading}>학교 계정 · Okta Verify · MWireless 와이파이</p>
        <p className={paragraph}>ITS Service Center</p>
        <ul className={list}>
          <li>전화: 734-764-HELP (734-764-4357)</li>
          <li>채팅: chatsupport.it.umich.edu</li>
          <li>로그인·2단계 인증·와이파이 문제는 여기.</li>
        </ul>

        <p className={subHeading}>MCard(학생증)</p>
        <ul className={list}>
          <li>발급은 Union Tech Shop 등 issuing station에서 진행합니다.</li>
          <li>분실·교체·요금 관련: Shared Services Center (1000 Victors Way) — 734-615-2000</li>
          <li>분실·도난 신고: DPSS — 734-763-1131</li>
        </ul>

        <p className={subHeading}>진료 · 건강 문제 (UHC, 구 UHS)</p>
        <p className={paragraph}>University Health & Counseling</p>
        <ul className={list}>
          <li>전화: 734-764-8320</li>
          <li>
            이메일:{" "}
            <a className={link} href="mailto:ContactUHC@med.umich.edu">
              ContactUHC@med.umich.edu
            </a>
          </li>
          <li>위치: 207 Fletcher Street</li>
          <li>학생은 보통 여기를 먼저 이용하면 비용이 절감됩니다.</li>
        </ul>

        <p className={subHeading}>오리엔테이션 (Go Blue Orientation)</p>
        <p className={paragraph}>Office of New Student Programs (ONSP)</p>
        <ul className={list}>
          <li>
            웹사이트:{" "}
            <a className={link} href="https://onsp.umich.edu" target="_blank" rel="noopener">
              onsp.umich.edu
            </a>
          </li>
          <li>
            등록 안내는 보통 U-M 이메일로 오므로 메일을 자주 확인하는 게 좋습니다. (별도
            직통 번호는 사이트에서 확인하세요.)
          </li>
        </ul>

        <p className={subHeading}>안전 · 긴급</p>
        <ul className={list}>
          <li>DPSS (캠퍼스 안전·경찰): 734-763-1131</li>
        </ul>

        <p className={subHeading}>KISA</p>
        <ul className={list}>
          <li>
            이메일:{" "}
            <a className={link} href="mailto:umichkisa@gmail.com">
              umichkisa@gmail.com
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "kisa",
    title: "혼자 끙끙대지 마세요, 우리가 다 겪어봤습니다",
    desc: (
      <>
        <p className={paragraph}>
          KISA는 미시간에서 가장 큰 한인 학부생 단체입니다. 2000년부터 한인 학생들이 새
          환경에 잘 적응하도록 돕는 게 우리가 제일 중요하게 생각하는 일입니다.
        </p>

        <p className={subHeading}>막히면 물어보기</p>
        <p className={paragraph}>
          위 절차 중에 막히는 게 있으면, 먼저 겪어본 선배한테 물어보는 게 제일 빠릅니다.
        </p>
        <p className={paragraph}>
          신편입생 카카오톡 오픈채팅방:{" "}
          <a className={link} href="https://open.kakao.com/o/g60OKyri" target="_blank" rel="noopener">
            https://open.kakao.com/o/g60OKyri
          </a>
        </p>

        <p className={subHeading}>도착 전후 행사</p>
        <ul className={list}>
          <li>
            <strong>도착 전 (한국):</strong> 한국에서 열리는 PDO, 일락, 신편입생 환영회가
            준비되어 있습니다.
          </li>
          <li>
            <strong>도착 후 (앤아버):</strong> 개강 후에는 Festifall, 매스미팅, 개강포차
            등을 통해 KISA 멤버들을 비롯한 다양한 한인 사람들과 연결될 수 있습니다.
          </li>
        </ul>

        <p className={subHeading}>선배·동문 네트워크</p>
        <p className={paragraph}>
          전 세계에 퍼져 있는 한인 동문들과 연결되는 것도 KISA가 신경 쓰는 부분입니다.
        </p>

        <p className={subHeading}>가입 / 문의</p>
        <p className={paragraph}>
          보다 다양한 KISA의 소식과 가입 안내는 아래 공식 링크를 확인해 주세요.
        </p>
        <ul className={list}>
          <li>
            공식 웹사이트:{" "}
            <a className={link} href="https://www.umichkisa.com/" target="_blank" rel="noopener">
              https://www.umichkisa.com/
            </a>
          </li>
          <li>
            공식 인스타그램:{" "}
            <a className={link} href="https://www.instagram.com/kisa_michigan/" target="_blank" rel="noopener">
              https://www.instagram.com/kisa_michigan/
            </a>
          </li>
        </ul>
      </>
    ),
  },
];
