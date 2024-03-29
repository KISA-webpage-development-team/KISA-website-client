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

export {
  campusCentralData,
  campusNorthData,
  travelAnnArborData,
  travelDetroitData,
  travelNearbyData,
};
