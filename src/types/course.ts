// Course entity types (not component prop types)

type Workload = "5시간 미만" | "5~10시간" | "10~15시간" | "15시간 이상";

interface Professor {
  name: string;
  rating: number; // 1–5
  comment: string;
}

interface SimpleCourse {
  code: string; // PK, e.g. "EECS 281"
  name: string;
  department: string;
  reviewCount: number;
  averageProfessorRating: number;
}

interface CourseCommonInfo {
  lectureAttendance: boolean;
  lectureRecording: boolean;
  groupWork: boolean;
  labAttendance: boolean;
  exam: string;
  workload: Workload;
  officeHours: string;
}

interface SimpleReview {
  reviewid: number;
  courseCode: string; // FK -> Course.code
  authorName: string;
  semester: string; // e.g. "2024 Winter"
  likesCount: number;
}

interface Review extends SimpleReview {
  courseComment: string;
  professors: Professor[];
}

interface CourseReviewsResponse {
  commonInfo: CourseCommonInfo;
  reviews: Review[];
}

interface NewReviewBody {
  courseCode: string;
  email: string;
  semester: string;
  lectureAttendance: boolean;
  lectureRecording: boolean;
  groupWork: boolean;
  labAttendance: boolean;
  exam: string;
  workload: Workload;
  courseComment: string;
  professors: Professor[];
  officeHours: string;
}

interface JokboFile {
  fileid: number;
  courseCode: string;
  fileName: string;
  uploadedBy: string;
  semester: string;
  uploadedAt: string;
}

export type {
  Workload,
  Professor,
  SimpleCourse,
  CourseCommonInfo,
  Review,
  SimpleReview,
  CourseReviewsResponse,
  NewReviewBody,
  JokboFile,
};
