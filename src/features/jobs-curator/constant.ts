import { EmploymentType, InternshipType, JobCategory } from "./types/jobs";

export const employmentTypeLabels: Record<EmploymentType, string> = {
  fulltime: "신입",
  intern: "인턴",
};

export const internshipTypeLabels: Record<InternshipType, string> = {
  experiential: "체험형",
  convertible: "전환형",
  global: "해외대전형",
};

// label coming from BE - wanted
// TODO: in the future with more job sources,
// we need to find a better way to handle this
export const jobCategoryLabels: Record<JobCategory, string> = {
  developer: "개발",
  engineering: "엔지니어링·설계",
  finance: "금융",
  business: "경영·비즈니스",
  marketing: "마케팅·광고",
  design: "디자인",
  hr: "HR",
  medical: "의료·제약·바이오",
  sales: "영업",
  customer_service: "고객서비스·리테일",
  media: "미디어",
  manufacturing: "제조·생산",
  logistics: "물류·무역",
  game: "게임 제작",
  security: "정보보호",
  education: "교육",
  legal: "법률·법집행기관",
  food: "식·음료",
  construction: "건설·시설",
  public: "공공·복지",
};
