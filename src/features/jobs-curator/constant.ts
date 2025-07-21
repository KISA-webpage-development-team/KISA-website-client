import { EmploymentType, InternshipType } from "./types/jobs";

export const employmentTypeLabels: Record<EmploymentType, string> = {
  fulltime: "신입",
  internship: "인턴",
};

export const internshipTypeLabels: Record<InternshipType, string> = {
  experiential: "체험형",
  convertible: "전환형",
  global: "해외대전형",
};
