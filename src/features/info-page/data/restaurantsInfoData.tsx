import type { Metadata } from "next";
import type {
  InfoOverviewData,
  InfoSection,
} from "@/features/info-page/components/InfoOverviewTemplate";
import type { InfoDetailData } from "@/features/info-page/components/InfoDetailTemplate";

const koreanMarketSection: InfoSection = {
  sectionName: "korean-market",
  sectionText: "한인마트",
  contentList: [{ id: "orange_market", title: "Orange Market" }],
};

const koreanSection: InfoSection = {
  sectionName: "korean",
  sectionText: "한식",
  contentList: [
    { id: "tomukun_bbq", title: "Tomukun BBQ" },
    { id: "tomukun_noodle_bar", title: "Tomukun Noodle Bar" },
    { id: "seoul_garden", title: "Seoul Garden" },
    { id: "the_seoul", title: "The Seoul" },
    { id: "hola_seoul", title: "Hola Seoul" },
    { id: "mama_satto", title: "Mama Satto" },
    { id: "rich_jc", title: "Rich JC" },
    { id: "kangs_restaurant", title: "Kang's Restaurant" },
    { id: "noori_chicken", title: "Noori Chicken" },
  ],
};

const asianSection: InfoSection = {
  sectionName: "asian",
  sectionText: "아시안",
  contentList: [
    { id: "no_thai", title: "No Thai!" },
    { id: "kanbu", title: "Kanbu" },
    { id: "evergreen", title: "Evergreen" },
    { id: "asian_legend", title: "Asian Legend" },
    { id: "slurping_turtle", title: "Slurping Turtle" },
  ],
};

const hamburgerPizzaSection: InfoSection = {
  sectionName: "hamburger-pizza",
  sectionText: "햄버거 & 피자",
  contentList: [
    { id: "joes_pizza", title: "Joe's Pizza" },
    { id: "nypd", title: "NYPD" },
    { id: "frita_batidos", title: "Frita Batidos" },
    { id: "hop_cat", title: "Hop Cat" },
  ],
};

const dessertSection: InfoSection = {
  sectionName: "dessert",
  sectionText: "디저트",
  contentList: [
    { id: "blank_slate", title: "Blank Slate" },
    { id: "milk_and_froth", title: "Milk & Froth" },
    { id: "comet_coffee", title: "Comet Coffee" },
    { id: "sweeting", title: "Sweeting" },
  ],
};

const fineDiningSection: InfoSection = {
  sectionName: "fine-dining",
  sectionText: "파인 다이닝",
  contentList: [
    { id: "aventura", title: "Aventura" },
    { id: "mani_osteria_bar", title: "Mani Osteria Bar" },
    { id: "savas", title: "Sava's" },
    { id: "pacific_rim_by_kana", title: "Pacific Rim by Kana" },
  ],
};

const othersSection: InfoSection = {
  sectionName: "others",
  sectionText: "기타",
  contentList: [
    { id: "zingermans_delicatessen", title: "Zingerman's Delicatessen" },
    { id: "culantro", title: "Culantro" },
  ],
};

const overview: InfoOverviewData = {
  infoType: "restaurants",
  infoTitle: "식생활",
  sections: [
    koreanMarketSection,
    koreanSection,
    asianSection,
    hamburgerPizzaSection,
    dessertSection,
    fineDiningSection,
    othersSection,
  ],
};

const pageMetadata: Metadata = {
  title: "식생활",
  description:
    "미시간 대학교 캠퍼스의 다양한 음식점들을 소개합니다. 한식부터 파인 다이닝까지 다양한 후기와 정보들이 담겨있습니다.",
};

const koreanMarketDetail: InfoDetailData = {
  pageTitle: "한인마트",
  records: [
    {
      id: "orange_market",
      title: "Orange Market",
      desc: (
        <p>
          센트럴 캠퍼스 바로 위에 위치한 한인마트이며 23/65번 버스를 타고 가면
          편리합니다. 자취생들을 위한 식재료가 많이 있습니다. 한인 사장님이 손수
          만드신 맛있는 반찬도 구매 가능합니다.
        </p>
      ),
    },
  ],
};

const koreanDetail: InfoDetailData = {
  pageTitle: "한식",
  records: [
    {
      id: "tomukun_bbq",
      title: "Tomukun BBQ",
      desc: (
        <p>
          다양한 메뉴로 구성되어 있으며, 고기, 면류, 등등 선택지가 많아서
          좋습니다. 점심 특선메뉴는 적당한 가격에 배불리 먹을 수 있으며 또한
          공기밥이 무한리필입니다.
        </p>
      ),
    },
    {
      id: "tomukun_noodle_bar",
      title: "Tomukun Noodle Bar",
      desc: (
        <p>
          대표 메뉴로는 쌀국수가 있으며 단일 메뉴 음식점과 다를 바 없을 정도로 타
          메뉴의 성공률이 낮은 편입니다. 하지만 쌀국수를 시키신다면 한국
          쌀국수집의 맛을 볼 수 있습니다.
        </p>
      ),
    },
    {
      id: "seoul_garden",
      title: "Seoul Garden",
      desc: (
        <p>
          센트럴 캠퍼스와 거리는 조금 있지만 맛있으며 고기를 구워 먹을 때 자주
          방문하는 식당입니다.
        </p>
      ),
    },
    {
      id: "the_seoul",
      title: "The Seoul",
      desc: (
        <p>
          센트럴 캠퍼스와 거리는 조금 있지만 맛있으며 고기를 구워 먹을 때 자주
          방문하는 식당입니다.
        </p>
      ),
    },
    {
      id: "hola_seoul",
      title: "Hola Seoul",
      desc: (
        <p>
          규모가 작은 식당이라 앉을 자리는 많이 없지만 가격도 높지 않고 팝콘치킨,
          벤토박스, 컵밥 등이 인기 메뉴입니다.
        </p>
      ),
    },
    {
      id: "mama_satto",
      title: "Mama Satto",
      desc: (
        <p>
          양이 다른 한식당보다 많습니다. 돈까스 시키면 얼굴만한 돈까스 두 덩이가
          나옵니다. 일식 위주(초밥, 롤, 우동, 라멘 등)로 판매합니다.
        </p>
      ),
    },
    {
      id: "rich_jc",
      title: "Rich JC",
      desc: <p>찌개류가 맛있으며 특별한 메뉴는 떡꼬치가 있습니다.</p>,
    },
    {
      id: "kangs_restaurant",
      title: "Kang's Restaurant",
      desc: <p>양도 꽤 많은편이며 가격도 나쁘지 않습니다.</p>,
    },
    {
      id: "noori_chicken",
      title: "Noori Chicken",
      desc: (
        <p>
          한국식 치킨을 팔고 소스도 종류가 많아서 취향대로 골라 먹을 수 있습니다.
          특히 런치 메뉴들이 있는데 가격도 합리적이고 양도 괜찮습니다.
        </p>
      ),
    },
  ],
};

const asianDetail: InfoDetailData = {
  pageTitle: "아시안",
  records: [
    {
      id: "no_thai",
      title: "No Thai!",
      desc: (
        <p>
          앤아버 한정 가성비 최고인 태국 음식점입니다. 노스 캠퍼스, 캐리 타운,
          센트럴 캠퍼스에 각각 분점이 있어 접근성도 좋습니다.
        </p>
      ),
    },
    {
      id: "kanbu",
      title: "Kanbu",
      desc: (
        <p>
          깐부에서만 파는 스시 브리토가 맛있습니다. 브리토 특성 상 많이 내용물이
          흘러 나올 수 밖에 없어서 관심 있는 이성과 단둘이 하는 식사라면 스시
          브리토는 지양하는 편이 좋습니다.
        </p>
      ),
    },
    {
      id: "evergreen",
      title: "Evergreen",
      desc: (
        <p>다운 타운에 위치한 중국 음식점으로 맛있는 마라 치킨이 있습니다.</p>
      ),
    },
    {
      id: "asian_legend",
      title: "Asian Legend",
      desc: (
        <p>
          가성비가 좋은 중국 음식점입니다. Diag 근처에 위치해 접근성도 좋습니다.
        </p>
      ),
    },
    {
      id: "slurping_turtle",
      title: "Slurping Turtle",
      desc: (
        <p>
          일본식 라멘이 주력 메뉴입니다. 웨이팅이 길어 바쁜 시간 대에 가면 1시간은
          기본으로 기다려야 합니다.
        </p>
      ),
    },
  ],
};

const hamburgerPizzaDetail: InfoDetailData = {
  pageTitle: "햄버거 & 피자",
  records: [
    {
      id: "joes_pizza",
      title: "Joe's Pizza",
      desc: (
        <p>
          뉴욕의 명물 피자로 스파이더맨이 배달하던 피자입니다. 한 조각에 4-5불로
          가격이 조금 나가긴 하지만 가끔 먹고 싶은 생각이 드는 피자입니다.
        </p>
      ),
    },
    {
      id: "nypd",
      title: "NYPD",
      desc: <p>평일 5pm 전에 Snackpass 로 주문하면 25% 됩니다.</p>,
    },
    {
      id: "frita_batidos",
      title: "Frita Batidos",
      desc: (
        <p>
          다운타운에 위치한 쿠바 스타일 햄버거 및 스트리트 푸드를 드셔 보실 수
          있습니다. 감자튀김과 계란 후라이가 들어간 햄버거 (Frita)가 과연 얼마나
          맛있을지 의문을 품을 수 있지만 육즙을 품은 고기 패티와 환상의 조합을
          자랑합니다. 쿠바 전통 밀크 셰이크 (Batidos) 도 추천합니다!
        </p>
      ),
    },
    {
      id: "hop_cat",
      title: "Hop Cat",
      desc: (
        <p>
          햄버거 맛집으로 한 입에 다 들어가지 않는 사이즈의 버거들이 있습니다.
          또한 양념이 많이 된 감자튀김도 매력적입니다.
        </p>
      ),
    },
  ],
};

const dessertDetail: InfoDetailData = {
  pageTitle: "디저트",
  records: [
    {
      id: "blank_slate",
      title: "Blank Slate",
      desc: (
        <p>
          대표적인 아이스크림 맛집으로 캐리타운에 위치하고 있습니다. 다양하고
          한국인들에게 생소한 메뉴들이 많아 사전조사 없이 가면 맛을 고르는데
          상당한 시간이 걸립니다.
        </p>
      ),
    },
    {
      id: "milk_and_froth",
      title: "Milk and Froth",
      desc: (
        <p>
          Blank Slate 못지 않게 맛있는 아이스크림 집입니다. 메뉴가 한정적이지만
          맛이 중독성이 있어 한번가면 되돌아 올 수 없습니다. 흑임자 그리고
          얼그레이 맛 아이스크림도 있습니다.
        </p>
      ),
    },
    {
      id: "comet_coffee",
      title: "Comet Coffee",
      desc: (
        <p>
          Nichels Arcade에 위치한 커피 맛집입니다. 다양한 메뉴를 즐길 순 없지만
          날씨가 좋을 때 Arcade에 비치된 의자에 앉아 커피를 마시며 낭만을 즐길 수
          있습니다.
        </p>
      ),
    },
    {
      id: "sweeting",
      title: "Sweeting",
      desc: (
        <p>
          버블티, 마라탕 등 중국 디저트들을 파는 가게입니다. 캠퍼스 내 마라 요리를
          파는 가게 중 한국의 마라탕과 가장 비슷한 맛을 느낄 수 있는 곳입니다.
        </p>
      ),
    },
  ],
};

const fineDiningDetail: InfoDetailData = {
  pageTitle: "파인 다이닝",
  records: [
    {
      id: "aventura",
      title: "Aventura",
      desc: (
        <p>
          고급 스페인 레스토랑으로 분위기가 좋으며, 다양한 종류의 타파스와
          빠에야를 메인으로 합니다. 가격대는 높지만 중요한 약속이 있을 때 방문하기
          좋은 식당입니다. 디저트류에 포함되는 츄러스가 정말 맛있습니다.
        </p>
      ),
    },
    {
      id: "mani_osteria_bar",
      title: "Mani Osteria Bar",
      desc: (
        <p>
          이탈리안 음식점으로 다양하고 색다른 피자 & 파스타를 맛볼 수 있습니다.
        </p>
      ),
    },
    {
      id: "savas",
      title: "Sava's",
      desc: (
        <p>
          가장 번화가인 State St. 삼거리에 위치하고 있으며 고급진 분위기에서
          다양한 나라의 음식을 맛볼 수 있습니다. 다만 가성비면에서는 조금 떨어지긴
          합니다.
        </p>
      ),
    },
    {
      id: "pacific_rim_by_kana",
      title: "Pacific Rim by Kana",
      desc: (
        <p>
          본래 한국 음식점이었지만 현재는 현대식 Pan-Asian 음식을 제공하는
          음식점입니다.
        </p>
      ),
    },
  ],
};

const othersDetail: InfoDetailData = {
  pageTitle: "기타",
  records: [
    {
      id: "zingermans_delicatessen",
      title: "Zingerman's Delicatessen",
      desc: (
        <p>
          샌드위치 및 델리 집이며 산처럼 쌓인 햄 샌드위치가 주력 메뉴입니다.
          미국식 음식을 드셔보고 싶다면 한 번 정도는 가볼 만한 곳입니다.
        </p>
      ),
    },
    {
      id: "culantro",
      title: "Culantro",
      desc: <p>페루 음식점입니다.</p>,
    },
  ],
};

export const restaurantsInfoData = {
  overview,
  pageMetadata,
  details: {
    asian: asianDetail,
    dessert: dessertDetail,
    fineDining: fineDiningDetail,
    hamburgerPizza: hamburgerPizzaDetail,
    korean: koreanDetail,
    koreanMarket: koreanMarketDetail,
    others: othersDetail,
  },
};
