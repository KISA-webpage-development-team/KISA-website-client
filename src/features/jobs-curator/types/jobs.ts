// Job posting data structure

// TODO: need to add more sources in the future
export type JobSource = "wanted-api" | "kisa";
export interface Job {
  jobID: number;
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  dueDate?: string;
  link: string;
  isFulltimePosition: boolean;
  isFulltimeConvertible: boolean;
  isOnlyForInternationalUniversity: boolean;
  source: JobSource;
}

export interface JobPosting {
  jobID: number;
  company: string;
  position: string;
  dueDate?: string;
  link: string;
  source: JobSource;
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
// list coming from BE - wanted
// TODO: in the future with more job sources,
// we need to find a better way to handle this
export type JobCategory =
  | "developer"
  | "business"
  | "marketing"
  | "design"
  | "sales"
  | "customer_service"
  | "hr"
  | "finance"
  | "media"
  | "engineering"
  | "manufacturing"
  | "logistics"
  | "game"
  | "security"
  | "medical"
  | "education"
  | "legal"
  | "food"
  | "construction"
  | "public";

// Employment type derived from boolean flags
export type EmploymentType = "fulltime" | "intern";

// Internship type
export type InternshipType = "convertible" | "experiential" | "global";

// Country — ISO-like keys. Display strings ("한국" / "미국") live in UI.
export type SupportedCountry = "KR" | "US";

// Query parameters for the job list API
type Tag = "fulltime" | "intern" | "convertible" | "experiential" | "global";
export interface JobListQueryParams {
  category?: string;
  tags?: Tag[];
  startDate?: string;
  endDate?: string;
  offset?: number;
  limit?: number;
}
