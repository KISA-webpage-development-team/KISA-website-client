export const personalInfoTerm = {
  label: "Personal Information Collection Agreement (개인정보 수집 동의)",
  text: (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-10 md:gap-y-6 w-full relative"
      style={{
        lineHeight: "1.6",
        fontSize: "14px",
      }}
    >
      {/* 가운데: 구분선 (Absolute 위치로 그리드 가운데에 고정) */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: "1px",
          backgroundColor: "#e5e7eb",
          transform: "translateX(-50%)",
        }}
      ></div>

      {/* --- Intro --- */}
      <div style={{ wordBreak: "keep-all" }}>
        다음 개인정보 처리 방침은 2024년 4월 19일부터 유효합니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        The following Privacy Policy is effective as of April 19, 2024.
      </div>

      {/* --- Section 1 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>1. KISA 개인정보 처리 방침</b>
        <br />
        Umich KISA 웹사이트는 University of Michigan의 재학생이 보다 편리한 대학
        생활을 보낼 수 있도록 유용한 서비스를 제공합니다. KISA 개인정보 처리
        방침에는 KISA가 귀하의 개인 데이터를 수집, 사용 및 공유하는 방법이
        설명되어 있습니다.
        <br />
        KISA는 UMich KISA 웹사이트 이용자의 동의를 기반으로 개인정보를 수집 및
        이용하고 있습니다. 본 개인정보 처리 방침은 KISA가 어떤 정보를 수집하고,
        수집한 정보를 어떻게 사용하며, 필요에 따라 누구와 이를 공유 (‘위탁 또는
        제공’) 하며, 이용목적을 달성한 정보를 언제, 어떻게 파기하는지와 관련된
        정보를 투명하게 제공합니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>1. KISA Privacy Policy</b>
        <br />
        The UMich KISA website provides useful services to help current University
        of Michigan students enjoy a more convenient college life. The KISA
        Privacy Policy explains how KISA collects, uses, and shares your personal
        data.
        <br />
        KISA collects and uses personal information based on the consent of UMich
        KISA website users. This Privacy Policy transparently provides information
        regarding what data KISA collects, how the collected data is used, with
        whom it is shared (&quot;consigned or provided&quot;) when necessary, and when and
        how the information is destroyed once its purpose is fulfilled.
      </div>

      {/* --- Section 2 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>2. 개인정보의 수집 방법 및 목적</b>
        <br />
        KISA는 이용자가 회원 가입 전 이용자에게 서비스 제공을 위해 필요한 정보를
        필수 항목으로, 그 외 기타 항목을 선택항목으로 수집하고 있습니다. 이러한
        항목은 이용자가 회원가입 서를 작성할 때 KISA에게 제공하게 됩니다.
        <br />
        - 필수: 이름 (본명), umich 이메일, 생년월일, 전공, 졸업연도
        <br />
        - 선택: LinkedIn URL
        <br />
        - 또한, 회원 가입을 한 시기가 자동으로 수집됩니다. 이 외에 KISA가 별도로
        수집하는 정보는 없습니다.
        <br />
        이용자는 필수 항목 및 사용 과정에서 수집되는 개인정보에 대하여 동의를
        거부할 권리가 있습니다. 필수항목 개인정보 수집 거부 시 Umich KISA
        웹사이트에 회원가입을 할 수 없습니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>2. Methods and Purposes of Personal Information Collection</b>
        <br />
        Before user registration, KISA collects necessary information to provide
        services as mandatory items, and other information as optional items.
        These items are provided to KISA by the user when filling out the
        registration form.
        <br />
        - Mandatory: Name (Real name), UMich email, Date of Birth, Major,
        Graduation Year
        <br />
        - Optional: LinkedIn URL
        <br />
        - Additionally, the time of registration is automatically collected. KISA
        does not collect any other information separately.
        <br />
        Users have the right to refuse consent to the collection of mandatory
        items and personal information collected during usage. If consent for
        mandatory personal information collection is refused, registration on the
        UMich KISA website will not be possible.
      </div>

      {/* --- Section 2: Purposes --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>이용자의 정보 사용 목적</b>
        <br />
        - KISA는 웹사이트 내 게시판의 불량 사용을 방지하기 위하여 이용자의 본명을
        함께 게시하게 됩니다.
        <br />
        - KISA는 University of Michigan의 재학생 및 졸업자만을 회원가입의
        대상자로 한정하기에 Univeristy of Michigan의 일원으로서 umich 이메일을
        수집하고 이를 통해서만 회원가입 하실 수 있습니다.
        <br />
        - 타 이메일을 이용하여 회원가입을 원하시는 개인 또는 단체는
        umichkisa@gmail.com으로 가입 희망 사유와 가입 후 어떤 활동을 하고
        싶으신지에 대해 기술하여 연락 주시면 서버 관리자가 가입시켜 드립니다.
        <br />
        - 웹사이트 이용자들 과의 더욱 원활한 소통을 위하여 기타 개인정보를
        수집합니다.
        <br />
        - 향후 웹사이트의 개발 방향성을 찾고 개선하는 데에 사용 및 분석하기
        위하여 개인정보를 수집합니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Purposes of Using User Information</b>
        <br />
        - KISA will post the user&apos;s real name to prevent malicious use of the
        website&apos;s message boards.
        <br />
        - Because KISA limits membership strictly to current students and alumni
        of the University of Michigan, we collect UMich emails as proof of
        membership in the University, and registration is only possible through
        this email.
        <br />
        - Individuals or organizations wishing to register using a different email
        address must contact umichkisa@gmail.com, detailing the reason for wanting
        to join and the activities they wish to pursue after registration. The
        server administrator will then process the registration.
        <br />
        - Other personal information is collected to facilitate smoother
        communication among website users.
        <br />
        - Personal information is collected for analysis and use in finding future
        development directions and improving the website.
      </div>

      {/* --- Section 3 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>3. 개인정보의 공유 및 위탁</b>
        <br />
        KISA에 제공된 개인정보는 불필요한 이유 혹은 상업적인 이유로 제삼자에게
        제공되지 않습니다. 하지만 법 집행 기관, 정부 당국 및 제삼자에게 필요에
        따라 일부 정보가 제공될 수 있습니다. 이와 같은 일이 발생할 시 KISA가 해당
        유저들에게 개인정보 사용에 대한 고지를 할 것입니다.
        <br />
        또한 KISA는 개인정보 처리와 관련한 별도의 위탁사항이 없음을 알려드립니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>3. Sharing and Consignment of Personal Information</b>
        <br />
        Personal information provided to KISA is not shared with third parties for
        unnecessary or commercial reasons. However, some information may be
        provided to law enforcement agencies, government authorities, and third
        parties if necessary. If such an event occurs, KISA will notify the
        relevant users about the use of their personal information.
        <br />
        Additionally, please be advised that KISA does not consign the processing
        of personal information to any outside parties.
      </div>

      {/* --- Section 4: Withdrawal --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>4. 개인정보의 파기 절차 및 방법</b>
        <br />
        <b>개인정보 수집 동의 철회</b>
        <br />
        - KISA는 수집된 개인정보를 해당 이용자의 회원 탈퇴 또는 이용목적
        달성시까지 보관 및 이용하게 됩니다. 개인 정보 수집 동의 철회는 웹사이트에
        회원 로그인 후 회원 정보 페이지의 “탈퇴” 기능을 통하여 진행할 수 있으며,
        KISA는 해당 이용자의 개인정보 파기를 진행합니다.
        <br />
        - 게시판에 이용자가 작성한 글은 이용자가 삭제하기 전 사라지지 않으며, 타
        웹사이트 이용자에게도 공개적으로 게시됩니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>4. Procedures and Methods for Destroying Personal Information</b>
        <br />
        <b>Withdrawal of Consent for Personal Information Collection</b>
        <br />
        - KISA stores and uses the collected personal information until the user
        deletes their account or the purpose of use is fulfilled. Withdrawal of
        consent for personal information collection can be done through the
        &quot;Account Deletion&quot; function on the user profile page after logging in, and
        KISA will proceed to destroy the relevant user&apos;s personal information.
        <br />
        - Posts written by users on the message boards do not disappear until the
        user deletes them, and they remain publicly visible to other website
        users.
      </div>

      {/* --- Section 4: Storage & Deletion --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>개인 정보와 게시물에 관한 임의의 보관 및 게시물의 삭제</b>
        <br />
        단 게시판과 웹사이트 이용자들의 쾌적함을 위하여 다음 상황에서는 일정
        정보가 보관 후 관리자에 의하여 파기될 수 있습니다.
        <br />
        - 불법적 이용자에 대한 관련 기관 수사 협조 및 부정이용 관련하여 해당
        웹사이트를 불법적, 혹은 부정한 형태로 이용한 기록이 있을 시 탈퇴하여
        표면적으로 정보가 말소된 회원이라 할지라도 서버 내 백업되어있는 개인정보를
        수사에 사용할 수 있습니다.
        <br />
        - 광고, 도배, 음란물, 욕설, 혹은 웹사이트 이용규정을 침해하는 글이
        게시글에 등록되는 경우 해당 게시물은 통보 없이 삭제될 수 있습니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>
          Arbitrary Storage of Personal Information and Posts, and Deletion of
          Posts
        </b>
        <br />
        However, to maintain a pleasant environment for message boards and website
        users, certain information may be stored and subsequently destroyed by the
        administrator in the following situations:
        <br />
        - In cases of cooperation with relevant authorities for investigations
        into illegal users or fraudulent use. If there is a record of illegal or
        fraudulent use of the website, backed-up personal information on the
        server may be used for investigation even if the member has deleted their
        account and their information has been superficially erased.
        <br />
        - If posts containing advertisements, spam, pornography, profanity, or
        content that violates the website&apos;s terms of use are registered, the posts
        may be deleted without prior notice.
      </div>

      {/* --- Section 4: Destruction Procedure --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>개인정보의 파기 절차</b>
        <br />
        KISA는 파기 사유가 발생한 개인정보는 개인정보보호책임자의 책임 하에
        내부방침 절차에 따라 다음과 같이 처리하고 있습니다.
        <br />
        - 게시물 등 정보에 대한 삭제는 즉각적이며 영구적인 삭제를 의미합니다.
        하지만 주기적으로 자동화된 백업에 의해 서버 내에 저장된 정보가 있을 수
        있습니다.
        <br />
        - 회원 탈퇴 시에도 위와 마찬가지로 즉각적이며 영구적인 삭제가 해당 회원에
        대한 모든 정보에 대하여 이루어집니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Destruction Procedure for Personal Information</b>
        <br />
        KISA processes personal information for which a reason for destruction has
        occurred under the responsibility of the Chief Privacy Officer and in
        accordance with internal policy procedures as follows:
        <br />
        - Deletion of information such as posts means immediate and permanent
        deletion. However, there may be information stored on the server due to
        periodic automated backups.
        <br />
        - Similarly, upon account deletion, immediate and permanent deletion is
        carried out for all information regarding the relevant member.
      </div>

      {/* --- Section 5.1 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>5. 개인정보의 안전성 확보 조치</b>
        <br />
        1. 개인정보의 암호화
        <br />
        KISA 웹사이트는 기본적으로 회원의 계정에 대한 비밀번호를 저장하지
        않습니다. 로그인이 Google Authentication 이루어지기 때문에 이에 대한
        책임은 University of Michigan Information and Technology Services와 Google
        Authentication에 있습니다. 계정 비밀번호를 제외한 회원의 활동 내역
        (게시물, 댓글 등)과 개인정보는 암호화된 데이터베이스에 저장됩니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>5. Measures to Ensure the Security of Personal Information</b>
        <br />
        1. Encryption of Personal Information
        <br />
        The KISA website inherently does not store passwords for user accounts.
        Because logins are processed via Google Authentication, the responsibility
        for this lies with the University of Michigan Information and Technology
        Services and Google Authentication. Excluding account passwords, the
        user&apos;s activity history (posts, comments, etc.) and personal information
        are stored in an encrypted database.
      </div>

      {/* --- Section 5.2 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        2. 개인정보 유출 방지를 위한 기술적 대책
        <br />
        개인정보는 AWS Elastic Beanstalk 서버 (이하 API 서버)를 중간 매개체로 하여
        AWS RDS mySQL 데이터베이스에 저장됩니다. API 서버는 endpoint URL 만 알고
        있다면 어떤 IP에서도 접속이 가능하지만, KISA 웹사이트에 공개적으로
        게시되는 내용만을 조회할 수 있습니다. 그 외에 서버 관리자만이 조회할 수
        있는 내용은 서버에 저장된 access key (RSA private key)를 통해 암호화,
        보호됩니다. API 서버는 https 주소를 사용합니다. AWS published
        certification 이 발급되어 있기 때문에, 보증된 보안 수준을 제공합니다.
        데이터베이스는 API 서버와는 다르게 운영자가 지정한 IP에서만 접속
        가능합니다. 데이터 베이스에 접속 가능한 첫 번째 IP는 API 서버입니다.
        웹사이트 Client와 API 서버, 데이터베이스가 상호 연결되어 있어야 하기
        때문에 연결되어 있지만, Client, 즉 웹사이트 자체에서는 운영자가 조회할 수
        있도록 설정해 놓은 정보만이 대중에 노출됩니다. 데이터 베이스에 접속 가능한
        두 번째 IP는 서버 관리자의 개인 IP입니다. 이를 통해 서버 관리자는 데이터
        베이스 전체를 접속 및 변형할 수 있으며, 필요에 따라 정보의 전체 또는
        일부를 말소할 수 있습니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        2. Technical Measures to Prevent Personal Information Leaks
        <br />
        Personal information is stored in an AWS RDS MySQL database, utilizing an
        AWS Elastic Beanstalk server (hereinafter referred to as the API server)
        as an intermediary. The API server can be accessed from any IP as long as
        the endpoint URL is known, but it can only query publicly posted content
        on the KISA website. Other content, viewable only by the server
        administrator, is encrypted and protected through an access key (RSA
        private key) stored on the server. The API server uses an HTTPS address.
        Because an AWS published certification is issued, it provides a guaranteed
        level of security. Unlike the API server, the database can only be
        accessed from IPs designated by the operator. The first IP that can access
        the database is the API server. While the website Client, API server, and
        database are interconnected to function, the Client (the website itself)
        only exposes information to the public that the operator has configured to
        be viewable. The second IP that can access the database is the server
        administrator&apos;s personal IP. This allows the server administrator to
        access and modify the entire database and erase all or part of the
        information as needed.
      </div>

      {/* --- Section 5.3 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        3. 접근 제한
        <br />
        개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경,
        말소를 통해 개인정보에 대한 접근 통제를 진행하고 있습니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        3. Access Restrictions
        <br />
        We control access to personal information by granting, modifying, and
        revoking access rights to the database system that processes personal
        information.
      </div>

      {/* --- Section 5.4 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        4. 개인정보 취급 임원의 최소화 및 교육
        <br />
        개인정보를 취급하는 임원을 지정하고 담당자에 한하여 개인정보를 관리하도록
        하고 있습니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        4. Minimization and Training of Staff Handling Personal Information
        <br />
        We designate specific staff to handle personal information and ensure that
        only authorized personnel manage this data.
      </div>

      {/* --- Section 5.5 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        5. 개인정보 취급에 대한 문의
        <br />
        개인정보의 보안에 대한 문의나 궁금하신 점은 umichkisa@gmail.com을
        통하거나, 서버 책임 관리자인 김동섭 (dongsubk@umich.edu) 에게로 문의하시면
        답변드리겠습니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        5. Inquiries Regarding Personal Information Handling
        <br />
        For inquiries or questions regarding the security of personal information,
        please contact us at umichkisa@gmail.com, or reach out to the chief server
        administrator, Dongsub Kim (dongsubk@umich.edu), and we will provide an
        answer.
      </div>

      {/* --- Section 6 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>6. 기타 웹사이트와 서비스</b>
        <br />
        - 해당 웹사이트에는 제삼자가 제공하는 서비스 및 기타 웹사이트에 접속할 수
        있는 링크를 포함하고 있습니다. 링크를 통해 접속 가능한 기타 웹사이트에서
        제공하는 서비스는 해당 웹사이트의 개인정보 처리방침과 웹사이트 이용약관을
        따르지 않습니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>6. Other Websites and Services</b>
        <br />
        - This website contains links to services provided by third parties and
        other websites. Services provided by other websites accessible through
        these links are not governed by this website&apos;s Privacy Policy and Terms of
        Use.
      </div>

      {/* --- Section 7 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>7. 개인정보 처리방침의 변경</b>
        <br />
        해당 개인정보 처리방침은 필요에 따라 추후 변경될 수 있고, 변경된 개인정보
        처리방침은 해당 웹사이트 이용자에게 고지될 것입니다. 변경된 개인정보
        처리방침은 해당 사항이 웹사이트에 게시된 순간부터 적용되며 이용자는 변경된
        개인정보 처리방침을 준수하여야 합니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>7. Changes to the Privacy Policy</b>
        <br />
        This Privacy Policy may be updated in the future as necessary, and any
        revised Privacy Policy will be notified to the users of the website. The
        revised Privacy Policy takes effect the moment it is posted on the
        website, and users must comply with the updated Privacy Policy.
      </div>

      {/* --- Section 8 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>8. 이용자의 권리</b>
        <br />
        - 이용자는 언제든지 개인정보의 수집 및 이용 동의를 회원 탈퇴를 통하여
        철회할 수 있습니다.
        <br />
        - 이용자는 언제든지 마이페이지를 통하여 개인정보를 조회하거나 수정, 삭제할
        수 있으며, 자신의 개인정보에 대한 열람을 요청할 수 있습니다.
        <br />
        - 이용자는 자신이 직접 작성한 게시물과 댓글에 한하여 해당 글을 철회
        및 수정할 수 있으며, 해당 게시물과 댓글은 위에 명시된 특수한 경우를
        제외하곤 파기됩니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>8. User Rights</b>
        <br />
        - Users may withdraw their consent to the collection and use of personal
        information at any time by deleting their account.
        <br />
        - Users can view, modify, or delete their personal information at any time
        through &quot;My Page&quot; and may request access to their personal information.
        <br />
        - Users can withdraw and modify only the posts and comments they have
        written themselves, and such posts and comments will be destroyed upon
        account deletion, except in the specific cases stated above.
      </div>
    </div>
  ),
  checkboxLabel: "I agree to the personal information collection agreement. (동의합니다)",
};

export const websiteTerm = {
  label: "Website Terms of Use (웹사이트 이용약관)",
  text: (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-10 md:gap-y-6 w-full relative"
      style={{
        lineHeight: "1.6",
        fontSize: "14px",
      }}
    >
      {/* 가운데: 구분선 (Absolute 위치로 그리드 가운데에 고정) */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: "1px",
          backgroundColor: "#e5e7eb",
          transform: "translateX(-50%)",
        }}
      ></div>

      {/* --- Article 1 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제1조 (목적)</b>
        <br />
        본 약관은 KISA가 제공하는 KISA 관련 제반 서비스의 이용과 관련하여 학생회와
        회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로
        합니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 1 (Purpose)</b>
        <br />
        The purpose of these Terms of Use is to stipulate the rights, obligations,
        and responsibilities, as well as other necessary matters, between the
        Student Council and members regarding the use of all KISA-related services
        provided by KISA.
      </div>

      {/* --- Article 2 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제2조 (회원의 정의)</b>
        <br />
        ① 회원이란 학생회가 제공하는 서비스에 접속하여 본 약관에 따라 학생회의
        이용절차에 동의하고 학생회가 제공하는 서비스를 이용하는 이용자를 말합니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 2 (Definition of Member)</b>
        <br />
        ① A member refers to a user who accesses the services provided by the
        Student Council, agrees to the usage procedures according to these Terms,
        and utilizes the services provided by the Student Council.
      </div>

      {/* --- Article 3 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제3조 (회원 가입)</b>
        <br />
        ① 회원이 되고자 하는 자는 학생회가 정한 가입 양식에 따라 회원정보를
        기입하고 동의, 확인 등의 버튼을 누르는 방법으로 회원 가입을 신청합니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 3 (Membership Registration)</b>
        <br />
        ① Those who wish to become a member apply for registration by filling out
        their information according to the form set by the Student Council and
        clicking the &quot;Agree&quot; or &quot;Confirm&quot; button.
      </div>

      {/* --- Article 4 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제4조 (서비스의 제공 및 변경)</b>
        <br />
        ① 학생회는 회원에게 아래와 같은 서비스를 제공합니다.
        <div style={{ paddingLeft: "24px", marginTop: "4px" }}>
          1. 정보 서비스
          <br />
          2. 게시판 서비스
          <br />
          3. 검색 서비스
        </div>
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 4 (Provision and Modification of Services)</b>
        <br />
        ① The Student Council provides the following services to members:
        <div style={{ paddingLeft: "24px", marginTop: "4px" }}>
          1. Information Services
          <br />
          2. Bulletin Board Services
          <br />
          3. Search Services
        </div>
      </div>

      {/* --- Article 5 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제5조 (서비스의 중단)</b>
        <br />
        ① 학생회는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절
        등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있고,
        새로운 서비스로의 교체, 학생회가 적절하다고 판단하는 사유에 기하여 현재
        제공되는 서비스를 완전히 중단할 수 있습니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 5 (Suspension of Services)</b>
        <br />
        ① The Student Council may temporarily suspend the provision of services in
        the event of reasons such as maintenance, replacement, and breakdown of
        information and communication equipment such as computers, or interruption
        of communication. The currently provided services may be completely
        discontinued due to replacement with a new service or for reasons the
        Student Council deems appropriate.
      </div>

      {/* --- Article 6 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제6조 (회원 탈퇴 및 자격 상실 등)</b>
        <br />
        ① 회원은 언제든지 자신의 회원 등록 말소(회원 탈퇴)를 할 수 있습니다.
        <br />
        ② 회원 탈퇴가 이루어진 경우 회원의 게시물 중 개인 영역(자유게시판,
        사고팔기 등)에 등록된 게시물 일체 삭제됩니다.
        <br />
        ③ 회원이 다음 각 호의 사유에 해당하는 경우, 학생회는 회원의 회원자격을
        적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다.
        <div style={{ paddingLeft: "24px", marginTop: "4px", marginBottom: "4px" }}>
          1. 가입 신청 시에 허위 내용을 등록한 경우
          <br />
          2. 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등
          전자거래질서를 위협하는 경우
          <br />
          3. 서비스를 이용하여 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를
          하는 경우
          <br />
          4. 본 약관 외에 KISA가 규정한 이용 규정을 위반한 경우
        </div>
        ④ 학생회가 회원의 회원자격을 상실시키기로 결정한 경우에는 회원등록을
        말소합니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 6 (Membership Withdrawal and Loss of Qualifications, etc.)</b>
        <br />
        ① Members may cancel their membership (withdraw) at any time.
        <br />
        ② In the event of membership withdrawal, all posts registered by the
        member in personal areas (Free Board, Buy & Sell, etc.) will be completely
        deleted.
        <br />
        ③ If a member falls under any of the following reasons, the Student
        Council may restrict, suspend, or revoke the member&apos;s qualifications in an
        appropriate manner:
        <div style={{ paddingLeft: "24px", marginTop: "4px", marginBottom: "4px" }}>
          1. Registering false information at the time of application.
          <br />
          2. Threatening the order of electronic transactions, such as interfering
          with others&apos; use of the service or stealing their information.
          <br />
          3. Engaging in acts prohibited by laws and these Terms or contrary to
          public order and morals using the service.
          <br />
          4. Violating usage rules set by KISA in addition to these Terms.
        </div>
        ④ If the Student Council decides to revoke a member&apos;s qualifications, the
        membership registration will be canceled.
      </div>

      {/* --- Article 7 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제7조 (회원의 개인정보)</b>
        <br />
        학생회는 서비스를 제공하기 위하여 관련 법령의 규정에 따라 회원으로부터
        필요한 개인정보를 수집합니다. (개인정보에 대한 개별 항목은
        개인정보처리방침에서 고지)
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 7 (Member&apos;s Personal Information)</b>
        <br />
        The Student Council collects the necessary personal information from
        members in accordance with relevant laws and regulations to provide
        services. (Specific items of personal information are notified in the
        Privacy Policy.)
      </div>

      {/* --- Article 8 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제8조 (학생회의 의무)</b>
        <br />
        ① 학생회는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지
        않으며 본 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하기
        위해서 노력합니다.
        <br />
        ② 학생회는 회원이 안전하고 편리하게 서비스를 이용할 수 있도록 시스템을
        구축합니다.
        <br />
        ③ 학생회는 회원이 원하지 않는 영리목적의 광고성 전자우편을 발송하지
        않습니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 8 (Obligations of the Student Council)</b>
        <br />
        ① The Student Council does not engage in acts prohibited by laws and these
        Terms or contrary to public order and morals, and strives to provide
        continuous and stable services as stipulated by these Terms.
        <br />
        ② The Student Council builds a system so that members can use the services
        safely and conveniently.
        <br />
        ③ The Student Council does not send unsolicited commercial advertising
        emails for profit-making purposes.
      </div>

      {/* --- Article 9 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제9조 (회원의 계정에 대한 의무)</b>
        <br />
        ① 본 웹사이트는 구글 계정을 이용하여 회원가입 및 로그인을 진행함을
        원칙으로 하며, 일반적인 회원가입은 University of Michigan 이메일 계정을
        통해서만 가능합니다.
        <br />
        ② University of Michigan 이메일을 제외한 타 이메일의 가입을 원하는 경우
        umichkisa@gmail.com 으로 연락하여 주시면 서버 관리자가 가입시켜드릴 수
        있습니다.
        <br />
        ③ 회원은 자신의 계정을 제3자가 사용하고 있음을 인지한 경우에는 바로
        학생회에 통보하고 학생회의 안내가 있는 경우에는 그에 따라야 합니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 9 (Obligations Regarding Member&apos;s Account)</b>
        <br />
        ① In principle, this website proceeds with membership registration and
        login using Google accounts, and general registration is only possible
        through University of Michigan email accounts.
        <br />
        ② If you wish to register with an email other than a University of
        Michigan email, please contact umichkisa@gmail.com, and the server
        administrator may approve your registration.
        <br />
        ③ If a member recognizes that their account is being used by a third
        party, they must immediately notify the Student Council and follow the
        Student Council&apos;s instructions, if any.
      </div>

      {/* --- Article 10 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제10조 (회원의 의무)</b>
        <br />
        ① 회원은 다음 각 호의 행위를 하여서는 안됩니다.
        <div style={{ paddingLeft: "24px", marginTop: "4px" }}>
          1. 회원가입신청 또는 변경시 허위내용을 등록하는 행위
          <br />
          2. 학생회 및 제3자의 지적재산권을 침해하거나 학생회의 권리와 업무 또는
          제3자의 권리와 활동을 방해하는 행위
          <br />
          3. 다른 회원의 계정을 도용하는 행위
          <br />
          4. 관련 법령에 의하여 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램 등)의
          게시 또는 전송하는 행위
          <br />
          5. 학생회의 서비스의 관리자를 가장하거나 타인의 명의를 도용하여 정보를
          게시, 전송하는 행위
          <br />
          6. 컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해,
          파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드, 파일,
          프로그램을 포함하고 있는 자료를 게시하거나 전송하는 행위
          <br />
          7. 스토킹(stalking) 등 다른 회원을 괴롭히는 행위
          <br />
          8. 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위
          <br />
          9. 불특정 다수의 자를 대상으로 하여 광고 또는 선전을 게시하거나 음란물을
          게시하는 행위
          <br />
          10. 학생회의 공지사항 규정을 위반하는 행위
        </div>
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 10 (Obligations of Members)</b>
        <br />
        ① Members must not engage in any of the following acts:
        <div style={{ paddingLeft: "24px", marginTop: "4px" }}>
          1. Registering false information when applying for membership or modifying
          information.
          <br />
          2. Infringing the intellectual property rights of the Student Council or a
          third party, or interfering with the rights, tasks, and activities of the
          Student Council or a third party.
          <br />
          3. Stealing another member&apos;s account.
          <br />
          4. Posting or transmitting information (computer programs, etc.) that is
          prohibited from transmission or posting by relevant laws.
          <br />
          5. Impersonating an administrator of the Student Council&apos;s service or
          posting/transmitting information by stealing someone else&apos;s identity.
          <br />
          6. Posting or transmitting data containing software viruses or any other
          computer codes, files, or programs designed to disrupt or destroy the
          normal operation of computer software, hardware, or telecommunications
          equipment.
          <br />
          7. Harassing other members, such as stalking.
          <br />
          8. Collecting, storing, or disclosing personal information of other
          members without their consent.
          <br />
          9. Posting advertisements, promotions, or obscene material aimed at
          unspecified individuals.
          <br />
          10. Violating the regulations regarding the Student Council&apos;s
          announcements.
        </div>
      </div>

      {/* --- Article 11 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제11조 (공개게시물의 삭제 또는 이용제한)</b>
        <br />
        ① 회원의 공개게시물의 내용이 다음 각 호에 해당하는 경우 학생회는 해당
        공개게시물에 대한 접근을 임시적으로 차단하는 조치를 취할 수 있고, 동일
        사례가 2회 이상 반복되는 경우 해당 게시물을 삭제 또는 해당 회원의 회원
        자격을 제한, 정지 또는 상실시킬 수 있습니다.
        <div style={{ paddingLeft: "24px", marginTop: "4px" }}>
          1. 다른 회원 또는 제3자를 비방하거나 중상 모략으로 명예를 손상시키는 내용
          <br />
          2. 음란물, 욕설 등 공서양속에 위반되는 내용의 정보, 문장, 도형 등을
          유포하는 내용
          <br />
          3. 범죄행위와 관련이 있다고 판단되는 내용
          <br />
          4. 다른 회원 또는 제3자의 저작권 등 기타 권리를 침해하는 내용
          <br />
          5. 종교적, 정치적 분쟁을 야기하는 내용으로서, 이러한 분쟁으로 인하여
          학생회의 업무가 방해되거나 방해되리라고 판단되는 경우
          <br />
          6. 타인의 개인정보, 사생활을 침해하거나 명예를 손상시키는 경우
          <br />
          7. 동일한 내용을 중복하여 다수 게시하는 등 게시의 목적에 어긋나는 경우
          <br />
          8. 불필요하거나 승인되지 않은 광고, 판촉물을 게재하는 경우
          <br />
          9. 이 외에 학생회가 규정한 이용 규정을 위반하는 경우
        </div>
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 11 (Deletion of Public Posts or Restriction of Use)</b>
        <br />
        ① If the content of a member&apos;s public post falls under any of the
        following items, the Student Council may take measures to temporarily
        block access to the public post, and if the same instance is repeated two
        or more times, the post may be deleted or the member&apos;s qualifications may
        be restricted, suspended, or revoked:
        <div style={{ paddingLeft: "24px", marginTop: "4px" }}>
          1. Content that slanders or damages the reputation of other members or a
          third party through malicious intent.
          <br />
          2. Content that spreads information, sentences, figures, etc., that
          violate public order and morals, such as obscenity and profanity.
          <br />
          3. Content judged to be related to criminal acts.
          <br />
          4. Content that infringes on the copyrights or other rights of other
          members or a third party.
          <br />
          5. Content that causes religious or political disputes, whereby such
          disputes disrupt or are judged to disrupt the duties of the Student
          Council.
          <br />
          6. Cases of infringing on the personal information or privacy of others,
          or damaging their reputation.
          <br />
          7. Cases that contradict the purpose of posting, such as posting the same
          content multiple times.
          <br />
          8. Posting unnecessary or unapproved advertisements or promotional
          materials.
          <br />
          9. Cases violating any other usage rules stipulated by the Student
          Council.
        </div>
      </div>

      {/* --- Article 12 --- */}
      <div style={{ wordBreak: "keep-all" }}>
        <b>제12조 (저작권의 귀속 및 게시물의 이용)</b>
        <br />
        ① 학생회가 작성한 저작물에 대한 저작권, 기타 지적재산권은 학생회에
        귀속합니다.
        <br />
        ② 회원은 학생회가 제공하는 서비스를 이용함으로써 얻은 정보를 학생회의
        사전승낙 없이 복제, 전송, 출판, 배포, 방송, 기타 방법에 의하여
        영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
      </div>
      <div style={{ wordBreak: "keep-all" }}>
        <b>Article 12 (Attribution of Copyright and Use of Posts)</b>
        <br />
        ① Copyright and other intellectual property rights for works created by
        the Student Council belong to the Student Council.
        <br />
        ② Members must not use information obtained through the services provided
        by the Student Council for commercial purposes by copying, transmitting,
        publishing, distributing, broadcasting, or other methods, nor let a third
        party use it without prior consent from the Student Council.
      </div>
    </div>
  ),
  checkboxLabel: "I agree to the website terms of use. (동의합니다)",
};

export const boardTerms = {
  "academic-job": `
    <div style="display: flex; gap: 20px; line-height: 1.6; width: 100%; font-size: 14px;">
      <div style="flex: 1; word-break: keep-all;">
        Honor Code 준수: University of Michigan 에서 규정하는 Honor code 가 동일하게 적용됩니다. 이곳은 과제 및 프로젝트에 대한 답을 묻고 답하는 공간이 아닙니다.
        <br/><br/>
        허위 정보: 출처가 불분명하거나 명백히 허위인 학습 자료, 채용 공고 등의 게재를 금지합니다.
        <br/><br/>
        저작권: 작성자 본인의 저작물이 아닌 학습자료나 정보의 무단 게재를 금지합니다.
        <br/><br/>
        매너와 존중: 학습과 취업에 대한 자유로운 토론은 지향하되 서로에 대한 비하, 비난 또는 무시의 의미가 담긴 게시물 또는 댓글의 게시는 금지합니다.
        <br/><br/>
        게시물 삭제: 게시판 관리자는 부적절한 게시물을 삭제할 수 있으며, 이에 대해 이의를 제기할 수 없습니다.
        <br/><br/>
        이용 제한: 규정을 위반한 사용자는 일정 기간 동안 혹은 영구적으로 게시판 이용이 제한될 수 있으며, 이에 대해 이의를 제기할 수 없습니다.
      </div>
      <div style="width: 1px; background-color: #e5e7eb; flex-shrink: 0;"></div>
      <div style="flex: 1; word-break: keep-all;">
        Compliance with Honor Code: The Honor Code stipulated by the University of Michigan applies equally here. This is not a space for asking or answering questions related to assignments or projects.
        <br/><br/>
        False Information: The posting of study materials or job announcements with unclear sources or blatantly false information is prohibited.
        <br/><br/>
        Copyright: Unauthorized posting of study materials or information that is not the author's own work is prohibited.
        <br/><br/>
        Manners and Respect: We encourage free discussion on studies and employment, but posting posts or comments containing disparagement, criticism, or disrespect towards each other is prohibited.
        <br/><br/>
        Deletion of Posts: Board administrators may delete inappropriate posts, and users cannot raise objections to this.
        <br/><br/>
        Usage Restrictions: Users who violate the regulations may be restricted from using the board temporarily or permanently, and cannot raise objections to this.
      </div>
    </div>
  `,
  buyandsell: `
    <div style="display: flex; gap: 20px; line-height: 1.6; width: 100%; font-size: 14px;">
      <div style="flex: 1; word-break: keep-all;">
        불법적이거나 부적절한 물건들을 거래 시 제재의 대상이 될수있습니다.
        <br/><br/>
        물건을 게시판에 올리실 때는 구체적인 설명이 포함되어야 하며 과소/과장된
        정보는 자제해 주십시오.
        <br/><br/>
        댓글에 개인정보를 교환하지 마십시오. 거래를 위한 상호간의 연락은 유저 정보
        페이지의 이메일을 통하여 해주십시오.
        <br/><br/>
        구매자와 판매자가 만나는 경우 서로간의 매너를 꼭 지켜주시고 타인을 존중해
        주십시오.
        <br/><br/>
        판매하는 물건의 사진이 판매글의 설명과 일치하는지 확인해 주십시오.
        <br/><br/>
        사기 행위 또는 가격의 임의적 변동을 금지합니다. 합의된 가격을 지켜주시고
        그 가격에만 거래해 주십시오.
        <br/><br/>
        환불은 서로의 합의가 있지않는 이상 불가능 하오니, 거래하실때 신중히 결정을
        내려주십시오.
        <br/><br/>
        거래를 위해 이메일을 할때는 상대를 존중하는 언어를 사용해 주십시오.
        <br/><br/>
        직거래를 할 경우 안전한 공공장소에서 만나시고 오로지 거래목적으로만
        만나십시오.
        <br/><br/>
        사회 통념상 용인되기 어려운 게시물들은 조취가 취해질 예정이니 주의해
        주십시오.
      </div>
      <div style="width: 1px; background-color: #e5e7eb; flex-shrink: 0;"></div>
      <div style="flex: 1; word-break: keep-all;">
        Trading illegal or inappropriate items may result in sanctions.
        <br/><br/>
        When posting items on the board, please include detailed descriptions and refrain from providing understated or exaggerated information.
        <br/><br/>
        Do not exchange personal information in the comments. Mutual contact for trading should be done through the email provided on the user profile page.
        <br/><br/>
        When buyers and sellers meet, please adhere to basic manners and respect each other.
        <br/><br/>
        Please ensure that the photos of the item being sold match the description in the post.
        <br/><br/>
        Fraudulent activities or arbitrary price changes are prohibited. Please honor the agreed-upon price and only trade at that price.
        <br/><br/>
        Refunds are not possible unless mutually agreed upon, so please make your decisions carefully when trading.
        <br/><br/>
        When emailing for a trade, please use respectful language towards the other party.
        <br/><br/>
        If conducting an in-person trade, please meet in a safe public place and solely for the purpose of the transaction.
        <br/><br/>
        Please be aware that posts deemed unacceptable by standard social norms will be subject to action.
      </div>
    </div>
  `,
  community: `
    <div style="display: flex; gap: 20px; line-height: 1.6; width: 100%; font-size: 14px;">
      <div style="flex: 1; word-break: keep-all;">
        1. 게시물 내용: 자유 게시판에서는 정치, 종교, 인종, 성별 등 민감한 주제에
        대한 글은 자제해야 하며, 타인을 모욕하거나 명예를 훼손하는 내용의 글,
        선정적인 글 등은 금지됩니다.
        <br /><br />
        2. 비속어 사용: 자유 게시판에서는 비속어, 욕설 등을 사용해서는 안 됩니다.
        <br /><br />
        3. 광고 및 스팸: 자유 게시판에 광고 또는 스팸성, 도배성 게시물을 올리는
        것은 금지됩니다.
        <br /><br />
        4. 저작권 침해: 다른 사람의 저작물을 무단으로 도용하거나 배포하는 행위는
        금지됩니다.
        <br /><br />
        5. 개인정보 보호: 다른 사람의 개인정보를 무단으로 공개하거나 유출하는
        행위는 금지됩니다.
        <br /><br />
        6. 게시물 삭제: 게시판 관리자는 부적절한 게시물을 삭제할 수 있으며, 이에
        대해 이의를 제기할 수 없습니다.
        <br /><br />
        7. 이용 제한: 규정을 위반한 사용자는 일정 기간 동안 혹은 영구적으로 게시판
        이용이 제한될 수 있으며, 이에 대해 이의를 제기할 수 없습니다.
      </div>
      <div style="width: 1px; background-color: #e5e7eb; flex-shrink: 0;"></div>
      <div style="flex: 1; word-break: keep-all;">
        1. Post Content: In the Free Board, posts on sensitive topics such as politics, religion, race, and gender should be avoided. Posts that insult or defame others, or contain explicit content, are prohibited.
        <br /><br />
        2. Use of Profanity: The use of slang, profanity, or abusive language is not allowed in the Free Board.
        <br /><br />
        3. Ads and Spam: Posting advertisements, spam, or flooding the board with repetitive posts is prohibited.
        <br /><br />
        4. Copyright Infringement: Unauthorized use or distribution of another person's copyrighted work is prohibited.
        <br /><br />
        5. Privacy Protection: Disclosing or leaking another person's personal information without permission is prohibited.
        <br /><br />
        6. Deletion of Posts: Board administrators may delete inappropriate posts, and users cannot raise objections to this.
        <br /><br />
        7. Usage Restrictions: Users who violate the regulations may face temporary or permanent restrictions from using the board, and cannot raise objections to this.
      </div>
    </div>
  `,
  housing: `
    <div style="display: flex; gap: 20px; line-height: 1.6; width: 100%; font-size: 14px;">
      <div style="flex: 1; word-break: keep-all;">
        정확한 정보 제공: 매물에 대한 정보는 정확해야 합니다. 허위 또는 과장된
        정보의 게시는 엄격히 금지됩니다.
        <br/><br/>
        개인정보 보호: 게시글에는 공개 동의 받지 않은 개인 정보(주소, 전화번호
        등)를 포함해서는 안 됩니다. 고용주나 다른 개인의 기밀 정보를 공유할 수
        없습니다.
        <br/><br/>
        부적절한 게시물 관리: 게시판 관리자는 부적절하다고 판단되는 게시물을
        삭제할 수 있으며, 사용자는 이에 대해 이의를 제기할 수 없습니다.
        <br/><br/>
        이용 제한: 규정을 위반하는 사용자는 일정 기간 동안 또는 영구적으로 게시판
        이용이 제한될 수 있습니다.
        <br/><br/>
        물건과 서비스의 정확한 설명: 게시판에 매물을 게시할 때는 구체적이고 사실에
        기반한 설명을 포함해야 합니다.
        <br/><br/>
        사적 연락 주의: 매매 상대방과의 개인적인 연락은 게시판의 이메일 기능을
        통해서만 진행하며, 댓글 등을 통한 개인 정보 교환을 금지합니다.
        <br/><br/>
        매너와 존중: 거래 시 서로의 매너를 지키고 상대방을 존중해 주십시오. 모든
        거래는 합의된 거래 가격에 따라 이루어져야 하며, 가격을 임의로 변경하거나 사기
        행위를 금지합니다.
        <br/><br/>
        언어 사용: 모든 대화에서 상대방을 존중하는 언어를 사용해 주시기 바랍니다.
        <br/><br/>
        게시물 감독: 모든 게시물은 사이트 관리자에 의해 심사될 수 있으며, 규정에
        맞지 않는 게시물은 사전 통지 없이 삭제될 수 있습니다.
      </div>
      <div style="width: 1px; background-color: #e5e7eb; flex-shrink: 0;"></div>
      <div style="flex: 1; word-break: keep-all;">
        Provide Accurate Information: Information about listings must be accurate. Posting false or exaggerated information is strictly prohibited.
        <br/><br/>
        Privacy Protection: Posts must not include personal information (address, phone number, etc.) without public consent. Sharing confidential information of an employer or any other individual is not allowed.
        <br/><br/>
        Management of Inappropriate Posts: Board administrators may delete posts deemed inappropriate, and users cannot raise objections to this.
        <br/><br/>
        Usage Restrictions: Users who violate the regulations may be restricted from using the board temporarily or permanently.
        <br/><br/>
        Accurate Description of Items and Services: When posting a listing on the board, you must include a specific, fact-based description.
        <br/><br/>
        Caution with Private Contact: Private contact with the trading party should only be conducted through the board's email function; exchanging personal information via comments is prohibited.
        <br/><br/>
        Manners and Respect: Please maintain good manners and respect the other party during transactions. All trades must be conducted at the agreed-upon price, and arbitrarily changing the price or engaging in fraudulent acts is prohibited.
        <br/><br/>
        Use of Language: Please use respectful language towards the other party in all conversations.
        <br/><br/>
        Monitoring of Posts: All posts may be reviewed by site administrators, and posts that do not comply with the regulations may be deleted without prior notice.
      </div>
    </div>
  `,
};