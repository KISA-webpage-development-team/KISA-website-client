// infoPageData: /info page들에 들어가는 각종 data들이 JSON 형태로 저장됩니다.

// ** JSON structure **
// infoType: 페이지의 제목
// sections: 배열로 이루어진 페이지 섹션들
//      sectionName: 페이지의 Link url을 위한 텍스트 (/info/sectionName)
//      sectionText: 페이지의 서브 제목
//      sectionIntro(Optional): 페이지 섹션의 인트로 문구
//      contentList: 페이지의 내용 (name: 이미지 위에 올라가는 이름, id: 이미지 파일명)

// [CAMPUS]
// /info/campus/page.js
const campusPageData = {
  infoType: "Campus",
  sections: [
    // Central Campus
    {
      sectionName: "central",
      sectionText: "Central Campus",
      contentList: [
        {
          name: "Michigan Union",
          id: "michigan_union",
        },
        {
          name: "Michigan League",
          id: "michigan_league",
        },
        {
          name: "Shapiro Library\n(UgLi)",
          id: "shapiro_library",
        },
        {
          name: "Hatcher Library\n(Graduate Library)",
          id: "hatcher_library",
        },
        {
          name: "Mason Hall (MH)/\nAngell Hall (AH)",
          id: "mason_angell_hall",
        },
        {
          name: "Ross School of Business",
          id: "ross_school_of_business",
        },
        {
          name: "School of Kinesiology Building\n(SKB)",
          id: "kinesiology_building",
        },
        {
          name: "Central Campus Transit Center\n(CCTC)",
          id: "cctc",
        },
        {
          name: "Chemistry Building",
          id: "chemistry_building",
        },
        {
          name: "Randall Laboratory\n(RAND)",
          id: "randall_laboratory",
        },
        {
          name: "Central Campus Classroom Building\n(CCCB)",
          id: "cccb",
        },
        {
          name: "East Hall\n(EH)",
          id: "east_hall",
        },
        {
          name: "Lorch Hall\n(LORCH)",
          id: "lorch_hall",
        },
        {
          name: "Bell Tower",
          id: "bell_tower",
        },
      ],
    },

    // North Campus
    {
      sectionName: "north",
      sectionText: "North Campus",
      contentList: [
        {
          name: "Pierpont Commons",
          id: "pierpont_commons",
        },
        {
          name: "STAMPS auditorium",
          id: "stamps_auditorium",
        },
        {
          name: "Chrysler Center\n(CHRYS)",
          id: "chrysler_center",
        },
        {
          name: "Duderstadt Library",
          id: "duderstadt_library",
        },
        {
          name: "DOW Engineering Building\n(DOW)",
          id: "dow_engineering_building",
        },
        {
          name: "Bob and Betty Beyster Building\n(BBB)",
          id: "bob_and_betty_beyster_building",
        },
        {
          name: "George G.Brown Laboratories\n(GGBL)",
          id: "george_g_brown_laboratories",
        },
        {
          name: "Electrical Engineering And Computer Science Building\n(EECS)",
          id: "electrical_engineering_and_computer_science_building",
        },
        {
          name: "Ford Motor Company Robotics Building\n(FMCRB)",
          id: "ford_motor_company_robotics_building",
        },
        {
          name: "Industrial and Operations Engineering building\n(IOE)",
          id: "industrial_and_operations_engineering_building",
        },
        {
          name: "Earl V. Moore Building, School of Music\n(SM)",
          id: "earl_v_moore_building",
        },
      ],
    },
  ],
};

// [TRAVEL]
// /info/travel/page.js
const travelPageData = {
  infoType: "여행",
  // Ann Arbor + Detroit + 근교 도시 및 명소
  sections: [
    // Ann Arbor
    {
      sectionName: "ann-arbor",
      sectionText: "Ann Arbor",
      contentList: [
        {
          name: "University of Michigan",
          id: "university_of_michigan",
        },
        {
          name: "Nichols Arboretum",
          id: "nichols_arboretum",
        },
        {
          name: "Michigan Stadium",
          id: "michigan_stadium",
        },
        {
          name: "University of Michigan Museum of Natural History",
          id: "university_of_michigan_museum_of_natural_history",
        },
      ],
    },

    // Detroit
    {
      sectionName: "detroit",
      sectionText: "Detroit",
      contentList: [
        {
          name: "Comercia Park",
          id: "comercia_park",
        },
        {
          name: "Greek Town",
          id: "greek_town",
        },
      ],
    },
    // 근교 도시 및 명소
    {
      sectionName: "nearby",
      sectionText: "근교 도시 및 명소",
      contentList: [
        {
          name: "Holland",
          id: "holland",
        },
        {
          name: "Frankenmuth",
          id: "frankenmuth",
        },
        {
          name: "Traverse City",
          id: "traverse_city",
        },
        {
          name: "Mackinac Island",
          id: "mackinac_island",
        },
        {
          name: "Cedar Point",
          id: "cedar_point",
        },
        {
          name: "Chicago",
          id: "chicago",
        },
        {
          name: "Cananda",
          id: "canada",
        },
      ],
    },
  ],
};

// [SPORTS]
// /info/sports/page.js
const sportsPageData = {
  infoType: "스포츠",
  sections: [
    // 운동시설
    {
      sectionName: "facility",
      sectionText: "운동시설",
      sectionIntro:
        "재학 중인 학생인 경우 학기 중 미시간 대학교에서 운영하는 체육관들은 M-card만 있다면 무료로 이용 가능합니다. 아래 체육관들에는 헬스장 뿐만 아니라 스쿼시, 농구, 탁구, 수영등을 할 수 있는 시설이 완비되어 있으며 러닝머신 및 조깅 트랙등이 마련되어 있습니다.",
      contentList: [
        {
          name: "Central Campus Recreation Building\n(CCRB)",
          id: "central_campus_recreation_building",
        },
        {
          name: "North Campus Recreation Building\n(NCRB)",
          id: "north_campus_recreation_building",
        },
        {
          name: "Intramural Sports Building\n(IM)",
          id: "intramural_sports_building",
        },
      ],
    },

    // 종목별 안내
    {
      sectionName: "miscSports",
      sectionText: "종목별 안내",
      contentList: [
        {
          name: "축구",
          id: "soccer",
        },
        {
          name: "농구",
          id: "basketball",
        },
        {
          name: "테니스",
          id: "tennis",
        },
        {
          name: "골프",
          id: "golf",
        },
        {
          name: "스키",
          id: "ski",
        },
      ],
    },
  ],
};

// [RESTAURANTS]
// /info/restaurants/page.js
const restaurantsPageData = {
  infoType: "맛집",
  // 한식 + 아시안 + 햄버거 & 피자 + 디저트 + 파인 다이닝 + 기타
  sections: [
    // 한식
    {
      sectionName: "korean",
      sectionText: "한식",
      contentList: [
        {
          name: "Tomukun BBQ",
          id: "tomukun_bbq",
        },
        {
          name: "Tomukun Noodle Bar",
          id: "tomukun_noodle_bar",
        },
        {
          name: "Seoul Garden",
          id: "seoul_garden",
        },
        {
          name: "The Seoul",
          id: "the_seoul",
        },
        {
          name: "Hola Seoul",
          id: "hola_seoul",
        },
        {
          name: "Mama Satto",
          id: "mama_satto",
        },
        {
          name: "Rich JC",
          id: "rich_jc",
        },
        {
          name: "Kang's Restaurant",
          id: "kangs_restaurant",
        },
        {
          name: "Noori Chicken",
          id: "noori_chicken",
        },
      ],
    },

    // 아시안
    {
      sectionName: "asian",
      sectionText: "아시안",
      contentList: [
        {
          name: "No Thai!",
          id: "no_thai",
        },
        {
          name: "Kanbu",
          id: "kanbu",
        },
        {
          name: "Evergreen",
          id: "evergreen",
        },
        {
          name: "Asian Legend",
          id: "asian_legend",
        },
        {
          name: "Slurping Turtle",
          id: "slurping_turtle",
        },
      ],
    },
    // 햄버거 & 피자
    {
      sectionName: "hamburger-pizza",
      sectionText: "햄버거 & 피자",
      contentList: [
        {
          name: "Joe's Pizza",
          id: "joes_pizza",
        },
        {
          name: "NYPD",
          id: "nypd",
        },
        {
          name: "Frita Batidos",
          id: "frita_batidos",
        },
        {
          name: "Hop Cat",
          id: "hop_cat",
        },
      ],
    },
    // 디저트
    {
      sectionName: "dessert",
      sectionText: "디저트",
      contentList: [
        {
          name: "Blank Slate",
          id: "blank_slate",
        },
        {
          name: "Milk & Froth",
          id: "milk_and_froth",
        },
        {
          name: "Cannelle",
          id: "cannelle",
        },
        {
          name: "RoosRoast Liberty",
          id: "roosroast_liberty",
        },
        {
          name: "Comet Coffee",
          id: "comet_coffee",
        },
        {
          name: "Sweeting",
          id: "sweeting",
        },
      ],
    },
    // 파인 다이닝
    {
      sectionName: "fine-dining",
      sectionText: "파인 다이닝",
      contentList: [
        {
          name: "Aventura",
          id: "aventura",
        },
        {
          name: "Mani Osteria Bar",
          id: "mani_osteria_bar",
        },
        {
          name: "Sava's",
          id: "savas",
        },
        {
          name: "Pacific Rim by Kana",
          id: "pacific_rim_by_kana",
        },
      ],
    },
    // 기타
    {
      sectionName: "others",
      sectionText: "기타",
      contentList: [
        {
          name: "Zingerman's Delicatessen",
          id: "zingermans_delicatessen",
        },
        {
          name: "Culantro",
          id: "culantro",
        },
      ],
    },
  ],
};

export { campusPageData, travelPageData, sportsPageData, restaurantsPageData };
