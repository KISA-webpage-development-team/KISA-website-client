import type { Metadata } from "next";
import type {
  InfoOverviewData,
  InfoSection,
} from "@/features/info-page/components/InfoOverviewTemplate";
import type { InfoDetailData } from "@/features/info-page/components/InfoDetailTemplate";

// On-Campus overview sections
const onCampusCentralSection: InfoSection = {
  sectionName: "on-campus",
  sectionText: "Central",
  contentList: [
    { id: "south_quad", title: "South Quad" },
    { id: "west_quad", title: "West Quad" },
    { id: "north_quad", title: "North Quad" },
    { id: "east_quad", title: "East Quad" },
  ],
};

const onCampusHillSection: InfoSection = {
  sectionName: "on-campus",
  sectionText: "Hill",
  contentList: [
    { id: "mosher_jordan", title: "Mosher Jordan\n(MOJO)" },
    { id: "alice_lloyd", title: "Alice Lloyd" },
    { id: "couzens", title: "Couzens" },
    { id: "stockwell", title: "Stockwell" },
    { id: "markley", title: "Markley" },
    { id: "oxford", title: "Oxford" },
  ],
};

const onCampusNorthSection: InfoSection = {
  sectionName: "on-campus",
  sectionText: "North",
  contentList: [
    { id: "bursley", title: "Bursley" },
    { id: "baits", title: "Baits" },
  ],
};

const overviewOnCampus: InfoOverviewData = {
  infoType: "housing",
  infoTitle: "On-Campus Housing",
  sections: [onCampusCentralSection, onCampusHillSection, onCampusNorthSection],
};

// Off-Campus overview section
const offCampusSection: InfoSection = {
  sectionName: "off-campus",
  sectionText: "Off-Campus Housing",
  contentList: [
    { id: "tower_plaza", title: "Tower Plaza\n(TP)" },
    { id: "landmark", title: "Landmark" },
    { id: "university_tower", title: "University Tower\n(UT)" },
    { id: "saga_ann_arbor", title: "Saga Ann Arbor" },
    { id: "hub", title: "HUB" },
    { id: "zwest", title: "ZWest" },
  ],
};

const overviewOffCampus: InfoOverviewData = {
  infoType: "housing",
  infoTitle: "Off-Campus Housing",
  sections: [offCampusSection],
};

const pageMetadata: Metadata = {
  title: "하우징",
  description:
    "미시간 대학교의 하우징 정보들입니다. On-Campus와 Off-Campus로 나뉩니다. 기숙사별 다양한 정보들과, 랜드마크, 타워플라자를 비롯한 오프 캠퍼스 하우징에 대한 자세한 설명을 확인할 수 있습니다.",
};

const onCampusDetail: InfoDetailData = {
  pageTitle: "On-Campus Housing",
  records: [
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
          카페에 바로 이동할 수 있습니다. Michigan Union에는 공부할 수 있는 공간
          또한 상당히 존재하기 때문에 가까운 곳에서 공부가 가능하다는 장점이
          있습니다.
          <br />
          <br />
          (3) 기타: 다른 기숙사와 비교했을 때 방들이 크고 넓으며, 냉난방 시스템
          또한 잘 구비되어 있어 대체로 가장 좋다고 평가되는 기숙사 중 하나입니다.
          또한 많은 학생이 자주 들리게 되는 샤피로 도서관과도 도보 10분 거리에
          있어 굉장히 편리합니다.
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
          (2) 편의 시설: 2층에는 큰 라운지가 있으며, 다른 기숙사에 비해 조금 더
          조용한 편입니다. 1층 세탁실 옆에는 비교적 작은 라운지가 있습니다.
          다이닝홀은 두 개의 층으로 이루어져 있고 메뉴가 다양합니다. 다른 기숙사에
          비해 맛있는 학식으로 소문나있습니다. 또, 1층에 위치한 카페는 평일 밤
          12시까지 운영하여 늦은 시간 간식을 사 먹기 좋습니다.
          <br />
          <br />
          (3) 기타: WISE RP 커뮤니티와 MRADS 신입생들이 주로 거주합니다.
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
      id: "bursley",
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
  ],
};

const offCampusDetail: InfoDetailData = {
  pageTitle: "Off-Campus Housing",
  records: [
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
    {
      id: "zwest",
      title: "ZWest",
      desc: (
        <p>
          (1) 위치: Tower Plaza 바로 건너편으로 도보로 Michigan Union / Mason
          Hall에서 3분, Diag로부터 5분, Shapiro Library로부터 7분, CCTC로부터 12분
          정도 소요됩니다.
          <br />
          <br />
          (2) 편의 시설: 건물 1층에 헬스장이 있습니다. 작긴 하지만 다양한 운동
          기구가 있어서 웬만한 운동 루틴은 다 할 수 있습니다. 세탁기와 건조기가 방
          안에 구비되어 있어서 빨래를 하러 집 밖으로 이동할 필요가 없습니다.
          리모델링 되어있는 집들은 바닥이 카펫이 아니라서 청소하기도 편리합니다.
          주변 음식점으로는 Asian Legend, Tomukun Noodle Bar / Korean BBQ, New
          York Pizza Depot, Hopcat, The Seoul, Slurping Turtle, Pita Kabob,
          Chipotle, Totoro 등이 있으며, 주변 카페로는 Starbucks, Comet Coffee,
          Jasmine Tea, Ding Tea, Share Tea 등이 있습니다. 그 외에도 Target, CVS,
          Walgreens, 7-11, Fedex 등이 도보 5분 거리 이내에 있어 생활 방면으로
          편리합니다.
          <br />
          <br />
          (3) 가격: 유틸리티는 미포함이기에 사이트에서 안내하는 월세보다
          실질적으로 더 납부하게 됩니다.
          <br />
          <br />
          (4) 방/건물 소개: 구조는 1, 2, 4 bed으로 이루어져 있습니다. 주방과
          거실은 넓은 편이지만 방이 상대적으로 작아서 룸메이트와 방을 나눠서
          쓰기에는 조금 좁다고 느껴질 수 있습니다. State Street 상권 및 센트럴
          캠퍼스로부터 가깝습니다.
        </p>
      ),
    },
  ],
};

export const housingInfoData = {
  overviewOnCampus,
  overviewOffCampus,
  pageMetadata,
  details: {
    onCampus: onCampusDetail,
    offCampus: offCampusDetail,
  },
};
