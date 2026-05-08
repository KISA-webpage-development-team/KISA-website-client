// Cumulative wall of contributors. Flattened across cohorts and deduped:
// when the same person appears in multiple year-keys, the latest cohort's
// `role` + `description` win, and `years` accumulates every year served.
// Empty strings in the source are normalized to `undefined` for optional
// fields so consumers can use `!field ? omit : render` without a falsy
// empty-string trap.
export type Contributor = {
  name: string;
  email: string;
  role: string;
  description: string;
  github?: string;
  linkedin?: string;
  years: string[];
};

const credits: Contributor[] = [
  // 25-26 cohort (most recent first)
  {
    name: "Yunseong Na",
    email: "ysna@umich.edu",
    role: "Web Development Lead",
    description: "Implemented the credit page.",
    github: "https://github.com/ysna99",
    linkedin: "https://www.linkedin.com/in/yunseong-na-6b40b4192/",
    years: ["24-25", "25-26"],
  },
  {
    name: "Hannah Lee",
    email: "hannahjl@umich.edu",
    role: "Developer",
    description: "Implemented the credit page.",
    github: "https://github.com/hannahlee0717",
    linkedin: "https://www.linkedin.com/in/hannah-lee-93723b232",
    years: ["24-25", "25-26"],
  },
  {
    name: "Doohee Nam",
    email: "doohee@umich.edu",
    role: "Developer",
    description: "",
    github: "https://github.com/namdoohee",
    linkedin: "http://www.linkedin.com/in/doohee-nam-08a456247",
    years: ["25-26"],
  },
  {
    name: "Jaeyi Kang",
    email: "jaeyi@umich.edu",
    role: "Developer",
    description: "",
    years: ["25-26"],
  },
  {
    name: "Soobin Ihm",
    email: "sbihm@umich.edu",
    role: "Developer",
    description: "Implemented the credit page, ....",
    linkedin: "www.linkedin.com/in/soobinihm",
    years: ["25-26"],
  },
  {
    name: "Rachel Lee",
    email: "rsylee@umich.edu",
    role: "Developer",
    description: "",
    years: ["25-26"],
  },
  // 24-25 cohort (newcomers)
  {
    name: "Dongsub Kim",
    email: "dongsubk@umich.edu",
    role: "Team Lead",
    description:
      "Entirely developed the REST API server, partially contributed to the frontend development and is managing a system of databases and cloud computing resources through AWS.",
    github: "https://github.com/dongsub0918",
    linkedin: "https://www.linkedin.com/in/aiden-dongsub-kim/",
    years: ["23-24", "24-25"],
  },
  {
    name: "Jioh In",
    email: "jiohin@umich.edu",
    role: "Lead Frontend Developer",
    description:
      "Spearheaded the entire frontend development from scratch, implementing CRUD boards, static pages, and page optimizations.",
    github: "https://github.com/retz8",
    linkedin: "https://www.linkedin.com/in/jioh-in/",
    years: ["23-24", "24-25"],
  },
  {
    name: "Dongeun Kim",
    email: "dongeunk@umich.edu",
    role: "Developer",
    description:
      "Played a key role in implementing the Members and Sponsors pages, ensuring scalable data management. In addition, worked on an anonymous comment feature for EveryKisa.",
    github: "https://github.com/dkim1112",
    linkedin: "https://www.linkedin.com/in/dongeun-kim-9809b8324/",
    years: ["24-25"],
  },
  {
    name: "Yoonseo Shin",
    email: "yoonseos@umich.edu",
    role: "Developer",
    description:
      "Implemented the Members and Sponsors pages and contributed to the sponsor carousel on the landing page.",
    github: "https://github.com/YoonseoShin",
    linkedin: "https://www.linkedin.com/in/yoonseo-shin-48b1912b3",
    years: ["24-25"],
  },
  {
    name: "Lauren Kim",
    email: "laurenhk@umich.edu",
    role: "Developer",
    description:
      "Specialized in refining the user interface across the website and the Members page.",
    github: "https://github.com/Imlaurenhk",
    linkedin: "https://www.linkedin.com/in/imlaurenhk",
    years: ["24-25"],
  },
  {
    name: "Jungin Hwang",
    email: "jungin@umich.edu",
    role: "Web UI Designer",
    description:
      "Pioneered the overall UI design, crafting a modern and intuitive visual experience across the website.",
    github: "https://github.com/kkaileyyh",
    linkedin: "https://www.linkedin.com/in/junginhwang/",
    years: ["24-25"],
  },
];

export { credits };
