import type { Metadata } from "next";
import type {
  InfoOverviewData,
  InfoSection,
} from "@/features/info-page/components/InfoOverviewTemplate";
import type { InfoDetailData } from "@/features/info-page/components/InfoDetailTemplate";

const annArborSection: InfoSection = {
  sectionName: "ann-arbor",
  sectionText: "Ann Arbor",
  contentList: [
    { id: "university_of_michigan", title: "University of Michigan" },
    { id: "nichols_arboretum", title: "Nichols Arboretum" },
    { id: "michigan_stadium", title: "Michigan Stadium" },
    {
      id: "university_of_michigan_museum_of_natural_history",
      title: "University of Michigan Museum of Natural History",
    },
  ],
};

const detroitSection: InfoSection = {
  sectionName: "detroit",
  sectionText: "Detroit",
  sectionIntro:
    "앤아버 근교에 있는 대도시인 디트로이트는 관광 명소가 다른 대도시보다 많지는 않지만 버스 타고 40분이면 갈 수 있는 만큼 당일치기로 여행하기 적합한 장소입니다. 근래에 D2A2라는 디트로이트와 앤아버를 왕복하는 버스 노선이 생겨 편도 $6이라는 저렴한 가격으로 당일치기 여행을 갈 수 있습니다.",
  contentList: [
    { id: "comercia_park", title: "Comercia Park" },
    { id: "greek_town", title: "Greek Town" },
  ],
};

const nearbySection: InfoSection = {
  sectionName: "nearby",
  sectionText: "근교 도시 및 명소",
  contentList: [
    { id: "holland", title: "Holland" },
    { id: "frankenmuth", title: "Frankenmuth" },
    { id: "traverse_city", title: "Traverse City" },
    { id: "mackinac_island", title: "Mackinac Island" },
    { id: "cedar_point", title: "Cedar Point" },
    { id: "chicago", title: "Chicago" },
    { id: "canada", title: "Cananda" },
  ],
};

const overview: InfoOverviewData = {
  infoType: "travel",
  infoTitle: "여행",
  sections: [annArborSection, detroitSection, nearbySection],
};

const pageMetadata: Metadata = {
  title: "여행",
  description:
    "미시간 대학교를 다니면서 여행할 수 있는 장소들에 대한 정보입니다. 미시간 주 뿐만 아니라 캐나다, 시카고와 같은 다양한 도시들과 명소들을 소개합니다.",
};

const annArborDetail: InfoDetailData = {
  pageTitle: "Ann Arbor",
  records: [
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
          (2) Botanical Garden에서는 온실에서 열대식물 및 건조지역 식물들을 볼
          수 있고, 허브 정원, 산책로 등을 이용할 수 있습니다.
        </p>
      ),
    },
    {
      id: "michigan_stadium",
      title: "Michigan Stadium",
      desc: (
        <p>
          (1) 공식적으로 무려 107,601명을 수용할 수 있는 미식축구 경기장이자
          “The Big House” 라고도 불립니다. 세계에서 두번째로 많은 인원의
          관중들을 수용할 수 있는 구장이기도 합니다.
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
          (2) 교내 가장 큰 버스 정류장인 CCTC 바로 옆에 있어 접근성이 좋고
          건물도 눈에 띄어 쉽게 찾을 수 있습니다.
          <br />
          <br />
          (3) 입장료는 무료이고 아이들이 즐길 수 있는 여러가지 활동들이
          있습니다.
        </p>
      ),
    },
  ],
};

const detroitDetail: InfoDetailData = {
  pageTitle: "Detroit",
  records: [
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
          (1) 다운타운 안에 위치한 그릭 타운에서는 그리스에서 접할 수 있는
          것보다 더 맛있는 그리스식 지중해 식사를 저렴한 가격에 할 수 있습니다.
          <br />
          <br />
          (2) 디트로이트에서 가장 오래된 카지노인 할리우드 카지노 (Hollywood
          Casino at Greektown)도 있습니다.
          <br />
          <br />
          (3) 유명한 레스토랑으로는 The New Parthenon, The Golden Fleece, Cyprus
          Taverna, Pegasus Taverna, Pizza Papalis, Fishbone’s Rhythm Kitchen
          Cafe 등이 있습니다.
        </p>
      ),
    },
  ],
};

const nearbyDetail: InfoDetailData = {
  pageTitle: "근교 도시 및 명소",
  records: [
    {
      id: "holland",
      title: "Holland",
      desc: (
        <p>
          (1) 1840년대의 캐나다에서 살던 네덜란드인들이 이주 후 정착한
          마을입니다.
          <br />
          <br />
          (2) 네덜란드 전통의 건축물, 음식 및 축제 등이 잘 보존되어 있고
          세계적으로 유명한 연례 봄 축제인 튤립 타임 (Tulip Time)에서는 네덜란드
          전통문화 공연, 풍차, 시가행진 등을 즐길 수 있습니다.
          <br />
          <br />
          (3) 축제 기간인 5월에 방문하면 5백만 송이가 넘는 튤립의 물결을 볼 수
          있습니다.
          <br />
          <br />
          (4) 겨울에 볼 만한 것들로는 크리스마스 상록수와 네덜란드 성 니콜라스인
          신터클라스 (Sinterklaas)가 있습니다.
          <br />
          <br />
          (5) 미시간호 주변에서 카약, 제트스키, 카이트 서핑 등과 같은 활동들을
          즐기실 수 있습니다.
        </p>
      ),
    },
    {
      id: "frankenmuth",
      title: "Frankenmuth",
      desc: (
        <p>
          (1) 독일 마을로 일 년 내내 크리스마스 장식용품을 팔고 독일 전통 의상,
          요리, 주택 등을 구경할 수 있습니다.
          <br />
          <br />
          (2) 매월 5월 셋째 주에 세계 맥주 축제가 열려서 이에 맞추어 1박 2일로
          방문하면 맛있는 맥주를 많이 마실 수 있습니다.
          <br />
          <br />
          (3) 크리스마스 시즌에 여행 가면 스탬프 이벤트, 무료 소시지 맛보기,
          무료 핫초코 나눔 등의 행사가 있고 상품도 받을 수 있습니다. 연말
          분위기를 느끼고 싶다면 Frankenmuth 방문을 추천드립니다.
          <br />
          <br />
          (4) 중심가에 음악이 나오는 크리스마스트리가 있고 부근에 규모가 정말 큰
          크리스마스 장식용품 상점이 있습니다.
          <br />
          <br />
          (5) 앤아버 캠퍼스에서 자동차로 1시간 20분 소요됩니다.
        </p>
      ),
    },
    {
      id: "traverse_city",
      title: "Traverse City",
      desc: (
        <p>
          (1) 오대호 중 하나인 미시간 호수 앞에 위치한 도시이며 맑은 물과 깨끗한
          모래로 여름휴가와 가을의 단풍이 유명합니다. 특히 여름철에 물놀이하러
          가기 매우 좋습니다.
          <br />
          <br />
          (2) 미시간의 명물인 체리의 주 생산지역입니다. 7월 초에는 체리
          페스티벌이 열리기도 합니다.
          <br />
          <br />
          (3) 미시간의 주요 관광 명소 중 하나인 Sleeping Bears Sand Dune이
          있습니다.
          <br />
          <br />
          (4) 앤아버 캠퍼스에서 자동차로 약 3시간 50분 정도 소요됩니다.
        </p>
      ),
    },
    {
      id: "mackinac_island",
      title: "Mackinac Island",
      desc: (
        <p>
          (1) 오대호 중 하나인 휴런 호에 위치해있는 섬입니다. 미시간주의 Upper
          Peninsula와 Lower Peninsula를 연결하는 지역에 있습니다.
          <br />
          <br />
          (2) 미시간주 주민들에게는 마치 제주도와 같은 대표 휴양 섬입니다.
          <br />
          <br />
          (3) 자동차 출입이 금지되어 있어 Mackinaw City에서 배를 타고 가야
          합니다 (15~20분 소요). 섬 내부에서는 마차 또는 자전거로 여행을 합니다.
          <br />
          <br />
          (4) 앤아버 캠퍼스에서 자동차로 4시간 소요됩니다. 눈이 많이 오는 겨울에
          가면 길이 미끄러워 여름 혹은 가을에 방문하는 것을 추천합니다.
        </p>
      ),
    },
    {
      id: "cedar_point",
      title: "Cedar Point",
      desc: (
        <p>
          (1) 앤아버 캠퍼스에서 자동차로 2시간 반 거리에 있는 오하이오 주에
          위치한 놀이동산입니다.
          <br />
          <br />
          (2) 종일 자유이용권은 약 $100 정도 되며 음식도 Pass를 구매하여 즐기면
          보다 저렴한 가격에 즐길 수 있습니다. 음식의 퀄리티는 무난합니다.
          <br />
          <br />
          (3) 한국의 놀이공원들과는 비교도 안 되는 스케일의 다양한 롤러코스터와
          스릴 넘치는 놀이 기구로 유명합니다. 이 중, 약 95미터 상공에서 150 km/h
          의 속도로 하강하는 Millennium Force 롤러코스터가 제일 유명합니다.
          <br />
          <br />
          (4) 개강 전날(8월 29일)에 방문하였을 때 사람이 많이 없어 놀이기구마다
          약 30분 정도 대기하고 탑승했습니다. 아침에 앤아버에서 출발하고 폐장
          후에 귀가하였는데, 하루 동안 7개의 놀이기구를 탑승했습니다.
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
          한인상가가 밀집해 있는 지역이 있습니다. 한인식료품점도 많아서
          앤아버보다 훨씬 싼 가격에 한국물건들을 살 수 있습니다.
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
      title: "Cananda",
      desc: (
        <p>
          (1) 앤아버에서 근교에는 전국적으로 유명한 관광지인 나이아가라 폭포가
          있습니다.
          <br />
          <br />
          (2) 나이아가라 폭포는 미국과 캐나다 두 나라에서 볼 수 있는데 캐나다
          쪽에서는 폭포를 정면으로 한눈에 쉽게 볼 수 있고 미국 쪽은 폭포의
          측면을 볼 수 있습니다. 캐나다에 넘어가서 보는 풍경이 웅장해 주로
          국경을 넘어가 캐나다 음식인 Poutine을 먹고 폭포를 본 후 넘어오는
          루트가 유명합니다.
          <br />
          <br />
          (3) 만약 가시는 경우 International Center에서 I-20나 DS-2019 form에
          사인을 받아야 합니다.
        </p>
      ),
    },
  ],
};

export const travelInfoData = {
  overview,
  pageMetadata,
  details: {
    annArbor: annArborDetail,
    detroit: detroitDetail,
    nearby: nearbyDetail,
  },
};
