// president, operations, public_relations are destructured from members object

const members = {
  // [ALERT] president's structure is different from the rest of the teams
  president: {
    members: [
      {
        name: "Jaemin Jeon",
        major: "Computer Science",
        year: "2025",
      },
    ],
  },
  //   OP team
  operations: [
    {
      role: "Vice President",
      members: [
        {
          name: "Jin Wook Shin",
          major: "Computer Engineering",
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
      role: "Operational Support",
      members: [
        {
          name: "Jisang Um",
          major: "IOE",
          year: "2026",
        },
      ],
    },
    {
      role: "Event Planning",
      members: [
        {
          name: "Yoonsung Ji",
          major: "Computer Science",
          year: "2025",
        },
        {
          name: "Yoon Seo Shin",
          major: "Computer Science",
          year: "2026",
        },
        {
          name: "Seoin Chang",
          major: "Robotics",
          year: "2027",
        },
        {
          name: "Dong Ju Moon",
          major: "Undecided",
          year: "2027",
        },
        {
          name: "Haeun Lee",
          major: "Undecided",
          year: "2028",
        },
        {
          name: "Jun Hee Han",
          major: "Undecided",
          year: "2028",
        },
      ],
    },
    {
      role: "Web Development",
      members: [
        {
          isLead: true,
          name: "Dongsub Kim",
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
      role: "Outreach",
      members: [
        {
          isLead: true,
          name: "Seungmin Shin",
          major: "Computer Science",
          year: "2025",
        },
        {
          name: "Wookwan Kwon",
          major: "Computer Science",
          year: "2024",
        },
        {
          name: "Junho Lee",
          major: "Education",
          year: "2028",
        },
        {
          name: "Dongeun Lee",
          major: "Data Science",
          year: "2028",
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
          name: "Seoyeon Han",
          major: "Computer Science",
          year: "2025",
        },
      ],
    },
    {
      role: "Design",
      members: [
        {
          isLead: true,
          name: "Jungin Hwang",
          major: "Computer Science",
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
      role: "Social Media/Marketing",
      members: [
        {
          name: "Hyeri Lee",
          major: "Electrical Engineering",
          year: "2026",
        },
        {
          name: "Chaeyoung Kim",
          major: "Biomedical Engineering",
          year: "2026",
        },
        {
          name: "Hyowon Ko",
          major: "Statistics",
          year: "2027",
        },
        {
          name: "Jaeyoon Jung",
          major: "Psychology",
          year: "2026",
        },
        {
          name: "Younghyun Choi",
          major: "Psychology",
          year: "2026",
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
        
      ],
    },
  ],
};

export { members };
