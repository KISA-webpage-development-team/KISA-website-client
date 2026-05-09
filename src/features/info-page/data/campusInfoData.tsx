import type { Metadata } from "next";
import type {
  InfoOverviewData,
  InfoSection,
} from "@/features/info-page/components/InfoOverviewTemplate";
import type { InfoDetailData } from "@/features/info-page/components/InfoDetailTemplate";

const centralSection: InfoSection = {
  sectionName: "central",
  sectionText: "Central Campus",
  contentList: [
    { id: "michigan_union", title: "Michigan Union" },
    { id: "michigan_league", title: "Michigan League" },
    { id: "shapiro_library", title: "Shapiro Library\n(UgLi)" },
    { id: "hatcher_library", title: "Hatcher Library\n(Graduate Library)" },
    { id: "mason_angell_hall", title: "Mason Hall (MH)/\nAngell Hall (AH)" },
    { id: "ross_school_of_business", title: "Ross School of Business" },
    {
      id: "kinesiology_building",
      title: "School of Kinesiology Building\n(SKB)",
    },
    { id: "cctc", title: "Central Campus Transit Center\n(CCTC)" },
    { id: "chemistry_building", title: "Chemistry Building" },
    { id: "randall_laboratory", title: "Randall Laboratory\n(RAND)" },
    { id: "cccb", title: "Central Campus Classroom Building\n(CCCB)" },
    { id: "east_hall", title: "East Hall\n(EH)" },
    { id: "lorch_hall", title: "Lorch Hall\n(LORCH)" },
    { id: "bell_tower", title: "Bell Tower" },
    { id: "west_hall", title: "West Hall\n(WH)" },
    { id: "weiser_hall", title: "Weiser Hall\n(WEIS)" },
    {
      id: "north_university_building",
      title: "North University Building\n(NUB)",
    },
  ],
};

const northSection: InfoSection = {
  sectionName: "north",
  sectionText: "North Campus",
  contentList: [
    { id: "pierpont_commons", title: "Pierpont Commons" },
    { id: "stamps_auditorium", title: "STAMPS auditorium" },
    { id: "chrysler_center", title: "Chrysler Center\n(CHRYS)" },
    { id: "duderstadt_library", title: "Duderstadt Library" },
    {
      id: "dow_engineering_building",
      title: "DOW Engineering Building\n(DOW)",
    },
    {
      id: "bob_and_betty_beyster_building",
      title: "Bob and Betty Beyster Building\n(BBB)",
    },
    {
      id: "george_g_brown_laboratories",
      title: "George G.Brown Laboratories\n(GGBL)",
    },
    {
      id: "electrical_engineering_and_computer_science_building",
      title: "Electrical Engineering And Computer Science Building\n(EECS)",
    },
    {
      id: "ford_motor_company_robotics_building",
      title: "Ford Motor Company Robotics Building\n(FMCRB)",
    },
    {
      id: "industrial_and_operations_engineering_building",
      title: "Industrial and Operations Engineering building\n(IOE)",
    },
    {
      id: "earl_v_moore_building",
      title: "Earl V. Moore Building, School of Music\n(SM)",
    },
  ],
};

const overview: InfoOverviewData = {
  infoType: "campus",
  infoTitle: "Campus",
  pageIntro: [
    "재학생들은 대부분 캠퍼스 내의 빌딩을 풀네임보다는 줄여서 부르거나 이니셜로 부릅니다. 수강 신청 후 Wolverine Access 에서 볼 수 있는 시간표에서도 마찬가지로 이니셜을 확인하실 수 있습니다. 아래에서 각 빌딩의 줄임말 혹은 이니셜과 더불어 빌딩 정보를 확인하실 수 있습니다.",
  ],
  sections: [centralSection, northSection],
};

const pageMetadata: Metadata = {
  title: "캠퍼스 정보",
  description: "미시간 대학교의 다양한 캠퍼스들",
};

const centralDetail: InfoDetailData = {
  pageTitle: "Central Campus",
  records: [
    {
      id: "michigan_union",
      title: "Michigan Union",
      desc: (
        <p>
          (1) 학교 공식 행사 및 동아리 활동들을 진행하는 장소이며 Career Fair 가
          자주 열립니다. 공부할 공간도 많아 학생들이 자주 찾습니다. 혼자서
          조용히 공부하는 것보다 조별 미팅을 많이 합니다.
          <br />
          <br />
          (2) 지하: Panda Express 및 Subway 등 식당가 및 편의 시설들이 위치하고
          있습니다.
          <br />
          <br />
          (3) 1층: 조용히 공부할 수 있는 Quiet Room이 있으며 Sweet Waters 카페와
          라운지가 있습니다. 카페 앞에 있는 벽에서는 종종 학교 스포츠 경기를
          생중계합니다.
          <br />
          <br />
          (4) 4층: 센트럴 캠퍼스 내 유일무이한 안마기 4대가 Student Wellness
          Center에 있습니다.
        </p>
      ),
    },
    {
      id: "michigan_league",
      title: "Michigan League",
      desc: (
        <p>
          (1) 공적인 문서 처리를 할 때 많이 방문합니다.
          <br />
          <br />
          (2) 동아리나 클럽 소개하는 자리인 Student Festival 할 때 Michigan
          League ballroom에서 진행됩니다.
          <br />
          <br />
          (3) 미시간 리그 3층에는 미시간 인이 위치하고 있습니다. 주변의
          숙박시설보다 가격이 조금 나갑니다.
        </p>
      ),
    },
    {
      id: "shapiro_library",
      title: "Shapiro Library (UgLi)",
      desc: (
        <p>
          (1) 지하 1층~지상 4층으로 구성된 도서관입니다. 위에 서술한 것과 같이
          샤피로 또는 어글리로 불리며 한국 학생들이 가장 많이 가는 도서관입니다.
          <br />
          <br />
          (2) 지하 1층: 공대 학생들이 주로 사용하는 CAEN 컴퓨터가 있으며
          Computer Science 전공 오피스 아워가 다분하게 열리는 곳입니다.
          지상층보다 실내 온도가 낮아 방문 시 겉옷이 필요할 수 있습니다. <br />
          <br />
          (3) 지상 1층: Circulation Desk 및 음식과 음료를 구매할 수 있는 카페가
          있습니다. Desk 뒤쪽 룸에는 트레이닝 후 녹음을 할 수 있는 Winberg Room
          이 있으며 도서관 웹사이트를 통해 녹음실을 예약할 수 있습니다. Design
          Lab에서는 일부 과목의 Discussion이나 오피스 아워가 열립니다. <br />
          <br />
          (4) 지상 2층: 여러 스터디룸 등이 있으며 웹사이트에서 각 방을 예약할 수
          있습니다. 모든 방 예약은 1주일 전에 오픈되며, 인당 하루에 4시간까지
          예약 가능합니다. 소설 책들도 찾을 수 있습니다. <br />
          <br />
          (5) 지상 3층: 가장 최근에 리모델링을 하여 인테리어가 잘 되어있고
          다양한 종류의 책상 및 공부 환경들이 조성되어 있어서 항상 사람들로
          북적입니다. 공부하기 좋지만 자리 잡기 어렵고 자주 소란스럽습니다.{" "}
          <br />
          <br />
          (6) 지상 4층: 과학 책들이 많이 있고 조용하게 공부하기 좋은 층입니다. *
          책을 미리 예약하여 픽업하고 싶다면 umich library 웹사이트에서 원하는
          책을 검색한 후에 “Get This” 를 클릭하여 로그인하고 픽업 장소를 정하면
          해당 도서관 Circulation Desk 에서 원하는 책을 3일 내에 받아볼 수
          있습니다. 책이 픽업 장소에 도착하면 학교 이메일로 메일이 발송됩니다.
          해당 기능은 Umich 모든 도서관에서 사용할 수 있습니다.
        </p>
      ),
    },
    {
      id: "hatcher_library",
      title: "Hatcher Library (Graduate Library)",
      desc: (
        <p>
          (1) 이름에서 알 수 있듯이 대학원생들을 위한 도서관입니다. 하지만
          학부생들이 출입해도 무관합니다.
          <br />
          <br />
          (2) 다양한 공부 환경이 조성되어 있고 조용한 공부 환경을 원하시는
          분들에게는 Shapiro 보다 좋은 선택일 수 있습니다.
          <br />
          <br />
          (3) Hatcher South 와 Hatcher North 로 나누어져 있으며 건물은 이어져
          있으면서도 층 이름이 달라서 구조가 헷갈릴 수 있습니다. 책을 찾거나
          원하는 스터디 룸을 찾으실 때는 Circulation Desk 에 방문하신 후
          문의하시면 됩니다.
          <br />
          <br />
          (4) 지상 2층: 조용하고 천장 높은 스터디 룸이 있습니다. 북스캐너 도
          있기에 필요할 때 용이하게 사용할 수 있습니다. Hatcher Library 2층과
          Shapiro Library 3층은 Connector 을 통해 연결되어 있어 추운 날씨에
          이동하기 편하며 자리가 없을 때에도 편리하게 이동 가능합니다.
          <br />
          <br />
          (5) 지상 3층~6층: 한국 독서실과 비슷한 개인 스터디룸이 있으며 개인
          스터디룸 사용 시 사전에 예약하여 Circulation Desk 에서 열쇠를 받고
          사용할 수 있습니다.
        </p>
      ),
    },
    {
      id: "mason_angell_hall",
      title: "Mason Hall (MH) /\nAngell Hall (AH)",
      desc: (
        <p>
          (1) 캠퍼스 내에서 단연코 가장 다양한 전공의 강의들이 진행되는
          빌딩입니다. Angell Hall Auditorium에서는 강의 및 시험들이 자주 열리고
          Mason Hall 에서는 20 - 30명 규모의 학생들이 수강하는 과목의 강의들이
          진행됩니다.
          <br />
          <br />
          (2) Mason Hall 1층에는 엄청난 규모의 컴퓨터 랩인 Fishbowl 이 있으며
          컴퓨터 및 다양한 용도의 프린터들이 있습니다.
        </p>
      ),
    },
    {
      id: "ross_school_of_business",
      title: "Ross School of Business",
      desc: (
        <p>
          (1) 학교에서 가장 좋고 새로운 시설을 갖춘 빌딩인 경영학과 빌딩입니다.
          대부분의 경영학 수업들이 여기서 진행되고 교수와 학생들 간의 소통을
          중요시하기 때문에 강의실의 형태가 보통의 강의실과는 다릅니다. 교실
          화면 스크린도 매우 크기 때문에 슬라이드를 보기에 매우 편합니다.
          <br />
          <br />
          (2) 경영대이기 때문에 경영 동아리 학생들이 종종 정장을 입고 돌아다니는
          모습을 볼 수 있는데 Ross에서만 진행하는 Career Fair가 별도로 있습니다.
          만약, 컨설팅이나 IB 등 유명한 대기업들에 관심이 있으시다면 가보는 것을
          추천합니다. (웹사이트에 일정은 별도로 안내됩니다.)
          <br />
          <br />
          (3) 스터디룸 예약은 Ross 학생들만 할 수 있습니다.
          <br />
          <br />
          (4) 학교 캠퍼스 건물 중 유일하게 스타벅스가 있습니다.
        </p>
      ),
    },
    {
      id: "kinesiology_building",
      title: "School of Kinesiology Building\n(SKB)",
      desc: (
        <p>
          다소 중후한 겉모습과는 달리 내부는 현대적으로 디자인되어 있습니다.
          중앙이 뚫려 있고 모든 층에서 Atrium을 볼 수 있게 하여 개방감이 있는
          곳에서 공부를 하고 싶으시다면 한 번쯤은 가보셔도 좋습니다. 더불어
          공부할 곳도 많습니다.
        </p>
      ),
    },
    {
      id: "cctc",
      title: "Central Campus Transit Center\n(CCTC)",
      desc: (
        <p>
          (1) 캠퍼스를 가로지르는 다수의 지역 버스와 학교 버스가 정차하며 캠퍼스
          내의 가장 큰 버스 정류장입니다.
          <br />
          <br />
          (2) Northwood 및 Bursley Baits 버스 모두 North Campus 로 향해가지만
          Bursley Baits 는 Chemistry Building 앞쪽에 있는 정거장에서 탑승해야
          하며 Northwood 는 Bursley Baits 의 맞은편 정류장에서 탑승해야 합니다.
          각 버스 모두 North Campus 의 Pierpoint 까지 약 10~15분 정도
          소요됩니다.
          <br />
          <br />
          (3) M bus 라는 애플리케이션을 다운 받으면 모든 버스의 동선, 루트, 및
          실시간 위치와 시간까지 확인 가능합니다.
        </p>
      ),
    },
    {
      id: "chemistry_building",
      title: "Chemistry Building\n(CHEM)",
      desc: (
        <p>
          (1) CCTC 바로 옆에 위치한 화학과 빌딩은 건물 3개를 붙여놓은 엄청나게
          큰 건물로 각자 건물의 층고가 다릅니다.
          <br />
          <br />
          (2) CHEM 1800: 건물에서 가장 큰 강의실이며 건물이 자체가 크고 캠퍼스
          중앙에 있다보니 경제학과 디스커션 등 다른 전공 수업들도 종종 열리기
          합니다.
          <br />
          <br />
          (3) Atrium: 만약 CHEM 빌딩 교실이 A로 시작한다면 지하에 있는 Atrium에
          수업이 있습니다. Atrium에는 실험 강의들이 진행되는 랩들이
          모여있습니다. 지하의 한쪽은 600대 랩이고 다른 한쪽은 700대 랩입니다.
          <br />
          <br />
          (4) 지상 1층: 1층 중앙에 위치한 Science Learning Center (SLC)에서 주로
          자연 과학 계열 오피스 아워가 많이 열립니다.
          <br />
          <br />
          (5) 지상 3,4층: 강의실보단 주로 리서치랩들과 교수님 오피스가 있습니다.
        </p>
      ),
    },
    {
      id: "randall_laboratory",
      title: "Randall Laboratory\n(RAND)",
      desc: (
        <p>
          (1) Physics 교수님들의 오피스와 Physics Help Room이 있습니다.
          <br />
          <br />
          (2) 해당 건물 뒤쪽으로 “Homer A. Neal Laboratory” 가 붙어있는데,
          이곳에선 CoE 학생들이라면 필수로 들어야 하는 Physics 141 과 Physics
          241 실험 수업들이 진행됩니다.
          <br />
          <br />
          (3) 지하에는 실험실들이 많이 위치해있는데, 복도가 어둡고 으스스합니다.
          또, 거의 모든 방문 앞에 붙어있는 빨간색 “DANGER” 경고 문구들은
          으스스한 분위기를 한층 더 고조시켜줍니다.
          <br />
          <br />
          (4) 중앙 엘리베이터가 매우 큽니다.
          <br />
          <br />
          (5) Randall Laboratory 와 West Hall 을 연결해 주는 계단이 있는데, 양쪽
          면이 유리로 되어있어서 마치 온실에 들어와있는 듯한 따뜻한 분위기를
          느끼게 해줍니다.
        </p>
      ),
    },
    {
      id: "cccb",
      title: "Central Campus Classroom Building\n(CCCB)",
      desc: (
        <p>
          (1) 2022년 지어진 새 건물로, 다양한 형태의 강의실이 존재하며 대부분이
          큰 강의실입니다.
          <br />
          <br />
          (2) 내부가 대체로 조용한 편이기 때문에 도서관이 아닌 새로운 곳에서
          공부를 해보고 싶다면 방문할 만한 장소입니다.
          <br />
          <br />
          (3) 특정 과목의 수업보다는 다양한 수업들이 진행되며, Stats 250, Phil
          183, Cogsci 200 등의 수업이 진행됩니다.
          <br />
          <br />
          (4) 그 외에도 큰 강당이 존재하여 학기 초 오리엔테이션이 진행되기도
          합니다.
        </p>
      ),
    },
    {
      id: "east_hall",
      title: "East Hall\n(EH)",
      desc: (
        <p>
          (1) 수학과 빌딩으로 대학교에서 오래된 빌딩 중 하나입니다. 수재라고
          부를 수 있는 수학과 학생들의 건물이기에 쉽게 쓰고 지울 수 있는
          화이트보드 따위 쓰지 않는다는 마인드로 모든 곳에 화이트 보드와 마카
          대신 칠판과 분필이 있습니다.
          <br />
          <br />
          (2) 일요일 아침에 무료로 베이글을 나누어 줍니다. 일요일 아침부터
          열심히 공부하는 모범생 느낌을 받고 싶다면 베이글 추천합니다.
        </p>
      ),
    },
    {
      id: "lorch_hall",
      title: "Lorch Hall\n(LORCH)",
      desc: (
        <p>
          (1) 경제학과 빌딩이지만 빌딩 규모가 작기에 모든 경제학과 학생을
          수용하기 어렵습니다.
          <br />
          <br />
          (2) ECON 인트로 수업들은 이 빌딩에서 진행되고 시험들은 Lorch 140에서
          진행되는 경우가 많습니다. 참고로 높은 레벨 수업들은 대부분 다른
          빌딩들에서 진행됩니다.
          <br />
          <br />
          (3) 경제학과 부서가 위치해 있고, 교수님들의 오피스아워가 종종
          열립니다.
        </p>
      ),
    },
    {
      id: "bell_tower",
      title: "Bell Tower\n(BMT)",
      desc: (
        <p>
          (1) 캠퍼스 중앙에 위치한 상징적인 건축물입니다. 종을 치는 건물임에도
          불구하고 건물 내 수업을 진행하는 교실이 있습니다.
          <br />
          <br />
          (2) 보통 동일한 종소리가 나지만 특수한 경우, 하울의 움직이는 성 OST나
          유명한 클래식 음악이 학생들에 의해 연주되는 경우도 있습니다.
          <br />
          <br />
          (3) 실제로도 올라갈 수 있어 관심이 있으시면 한 번 올라가보시는 것도
          추천드립니다.
        </p>
      ),
    },
    {
      id: "west_hall",
      title: "West Hall\n(WH)",
      desc: (
        <p>
          (1) 인류학과와 물리학과 등의 전공이 주 학과인 빌딩이며 샤피로 도서관
          근처에 있습니다. 이 빌딩의 Arch 밑으로 통로가 있는데 Diag, South
          University 및 East University를 연결합니다.
          <br />
          <br />
          (2) 처음 방문한다면 빌딩 입구를 찾기 어려울 수 있습니다. 더불어 원하는
          방에 따라서 다른 입구로 출입합니다. 사전에 방을 찾아보고 방문하는 것을
          추천드립니다.
          <br />
          <br />
          (3) Randall Laboratory와 지상 통로로 연결되어 있습니다.
        </p>
      ),
    },
    {
      id: "weiser_hall",
      title: "Weiser Hall\n(WEIS)",
      desc: (
        <p>
          (1) 미시간 대학교 중앙 캠퍼스 중심부에 있습니다. 이 건물은 문학, 과학,
          국제학 등 다양한 ​​전공이 있습니다.
          <br />
          <br />
          (2) 2017년에 리모델링해서 쾌적하고 공부하기 좋습니다.
          <br />
          <br />
          (3) 1층에는 혼자 공부하거나 그룹으로 공부하고 싶은 분들을 위한 스터디
          공간이 마련되어 있습니다. 그러나 지나가는 행인들로 인해 약간
          부산스럽거나 시끄러울 수 있습니다.
        </p>
      ),
    },
    {
      id: "north_university_building",
      title: "North University Building\n(NUB)",
      desc: (
        <p>
          (1) 캠퍼스 중앙에 있으며 빌딩 외관이 고대 그리스식 형식으로 지어져
          예쁘고 신기합니다.
          <br />
          <br />
          (2) 근처에 CCTC 쪽으로 출입할 수 있는 문이 있어 버스를 이용할 때 매우
          편리합니다.
          <br />
          <br />
          (3) 다양한 Natural Science 부서들이 이 빌딩에 있으며 특히 관련 과목
          디스커션 섹션들이 진행됩니다. 교양을 LSA - NS (Natural Science)로 듣게
          되신다면 한 번쯤은 방문하게 됩니다.
        </p>
      ),
    },
  ],
};

const northDetail: InfoDetailData = {
  pageTitle: "North Campus",
  records: [
    {
      id: "pierpont_commons",
      title: "Pierpont Commons",
      desc: (
        <p>
          (1) 주로 엔지니어링에 관련된 행사가 열리는 장소이며, 대표적으로
          Engineering Career Fair 가 매 학기 열립니다. 기타 행사들도 대부분
          엔지니어링에 관련되어 있어서 공과대학 학생들이 자주 방문합니다.
          <br />
          <br />
          (2) Panda Express, Hibachi San과 같은 식당, 그리고 Blue Market이나
          Tech Shop 같은 편의 시설들이 있습니다. 노스 캠퍼스의 음식점과 상점은
          이곳에 모두 밀집되어 있습니다.
          <br />
          <br />
          (3) Duderstadt Center에서 Pierpont까지 실내 통로로 이동이 가능하여
          Duderstadt Center를 이용하는 학생들이 편하게 오갈 수 있습니다.
        </p>
      ),
    },
    {
      id: "stamps_auditorium",
      title: "STAMPS auditorium\n(STAMPS)",
      desc: (
        <p>
          (1) 노스 캠퍼스에 있는 유일한 대규모 강당이며, 종종 U-M School of
          Music, Theater & Dance에서 개최하는 공연 및 다양한 세미나들이
          진행됩니다.
          <br />
          <br />
          (2) 평일 오전에서 이른 오후 사이에는 100 - 200명이 듣는 대규모 공대
          수업(ENGR 101)들이 진행되기도 합니다. 또한 많은 신입생을 수용해야 하는
          Introductory 수업들도 이곳을 많이 이용합니다.
        </p>
      ),
    },
    {
      id: "chrysler_center",
      title: "Chrysler Center (CHRYS)",
      desc: (
        <p>
          (1) 성공적인 학교생활에 필요한 정보를 담당하는 기관인 Engineering
          Career Resource Center (ECRC) 혹은 Engineering Advising Center (EAC)
          등 공과대학 학생들을 위한 행정기관들이 존재하는 건물입니다.
          <br />
          <br /> (2) 다양한 공과 수업 또한 이곳에서 진행되며, 학기 초에 Academic
          Advisor와 대면으로 미팅을 잡을 시 방문하게 될 건물입니다.
        </p>
      ),
    },
    {
      id: "duderstadt_library",
      title: "Duderstadt Center / Library",
      desc: (
        <p>
          (1) 노스 캠퍼스에 있는 지상 3층, 지하 1층으로 이루어진 최대 규모의
          도서관이며, 노스 캠퍼스에서 공부를 하는 학생들이 자주 방문하게 되는
          건물입니다.
          <br />
          <br />
          (2) 지하 1층: 가끔 이벤트가 진행되는 층이며, 그 외에는 자주 방문하지
          않게 되는 층 입니다. 몇몇 수업의 오피스 아워가 이곳에서 진행되기도
          합니다.
          <br />
          <br />
          (3) 1층: 카페와 건물 중심 근처에 그룹 스터디를 위한 공간이 존재합니다.
          하지만 공부할 수 있는 공간이 2층과 3층에 비해 적으며, 특히 카페 근처는
          학생들의 이동이 다분하고 조용하지 않아 만남의 장소로 이용되는 경우가
          많습니다.
          <br />
          <br />
          (4) 2층, 3층: 대부분의 노스 캠퍼스 학생이 공부를 하기 위해 방문합니다.
          2층과 3층에 따로 그룹 스터디를 위한 공간을 제외하면 조용한 분위기가
          형성되어 있습니다. 많은 학생이 컴퓨터를 이용하는 만큼, 컴퓨터와
          노트북을 연결할 수 있는 모니터(CAEN computer)가 제공됩니다.
          <br />
          <br />
          (5) Study Spaces 웹사이트에서 다인용 테이블을 예약할 수 있습니다.
        </p>
      ),
    },
    {
      id: "dow_engineering_building",
      title: "Dow Engineering Building\n(DOW)",
      desc: (
        <p>
          (1) 제법 많은 엔지니어링 수업이 진행되는 건물입니다. 바로 옆에 BBB
          건물과 실내 통로로 연결되어 있으며, 사실상 붙어있는 한 건물로
          취급합니다.
          <br />
          <br />
          (2) 교실 밖에 있는 벤치 외에는 머물거나 공부할 수 있는 공간이
          한정적이라, 대부분 수업을 위한 용도 외에는 방문할 일이 거의 없습니다.
        </p>
      ),
    },
    {
      id: "bob_and_betty_beyster_building",
      title: "Bob and Betty Beyster Building\n(BBB)",
      desc: (
        <p>
          (1) DOW 빌딩과 연결되어 있으며, 1층에서 오피스 아워가 다분하게
          이루어집니다.
          <br />
          <br />
          (2) 1층에는 따로 조용하게 공부할 수 있는 공간이 마련되어 있으며, 그 외
          공용 공간에 있는 벤치나 테이블은 주로 꽉 차 있습니다.
          <br />
          <br />
          (3) 1층 외 고층들은 주로 오피스나 미팅룸으로 구성되어 있어, 교수님과
          면담 혹은 오피스 아워를 위해 방문하게 됩니다.
        </p>
      ),
    },
    {
      id: "george_g_brown_laboratories",
      title: "George G. Brown Laboratories\n(GGBL)",
      desc: (
        <p>
          (1) 간혹 수업이 존재하지만, 거의 학생들의 이동이 없는 건물입니다. 그런
          만큼 공용 공간에서도 조용히 시간을 보낼 수 있는 숨겨진 공부
          장소입니다.
          <br />
          <br />
          (2) 전공에 따라 간혹 지도 교수님들의 오피스가 위치할 수 있습니다. 건물
          내부 구조가 복잡하고 생소할 수 있어서 방문 계획이 있다면 시간을
          넉넉하게 잡는 것을 추천합니다.
        </p>
      ),
    },
    {
      id: "electrical_engineering_and_computer_science_building",
      title: "Electrical Engineering and Computer Science Building\n(EECS)",
      desc: (
        <p>
          (1) 많은 전기공학과 컴퓨터 관련 수업이 진행되는 건물입니다.
          <br />
          <br />
          (2) 1층에는 미팅이나 공부를 위한 다인용 테이블이 구비되어 있지만
          개수가 많지 않아 이용하기 어려워 오랫동안 공부하기보다는 주로 수업 전
          대기 하기 위해 사용합니다.
          <br />
          <br />
          (3) 1층 외에 층에는 오피스 아워가 존재하며, ECE (Electrical and
          Computer Engineering) Advising Office 또한 존재합니다. Walk-in
          advising도 가능하기 때문에 ECE 전공 학생은 종종 방문합니다.
        </p>
      ),
    },
    {
      id: "ford_motor_company_robotics_building",
      title: "Ford Motor Company Robotics Building\n(FMCRB)",
      desc: (
        <p>
          (1) Robotics 관련 수업이나 프로젝트 팀을 위하여 자주 방문하게 되는
          건물입니다. 노스 캠퍼스의 다른 건물들이 밀집되어 있는 위치와 다소
          떨어져 있어 방문해야 한다면 동선을 점검하는 걸 추천합니다.
          <br />
          <br />
          (2) 근처에 버스 정류장 또한 존재하기 때문에 위치에 따라 다양한 버스로
          통학이 가능합니다.
          <br />
          <br />
          (3) 각 층에 공부할 수 있는 공간이 많고 일층에 카페도 있어서 새로운
          곳에서 공부해보고 싶을 때 가보면 좋을 것 같습니다.
        </p>
      ),
    },
    {
      id: "industrial_and_operations_engineering_building",
      title: "Industrial and Operations Engineering Building\n(IOE)",
      desc: (
        <p>
          (1) Lurie Engineering 바로 옆에 있으며 계단을 따라 내려가 보면
          아름다운 Lurie Fountain 도 볼 수 있습니다. Duderstadt 도서관과 가까워
          공강이 있을 때 가기 편리합니다. <br />
          <br />
          (2) 강의실이 많은 1층과 랩 수업들이 많은 지하로 나누어져 있습니다. IOE
          수업들이 이 건물에서 진행되며 건물 규모가 크지 않아 교실을 찾기
          용이합니다. <br />
          <br />
          (3) IOE building 일부분이 F24동안 공사중 이어서 현재 많은 IOE 오피스
          아워들이 (e.g. 310, 316, 366) ERB에서 진행되고 있습니다. <br />
          <br />
          (4) NERS Department 과 연결되어 있어 해당 출구로 나가면 센트럴로 가는
          버스들을 (Northwood, Commuter South, Diag-to-Diag, etc) Cooley Lab
          Outbound stop에서 탑승할 수 있습니다. 그 전 정류장에서 사람들이 많이
          타지 않기 때문에 앉아서 편하게 갈 수 있습니다
        </p>
      ),
    },
    {
      id: "earl_v_moore_building",
      title: "Earl V. Moore Building, School of Music\n(SM)",
      desc: (
        <p>
          (1) Pierpont Commons 건너편에 있으며 음대생들의 주 빌딩입니다. 빌딩에
          들어가면 라운지 느낌의 공간이 있으며 휴식 및 간식을 즐길 수 있는
          공간이 있습니다.
          <br />
          <br />
          (2) 건물이 꽤 크기에 강의실이 지하에 있으면 찾기가 어려울 수 있습니다.
          하지만 각 방마다 세팅이 잘되어 있어 악기를 연주하기에 적합합니다.
        </p>
      ),
    },
  ],
};

export const campusInfoData = {
  overview,
  pageMetadata,
  details: {
    central: centralDetail,
    north: northDetail,
  },
};
