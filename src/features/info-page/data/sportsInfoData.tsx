import type { Metadata } from "next";
import type {
  InfoOverviewData,
  InfoSection,
} from "@/features/info-page/components/InfoOverviewTemplate";
import type { InfoDetailData } from "@/features/info-page/components/InfoDetailTemplate";

const facilitySection: InfoSection = {
  sectionName: "facility",
  sectionText: "운동시설",
  sectionIntro:
    "재학 중인 학생인 경우 학기 중 미시간 대학교에서 운영하는 체육관들은 M-card만 있다면 무료로 이용 가능합니다. 아래 체육관들에는 헬스장 뿐만 아니라 스쿼시, 농구, 탁구, 수영등을 할 수 있는 시설이 완비되어 있으며 러닝머신 및 조깅 트랙등이 마련되어 있습니다.",
  contentList: [
    {
      id: "central_campus_recreation_building",
      title: "Central Campus Recreation Building\n(CCRB)",
    },
    {
      id: "north_campus_recreation_building",
      title: "North Campus Recreation Building\n(NCRB)",
    },
    {
      id: "intramural_sports_building",
      title: "Intramural Sports Building\n(IM)",
    },
  ],
};

const miscSportsSection: InfoSection = {
  sectionName: "misc-sports",
  sectionText: "종목별 안내",
  contentList: [
    { id: "soccer", title: "축구" },
    { id: "basketball", title: "농구" },
    { id: "tennis", title: "테니스" },
    { id: "golf", title: "골프" },
    { id: "ski", title: "스키" },
  ],
};

const overview: InfoOverviewData = {
  infoType: "sports",
  infoTitle: "스포츠",
  pageIntro: [
    "미시간 대학교 내에는 스포츠 시설이 완비 되어 원하는 운동의 대부분을 즐길 수 있습니다.",
  ],
  sections: [facilitySection, miscSportsSection],
};

const pageMetadata: Metadata = {
  title: "스포츠",
  description:
    "미시간 대학교 내의 다양한 운동 시설들과 스포츠들에 대한 정보들입니다. 헬스장 뿐만 아니라, 축구, 테니스, 스키 등 다양한 취미 운동을 미시간에서 하는 방법들을 확인할 수 있습니다.",
};

const facilityDetail: InfoDetailData = {
  pageTitle: "운동시설",
  records: [
    {
      id: "central_campus_recreation_building",
      title: "Central Campus Recreation Building (CCRB)",
      desc: (
        <p>
          (1) 현재는 공사 중이어서 센트럴에 사시는 분들은 Palmer Field Temporary
          Field를 이용할 수 있습니다.
          <br />
          <br />
          (2) 2025년 봄에 완공 예정입니다.
        </p>
      ),
    },
    {
      id: "north_campus_recreation_building",
      title: "North Campus Recreation Building (NCRB)",
      desc: (
        <p>
          (1) 웨이트 시설, 농구장, 배드민턴 코트 및 수영장이 있으며 규모가 크기에
          다양한 운동을 하기 용이합니다. 1층에는 헬스장 및 수영장이 있으며,
          2층에는 다수의 러닝머신들이 위치하고 있습니다. 배드민턴은 코트가 많지
          않고 선착순 제도로 운용하고 있기에 시간을 잘 알고 가셔야 합니다.
          <br />
          <br />
          (2) Bursley-Baits 버스 탑승 후 Courtyard 에서 하차하면 뒤쪽으로 보이는
          건물입니다.
        </p>
      ),
    },
    {
      id: "intramural_sports_building",
      title: "Intramural Sports Building (IM)",
      desc: (
        <p>
          (1) Central Campus 남쪽에 있으며 Commuter South 를 탑승하면 도착할 수
          있습니다.
          <br />
          <br />
          (2) Mcard 혹은 Recreational Sports Member Card를 보여줘야 입장이
          가능합니다. 농구 코트, 탁구대, 배구 등등 다양한 운동 시설들을 예약 없이
          쓸 수 있습니다. 학기 초반에는 사람들이 많이 와서 기다려야 하는 경우가
          많고, 점심 시간과 5시쯤에도 사람들이 붐빕니다.
        </p>
      ),
    },
  ],
};

const miscSportsDetail: InfoDetailData = {
  pageTitle: "종목별 안내",
  records: [
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
          (1) 실내 테니스를 즐기기 위해서는 학교 시설인 Varsity Tennis Center에
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
  ],
};

export const sportsInfoData = {
  overview,
  pageMetadata,
  details: {
    facility: facilityDetail,
    miscSports: miscSportsDetail,
  },
};
