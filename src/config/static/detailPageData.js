// infoPageData: /info/detail page들에 들어가는 각종 data들이 JSON 형태로 저장됩니다.

// ** JSON structure **
// id: 이미지 id 및 div 태그 id
// title: 디테일 섹션의 제목
// desc: html 태그 형식의 디테일 섹션 설명

// [CAMPUS] ----------------------------------------------
const campusCentralData = [
  {
    id: "michigan_union",
    title: "Michigan Union",
    desc: (
      <p>
        (1) 학교 공식 행사 및 동아리 활동들을 진행하는 장소이며 Career Fair 가
        자주 열립니다. 공부할 공간도 많아 학생들이 자주 찾습니다. 혼자서 조용히
        공부하는 것보다 조별 미팅을 많이 합니다.
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
        (2) 동아리나 클럽 소개하는 자리인 Student Festival 할 때 Michigan League
        ballroom에서 진행됩니다.
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
        (2) 지하 1층: 공대 학생들이 주로 사용하는 CAEN 컴퓨터가 있으며 Computer
        Science 전공 오피스 아워가 다분하게 열리는 곳입니다. 지상층보다 실내
        온도가 낮아 방문 시 겉옷이 필요할 수 있습니다. <br />
        <br />
        (3) 지상 1층: Circulation Desk 및 음식과 음료를 구매할 수 있는 카페가
        있습니다. Desk 뒤쪽 룸에는 트레이닝 후 녹음을 할 수 있는 Winberg Room 이
        있으며 도서관 웹사이트를 통해 녹음실을 예약할 수 있습니다. Design
        Lab에서는 일부 과목의 Discussion이나 오피스 아워가 열립니다. <br />
        <br />
        (4) 지상 2층: 여러 스터디룸 등이 있으며 웹사이트에서 각 방을 예약할 수
        있습니다. 모든 방 예약은 1주일 전에 오픈되며, 인당 하루에 4시간까지 예약
        가능합니다. 소설 책들도 찾을 수 있습니다. <br />
        <br />
        (5) 지상 3층: 가장 최근에 리모델링을 하여 인테리어가 잘 되어있고 다양한
        종류의 책상 및 공부 환경들이 조성되어 있어서 항상 사람들로 북적입니다.
        공부하기 좋지만 자리 잡기 어렵고 자주 소란스럽습니다. <br />
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
];
const campusNorthData = [
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
        (2) Panda Express, Hibachi San과 같은 식당, 그리고 Blue Market이나 Tech
        Shop 같은 편의 시설들이 있습니다. 노스 캠퍼스의 음식점과 상점은 이곳에
        모두 밀집되어 있습니다.
        <br />
        <br />
        (3) Duderstadt Center에서 Pierpont까지 실내 통로로 이동이 가능하여
        Duderstadt Center를 이용하는 학생들이 편하게 오갈 수 있습니다.
      </p>
    ),
  },
  {
    id: "stamps_auditorium",
    title: "STAMPS auditorium",
    desc: (
      <p>
        (1) 노스 캠퍼스에 있는 유일한 대규모 강당이며, 종종 U-M School of Music,
        Theater & Dance에서 개최하는 공연 및 다양한 세미나들이 진행됩니다.
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
        (1) 성공적인 학교생활에 필요한 정보를 담당하는 기관인 Engineering Career
        Resource Center (ECRC) 혹은 Engineering Advising Center (EAC) 등
        공과대학 학생들을 위한 행정기관들이 존재하는 건물입니다.
        <br />
        <br /> (2) 다양한 공과 수업 또한 이곳에서 진행되며, 학기 초에 Academic
        Advisor와 대면으로 미팅을 잡을 시 방문하게 될 건물입니다.
      </p>
    ),
  },
  {
    id: "duderstadt_library",
    title: "Duderstadt Library",
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
        형성되어 있습니다. 많은 학생이 컴퓨터를 이용하는 만큼, 컴퓨터와 노트북을
        연결할 수 있는 모니터(CAEN computer)가 제공됩니다.
        <br />
        <br />
        (5) Study Spaces 웹사이트에서 다인용 테이블을 예약할 수 있습니다.
      </p>
    ),
  },
];
// -------------------------------------------------------

// [HOUSING] ----------------------------------------------
// TODO
const housingOnCampusData = [
  {
    id: "south_quad",
    title: "South Quad",
    desc: (
      <p>
        (1) 위치: 센트럴 캠퍼스 남쪽 법대 도서관 옆에 위치하고 있습니다.
        <br />
        <br />
        (2) 편의 시설: 1층에는 총 8개의 스터디룸과 지하와 9층에 스터디 라운지가
        있으나 항상 사람이 있어 자리를 찾기가 어렵습니다. 또한 1충에 학교 식당이
        위치하고 있어 편리하게 이용할 수 있습니다.
        <br />
        <br />
        (3) 기타: 총 9층으로 센트럴에서 가장 크고 대표적인 기숙사라고 할 수
        있으며, 많은 학생들이 거주하고 특히 운동선수들이 많이 살고 있습니다.
      </p>
    ),
  },
  {
    id: "west_quad",
    title: "West Quad",
    desc: (
      <p>
        (1) 위치: South Quad와 같이 붙어 있고 학교 식당을 공유하고 있습니다.
        <br />
        <br />
        (2) 편의 시설: Michigan Union과 실내로 연결되어 있어 공부할 장소나
        카페에 바로 이동할 수 있습니다.
        <br />
        <br />
        (3) 기타: 다른 기숙사와 비교했을 때 방들이 크고 넓습니다.
      </p>
    ),
  },
  {
    id: "north_quad",
    title: "North Quad",
    desc: (
      <p>
        (1) 위치: 센트럴 캠퍼스 북쪽에 위치하며 Bell Tower 바로 옆에 있습니다.
        <br />
        <br />
        (2) 편의 시설: Rackham 빌딩 옆의 버스 정류장, CVS, Target 그리고 각종
        식당들이 가깝습니다.1층에 다이닝홀이 있어 편리하나 주말에는 오후
        2시까지만 열어 다른 곳으로 가야 하는 불편한 점이 있습니다. 또한 세탁실이
        3층에만 있어서 빨래를 하려면 엘레베이터로 이동해야하는 불편함이
        있습니다.
        <br />
        <br />
        (3) 기타: 신입생들이 별로 없어서 조용합니다. 지하에는 많은 교실들과
        라운지가 있어서 공부에 집중하기 좋은 환경입니다.
      </p>
    ),
  },
  {
    id: "east_quad",
    title: "East Quad",
    desc: (
      <p>
        (1) 위치: CCTC와 가장 가깝게 위치한 기숙사이며 Ross Building 바로 앞에
        있습니다.
        <br />
        <br />
        (2) 편의 시설: 1층에는 카페가 있으며 1층과 지하 모두 교실 및 악기
        연습실이 갖춰져 있습니다. 더불어 지하에는 탁구대와 당구대가 있습니다.
        1층에 위치한 다이닝홀은 규모가 작으나 만족스러운 퀄리티를 자랑합니다.
        그러나, 해당 다이닝홀이 샤피로 도서관에서 가장 가깝기에 중요 시간대에는
        학생들로 혼잡스럽습니다.
        <br />
        <br />
        (3) 기타: 주로 고학년 혹은 Residential College 학생들이 배정 받습니다.
      </p>
    ),
  },
  {
    id: "mosher_jordan",
    title: "Mosher-Jordan (MOJO)",
    desc: (
      <p>
        (1) 위치: 힐 중간에 위치한 기숙사입니다. 다른 기숙사들보다 센트럴
        캠퍼스로 가기까지 5~10분 정도 더 소요됩니다.
        <br />
        <br />
        (2) 편의 시설: 1층에는 큰 라운지가 있으며, 다른 기숙사에 비해 조금 더
        조용한 편입니다. 다이닝홀은 두 개의 층으로 이루어져 있고 메뉴가
        다양합니다. 또, 1층에 위치한 카페는 평일 밤 12시까지 운영하여 늦은 시간
        간식을 사 먹기 좋습니다.
        <br />
        <br />
        (3) 기타: WISE RP 커뮤니티와 신입생들이 주로 거주합니다.
      </p>
    ),
  },
  {
    id: "alice_lloyd",
    title: "Alice Lloyd",
    desc: (
      <p>
        (1) 위치: Mosher-Jordan과 같이 힐 위쪽에 위치한 기숙사입니다.
        <br />
        <br />
        (2) 편의 시설: 1층과 2층에는 스터디룸과 라운지가 다양하게 있고, 지하에는
        댄스 스튜디오, 악기 연습실 등이 있습니다. Mosher-Jordan 학교 식당이 바로
        옆에 있기 때문에, 해당 기숙사 건물 내에 다이닝홀이 없음에도 크게 불편한
        점은 없습니다.
        <br />
        <br />
        (3) 기타: 비교적 신식 건물이기에 매우 깨끗하고 깔끔합니다. 대부분의
        학생들이 Lloyd Scholars of Arts and Writing에 소속되어 있습니다.
      </p>
    ),
  },
  {
    id: "couzens",
    title: "Couzens",
    desc: (
      <p>
        (1) 위치: 커즌스는 힐 가장 위쪽에 위치해 있는 기숙사입니다.
        <br />
        <br />
        (2) 편의 시설: 각 층마다 간단한 설거지와 공부를 할 수 있는 라운지들이
        있고 1층과 2층에는 공부를 할 수 있는 작은 스터디룸들과 음악실, 메인
        라운지, 공용 주방, 그리고 당구대와 탁구대가 있는 게임룸이 있습니다.
        다이닝홀이 기숙사 내부에 없기 때문에 Mosher-Jordan 학교 식당을 이용해야
        합니다. 힐에 있는 다른 기숙사들에 비해 조금 먼 편이지만, 도보 3분이기에
        큰 불편함은 없습니다.
        <br />
        <br />
        (3) 기타: 바로 앞에는 노스 캠퍼스로 가는 Commuter North 와 노스
        캠퍼스에서 돌아오는 Northwood 버스가 정거하기 때문에 다른 센트럴
        기숙사보다 노스 캠퍼스로의 이동이 비교적 편리합니다.
      </p>
    ),
  },
  {
    id: "stockwell",
    title: "Stockwell",
    desc: (
      <p>
        (1) 위치: 힐 가장 아래쪽에 위치해 있는 기숙사입니다.
        <br />
        <br />
        (2) 편의 시설: 내부에 다이닝홀이 없는 관계로 Mosher-Jordan 학교 식당을
        이용해야 하지만, 바로 옆 건물이기에 크게 불편함은 없습니다. 1층에는
        세탁실, 음악실, 게임실, 공용 주방이 있습니다. 2층에 도서관처럼 생긴 공부
        할 수 있는 큰 공용공간이 있습니다.
        <br />
        <br />
        (3) 기타: 여자들과 남자들이 사는 곳이 따로 나누어져 있으며 기숙사
        왼쪽으로는 2025년 오픈 예정인 CCRB 운동 센터가 현재 공사 중이고, 그
        뒤로는 모든 주요 노선이 지나가는 버스 정류장 CCTC에서 가까운 편이기에
        이동이 편리합니다.
      </p>
    ),
  },
  {
    id: "markley",
    title: "Markley",
    desc: (
      <p>
        (1) 위치: 마클리는 힐 가장 후면에 위치해있는 기숙사 입니다. CCTC 까지
        도보 10분, 샤피로 도서관까지 도보 15분으로 센트럴 캠퍼스 CCTC에서 다소
        멀리 떨어져 있습니다.
        <br />
        <br />
        (2) 편의 시설: 2층에는 세탁실, 3층엔 탁구대와 당구대가 있는 큰 라운지가
        있으며, 큰 TV로 미식축구 경기를 같이 보는 이벤트 등이 열립니다. 4층엔
        Community Center와 공부를 할 수 있는 넓은 스터디 룸이 있습니다. 또한, 각
        층마다 소파가 있는 라운지가 있습니다. 건물 3층에 다이닝홀이 있습니다.
        비교적 크기가 작아 음식 종류가 적지만, 직접 피자를 만들어 먹을 수도
        있고, 과일류가 맛있는 편입니다. 외부 학생들이 잘 오지 않기에 한적합니다.
        <br />
        <br />
        (3) 기타: 노스 캠퍼스로 가는 Commuter North 와 센트럴로 가는 Commuter
        South 가 모두 기숙사 바로 앞을 지나가기에 주중에는 이동에 큰 불편함이
        없습니다. 그러나 두 버스 노선들이 운행하지 않는 주말에는 다소 먼 거리를
        걸어야만 합니다.
      </p>
    ),
  },
  {
    id: "oxford",
    title: "Oxford",
    desc: (
      <p>
        (1) 위치: 옥스퍼드는 캠퍼스 동쪽 멀리에 있습니다. 센트럴 캠퍼스 주요
        위치 밖, 주거 지역에 있어 사실상 고립되어 있습니다. 센트럴 캠퍼스로는
        Oxford Shuttle을 이용하면 빠르게 이동할 수 있습니다.
        <br />
        <br />
        (2) 편의 시설: 각 건물마다 3층으로 이루어져 있고 1층은 라운지, 2층은
        남자 기숙사, 3층은 여자 기숙사로 이루어져 있습니다. 방들이 큰편에 속해서
        생활하기는 편합니다. 세탁기와 건조기는 지하에 있습니다. Twigs라는 매우
        작은 다이닝홀이 위치해 있는데, 음식 종류도 한정적이고 다른 학교식당에
        비해 맛이 있는 편은 아닙니다.
      </p>
    ),
  },
  {
    id: "bursely",
    title: "Bursley",
    desc: (
      <p>
        (1) 위치: 노스 캠퍼스에 있는 두 개의 기숙사 중 하나이며, 노스 캠퍼스
        주요 건물들까지 걸어서 약 10분 정도가 소요됩니다.
        <br />
        <br />
        (2) 편의 시설: 각종 라운지와 음악 연습실 등이 있고, 바로 길 건너에
        위치한 NCRB에선 헬스장, 수영장, 사우나와 테니스, 농구, 배구, 등을 즐길
        수 있는 시설이 잘 갖춰져 있습니다. 노스 캠퍼스의 유일한 다이닝홀이
        있으며, 음식 종류도 다양하고 자리도 매우 많기에 이용이 편리합니다.
        <br />
        <br />
        (3) 기타: 기숙사 바로 앞에 버스 정류장이 있어서 Bursley-Baits 버스를
        타면 센트럴 캠퍼스까지 약 15분 정도 걸립니다. 평일에는 5분 간격으로
        버스가 오지만 배차 간격이 긴 편인 주말에는 20분 넘게 버스가 오지 않을
        때도 있어서 특히 추운 겨울에는 버스 시간을 잘 보고 버스 정류장으로
        나가야 합니다.
      </p>
    ),
  },
  {
    id: "baits",
    title: "Baits",
    desc: (
      <p>
        (1) 위치: 노스 캠퍼스에서 가장 멀리 떨어져 있는 기숙사이며, 다른 노스
        캠퍼스 주요 건물들과는 걸어서 약 15분 정도 소요됩니다.
        <br />
        <br />
        (2) 편의 시설: 각 건물마다 다른 편의시설 (영화관, 탁구장, 주방 등)이
        있습니다. 또한, 각 건물마다 세탁실이 따로 존재합니다. 그렇기 때문에 다른
        기숙사에 비하여 세탁실이 여유 있는 편입니다. 주말 저녁을 제외하면 대부분
        원할 때 세탁실 이용이 가능합니다. 기숙사 내 다이닝 홀이 없기에 Bursely
        다이닝 홀을 이용해야 합니다. 걸어서 가야 하기 때문에 식사 시간을 조금
        여유 있게 잡아야 하며 특히 겨울철 아침에는 이동이 조금 불편할 수
        있습니다.
        <br />
        <br />
        (3) 기타: 노스 캠퍼스 주요 건물들과는 걷기에 거리가 애매해서
        Baits/Bursley 각 기숙사 앞에 있는 버스 정류장에서 Bursley Baits 버스를
        타고 통학합니다. 센트럴 캠퍼스에 있는 건물을 기숙사에서 바로 가기
        위해서는 Bursely Baits 버스를 필수로 타야 합니다. 싱글룸을 배정 받을 수
        있는 기숙사이기에 룸메이트와 지내는 생활이 익숙하지 않을 시 보다 편한
        기숙사 생활이 가능할 수 있습니다. 하지만 싱글룸은 확정적으로 배정받을 수
        없고 방이 작은 편에 속합니다.
      </p>
    ),
  },
  {
    id: "michigan_learning_community",
    title: "Michigan Learning Community(MLC)",
    desc: (
      <p>
        (1) 주로 1학년 학생들 위주로 구성되어 있는 Residential Community
        Program입니다. 미술, 공대, 리서치 등 관심사별로 나누어져 있으며 3-4월쯤
        에세이나 포트폴리오를 제출하고 합격하게 되면 각 MLC가 있는 기숙사에서
        같은 커뮤니티에 있는 친구들과 함께 살게 됩니다.
        <br />
        <br />
        (2) 경쟁률이 높지 않고 지원 자격도 MLC 수업 한 학기에 한 개(LSA
        First-year Writing/Engineering 필수과목 요건 충족), 매월 미팅 한 번,
        클럽 등 기여해야 하는 것이 크지 않기 때문에 기숙사를 미리 보장 받고
        싶다면 좋은 선택입니다.
        <br />
        <br />
        (3) 특히 1학년의 경우 새 학기에 오리엔테이션이나 소셜 이벤트를 많이 하기
        때문에 같은 관심사를 가진 친구들을 사귀기에 좋습니다. 그리고 MLC
        학생들에게 기숙사 우선권이 주어지기 때문에 만약 2, 3학년에도 기숙사에
        살고 싶다면 지원해 보는 것을 적극 추천합니다.
        <br />
        <br />
        MLC LIST: https://lsa.umich.edu/mlc
      </p>
    ),
  },
];
const housingOffCampusData = [
  {
    id: "tower_plaza",
    title: "Tower Plaza",
    desc: (
      <p>
        (1) 위치: 도보로 Michigan Union / Mason Hall에서 3분, Diag로부터 5분,
        Shapiro Library로부터 7분, CCTC로부터 10분 정도 소요됩니다.
        <br />
        <br />
        (2) 편의 시설: 1층에는 아파트 출입 및 택배/우편 관리를 담당하는 데스크가
        있으며, 지하 1층에는 세탁실이 있습니다. 주민을 위한 별도의 헬스장 및
        스터디룸은 없습니다. 엘리베이터는 3대가 있습니다. 주변 음식점으로는
        Asian Legend, Tomukun Noodle Bar / Korean BBQ, New York Pizza Depot,
        Hopcat, The Seoul, Slurping Turtle, Pita Kabob, Chipotle, Totoro 등이
        있으며, 주변 카페로는 Starbucks, Comet Coffee, Jasmine Tea, Ding Tea,
        Share Tea 등이 있습니다. 그 외에도 Target, CVS, Walgreens, 7-11, Fedex
        등이 도보 5분 거리 이내에 있어 생활 방면으로 편리합니다.
        <br />
        <br />
        (3)가격: 구조/층수/리모델링/일조권/가구 등에 따라 가격 차이가 있습니다.
        구축 건물의 특성상 유닛에 따른 노후도 차이가 있기 때문에 계약 이전에
        Room Tour 하시는 것을 추천합니다. 유틸리티 중 수도세는 주로 렌트비에
        포함되어 있으며 전기는 DTE ENERGY를 통해 별도로 신청 및 납부하게 됩니다.
        와이파이 또한 별도 설치가 필요합니다.
        <br />
        <br />
        (4) 방/건물 소개: 1965년에 완공된 앤아버 최고층 건물으로 총 26층, A~L
        유닛으로 구성되어 있습니다. 대부분의 호수가 Studio 또는 1 Bedroom입니다.
        State Street 상권 및 센트럴 캠퍼스로부터 가깝습니다.
        <br />
        <br />
        (5)기타: Load/Unload 등의 목적으로 건물 뒤편 주차장을 30분 동안 임시로
        사용할 수 있으며, 정기 주차는 Maynard Parking Structure를 이용할 수
        있습니다.
        <br />
        <br />
        (6) 입주 전년도 12월부터 매물이 올라오기 때문에 관심이 있으신 분들은
        사전에 준비하는 것을 추천합니다. 계약 시 보증금으로 한 달 치 렌트비를
        지불하게 됩니다. 아파트 웹사이트를 통해 유닛 구조 및 계약 가능한 매물을
        확인하실 수 있습니다. <br />
        <br />
        https://www.towerplaza.com/
        <br />
        https://towerplaza.net/
      </p>
    ),
  },
  {
    id: "landmark",
    title: "Landmark",
    desc: (
      <p>
        (1) 위치: South University에 있으며 University Towers 맞은편에 위치한
        아파트입니다. Diag과는 도보 약 6분 거리, CCTC 정류장과는 약 5분 거리,
        Shapiro 도서관과는 약 4분 거리라서 위치가 정말 좋은 편입니다. <br />
        <br />
        (2) 편의 시설: 건물 2층에 헬스장이 있습니다. 다만 운동 기구가 다양하지
        않기 때문에 헬스를 다양한 운동 종목을 루틴으로 삼는 리프터분들께는 다소
        부적합 할 수 있습니다. 주변에 맛있는 식당들이 많아서 끼니를 채우기
        편합니다. 대표적으로는 Rich JC, Kang’s, No Thai 가 있습니다. <br />
        <br />
        (3) 가격: 유틸리티는 미포함이기에 사이트에서 안내하는 월세보다
        실질적으로 더 납부하게 됩니다.
        <br />
        <br />
        (4) 방/건물 소개: 구조는 4 Bed 2 Bathrooms 구조가 가장 흔하고
        일반적입니다. 하지만 원하시면 스튜디오에서 6 bedroom까지 다양한 구조들이
        있습니다. 가격 차이가 물론 있겠지만, 다양한 선택지가 있어서, 선호하시는
        구조 선택이 가능합니다. 주방과 거실이 넓고 쓰기 좋지만, 반대로 침실이
        다소 작다는 단점이 있습니다.
      </p>
    ),
  },
  {
    id: "university_tower",
    title: "University Tower (UT)",
    desc: (
      <p>
        (1) 위치: 센트럴에 있어 학교 건물과 가깝고 주위에 식당 및 편의 시설이
        많이 있어 지리적으로 이점이 있습니다. Diag과는 도보 약 6분 거리, CCTC
        정류장과는 약 5분 거리, Shapiro 도서관과는 약 4분 거리입니다. <br />
        <br />
        (2) 편의 시설: 근처 음식점으로는 Kang’s restaurant, Noori Chicken, Rich
        J.C, No Thai, Sadako, Subway, One bowl, Pancheros, Joe’s Pizza 등이
        있으며, 근처 카페로는 Starbucks, Quickly boba, Sweeting, M-36 Coffee
        Roasters 등이 있습니다. 그 외에도 7-11, Pinball Pete, 그리고 USPS와
        Amazon Center이 도보 5분 거리 이내에 있어서 편리합니다. <br />
        <br />
        (3) 가격: 유틸리티 중 수도세는 렌트비에 포함되어 있지만 전기세는 별도로
        DTE Energy를 통해 확인 후 납부해야 합니다. <br />
        <br />
        (4) 방/건물 소개: 1965년에 지어진 고층 아파트 중 하나입니다. 아파트
        구조는 다음과 같습니다. 아파트의 1층에는 따로 관리를 담당하는 데스크와
        택배실 및 커피 머신이 있으며, 그 외 편의시설로 수영장, 피트니스 센터,
        세탁실, 그리고 작은 공부 공간 및 휴게 공간이 있습니다. 2층은 luxury
        floor plan, 그 외 3층부터 19층까지는 베이직한 tower floor plan으로
        이루어져 있으며, 베이직 플랜의 경우 스튜디오 형식부터 2, 3, 4인실까지
        다양한 유닛의 옵션이 포함되어 있습니다. 아파트 웹사이트를 통해 구체적인
        유닛 구조와 가격대를 확인해볼 수 있으며, virtual tour 옵션을 통해 유닛
        내부를 체험해 볼 수 있습니다. <br />
        <br />
        (5) 기타: 아파트 자체에서 거주민들을 대상으로 이벤트를 종종 개최합니다.
        브런치나 피자를 제공하기도 하며, 할로윈 기간에는 펌킨 페인팅 이벤트를
        열어 우승자에게 상품권을 제공하기도 합니다. https://u-towers.com/
      </p>
    ),
  },
  {
    id: "saga_ann_arbor",
    title: "Saga Ann Arbor",
    desc: (
      <p>
        (1) 위치: 아파트에서의 거리는 Diag까지 도보 12분, Pierpont까지 버스로
        20분입니다. 아파트 앞의 정류장에서 The Ride를 타 Courtyard 앞에서 내려
        걸어가거나 Power Center 앞 정류장에서 M Bus를 타 Pierpont 앞에서 내릴 수
        있습니다. 또한 Target까지 도보 5분, Kerrytown까지 도보 9분이라서
        장보기가 대체적으로 편합니다.
        <br />
        <br />
        (2) 편의 시설: 아파트 어메니티, 특히 스터디 라운지가 잘 구성되어 있으며
        Stray Hen을 비롯한 다양한 식당들이 근처에 있습니다.
        <br />
        <br />
        (3) 가격: 가스비, 전기세, 수도세 모두 유틸리티에 포함되어 있습니다.
        Campus 내의 High rise 중 비교적 조금이나마 저렴한 가격이라 할 수
        있습니다.
      </p>
    ),
  },
  {
    id: "hub",
    title: "HUB",
    desc: (
      <p>
        (1) 위치: Diag까지 도보로 10분 정도 걸리며 도보로 5분 거리 이내에
        7-eleven, target, cvs, walgreen 등 많은 편의 시설이 있습니다.
        <br />
        <br />
        (2) 편의 시설: 아파트 내에 헬스장, 사우나, 핫텁, 루프탑, study center
        등이 있고 그 중 헬스장과 study center는 24시간 열려 있으며 프린터를
        무료로 이용할 수 있습니다. 각 층마다 분리수거와 쓰레기를 버릴 수 있는
        장소가 마련되어 있고 각 집마다 세탁기가 있습니다.
        <br />
        <br />
        (3) 가격: 렌트에 가스비, 전기세, 수도세 등이 포함되어 있지 않아 추가
        비용이 들고 전기세는 DTE를 통해서 매월 $50 정도 들며 water, gas, sewer
        등의 비용은 빌딩 전체에서 분할해서 비용을 청구하기 때문에 매월 $40 정도
        내야 합니다.
        <br />
        <br />
        (4) 방/건물 소개: Studio부터 4 bed 구조까지 다양하게 있는 고층 아파트로
        Huron St.에 위치하고 있고 다른 주거 옵션보다 렌트가 비싼 편에 속합니다.
      </p>
    ),
  },
];
// -------------------------------------------------------

// [TRAVEL] ----------------------------------------------
const travelAnnArborData = [
  {
    id: "university_of_michigan",
    title: "University of Michigan",
    desc: (
      <p>
        (1) 앤아버가 캠퍼스 도시인 만큼 미시간 대학교 구석구석을 여행해 보는
        것도 좋은 추억이 될 수 있습니다.
      </p>
    ),
  },
  {
    id: "nichols_arboretum",
    title: "Nichols Arboretum",
    desc: (
      <p>
        (1) Central Campus에 위치하며 산책하기 좋은 정원입니다.
        <br />
        <br />
        (2) Botanical Garden에서는 온실에서 열대식물 및 건조지역 식물들을 볼 수
        있고, 허브 정원, 산책로 등을 이용할 수 있습니다.
      </p>
    ),
  },
  {
    id: "michigan_stadium",
    title: "Michigan Stadium",
    desc: (
      <p>
        (1) 공식적으로 무려 107,601명을 수용할 수 있는 미식축구 경기장이자 “The
        Big House” 라고도 불립니다. 세계에서 두번째로 많은 인원의 관중들을
        수용할 수 있는 구장이기도 합니다.
        <br />
        <br />
        (2) 가을학기 때 친구들과 홈경기를 보러 가면 학교 학생들의 열광적인
        분위기를 느낄 수 있습니다.
        <br />
        <br />
        (3) 겨울학기 졸업식은 미시간 스타디움에서 진행합니다.
      </p>
    ),
  },
  {
    id: "university_of_michigan_museum_of_natural_history",
    title: "University of Michigan Museum of Natural History",
    desc: (
      <p>
        (1) Biology 빌딩 안에 위치한 자연사 박물관입니다.
        <br />
        <br />
        (2) 교내 가장 큰 버스 정류장인 CCTC 바로 옆에 있어 접근성이 좋고 건물도
        눈에 띄어 쉽게 찾을 수 있습니다.
        <br />
        <br />
        (3) 입장료는 무료이고 아이들이 즐길 수 있는 여러가지 활동들이 있습니다.
      </p>
    ),
  },
];
const travelDetroitData = [
  {
    id: "comercia_park",
    title: "Comercia Park",
    desc: (
      <p>
        (1) 메이저리그 구단 디트로이트 타이거스의 홈구장입니다. 주로 야외석이
        많아서 날씨 확인 후 방문하는 것을 추천합니다.
        <br />
        <br />
        (2) 야구를 좋아하시는 분이라면 눈앞에서 메이저리그를 경험할 수 있기에
        방문을 추천합니다.
      </p>
    ),
  },
  {
    id: "greek_town",
    title: "Greek Town",
    desc: (
      <p>
        그리스 음식점과 그리스 디저트 카페 등이 모여있는 거리이며 맛집들이 많아
        디트로이트를 간다며 꼭 가시는 것을 추천합니다.
      </p>
    ),
  },
];
const travelNearbyData = [
  {
    id: "holland",
    title: "Holland",
    desc: (
      <p>
        매년 5월 일주일간 튤립 축제가 열리며, 네덜란드 전통 문화 공연, 풍차,
        시가 행진 등을 볼 수 있습니다.
      </p>
    ),
  },
  {
    id: "frankenmuth",
    title: "Frankenmuth",
    desc: (
      <p>
        독일 마을로 일년 내내 크리스마스 장식용품을 팔고 독일 전통의상, 요리,
        주택 등을 구경할 수 있습니다.
      </p>
    ),
  },
  {
    id: "traverse_city",
    title: "Traverse City",
    desc: (
      <p>
        (1) 미시간 호수 근처의 도시이며 맑은 물과 깨끗한 모래로 여름 휴가와
        가을의 단풍이 유명합니다.
        <br />
        <br />
        (2) 미시간의 몇 안되는 관광 명소인 Sleeping Bears Sand Dune이 있습니다.
      </p>
    ),
  },
  {
    id: "mackinac_island",
    title: "Mackinac Island",
    desc: (
      <p>
        Upper Peninsula와 Lower Peninsula를 연결하는 지역이며 자동차 출입이
        금지되어 있어 마차 또는 자전거로 여행을 합니다.
      </p>
    ),
  },
  {
    id: "cedar_point",
    title: "Cedar Point",
    desc: (
      <p>
        차로 2시간 반 거리에 있는 오하이오 주에 위치한 놀이동산입니다. 다양한
        롤러코스터와 스릴 넘치는 놀이기구로 유명합니다.
      </p>
    ),
  },
  {
    id: "chicago",
    title: "Chicago",
    desc: (
      <p>
        (1) 비교적 앤아버에 가까운 대도시로서 미국 제 3의 도시인 시카고가
        있습니다.
        <br />
        <br />
        (2) 시카고의 대표적인 관광지로는 Magnificent Mile이 있는데 환상적인
        1마일이라는 별명에 걸맞는 화려한 거리입니다. 쇼핑 및 웅장한 빌딩숲
        사이에 걸어다니기 좋습니다.
        <br />
        <br />
        (3) 시카고 다운타운과는 거리가 조금 있지만 위 쪽으로 조금 올라가면
        한인상가가 밀집해 있는 지역이 있습니다. 한인식료품점도 많아서 앤아버보다
        훨씬 싼 가격에 한국물건들을 살 수 있습니다.
        <br />
        <br />
        (4) 시카고에는 애들러 천문대, 시카고 미술관, 브룩필드 동물원, 필드
        자연사 박물관과 같은 다양한 볼거리가 있습니다. 각 박물관마다 무료로
        입장하는 날이 있어 미리 알아보고 가면 저렴한 관광을 할 수 있습니다.
      </p>
    ),
  },
  {
    id: "canada",
    title: "Canada",
    desc: (
      <p>
        (1) 앤아버에서 근교에는 전국적으로 유명한 관광지인 나이아가라 폭포가
        있습니다.
        <br />
        <br />
        (2) 나이아가라 폭포는 미국과 캐나다 두 나라에서 볼 수 있는데 캐나다
        쪽에서는 폭포를 정면으로 한눈에 쉽게 볼 수 있고 미국 쪽은 폭포의 측면을
        볼 수 있습니다. 캐나다에 넘어가서 보는 풍경이 웅장해 주로 국경을 넘어가
        캐나다 음식인 Poutine을 먹고 폭포를 본 후 넘어오는 루트가 유명합니다.
        <br />
        <br />
        (3) 만약 가시는 경우 International Center에서 I-20나 DS-2019 form에
        사인을 받아야 합니다.
      </p>
    ),
  },
];

// -------------------------------------------------------

// [SPORTS] ----------------------------------------------
const sportsFacilityData = [
  {
    id: "central_campus_recreation_building",
    title: "Central Campus Recreation Building (CCRB)",
    desc: (
      <p>
        (1) 현재는 공사 중이어서 센트럴에 사시는 분들은 Palmer Field Temporary
        Field를 이용할 수 있습니다.
        <br />
        <br />
        (2) 2025년 완공 예정입니다.
      </p>
    ),
  },
  {
    id: "north_campus_recreation_building",
    title: "North Campus Recreation Building (NCRB)",
    desc: (
      <p>
        (1) 웨이트 시설, 농구장, 배드민턴 코트 및 수영장이 있으며 규모가 크기에
        다양한 운동을 하기 용이합니다.
        <br />
        <br /> (2) Bursley-Baits 버스 탑승 후 Courtyard 에서 하차하면 뒤쪽으로
        보이는 건물입니다.
      </p>
    ),
  },
  {
    id: "intramural_sports_building",
    title: "Intramural Sports Building (IM)",
    desc: (
      <p>
        Central Campus 남쪽에 있으며 Commuter South 를 탑승하면 도착하는
        건물입니다.
      </p>
    ),
  },
];
const sportsMiscSportsData = [
  {
    id: "soccer",
    title: "축구",
    desc: (
      <p>
        (1) 현재 앤아버에는 한국인 중심으로 운영되는 축구 클럽들이 다수
        존재합니다. 여름에는 학교 내에 있는 Mitchell Field에서 주로 연습하며,
        눈이 많이 내리는 겨울의 경우 근교에서 있는 실내 축구장을 대관하여 연습을
        진행합니다.
        <br />
        <br />
        (2) 학부 축구팀인 UMK (Futbol Club at the University of Michigan
        Koreans) 는 한인 축구 동아리이며 선수들은 근처 대학교들과 함께
        축구경기를 참여하게 됩니다.
      </p>
    ),
  },
  {
    id: "basketball",
    title: "농구",
    desc: (
      <p>
        (1) 학교 내에는 CCRB, NCRB, IM 내에 있는 실내 코트를 이용할 수 있고 그
        외에도 주위 학교 및 주거 단지에 위치한 실외 코트를 이용할 수 있습니다.
        <br />
        <br />
        (2) 따로 한인 농구 동아리는 존재하지 않지만 농구를 좋아하는 한인들이
        많아 사람을 모아 코트를 잡고 경기를 진행할 수도 있습니다.
      </p>
    ),
  },
  {
    id: "tennis",
    title: "테니스",
    desc: (
      <p>
        실내 테니스를 즐기기 위해서는 학교 시설인 Varsity Tennis Center에
        멤버십을 가지고 있어야 하는데, 학생은 할인가격에 등록이 가능합니다. 주로
        Varsity Tennis Center 등 실내 테니스 경기장에서 경기를 진행하기 때문에
        한 해 동안 쉬지 않고 꾸준히 운영되고 있습니다. <br />
        <br />
        (2) 멤버십을 가지고 있는 사람과 같이 갈 경우 게스트 자격으로 $10을
        지불하고 플레이 가능하며 이와 별개로 코트비용는 별도로 있습니다.
        멤버쉽이 없는 경우 타 테니스장과 비교해서 저렴한 가격에 테니스를 즐기실
        수 있습니다. <br />
        <br />
        (3) 키사에서 운영하고 있는 테니스 소그룹(Swings)이 있으니 실력에
        상관없이 누구나 테니스를 치고 싶으신 분이 있다면 연락 주시면
        감사하겠습니다. (인스타그램) 저희 소그룹은 날씨가 좋은 가을에는 앤아버에
        있는 공원 테니스 코트에서 진행하고, 겨울에는 Varsity Tennis Center에서
        진행합니다.
      </p>
    ),
  },
  {
    id: "golf",
    title: "골프",
    desc: (
      <p>
        (1) 앤아버에서 야외 라운딩을 할 경우 한국보다 매우 저렴하게 골프를 즐길
        수 있습니다. 그러나 추운 날씨 탓에 골프장들은 대개 겨울을 제외한 4월부터
        11월까지 운영됩니다. 학교 골프장의 경우 미국대학 골프코스 3위에 오를
        정도로 평가가 좋습니다.
        <br />
        <br />
        (2) Driving Range는 계절 상관없이 운영되며 Indoor Golf Course도 있으나
        One Bay 기준 시간당 $40~60로 저렴하진 않은 편입니다.
        <br />
        <br />
        (3) 키사에서 운영하고 있는 골프 소그룹(공굴러가요)이 있으니 구력
        상관없이 골프에 관심 있으신 분은 연락 주시면 감사하겠습니다.
        <br />
        <br />
        <b>University of Michigan Golf Course</b>
        &nbsp;&nbsp; https://umgolfcourse.umich.edu/ <br />
        웹사이트를 통해 티타임 예약이 가능합니다. 일반적으로 티타임 1주일 전부터
        예약 가능하나 시즌 패스 소유자의 경우 14 day advanced booking window가
        제공됩니다. 그린피와 카트비가 별도로 부과되며 추가 금액 지불 시 클럽
        렌탈도 가능합니다. 자세한 사항은 웹사이트 참고 부탁드립니다.
        <br />
        <br />
        [Driving Range]
        <br />
        <b>Miles of Golf</b>
        <br />
        9am-12pm: $10 for a small bucket of 55 balls, $12 for a medium bucket of
        75 balls, and $14 for a large of 100 balls. <br />
        12-6pm: $12 for a small bucket of 55 balls, $14 for a medium bucket of
        75 balls, and $16 for a large of 100 balls. (*All range ball purchases
        include the use of Toptracer Range*)
        <br />
        <br />
        [Indoor Golf]
        <br />
        <b>Ann Arbor Indoor Golf:</b> $30-40/h
        <br /> <b>X-Golf Ann Arbor:</b> $40-60/h
      </p>
    ),
  },
  {
    id: "ski",
    title: "스키",
    desc: (
      <p>
        미시간에 오면서 스키를 기대하며 오는 분들도 있겠지만, 이곳은 산이 거의
        없기 때문에, 근처에서 수준급의 스키장을 기대하기는 어렵습니다. 하지만
        가족들과 함께 시간을 보내기에는 괜찮은 아기자기한 스키장들이 가까이
        있고, 거리가 좀 멀지만 Upper peninsula와 Northern lower peninsula에는
        괜찮은 스키장들이 있습니다.
        <br />
        <br />
        대표적인 근교 스키장으로는 Mt.Brighton (30분), Alpine (50분), Mt. Holly
        (1시간), Mt. Boyne (4시간) 등이 있습니다. (센트럴 캠퍼스 기준)
      </p>
    ),
  },
];
// -------------------------------------------------------

export {
  campusCentralData,
  campusNorthData,
  housingOnCampusData,
  housingOffCampusData,
  travelAnnArborData,
  travelDetroitData,
  travelNearbyData,
  sportsFacilityData,
  sportsMiscSportsData,
};
