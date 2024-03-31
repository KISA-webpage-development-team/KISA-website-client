// president, operations, public_relations are destructured from members object

const members = {
  // [ALERT] president's structure is different from the rest of the teams
  president: {
    members: [
      {
        name: "Wookwan Kwon",
        major: "Computer Science",
        year: "2024",
      },
    ],
  },
  //   OP team
  operations: [
    {
      role: "Vice President",
      members: [
        {
          name: "Yuri Hong",
          major: "Electrical Engineering",
          year: "2026",
        },
      ],
    },
    {
      role: "Finance",
      members: [
        {
          name: "Jihyun Park",
          major: "Economics",
          year: "2025",
        },
      ],
    },
    {
      role: "Event Planning",
      members: [
        {
          name: "Jaemin Jeon",
          major: "Computer Science",
          year: "2025",
        },
        {
          name: "Yoonsung Ji",
          major: "Computer Science",
          year: "2024",
        },
        {
          name: "Jisang Um",
          major: "IOE",
          year: "2026",
        },
        {
          name: "Jin Wook Shin",
          major: "Computer Engineering",
          year: "2026",
        },
      ],
    },
    {
      role: "Web Development",
      members: [
        {
          name: "Lead: Dongsub Kim",
          major: "Computer Science",
          year: "2023",
        },
        {
          name: "Jioh In",
          major: "Computer Science",
          year: "2028",
        },
      ],
    },
    {
      role: "Operational Support",
      members: [
        {
          name: "Kyungmin Inn",
          major: "Computer Engineering",
          year: "2029",
        },
      ],
    },
  ],
  //   PR team
  public_relations: [
    {
      role: "Vice President",
      members: [
        {
          name: "Siwon Lee",
          major: "Communication and Media",
          year: "2024",
        },
      ],
    },
    {
      role: "Outreach",
      members: [
        {
          isLead: true,
          name: "Yoonjoo Lee",
          major: "Philosophy & History of Art",
          year: "2025",
        },
        {
          name: "Huymin Lee",
          major: "Data Science & Statistics",
          year: "2024",
        },
        {
          name: "Jooyoung Chung",
          major: "Political Science",
          year: "2024",
        },
        {
          name: "Seungmin Shin",
          major: "Computer Science",
          year: "2025",
        },
        {
          name: "Seoin Chang",
          major: "Robotics",
          year: "2027",
        },
      ],
    },
    {
      role: "Design",
      members: [
        {
          isLead: true,
          name: "Chaeyeon Park",
          major: "Art and Design",
          year: "2025",
        },
        {
          name: "Jungin Hwang",
          major: "Computer Science",
          year: "2026",
        },
        {
          name: "Joonyoung Byeon",
          major: "Art and Design",
          year: "2026",
        },
        {
          name: "Minju Koo",
          major: "BHS & Art and Design",
          year: "2027",
        },
      ],
    },
    {
      role: "Newsletter & Yearbook",
      members: [
        {
          name: "Hyeri Lee",
          major: "Electrical Engineering",
          year: "2026",
        },
        {
          name: "Hyowon Ko",
          major: "Statistics",
          year: "2027",
        },
      ],
    },
    {
      role: "Social Media",
      members: [
        {
          name: "Seoyeon Han",
          major: "Computer Science",
          year: "2025",
        },
        {
          name: "Chaeyoung Kim",
          major: "Biomedical Engineering",
          year: "2026",
        },
      ],
    },
  ],
};

export { members };
