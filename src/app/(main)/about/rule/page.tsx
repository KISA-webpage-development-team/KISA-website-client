export const metadata = {
  title: "회칙",
  description: "미시간 대학교 한인 학부 학생회의 회칙입니다.",
};

export default function RulePage() {
  return (
    <section>
      <h1 className="type-h1">회칙</h1>

      <div className="flex flex-col gap-6 mt-6">
        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제1조 (명칭)</h2>
          <p className="type-body">
            본회의 정식 명칭은 미시간 대학교 한인 학생회 (Korean International
            Student Association)으로, 이하 KISA로 호칭할 수도 있도록 한다.
          </p>
        </article>

        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제2조 (제휴)</h2>
          <p className="type-body">
            본회는 캠퍼스 안의 어떠한 부서나 기관과도 제휴하고 있지 않는다.
          </p>
        </article>

        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제3조</h2>
          <ol className="flex flex-col gap-2 list-none">
            <li className="type-body">
              제1항 (목적) KISA는 미시간 대학교의 한국 학생들의 결속력과 복지를
              증진하는 기관이다.
            </li>
            <li className="type-body">
              제2항 (미션) KISA는 재학생들의 캠퍼스 안의 교류를 통해 원만한 학교
              생활을 할 수 있도록 지원한다. 이를 증진시키고 재학생들과
              신/편입생들의 교류를 원할하게 할 수 있도록 문화 및 사회 행사를
              개최한다.
            </li>
            <li className="type-body">
              제3항 KISA는 미시간 대학의 정책과 절차를 준수하고 이에 따른 책임을
              가진다.
            </li>
          </ol>
        </article>

        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제4조 (회원 자격)</h2>
          <ol className="flex flex-col gap-2 list-none">
            <li className="type-body">
              제1항 본회의 회원은 현재 등록된 미시간 대학교 학생으로 제한된다.
              또한 회원으로 인정되기 위해서는 다음의 요건이 필요하다.
              <ul className="flex flex-col gap-1 list-none mt-2 pl-4">
                <li className="type-body-sm">
                  가. 해당 학기동안 캠퍼스 행사의 최소 75% 참석
                </li>
                <li className="type-body-sm">
                  나. 주간 회의에서 3회 미만 무단 결석
                </li>
                <li className="type-body-sm">
                  다. KISA 주최의 모든 활동 및 행사에 적극적인 참여
                </li>
                <li className="type-body-sm">
                  라. 본회에 가입한 모든 회원은 KISA의 미션을 저해하지 않도록
                  동의하고, 또한 활동함에 있어서 인종, 피부색, 출신 국가, 나이,
                  결혼 여부, 성별, 성적 취향, 성 정체성, 장애, 종교, 키, 체중,
                  또는 군인 신분을 기준으로 차별하지 않는 평등한 정책을 준수.
                </li>
              </ul>
            </li>
            <li className="type-body">
              제2항 본회는 매학기 관심 있는 개인들에게 신청서를 받고 면접을
              진행함으로써 회원을 선출한다. 회원으로 활동하기 위해서는 제4조
              제1항의 요건을 충족해야 한다.
            </li>
            <li className="type-body">
              제3항 만약 회원이 본회로 부터 탈퇴를 원할 경우, 해당의사를 기관의
              임원진들과 상의를 거친 후 결정하여야 한다.
            </li>
          </ol>
        </article>

        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제5조 (임원)</h2>
          <p className="type-body">
            KISA는 회장을 포함한 세 명의 임원으로 구성된 임원회에 의해 운영된다.
          </p>
          <ol className="flex flex-col gap-2 list-none">
            <li className="type-body">
              제1항 선출된 회장은 모든 회의에서 의장을 맡을 것이며, 모든 위원회
              의장을 지명하고, KISA 행사 및 회의의 90%에 참석 해야 한다.
            </li>
            <li className="type-body">
              제2항 본회는 두 명의 부회장을 선출한다. 부회장의 임무는 회장이
              참석할 수 없는 모든 회의 및 행사에서 의장을 맡는다. 제3항 본회는
              회계 담당을 선출하며, 회비, 계정, 신규 회원, 주요 회의에서의 규칙
              준수, 미시간 대학 정책 준수 등을 처리한다.
            </li>
          </ol>
        </article>

        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제6조 (운영)</h2>
          <ol className="flex flex-col gap-2 list-none">
            <li className="type-body">
              제1항 (투표 자격) 제4조 1항에서 규정한 모든 회원 자격을 충족하는
              회원에게는 투표 자격이 부여된다.
            </li>
            <li className="type-body">
              제2항 (선거 과정)
              <ul className="flex flex-col gap-1 list-none mt-2 pl-4">
                <li className="type-body-sm">
                  가. 모든 임원은 투표 자격이 있는 회원들의 다수 표에 의해
                  선출된다. 모든 선거는 4월에 연례적으로 개최된다.
                </li>
                <li className="type-body-sm">
                  나. 현직 회장은 회의장에서 후보 지명을 받고, 후보 지명 과정은
                  마감되어야 하며, 지명된 당사자들은 투표에 참여할 권한을 가지고
                  있다.
                </li>
                <li className="type-body-sm">
                  다. 모든 투표는 회장의 규칙 준수, 본회원이 임명한 회장과 다른
                  한 명의 본회원에 의해 수집 및 집계 되어야 한다. 제3항 (회의)
                  모든 회의는 임원회가 결정한 시간에 개최되며 아래 절차를
                  따른다.
                </li>
                <li className="type-body-sm">가. 출석</li>
                <li className="type-body-sm">나. 주간 보고</li>
                <li className="type-body-sm">
                  다. 각 부서마다 제안/결정에 대한 투표
                </li>
                <li className="type-body-sm">라. 그 외 사항</li>
                <li className="type-body-sm">마. 해산</li>
              </ul>
            </li>
          </ol>
        </article>

        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제7조 (재정)</h2>
          <p className="type-body">
            KISA는 다음과 같은 방법으로 활동 자금을 조달한다: 가. 총학생회로부터의
            보조금 지원 나. 다른 학생회 및/또는 외부 기업과의 모금 행사
          </p>
        </article>

        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제8조 (정족수)</h2>
          <p className="type-body">
            투표가 필요한 선거 및 공식 업무를 위한 정족수를 구성하려면 회원의
            3분의 2가 참석해야 한다.
          </p>
        </article>

        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제9조 (회원 또는 임원의 해임)</h2>
          <ol className="flex flex-col gap-2 list-none">
            <li className="type-body">
              제1항 (임원의 해임) KISA의 임원이 KISA의 목적, 정관에 위배되거나
              제5조에 명시된 임원의 책임을 다하지 않을 경우, 다음 절차에 따라
              해임할 수 있다:
              <ul className="flex flex-col gap-1 list-none mt-2 pl-4">
                <li className="type-body-sm">가. 회원 3인 이상의 서면 요청.</li>
                <li className="type-body-sm">
                  나. 해당 임원에게 다음 회의 출석 및 발언 준비 요청을 서면으로
                  통지
                </li>
                <li className="type-body-sm">
                  다. 해당 임원을 해임하기 위해서는 투표권을 가진 회원의 3분의 2
                  이상의 찬성이 필요
                </li>
              </ul>
            </li>
            <li className="type-body">
              제2항 (회원 자격 박탈) KISA의 목적, 정관을 위반하거나 제4조에
              명시된 회원 자격 요건을 충족하지 못하는 회원 은 다음 절차를 통해
              회원으로서의 자격을 박탈당할 수 있다:
              <ul className="flex flex-col gap-1 list-none mt-2 pl-4">
                <li className="type-body-sm">가. 회원 3인 이상의 서면 요청.</li>
                <li className="type-body-sm">
                  나. 해당 회원에게 다음 임원 회의 출석 및 발언 준비 요청을
                  서면으로 통지.
                </li>
                <li className="type-body-sm">
                  다. 임원 만장일치로 해당 회원을 조직에서 제명하기로 결정.
                </li>
              </ul>
            </li>
          </ol>
        </article>

        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제10조 (개정)</h2>
          <ol className="flex flex-col gap-2 list-none">
            <li className="type-body">
              제1항 본 정관은 KISA의 모든 구성원에게 구속력을 가지지만, 그 자체로는
              구속력이 없다. 정관 개정은 정족수를 충족하는 모든 회의에서 투표권을
              가진 KISA 회원이 서면으로 제안할 수 있다. 개정안은 다음 정기회의
              안건으로 상정되어 그 때 의결된다. 제2항 제안된 개정안은 재적 회원의
              3분의 2 이상의 찬성을 얻으면 즉시 효력이 발생한다.
            </li>
          </ol>
        </article>

        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제11조 (비준)</h2>
          <p className="type-body">
            본 정관은 회원 3분의 2의 비준을 받아야 효력이 발생하며, 2년마다
            재검토 되어야 한다.
          </p>
        </article>

        <article className="flex flex-col gap-2">
          <h2 className="type-h2">제12조 (준수 선언문)</h2>
          <p className="type-body">
            KISA는 본 대학의 규정을 읽었으며 이를 철저히 준수할 것에 동의하며
            본회의 등록은 이러한 규정을 준수하는 것을 조건으로 한다.
          </p>
        </article>
      </div>
    </section>
  );
}
