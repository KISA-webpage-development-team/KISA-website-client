// infoPageData: /info/detail page들에 들어가는 각종 data들이 JSON 형태로 저장됩니다.

// ** JSON structure **
// id: 이미지 id 및 div 태그 id
// title: 디테일 섹션의 제목
// desc: html 태그 형식의 디테일 섹션 설명

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

export { campusCentralData };
