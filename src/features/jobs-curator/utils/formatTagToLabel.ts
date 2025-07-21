import { employmentTypeLabels, internshipTypeLabels } from "../constant";
import { EmploymentType, InternshipType } from "../types/jobs";

export const formatTagToLabel = (tag: EmploymentType | InternshipType) => {
  if (tag === "fulltime" || tag === "internship") {
    return employmentTypeLabels[tag];
  } else {
    return internshipTypeLabels[tag];
  }
};
