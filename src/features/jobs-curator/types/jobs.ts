// Job posting data structure
export interface Job {
  jobID: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  dueDate: string;
  link: string;
  isFulltimePosition: boolean;
  isFulltimeConvertible: boolean;
  isOnlyForInternationalUniversity: boolean;
  source: string;
}

export interface JobPosting {
  jobID: number;
  company: string;
  position: string;
  dueDate: string;
  link: string;
}

// Tag types based on backend documentation
export type JobTag =
  | "fulltime"
  | "intern"
  | "convertible"
  | "experiential"
  | "global";

export type JobTagBadge = "체험형" | "전환형" | "해외대전형";

// Job categories
// TODO: this is not correct, need to check with backend later
export type JobCategory = "developer" | "marketing" | "hr" | "design" | "sales";

// Employment type derived from boolean flags
export type EmploymentType = "fulltime" | "internship";

// Internship type
export type InternshipType = "convertible" | "experiential" | "global";
